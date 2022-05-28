import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

export const StyledIcon = styled(FontAwesome5)`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size+ 'px'}
    `
