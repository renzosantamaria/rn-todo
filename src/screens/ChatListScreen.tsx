import React, {useState, useEffect} from "react"
import { FlatList, Text, View, TouchableOpacity } from "react-native"
import IconButton from "../components/styled-components/IconButton"
import * as API from "../API";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthorizedNavigationStack } from "../navigation/Navigation.types";

interface IProps {
    showRegister: () => void;
    navigation: StackNavigationProp<AuthorizedNavigationStack, "Home">;
  }
  
const ChatListScreen: React.FC<IProps> = (props) => {
    const [chatConversations, setChatConversations] = useState([])

    const fetchChats = async() => {
        let data = await API.fetchUserConversations()
        !data && console.log('que onda wey')
        console.log('fetch chats: '+data[0]);
        setChatConversations(data)
    }

    // useEffect(() => {
    //     const fetchConversations = async () => {
    //         const data = await API.fetchUserConversations()
    //         console.log(data);
            
    //         setChatConversations(data) 
    //     }
    //     fetchConversations()
    //     .catch(console.error)
    // }, [])

    const handleNavigation = (chat) => {
        props.navigation.navigate('Chat', {chat})
    }

    return(
        <>
            <Text> Chatt screen </Text>
            <IconButton
                color={"#f28080"}
                name={"delete"}
                onPress={() => fetchChats()}
            />
            <Text> {chatConversations.length} </Text>
            <Text> {chatConversations.length && chatConversations[1].messages[0].content} </Text>
            
            {/* <FlatList
                // keyExtractor={(todo) => todo.userId}
                data={chatConversations[1].messages}
                renderItem={({ item }) => (
                    <View
                    style={{
                        
                        backgroundColor: `${true ? "#222" : "#222"}`,
                    }}
                    >
                    <Text
                        style={{
                        color: true ? "#8f8f8f" : "#fff",
                        textDecorationLine: false ? "line-through" : "none",
                        }}
                    >
                        {item.content}
                    </Text>
                    
                    </View>
                )} 
            /> */}
            <FlatList
                // keyExtractor={(todo) => todo.userId}
                data={chatConversations}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: `${true ? "#222" : "#222"}`}}>
                        <TouchableOpacity onPress={() => handleNavigation(item)}>
                            <Text
                                style={{
                                color: true ? "#8f8f8f" : "#fff",
                                textDecorationLine: false ? "line-through" : "none",
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )} 
            />
        </>
    )
} 
export default ChatListScreen