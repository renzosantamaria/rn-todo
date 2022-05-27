import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from "react-native";
import Screen from "../components/Screen/Screen";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  AuthorizedNavigationStack,
  IBottomTabStack,
} from "../navigation/Navigation.types";
import Input from "../components/Input";
import { RouteProp } from "@react-navigation/native";
import { connect, ConnectedProps } from "react-redux";
import { IReduxState } from "../store/store.types";
import userSelectors from "../store/user/user.selectors";
import messageMethods from "../store/message/message.methods";
import conversationMethods from "../store/conversation/conversation.methods";
import conversationSelectors from "../store/conversation/conversation.selectors";
import { Conversation } from "../store/conversation/conversation.types";


const connectStateAndDispatch = connect(
    (state: IReduxState) => ({
      conversations: conversationSelectors.conversationsStateSelector(state),
      user: userSelectors.userStateSelector(state)
    }),
    {
      postMessage: messageMethods.postMessage,
      getConversations: conversationMethods.getConversations,
    }
  );
interface IProps {
  showRegister: () => void;
  route: RouteProp<IBottomTabStack, "ChatList">;
  navigation: StackNavigationProp<AuthorizedNavigationStack, "Home">;
}

const ChattScreen: React.FC<ConnectedProps<typeof connectStateAndDispatch> & IProps> = (props) => {

  const [inputValue, setInputValue] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation>()
  const { conversationId } = props.route.params;
  const myUserId = props.user.userId


  useEffect(() => {
    let currentConversation = props.conversations.find(chat => chat.id == conversationId)
    setConversation(currentConversation)
  },[props.conversations])

  const addTodoHandler = async () => {
    await props.postMessage(conversationId, inputValue)
    try {
      props.getConversations()
    } catch (error) {
      console.log(error);
    }
    setInputValue("");
  };

  return (
    <Screen
      bgcolor="grey"
      header={{
        hide: false,
        color: "#fff",
        backButtonText: conversation && conversation.recipientNames.join(' ,')
      }}
      transparentBackground={true}
      // showLoadingIndicator={props.isLoginGoogleLoading}
      // loadingText="Logging in..."
      ignorepadding={true}
    >
       <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
        <View>
            {conversation && <FlatList
            keyExtractor={(conversation) => conversation.id.toString()}
            style={ styles.messageList }
            data={conversation.messages}
            renderItem={({ item }) => (
                <View style={{
                    ...styles.messageItem,
                    backgroundColor: `${item.senderId == myUserId ? "#234a9d" : "#222"}`,
                    marginLeft: `${item.senderId == myUserId ? 'auto' : '0%'}`
                    }}>
                <TouchableOpacity onPress={() => console.log(item)}>
                    <Text
                    style={{
                        color: true ? "#fefefe" : "#fff",
                        textDecorationLine: false ? "line-through" : "none",
                    }}
                    >
                    {item.content}, {item.senderId}
                    </Text>
                </TouchableOpacity>
                </View>
            )}
            />}
            <View
            style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            <Input
                style={"inputLight"}
                placeholder={"message..."}
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                onSubmitEditing={addTodoHandler}
                onKeyPress={({ nativeEvent }) => console.log(nativeEvent.key)}
            />
            <Text
                onPress={addTodoHandler}
                style={{ color: "#29728c", fontSize: 18 }}
            >
                Send
            </Text>
            </View>
        </View>
      </KeyboardAvoidingView> 
    </Screen>
  );
};

const styles = StyleSheet.create({
    messageList:{
      marginTop: 20,
      marginBottom: 40,
      width: "100%",
      marginHorizontal: "auto",
      padding:2,
      height: 'auto',
    },
    messageItem: {
      color: "black",
      paddingVertical: 6,
      paddingHorizontal: 14,
      marginTop: 12,
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      width: "80%",
    }
  });
export default connectStateAndDispatch(ChattScreen);
