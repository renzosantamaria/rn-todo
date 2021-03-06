
  import { spacing, SpacingSize } from "../../styles/spacing";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import styled from "styled-components/native";
  
  export const OuterWrapper = styled.View`
    flex: 1;
    width: 100%;
    /* padding: 0 */
  `;
  
  const WrapperStyle = ({
    padding,
    ignorepadding,
    bgcolor,
    transparentBackground,
  }: {
    padding?: SpacingSize;
    ignorepadding?: boolean;
    bgcolor?: string;
    transparentBackground?: boolean;
  }) => `
    flex: 1;
    ${
      !ignorepadding ? `padding: ${padding ? spacing[padding] : spacing.sm}` : ""
    };
    ${
      !transparentBackground
        ? `
        background-color: ${
          bgcolor ? 'white': 'grey'
        };
        `
        : ""
    }
  `;
  
  export const ScrollWrapper = styled.ScrollView<{
    padding?: SpacingSize;
    ignorepadding?: boolean;
    bgcolor?: string;
    transparentBackground?: boolean;
  }>`
    ${(props) => WrapperStyle(props)}
  `;
  
  export const NonScrollWrapper = styled.SafeAreaView<{
    padding?: SpacingSize;
    ignorepadding?: boolean;
    bgcolor?: string;
    transparentBackground?: boolean;
  }>`
    ${(props) => WrapperStyle(props)}
  `;
  
  export const Content = styled.View<{ fullwidth?: boolean }>`
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    ${(props) =>
      !props.fullwidth
        ? `
      max-width: 512px;
      margin: 0 auto;
    `
        : ""}
  `;
  
  export const KeyboardAwareWrapper = styled(KeyboardAwareScrollView)`
    min-height: 100%;
  `;
  
  export const LoadingContainer = styled.View`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${spacing.md};
    z-index: 99;
  `;
  