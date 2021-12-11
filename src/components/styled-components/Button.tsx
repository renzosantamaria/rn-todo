import React from 'react'
import styled from "styled-components/native"
import { Text } from "react-native"

interface styledButton{
    onPress: () => void;
    onSubmitEditing?: () => void;
    bgColor?: string
    width?: string
}

const StyledButton = styled.TouchableOpacity<styledButton>`
    background-color: ${props => props.bgColor || 'white'} ;
    width: ${props => props.width || '100%'} ;
    /* border: solid 1px black; */
    padding: 8px;
    border-radius: 8px;
    margin: 10px 0;
    box-shadow: 4px 4px 3px #000000;

    // Works only on IOS
    /* shadow-color: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26, */

    // Works only on Android
    /* elevation: 5; */
`
interface Button {
    text: string;
    bgColor?: string;
    color?: string;
    width?: string;
    onPress: () => void;
    onSubmitEditing?: () => void;
}

const Button: React.FC <Button> = ({text, bgColor, color, width, onPress, onSubmitEditing}) => {
    return (
        <StyledButton width={width} bgColor={bgColor} onSubmitEditing={onSubmitEditing} onPress={onPress}>
            <Text style={{color: color, textAlign: 'center'}}> {text} </Text>
        </StyledButton>
    )
}

export default Button