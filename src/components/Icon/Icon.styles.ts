import { FontAwesome5 } from "@expo/vector-icons";
// import { colors } from "b3runtime/styles/colors";
import { generateMarginProps } from "../../styles/spacing";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { IIcon } from "./Icon.types";

// export const Container = styled<IIcon>(View)`
//   ${(props) => generateMarginProps(props)}
// `;

// export const ClickableContainer = styled<IIcon>(TouchableOpacity)`
//   ${(props) => generateMarginProps(props)}
// `;

export const StyledIcon = styled(FontAwesome5)`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size+ 'px'}
    `
