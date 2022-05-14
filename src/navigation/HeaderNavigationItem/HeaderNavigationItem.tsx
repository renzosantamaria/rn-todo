import Icon from "../../components/Icon/Icon";
import { IconType } from "../../components/Icon/Icon.types";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import styled from "styled-components/native";

interface Props {
  label?: string;
  iconLeft?: IconType;
  iconRight?: IconType;
  color?: string;
  colorVariant?: "background" | "text";
  disabled?: boolean;
}

const Container = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props) => (props.disabled ? "opacity: 0.5;" : "")}
`;

const HeaderNavigationItem: React.FC<Props & TouchableOpacityProps> = (
  props
) => (
  <Container
    accessibilityRole="button"
    accessibilityLabel={props.label}
    {...props}
  >
    {props.iconLeft && (
      <Icon
        icon={props.iconLeft}
        // size={20}
        // marginleft="xs"
        // marginright="xs"
        color={props.color}
        colorVariant={props.colorVariant || "background"}
        {...props}
      />
    )}

    {props.label && (
      <Text
        style={{color: props.color}}
        // type="body"
        // color={props.color}
        // colorVariant={props.colorVariant || "background"}
        // {...props}
      >
        {props.label}
      </Text>
    )}

    {props.iconRight && (
      <Icon
        icon={props.iconRight}
        // size="sm"
        // marginright="xs"
        // marginleft="xs"
        color={props.color}
        {...props}
      />
    )}
  </Container>
);
export default HeaderNavigationItem;
