import { NavigatorScreenParams } from "@react-navigation/native";


export type UnauthorizedNavigationStack = {
    Landing: undefined;
    Login: undefined;
    Register: undefined;
  };
  
  export type AuthorizedNavigationStack = {
    Home: NavigatorScreenParams<IBottomTabStack>;
    // Competition: NavigatorScreenParams<ICompetitionStack>;
    // Freerun: NavigatorScreenParams<IFreerunStack>;
  };

  export type IBottomTabStack = {
    Dashboard: NavigatorScreenParams<IDashboardStack>;
    Profile: NavigatorScreenParams<IProfileStack>;
    // StartFreerun: NavigatorScreenParams<IStartFreerunStack>;
    // FindGame: NavigatorScreenParams<IFindGameStack>;
    // Profile: NavigatorScreenParams<IProfileStack>;
  };

  export type IDashboardStack = {
    Dashboard: undefined;
  };

  export type IProfileStack = {
    Profile: undefined;
  }