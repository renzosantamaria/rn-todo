// import { WithMarginProps } from "b3runtime/styles/spacing";
// import { fontSize } from "b3runtime/styles/typography";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { View } from "react-native";

import * as Style from "./Icon.styles";
import { IIcon } from "./Icon.types";

const Icon: React.FC<IIcon  & TouchableOpacityProps> = ({
  icon,
//   size = "md",
//   color,
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
        size={18}
        color={"#020202"}
        colorShade={colorShade}
        colorVariant={colorVariant}
      />
    </View>
  ) : (
    <View>
      <Style.StyledIcon
        name={icon}
        size={18}
        color={"#020202"}
        colorShade={colorShade}
        colorVariant={colorVariant}
      />
    </View>
  );
};
export default Icon;
