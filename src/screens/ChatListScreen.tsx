import React, {useState, useEffect} from "react"
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Image } from "react-native"
import Modal from "react-native-modal"
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthorizedNavigationStack } from "../navigation/Navigation.types";
import { connect, ConnectedProps } from "react-redux";
import { IReduxState } from "../store/store.types";
import userSelectors from "../store/user/user.selectors";
import conversationSelectors from "../store/conversation/conversation.selectors";
import conversationMethods from "../store/conversation/conversation.methods";
import userMethods from "../store/user/user.methods";
import { SafeAreaView } from "react-native-safe-area-context";


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
        props.getConversations()
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
        for (let i = 0; i < props.conversations.length; i++) {
            let members = []
            let chat = props.conversations[i]
            for( let id of chat.membersId.split(',')) {
                members.push(id.trim())
            }
            if(membersId === members.sort().join(',')){
                conversationWithThisUsersAlreadyExists = true
                chatId = chat.id
                break
            }else{
                conversationWithThisUsersAlreadyExists = false
            }
        }
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
        <SafeAreaView style={{flex: 1,paddingBottom: 0, marginBottom: 0}}>
            <Text style={styles.heading}>Messages</Text>
            <FlatList
                // keyExtractor={(todo) => todo.userId}
                style={{paddingTop: 0}}
                data={props.conversations}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.container} onPress={() => handleNavigation(item.id)}>
                        <Image
                            style={styles.image}
                            source={require("../assets/dog.jpeg")}
                        />
                        {props.unreadConversations.includes(item.id) &&
                            <View style={styles.badgeContainer}>
                            <Text style={styles.badgeText}>1</Text>
                            </View>
                        }
                        
                        <View style={styles.rightContainer}>
                            <View style={styles.row}>
                                <Text numberOfLines={1} style={styles.name}> {item.recipientNames.join(', ')} </Text>
                                <Text style={styles.text}> {item.updatedAt && item.updatedAt?.split('T')[0]} </Text>
                            </View>
                            <Text numberOfLines={1} style={{
                                fontWeight: props.unreadConversations.includes(item.id) ? "bold" : "normal",
                                color: props.unreadConversations.includes(item.id) ? "black" : "grey"
                            }}>
                                {item.messages.length > 0 ? item.messages[item.messages.length-1].content : ""}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )} 
            />
            
            <TouchableOpacity
                onPress={() => setIsModalVisible(!isModalVisible)}
                style={{
                backgroundColor: "black",
                borderWidth: 1,
                alignSelf: "flex-end",
                justifyContent: "center",
                height: 48,
                width: 48,
                borderRadius: 24,
                margin: 20,
                position: 'absolute',
                bottom: 12,
                right: 12
                }}
            >
                <Text
                    style={{
                    color: "white",
                    fontSize: 30,
                    alignSelf: "center"
                    }}
                >
                    +
                </Text>
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                // onSwipeComplete={handleCloseModal}
                // swipeDirection="left"
                onBackdropPress={handleCloseModal}
                style={{}}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={handleCloseModal}
                        style={{
                            position: "absolute",
                            right: 12,
                            top: 10,
                            backgroundColor: "black",
                            borderRadius: 8
                        }}
                    >
                        <Text
                            style={{
                            textAlign: "center",
                            lineHeight: 30,
                            color: "#fff",
                            textDecorationLine: "none",
                            width: 30,
                            height:30,
                            fontSize: 18
                            }}
                        >
                            X
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                        textAlign: "center",
                        lineHeight: 30,
                        // width: 30,
                        height:30,
                        fontSize: 24
                        }}
                        >
                            Start a conversation
                    </Text>
                    <FlatList
                        // keyExtractor={(user) => user.id}
                        data={props.usersList.filter(user => user.id != props.user.userId)}
                        renderItem={({ item }) => (
                            <View style={{ backgroundColor: `${selectedUserId === item.id ? "#eecba0" : "#f2f2f2"}`, marginBottom: 10}}>
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
        </SafeAreaView>
    )
} 
const styles = StyleSheet.create({
    modalContent: {
      height: "70%",
      borderRadius: 10,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      backgroundColor: 'white',
      position: "relative",
      paddingTop: 50,
      paddingHorizontal: 10
    },
    container: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
      },
      rightContainer: {
        flex: 1,
        justifyContent: "center",
      },
      image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
      },
      badgeContainer: {
        backgroundColor: "#3872E9",
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 45,
        top: 10,
      },
      badgeText: {
        color: "white",
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      name: {
        // backgroundColor: "green",
        marginLeft: -4,
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 3,
        width: 120
      },
      text: {
        color: "grey",
      },
      heading:{
          fontWeight: "bold",
          fontSize: 32,
          paddingHorizontal: 20,
          paddingVertical: 12
      }
  });

export default connectStateAndDispatch(ChatListScreen)