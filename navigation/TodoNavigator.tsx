import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import TodosScreen from "../screens/Todos";
import LoginScreen from "../screens/Login";
import FirstStack from "../screens/FirstStack";
import SecondStack from "../screens/SecondStack";

import * as Colors from '../constants/colors'


const StacksNavigator = createStackNavigator(
  {
    First: LoginScreen,
    Second: SecondStack,
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Login",
      headerStyle: {
        backgroundColor: Colors.$4dp,
      },
      headerTintColor: 'white'
    },
  }
);

const TodosTabNavigator = createBottomTabNavigator(
  {
    Todos: {
      screen: TodosScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="book" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
    Stats: {
      screen: StacksNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="cube" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.accentColor,
      style:{
        height: 70,
        backgroundColor: 'black',
      },
      tabStyle:{
        backgroundColor: Colors.background,
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
        paddingVertical: 9
      },
      labelStyle:{
        fontSize: 16
      }
    },
  }
  
);

export default createAppContainer(TodosTabNavigator);
