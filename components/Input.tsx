import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface IProps {
    placeholder: string;
    value: string;
    onChangeText: (text:string) => void;
    style: string;
    onSubmitEditing?: ()=> void;
    onKeyPress: (e:any) => void;
}

const Input: React.FC <IProps> = ({placeholder, value, onChangeText, onSubmitEditing, onKeyPress, style}) => {
 return (
    <TextInput
        style={styles[style]}
        value={value}
        placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        onKeyPress={(e) => onKeyPress(e)}
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
        marginHorizontal: 10
      },
    inputDark: {
        backgroundColor: 'white',
        width: '60%',
        padding: 6,
        borderRadius: 50,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        marginVertical: 20,
        marginHorizontal: 10
      },
})