import React from "react";
import { View, Text } from 'react-native'
import Button from "../components/styled-components/Button";

interface IProps {
    navigation: any
}

const Home: React.FC<IProps> = props => {
    return(
    <View>
        <Text>Home Screen</Text>
        <Button text={'Go to about'} onPress={()=> {
            props.navigation.navigate('About')
        }}/>
    </View>
    )
}


export default Home