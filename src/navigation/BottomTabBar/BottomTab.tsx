// import ContentText from "b3runtime/components/ContentText/ContentText";
import { IconType } from "../../components/Icon/Icon.types";
import Icon from "../../components/Icon/Icon";
// import { spacing } from "b3runtime/styles/spacing";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import styled from "styled-components/native";

interface Props {
  label: string;
  icon?: IconType;
  isActive?: boolean;
}

const Container = styled(TouchableOpacity)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const BottomTab: React.FC<Props & TouchableOpacityProps> = (props) => (
  <Container
    accessibilityRole="button"
    accessibilityState={props.isActive ? { selected: true } : {}}
    accessibilityLabel={props.label}
    {...props}
  >
    {props.icon && (
      <Icon
        icon={props.icon}
        // size="xxs"
        // marginbottom="xxxs"
        // color={props.isActive ? "primary" : "disabled"}
      />
    )}

    {/* <ContentText
      type="fineprint"
      color={props.isActive ? "primary" : "disabled"}
    > */}
    <Text>
      {props.label}
    </Text>
    {/* </ContentText> */}
  </Container>
);
export default BottomTab;
