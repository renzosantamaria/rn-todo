import { SafeAreaView } from "react-native-safe-area-context";
import {createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator, createTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import TodosScreen from "../screens/Todos";
import LoginScreen from "../screens/Login";
import FirstStack from "../screens/FirstStack";
import SecondStack from "../screens/SecondStack";

// import {UnauthorizedNavigationStack, AuthorizedNavigationStack} from "./Navigation.types";

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

// export const navigationRef = React.createRef<NavigationContainerRef>()
const Navigation: React.FC<IAppNavigation> = (props) => (
  // props.isAuthStateKnown ? (
    <NavigationContainer >
      <Host>
        {!props.isAuthenticated ? <LoginScreen /> : <TodosScreen />} 
      </Host>
    </NavigationContainer>
  // ) : (
  //   <Splash />
  // )
)


export type UnauthorizedNavigationStack = {
  Landing: undefined;
  Login: undefined;
  // ResetPassword: undefined;
  // Signup: undefined;
  // ImageUpload: IImageUploadStack;
};

const UnauthorizedStack = createStackNavigator<UnauthorizedNavigationStack>();
// const Unauthorized = () => (
//   <UnauthorizedStack.Navigator>
//     <UnauthorizedStack.Screen name="Landing" component={LandingScreen} />
//     <UnauthorizedStack.Screen name="Login" component={LoginScreen} />
//     <UnauthorizedStack.Screen
//       name="ResetPassword"
//       component={ResetPasswordScreen}
//     />
//     <UnauthorizedStack.Screen name="Signup" component={SignupScreen} />
//     <UnauthorizedStack.Screen
//       name="ImageUpload"
//       component={ImageUploadScreen}
//     />
//   </UnauthorizedStack.Navigator>
// );


// const StacksNavigator = createStackNavigator(
//   {
//     First: LoginScreen,
//     Second: SecondStack,
//   },
//   {
//     defaultNavigationOptions: {
//       headerTitle: "Login",
//       headerStyle: {
//         backgroundColor: Colors.$4dp,
//       },
//       headerTintColor: 'white'
//     },
//   }
// );

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
    Login: {
      screen: FirstStack, //change this to a Stack navigator
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="key" size={25} color={tabInfo.tintColor} />;
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

const TAB = () => {
  return createAppContainer(TodosTabNavigator)
}

// export default createAppContainer(TodosTabNavigator);
export default Navigation;
