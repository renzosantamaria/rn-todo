import React, {useState, useEffect} from "react"
import { FlatList, Text, View, TouchableOpacity } from "react-native"
import IconButton from "../components/styled-components/IconButton"
import * as API from "../API";
import Screen from "../components/Screen/Screen";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthorizedNavigationStack, UnauthorizedNavigationStack, IBottomTabStack } from "../navigation/Navigation.types";
import Input from "../components/Input";
import { RouteProp } from "@react-navigation/native";

interface IProps {
    showRegister: () => void;
    route: RouteProp<IBottomTabStack, "ChatList">;
    navigation: StackNavigationProp<AuthorizedNavigationStack, "Home">;
  }
  
const ChattScreen: React.FC<IProps> = (props) => {
    const { chat } = props.route.params;
    console.log(props.route.params)
    return(
        <Screen
        bgcolor="black"
        header={{
            hide: false,
            color: "#fff",
            backButtonText:"Back"
        }}
        transparentBackground={true}
        
        // showLoadingIndicator={props.isLoginGoogleLoading}
        // loadingText="Logging in..."
        ignorepadding={true}
        >
        <View >
            <Text >Chatt name: {chat.name} </Text>
                <FlatList
                // keyExtractor={(todo) => todo.userId}
                data={chat.messages}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: `${true ? "#222" : "#222"}`}}>
                        <TouchableOpacity onPress={() => console.log(item)}>
                            <Text
                                style={{
                                color: true ? "#8f8f8f" : "#fff",
                                textDecorationLine: false ? "line-through" : "none",
                                }}
                            >
                                {item.content}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )} 
            />
        </View>
    </Screen>
    )
} 
export default ChattScreen