import React, { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import Message from "../components/Message/Message";
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
      unreadConversations: conversationSelectors.unreadConversationStateSelector(state),
      user: userSelectors.userStateSelector(state)
    }),
    {
      postMessage: messageMethods.postMessage,
      getConversations: conversationMethods.getConversations,
      setUnreadConversations: conversationMethods.setUnreadConversations
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

  useEffect(()=> {
    props.navigation.setOptions({ headerTitle: conversation?.recipientNames.join(', '), headerBackTitle: ' ', headerTintColor: 'black' });
  }, [conversation])

  useEffect(() => {
    if(props.unreadConversations.includes(conversationId)){
      let filteredList = props.unreadConversations.filter(convId => convId != conversationId)
      props.setUnreadConversations(filteredList)
    }

  },[props.unreadConversations])

  useEffect(() => {
    let currentConversation = props.conversations.find(chat => chat.id == conversationId)
    setConversation(currentConversation)
  },[props.conversations])

  const handleSendMessage = async () => {
    setInputValue("");
    try {
      if (inputValue.length > 0) {
        await props.postMessage(conversationId, inputValue)
        props.getConversations()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
       <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
        <View style={{flex: 1}}>
            {conversation && 
            <FlatList
              keyExtractor={(conversation) => conversation.id.toString()}
              style={ styles.messageList }
              data={[...conversation.messages].reverse()}
              inverted={true}
              renderItem={({ item }) => (
                <Message message={item}></Message>
            )}
            />}
            {/* <MessageInput /> */}
            <View
            style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                // backgroundColor: "red",
                paddingHorizontal: 20,
                marginBottom: 40,
                marginTop: 10
            }}
            >
              <Input
                  style={"messageInput"}
                  placeholder={"message..."}
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}
                  onSubmitEditing={handleSendMessage}
                  onKeyPress={({ nativeEvent }) => console.log(nativeEvent.key)}
              />
              <Text
                  onPress={handleSendMessage}
                  style={{ color: "#29728c", fontSize: 18 }}
              >
                Send
              </Text>
            </View>
        </View>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    messageList:{
      width: "100%",
      paddingHorizontal: 8,
      height: 'auto',
      paddingVertical: 12
    }
  });
export default connectStateAndDispatch(ChattScreen);
