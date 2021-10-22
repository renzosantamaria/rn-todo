import { NavigatorScreenParams } from "@react-navigation/native";


export type UnauthorizedNavigationStack = {
    Landing: undefined;
    Login: undefined;
    // ResetPassword: undefined;
    // Signup: undefined;
    // ImageUpload: IImageUploadStack;
  };
  
  export type AuthorizedNavigationStack = {
    Home: NavigatorScreenParams<IBottomTabStack>;
    // Competition: NavigatorScreenParams<ICompetitionStack>;
    // Freerun: NavigatorScreenParams<IFreerunStack>;
  };

  export type IBottomTabStack = {
    Dashboard: NavigatorScreenParams<IDashboardStack>;
    // StartFreerun: NavigatorScreenParams<IStartFreerunStack>;
    // FindGame: NavigatorScreenParams<IFindGameStack>;
    // Profile: NavigatorScreenParams<IProfileStack>;
  };

  export type IDashboardStack = {
    Dashboard: undefined;
  };