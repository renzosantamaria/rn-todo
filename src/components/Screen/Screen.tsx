import { useNavigation } from "@react-navigation/native";
import { IconType } from "../Icon/Icon.types";
import HeaderNavigationItem from "../../navigation/HeaderNavigationItem/HeaderNavigationItem";
import { SpacingSize } from "../../styles/spacing";
import React, { useEffect } from "react";
import reactFastCompare from "react-fast-compare";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text
} from "react-native";

import * as Style from "./Screen.style";

interface Props {
  bgcolor?: string;
  fullwidth?: boolean;
  ignorepadding?: boolean;
  noScroll?: boolean;
  isRefreshing?: boolean;
  keyboardaware?: boolean;
  onRefresh?: () => void;
  padding?: SpacingSize;
  showLoadingIndicator?: boolean;
  loadingText?: string;
  loadingUnmountsContent?: boolean;
  transparentBackground?: boolean;
  header?: {
    hide?: boolean;
    color?: string;
    title?: string;
    backButtonText?: string;
    leftAction?: {
      label?: string;
      icon?: IconType;
      onClick: () => void;
      disabled?: boolean;
    };
    rightAction?: {
      label?: string;
      icon?: IconType;
      onClick: () => void;
      disabled?: boolean;
    };
  };
}

export const scrollViewRef = React.createRef<ScrollView>();

const Screen: React.FC<Props> = React.memo(
  ({ fullwidth, keyboardaware, ...props }) => {
    const navigation = useNavigation();

    const setHeaderStyle = () => {
      // Set status bar color based on the header color
      const headerBgColor: string =
        (props.header && props.header.color) || "pink";

    //   if (tinycolor(colors[headerBgColor].background).isLight()) {
    //     StatusBar.setBarStyle("dark-content");
    //   } else {
    //     StatusBar.setBarStyle("light-content");
    //   }

      navigation.setOptions({
        headerShown: !props.header?.hide,
        headerStyle: {
          backgroundColor: props.bgcolor,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleAlign: "center",
        headerTintColor: props.header?.color,
        headerTitle: props.header?.title || "",
        headerBackTitle: props.header?.backButtonText,
        headerLeft: props.header?.leftAction
          ? () => (
              <HeaderNavigationItem
                label={props.header?.leftAction?.label}
                onPress={
                  !props.header?.leftAction?.disabled
                    ? props.header?.leftAction?.onClick
                    : undefined
                }
                iconLeft={props.header?.leftAction?.icon}
                color={headerBgColor}
                colorVariant="text"
                disabled={props.header?.leftAction?.disabled}
              />
            )
          : undefined,
        headerRight: props.header?.rightAction
          ? () => (
              <HeaderNavigationItem
                label={props.header?.rightAction?.label}
                onPress={
                  !props.header?.rightAction?.disabled
                    ? props.header?.rightAction?.onClick
                    : undefined
                }
                iconLeft={props.header?.rightAction?.icon}
                color={headerBgColor}
                colorVariant="text"
                disabled={props.header?.rightAction?.disabled}
              />
            )
          : undefined,
      });
    };

    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        setHeaderStyle();
      });
      return unsubscribe;
    }, [navigation]);

    useEffect(() => {
      setHeaderStyle();
    }, [props.header]);

    const shouldUnmountContent =
      props.showLoadingIndicator && props.loadingUnmountsContent;

    const refreshControl = props.onRefresh ? (
      <RefreshControl
        onRefresh={props.onRefresh}
        refreshing={!!props.isRefreshing && props.isRefreshing}
      />
    ) : undefined;

    const ScreenContent = (
      <Style.OuterWrapper>
        {props.showLoadingIndicator && (
          <Style.LoadingContainer>
            <ActivityIndicator color={props.header?.color} size="large" />
            {props.loadingText && (
              <Text >
                {props.loadingText}
              </Text>
            )}
          </Style.LoadingContainer>
        )}

        {!props.noScroll && !shouldUnmountContent && (
          <Style.ScrollWrapper
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={refreshControl}
            keyboardShouldPersistTaps={"handled"}
            {...props}
          >
            <Style.Content fullwidth={fullwidth}>
              {props.children}
            </Style.Content>
          </Style.ScrollWrapper>
        )}

        {props.noScroll && !shouldUnmountContent && (
          <Style.NonScrollWrapper
            {...props}
            style={{
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
          >
            {props.children}
          </Style.NonScrollWrapper>
        )}
      </Style.OuterWrapper>
    );

    if (keyboardaware) {
      return (
        <Style.KeyboardAwareWrapper
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS === "ios"}
        >
          {ScreenContent}
        </Style.KeyboardAwareWrapper>
      );
    }

    return ScreenContent;
  },
  reactFastCompare
);
export default Screen;
