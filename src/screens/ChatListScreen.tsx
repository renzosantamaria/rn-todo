import React, {useState, useEffect} from "react"
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthorizedNavigationStack } from "../navigation/Navigation.types";
import { connect, ConnectedProps } from "react-redux";
import { IReduxState } from "../store/store.types";
import userSelectors from "../store/user/user.selectors";
import conversationSelectors from "../store/conversation/conversation.selectors";
import conversationMethods from "../store/conversation/conversation.methods";
import userMethods from "../store/user/user.methods";


const connectStateAndDispatch = connect(
    (state: IReduxState) => ({
      user: userSelectors.userStateSelector(state),
      usersList: userSelectors.usersListStateSelector(state),
      conversations: conversationSelectors.conversationsStateSelector(state),
      unreadConversations: conversationSelectors.unreadConversationStateSelector(state)
    }),
    {
        getConversations: conversationMethods.getConversations,
        createConversation: conversationMethods.createConversation,
        getExistingUsers: userMethods.getAllUsers
    }
  );
interface IProps {
    showRegister: () => void;
    navigation: StackNavigationProp<AuthorizedNavigationStack, "Home">;
  }
  
const ChatListScreen: React.FC<ConnectedProps<typeof connectStateAndDispatch> & IProps> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

    useEffect(() => {
        props.getConversations()
        props.getExistingUsers()
    }, [])
    
    const handleNavigation = (conversationId) => {
        props.navigation.navigate('Chat', {conversationId})
    }

    const handleCreateChat = () => {
        //Fix how the data is assigned to the usersList array. (respect the types!)
        //Add validation min 2 ids required to create a chat
        //Add validation cannot create chat with myself
        
        let membersId = `${props.user.userId},${selectedUserId}`
        membersId = membersId.split(',').sort().join(',') // sort the ids
        let conversationWithThisUsersAlreadyExists = false
        let chatId;

        //if a chat with same users ids already exist then navigate there instead of creating a new chat
        props.conversations.map( chat => {
            let members = []
            for( let id of chat.membersId.split(',')) {
                members.push(id.trim())
            }
            if(membersId === members.sort().join(',')){
                conversationWithThisUsersAlreadyExists = true
                chatId = chat.id
            }else{
                conversationWithThisUsersAlreadyExists = false
            }
        })
        conversationWithThisUsersAlreadyExists ? handleNavigation(chatId) : props.createConversation(membersId, 'conversation')
        handleCloseModal()
    }

    const handleSelectUserFromList = (id) => {
        setSelectedUserId(id)
    }

    const handleCloseModal = () => {
        setSelectedUserId(null)
        setIsModalVisible(false)
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
                                padding: 5,
                                fontWeight: props.unreadConversations.includes(item.id) ? "bold" : "normal"
                                }}
                            >
                                {item.recipientNames.join(', ')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )} 
            />
            
            <TouchableOpacity
            onPress={() => setIsModalVisible(!isModalVisible)}
            style={{
                borderWidth: 1,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                borderRadius: 20,
                margin: 20
            }}
            >
                <Text
                    style={{
                    fontSize: 24,
                    alignSelf: "center"
                    }}
                >
                    +
                </Text>
            </TouchableOpacity>
            <Modal
                isVisible={isModalVisible}
                onSwipeComplete={handleCloseModal}
                swipeDirection="down"
                onBackdropPress={handleCloseModal}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={handleCloseModal}>
                        <Text
                            style={{
                            color: true ? "#242424" : "#fff",
                            textDecorationLine: false ? "line-through" : "none",
                            borderWidth: 1,
                            padding: 5
                            }}
                        >
                            Close modal
                        </Text>
                    </TouchableOpacity>
                    <FlatList
                        // keyExtractor={(user) => user.id}
                        data={props.usersList.filter(user => user.id != props.user.userId)}
                        renderItem={({ item }) => (
                            <View style={{ backgroundColor: `${selectedUserId === item.id ? "#eecba0" : "#f2f2f2"}`}}>
                                <TouchableOpacity onPress={() => handleSelectUserFromList(item.id)}>
                                    <Text
                                        style={{
                                        color: true ? "#242424" : "#fff",
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        padding: 5
                                        }}
                                    >
                                        {item.surname}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )} 
                    />
                    {selectedUserId &&
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
                    </TouchableOpacity>}
                </View>
            </Modal>
        </>
    )
} 
const styles = StyleSheet.create({
    modalContent: {
      height: "70%",
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
  });

export default connectStateAndDispatch(ChatListScreen)