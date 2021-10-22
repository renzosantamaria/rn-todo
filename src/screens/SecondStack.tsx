import React from "react";
import { StyleSheet, Text, View } from 'react-native'
import Button from "../components/styled-components/Button";
import {SafeAreaView} from '../components/styled-components/wrapper'

interface IProps {
    navigation: any
}

const FirstStack: React.FC<IProps> = props => {
    return(
    <SafeAreaView flexNumber='1'>
        <Text>Coming soon..</Text>
        <View>
            <Button text={'Go to First Stack'} onPress={()=> {
                props.navigation.navigate('First')
            }}/>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default FirstStack