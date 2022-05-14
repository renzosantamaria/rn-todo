import { NavigatorScreenParams } from "@react-navigation/native";


export type UnauthorizedNavigationStack = {
    Landing: undefined;
    Login: undefined;
    Register: undefined;
  };
  
  export type AuthorizedNavigationStack = {
    Home: NavigatorScreenParams<IBottomTabStack>;
    Password: undefined;
  };

  export type IBottomTabStack = {
    Dashboard: NavigatorScreenParams<IDashboardStack>;
    Chatt: NavigatorScreenParams<IChattStack>
    Profile: NavigatorScreenParams<IProfileStack>;
  };

  export type IDashboardStack = {
    Dashboard: undefined;
  };

  export type IProfileStack = {
    Profile: undefined;
  }

  export type IChattStack = {
    Chatt: undefined
  }