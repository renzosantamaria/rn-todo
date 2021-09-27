import React from "react";
import { SafeAreaView, Text } from 'react-native'
import Button from "../components/styled-components/Button";

interface IProps {
    navigation: any
}

const Stats: React.FC<IProps> = props => {
    return(
    <SafeAreaView>
        <Text>Stats Screen</Text>
    </SafeAreaView>
    )
}

export default Stats