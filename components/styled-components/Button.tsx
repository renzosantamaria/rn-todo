import React from 'react'
import styled from "styled-components/native"
import { Text } from "react-native"

interface styledButton{
    onPress: () => void;
    onSubmitEditing?: () => void;
    bgColor?: string
}

const StyledButton = styled.TouchableOpacity<styledButton>`
    background-color: ${props => props.bgColor || 'white'} ;
    border: solid 1px black;
    padding: 8px;
    border-radius: 8px;
`
interface Button {
    text: string;
    bgColor?: string;
    color?: string;
    onPress: () => void;
    onSubmitEditing?: () => void;
}

const Button: React.FC <Button> = ({text, bgColor, color, onPress, onSubmitEditing}) => {
    return (
        <StyledButton bgColor={bgColor} onSubmitEditing={onSubmitEditing} onPress={onPress}>
            <Text style={{color: color}}> {text} </Text>
        </StyledButton>
    )
}

export default Button