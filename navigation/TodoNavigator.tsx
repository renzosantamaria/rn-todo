import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home";
import StatsScreen from "../screens/Stats";
import TodosScreen from "../screens/Todos";

import * as Colors from '../constans/colors'

const TodosNavigator = createStackNavigator(
  {
    Home: TodosScreen,
    Start: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Paco's todo",
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
      screen: TodosNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="book" size={25} color={"#777"} />;
        },
      },
    },
    Stats: {
      screen: StatsScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="cube" size={25} color={"#777"} />;
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#d02525",
    },
  }
);

export default createAppContainer(TodosTabNavigator);
