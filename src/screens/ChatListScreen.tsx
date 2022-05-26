import React, {useState, useEffect} from "react"
import { FlatList, Text, View, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthorizedNavigationStack } from "../navigation/Navigation.types";
import { connect, ConnectedProps } from "react-redux";
import { IReduxState } from "../store/store.types";
import userSelectors from "../store/user/user.selectors";
import conversationSelectors from "../store/conversation/conversation.selectors";
import conversationMethods from "../store/conversation/conversation.methods";


const connectStateAndDispatch = connect(
    (state: IReduxState) => ({
      user: userSelectors.userStateSelector(state),
      conversations: conversationSelectors.conversationsStateSelector(state)
    }),
    {
        getConversations: conversationMethods.getConversations,
        createConversation: conversationMethods.createConversation
    }
  );
interface IProps {
    showRegister: () => void;
    navigation: StackNavigationProp<AuthorizedNavigationStack, "Home">;
  }
  
const ChatListScreen: React.FC<ConnectedProps<typeof connectStateAndDispatch> & IProps> = (props) => {
    const [chatConversations, setChatConversations] = useState([])
    
    useEffect(() => {
        props.getConversations()
    }, [])
    
    const handleNavigation = (conversationId) => {
        props.navigation.navigate('Chat', {conversationId})
    }

    const handleCreateChat = () => {
        console.log('create new chat!')
        props.user.userId
        let membersId = `${props.user.userId}, 1`
        props.createConversation(membersId, 'test conversation')
    }

    return(
        <>
            <FlatList
                // keyExtractor={(todo) => todo.userId}
                data={props.conversations}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: `${true ? "#bbbbbb" : "#222"}`}}>
                        <TouchableOpacity onPress={() => handleNavigation(item.id)}>
                            <Text
                                style={{
                                color: true ? "#242424" : "#fff",
                                textDecorationLine: false ? "line-through" : "none",
                                borderWidth: 1,
                                padding: 5
                                }}
                            >
                                {item.recipientNames.join(', ')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )} 
            />
            <TouchableOpacity onPress={handleCreateChat}>
                <Text
                    style={{
                    color: true ? "#242424" : "#fff",
                    textDecorationLine: false ? "line-through" : "none",
                    borderWidth: 1,
                    padding: 5
                    }}
                >
                    Create new chat
                </Text>
            </TouchableOpacity>
        </>
    )
} 
export default connectStateAndDispatch(ChatListScreen)