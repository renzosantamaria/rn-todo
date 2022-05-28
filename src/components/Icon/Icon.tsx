
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { View } from "react-native";

import * as Style from "./Icon.styles";
import { IIcon } from "./Icon.types";


const Icon: React.FC<IIcon & TouchableOpacityProps> = ({
  icon,
  size,
  color,
  colorShade,
  colorVariant,
  ...props
}) => {

  return props.onPress ? (
    <View>
      <Style.StyledIcon
        name={icon}
        size={size}
        color={color}
        colorShade={colorShade}
        colorVariant={colorVariant}
      />
    </View>
  ) : (
    <View>
      <Style.StyledIcon
        name={icon}
        size={size}
        color={color}
        colorShade={colorShade}
        colorVariant={colorVariant}
      />
    </View>
  );
};
export default Icon;
