import React from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IIcon{
    onPress? : () => void;
}

interface IAll{
    onPress? : () => void;
    name: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
}

const IconButton = styled.TouchableOpacity<IIcon>`
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;

// React.ComponentProps<typeof MaterialCommunityIcons>['name']

const Icon: React.FC<IAll> = ({onPress, name, color}) => {
  return (
    <IconButton onPress={ onPress }>
      <MaterialCommunityIcons
        name={name}
        size={20}
        color={color}
      />
    </IconButton>
  );
};

export default Icon;
