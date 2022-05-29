import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface IProps {
    placeholder: string;
    placeholderColor?: string;
    value: string;
    onChangeText: (text:string) => void;
    style: string;
    onSubmitEditing?: ()=> void;
    onKeyPress?: (e:any) => void;
}

const Input: React.FC <IProps> = ({placeholder, placeholderColor, value, onChangeText, onSubmitEditing, onKeyPress, style}) => {
 return (
    <TextInput
        style={styles[style]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor || 'grey'}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        multiline={true}
        numberOfLines={2}
        // secureTextEntry={true}
        // onKeyPress={(e) => onKeyPress(e)}
    />
 )
}

export default Input

const styles = StyleSheet.create({
    inputLight: {
        backgroundColor: 'white',
        width: '60%',
        padding: 6,
        borderRadius: 50,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        marginVertical: 20,
        marginHorizontal: 10,
      },
    inputDark: {
        backgroundColor: 'white',
        width: '60%',
        padding: 6,
        borderRadius: 50,
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        marginVertical: 20,
        marginHorizontal: 10
      },
    messageInput: {
        backgroundColor: 'white',
        width: '83%',
        paddingHorizontal: 16,
        borderRadius: 14,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        height: 30,
        maxHeight: 50,
        lineHeight: 18
    }
})