import { WithMarginProps } from "../../styles/spacing";
// import { fontSize } from "b3runtime/styles/typography";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { View } from "react-native";

import * as Style from "./Icon.styles";
import { IIcon } from "./Icon.types";

// interface IProps {
//     size: number;
//     color: string;
// }

const Icon: React.FC<IIcon & TouchableOpacityProps> = ({
  icon,
  size,
  color,
  colorShade,
  colorVariant,
  ...props
}) => {
//   const getIconSize = (): number => {
//     return parseInt(fontSize[size], 10) + 8;
//   };

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
