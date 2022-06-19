import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  StatusBar,
  Vibration,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
// import {useRoute} from '@react-navigation/native';
import { Audio } from "expo-av";
// -- Notifications
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
// --
import Screen from "../components/Screen/Screen";

import { connect, ConnectedProps } from "react-redux";
import { IReduxState } from "../store/store.types";
import userSelectors from "../store/user/user.selectors";

import Input from "../components/Input";
import Button from "../components/styled-components/Button";
import Image from "../components/styled-components/Image";
import { SafeAreaView } from "../components/styled-components/wrapper";
import IconButton from "../components/styled-components/IconButton";
import * as Colors from "../constants/colors";
import authMethods from "../store/auth/auth.methods";
import todoSelectors from "../store/todo/todo.selectors";
import todoMethods from "../store/todo/todo.methods";
import { io } from "socket.io-client";
import conversationMethods from "../store/conversation/conversation.methods";
import conversationSelectors from "../store/conversation/conversation.selectors";
import userMethods from "../store/user/user.methods";
import { RouteProp, useNavigationState } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  IBottomTabStack,
  AuthorizedNavigationStack,
} from "../navigation/Navigation.types";

const connectStateAndDispatch = connect(
  (state: IReduxState) => ({
    user: userSelectors.userStateSelector(state),
    todos: todoSelectors.todosStateSelector(state),
    conversations: conversationSelectors.conversationsStateSelector(state),
    unreadConversations:
      conversationSelectors.unreadConversationStateSelector(state),
    openConversationId:
      conversationSelectors.openConversationStateSelector(state),
  }),
  {
    getAllUsers: userMethods.getAllUsers,
    getConversations: conversationMethods.getConversations,
    logout: authMethods.logout,
    getAllTodos: todoMethods.getAllTodos,
    postTodo: todoMethods.postTodo,
    deleteTodoById: todoMethods.deleteTodoById,
    toggleTodoState: todoMethods.toggleTodoStateById,
    setUnreadConversations: conversationMethods.setUnreadConversations,
    setOpenConversationId: conversationMethods.setOpenConversationId,
    setOnlineUsersIds: userMethods.setOnlineUsersIds
  }
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface IProps {
  showRegister: () => void;
  route: RouteProp<IBottomTabStack, "ChatList">;
  navigation: StackNavigationProp<AuthorizedNavigationStack, "Home">;
}

const Todos: React.FC<
  ConnectedProps<typeof connectStateAndDispatch> & IProps
> = (props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [todoListFilter, settodoListFilter] = useState<string>("all");
  const [sound, setSound] = useState();
  const socketRef = useRef();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const state = useNavigationState((state) => state);


  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('start: ' + token);
      
      setExpoPushToken(token)
    } else {
      alert("Must use physical device for Push Notifications");
    }
  
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  }

  useEffect(() => {
    props.getAllTodos();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { chatId } = response.notification.request.content.data;
        props.getConversations()
        props.navigation.navigate("Chat", { conversationId: chatId }); //navigate to chat
        props.setOpenConversationId(chatId);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    // socketRef.current = io('http://192.168.0.40:5001') // dev
    socketRef.current = io("wss://ts-rn-todo.herokuapp.com"); //prod

    const regToken = async () => {
      registerForPushNotificationsAsync().then((token) => {
        let sessionId = socketRef.current.id;
        socketRef.current.emit("namespaceSessionId", {
          userId: props.user.userId,
          sessionId,
          expoPushToken: token,
        });
        }
      );
    }
    regToken()

    socketRef.current!.on("conversationCreated", () => {
      props.getConversations();
    });
    socketRef.current!.on("onlineUsers", (payload) => {
      let onlineUsers = []
      payload.connectedUsers.map( user => { onlineUsers.push(+user.userId) })
      props.setOnlineUsersIds(onlineUsers);
    });
    socketRef.current!.on("newRegisteredUser", () => {
      props.getAllUsers();
    });
    socketRef.current!.on("updateSenderSessions", (payload) => {
      let unreadConversations = [...props.unreadConversations];

      if (unreadConversations.includes(+payload.chatId)) {
        let filteredConversation = unreadConversations.filter(
          (id) => id != +payload.chatId
        );
        props.setUnreadConversations(filteredConversation);
      }
      props.getConversations();
    });
    socketRef.current!.on("privateMessage", (payload) => {
      // Vibration.vibrate(1 * 800);
      playSound();
      // payload.chatId == props.openConversationId
      //   ? ""
      //   : sendPushNotification(expoPushToken, payload);

      props.getConversations();
      let unreadConversations = [...props.unreadConversations];
      unreadConversations.includes(payload.chatId)
        ? ""
        : unreadConversations.push(+payload.chatId);
      props.setUnreadConversations(unreadConversations);
    });
    return () => {
      socketRef.current!.disconnect();
    };
  }, [props.unreadConversations]);

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/pop-alert.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  const addTodoHandler = async () => {
    await props.postTodo(inputValue, props.user.userId!);
    Keyboard.dismiss();
    setInputValue("");
  };

  const deleteTodoHandler = async (id: number) => {
    await props.deleteTodoById(id);
  };

  const handleDoneToggle = async (id: number) => {
    await props.toggleTodoState(id);
  };

  

  const returnFilteredList = () => {
    switch (todoListFilter) {
      case "all":
        return props.todos;
        break;

      case "done":
        return props.todos.filter((todo) => todo.done == true);
        break;

      case "incomplete":
        return props.todos.filter((todo) => todo.done == false);
        break;

      default:
        break;
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
      <StatusBar hidden={false} backgroundColor={"black"} />
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Text style={styles.welcome}> Welcome, {props.user.name} </Text>
        <Image imageSource={require("../assets/dog.jpeg")} />
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 18,
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: "row" }}
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}
        >
          <Input
            style={"inputLight"}
            placeholder={"New task..."}
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            // onSubmitEditing={addTodoHandler}
          />
        </KeyboardAvoidingView>
        <Text
          onPress={addTodoHandler}
          style={{ color: "#29728c", fontSize: 18 }}
        >
          Add Todo
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 18,
        }}
      >
        <Button
          width={"auto"}
          bgColor={Colors.$4dp}
          color={"#fff"}
          onPress={() => {
            settodoListFilter("done");
          }}
          text={"Show Done"}
        />
        <Button
          width={"auto"}
          bgColor={Colors.$4dp}
          color={"#fff"}
          onPress={() => {
            settodoListFilter("incomplete");
          }}
          text={"Show Incomplete"}
        />
        <Button
          width={"auto"}
          bgColor={Colors.$4dp}
          color={"#fff"}
          onPress={() => {
            settodoListFilter("all");
          }}
          text={"Show all"}
        />
      </View>

      {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
      </>
      </TouchableWithoutFeedback>
        <FlatList
          style={styles.flatlist}
          // keyExtractor={(todo) => todo.userId}
          data={returnFilteredList()}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.todoItemWrapper,
                backgroundColor: `${item.done ? "#222" : "#222"}`,
              }}
            >
              <Text
                style={{
                  color: item.done ? "#8f8f8f" : "#fff",
                  textDecorationLine: item.done ? "line-through" : "none",
                  width: "80%",
                }}
              >
                {item.text}
              </Text>
              <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                <IconButton
                  color={`${item.done ? "#48914e" : "#e1e1e1"}`}
                  name={
                    item.done
                      ? "checkbox-marked-circle-outline"
                      : "checkbox-blank-circle-outline"
                  }
                  onPress={() => handleDoneToggle(item.id)}
                />
                <IconButton
                  color={"#f28080"}
                  name={"delete"}
                  onPress={() => deleteTodoHandler(item.id)}
                />
              </View>
            </View>
          )}
        />
    </SafeAreaView>
  );
};

async function sendPushNotification(expoPushToken, payload) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: payload.senderName,
    body: payload.content,
    data: { chatId: payload.chatId },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}



const styles = StyleSheet.create({
  flatlist: {
    marginTop: 20,
    marginBottom: 40,
    width: "100%",
    marginHorizontal: "auto",
  },
  todoItemWrapper: {
    color: "black",
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 12,
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  welcome: {
    fontSize: 30,
    color: Colors.background,
    marginVertical: 20,
  },
});

export default connectStateAndDispatch(Todos);
