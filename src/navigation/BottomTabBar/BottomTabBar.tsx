import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
// import AlertHandler from "b3runtime/components/Alert/AlertHandler";
import { IconType } from "../../components/Icon/Icon.types";
import { IBottomTabStack } from "../Navigation.types";
// import { colors } from "b3runtime/styles/colors";
import React from "react";
import { SafeAreaView, View } from "react-native";
import styled from "styled-components/native";

import { useNavigation } from "@react-navigation/native";

import BottomTab from "./BottomTab";

const Wrapper = styled(SafeAreaView)`
  background-color: #ffffff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
`;

const Container = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BottomTabBar: React.FC<object & BottomTabBarProps> = (props) => {
  // const navigation = useNavigation()

  // navigation.setOptions({
  //   headerShown: false,
  //   // headerStyle: {
  //   //   backgroundColor: 'white',
  //   //   elevation: 0,
  //   //   shadowOpacity: 0,
  //   // }
  // })
  const tabs: {
    [key in keyof IBottomTabStack]: {
      label?: string;
      icon?: IconType;
    };
  } = {
    Dashboard: {
      label: "Start",
      icon: "home",
    },
    Chatt: {
      label: "Chatt",
      icon: "facebook-messenger"
    },
    // StartFreerun: {
    //   label: "Freerun",
    //   icon: "running",
    // },
    // FindGame: {
    //   label: "Competitions",
    //   icon: "trophy",
    // },
    Profile: {
      label: "Profile",
      icon: "user-alt",
    },
  };

  return (
    <Wrapper style={{ elevation: 10 }}>
      {/* <AlertHandler /> */}
      <Container>
        {props.state.routes.map((route, i) => {
          const isActive = props.state.index === i;

          const onTabPress = () => {
            const event = props.navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isActive && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            props.navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            tabs[route.name].icon &&
            tabs[route.name].label && (
              <BottomTab
                key={route.key}
                icon={tabs[route.name].icon}
                label={tabs[route.name].label}
                onPress={onTabPress}
                onLongPress={onLongPress}
                isActive={isActive}
              />
            )
          );
        })}
      </Container>
    </Wrapper>
  );
};
export default BottomTabBar;
