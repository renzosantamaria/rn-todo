import {createStackNavigator} from "@react-navigation/stack";
// import { BottomTabBar } from "react-navigation-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import BottomTabBar from "./BottomTabBar/BottomTabBar";

import TodosScreen from "../screens/StartScreen";
import LandingScreen from "../screens/LandingScreen";
import RegisterScren from "../screens/Register"
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/Profile";
import ChattScreen from "../screens/ChattScreen"

import {UnauthorizedNavigationStack, AuthorizedNavigationStack, IBottomTabStack} from "./Navigation.types";

import {
  NavigationContainer,
  NavigationContainerRef,
  NavigationState,
} from "@react-navigation/native";
import React from "react";
import { Host } from "react-native-portalize"

import * as Colors from '../constants/colors'

interface IAppNavigation {
  isAuthenticated: boolean;
  // isAuthStateKnown: boolean;
  onNavigation?: (state?: NavigationState) => void;
}

export const navigationRef = React.createRef<NavigationContainerRef<any>> ()
const Navigation: React.FC<IAppNavigation> = (props) => (
  // props.isAuthStateKnown ? (
    <NavigationContainer ref={navigationRef} onStateChange={props.onNavigation}>
      <Host>
        {!props.isAuthenticated ? <Unauthorized /> : <Authorized />} 
      </Host>
    </NavigationContainer>
  // ) : (
  //   <Splash />
  // )
)

const UnauthorizedStack = createStackNavigator<UnauthorizedNavigationStack>();
const Unauthorized = () => (
  <UnauthorizedStack.Navigator>
    <UnauthorizedStack.Screen name="Landing" component={LandingScreen} />
    <UnauthorizedStack.Screen name="Login" component={LoginScreen} />
    <UnauthorizedStack.Screen name="Register" component={RegisterScren} />
  </UnauthorizedStack.Navigator>
);

const AuthorizedStack = createStackNavigator<AuthorizedNavigationStack>()
const Authorized = () => (
  <AuthorizedStack.Navigator screenOptions={{ headerShown: false }}>
  <AuthorizedStack.Screen name="Home" component={BottomTabs} />
</AuthorizedStack.Navigator>
)

const BottomTabStack = createBottomTabNavigator<IBottomTabStack>();
const renderBottomTabBar = (props) => <BottomTabBar {...props} />;
const BottomTabs = () => (
  <BottomTabStack.Navigator tabBar={renderBottomTabBar} >
    <BottomTabStack.Screen name="Dashboard" component={TodosScreen} />
    <BottomTabStack.Screen name="Chatt" component={ChattScreen} />
    <BottomTabStack.Screen name="Profile" component={ProfileScreen} />
  </BottomTabStack.Navigator>
)


// export default createAppContainer(TodosTabNavigator);
export default Navigation;
