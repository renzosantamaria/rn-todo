import React, {useState} from "react";
import { connect, ConnectedProps } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import Button from "../styled-components/Button";
import Input from "../Input";
import * as Colors from '../../constants/colors'
import { IReduxState } from "../../store/store.types";
import authStateSelector from "../../store/auth/auth.selectors";
import authMethods from "../../store/auth/auth.methods"

const connectStateAndDispatch = connect(
    (state: IReduxState) => ({
        isAuth: authStateSelector.authStateSelector(state)
    }),
    {
        loginUser: authMethods.login
    }
)

interface IProps {
    showRegister: () => void
}

const LoginForm: React.FC< ConnectedProps<typeof connectStateAndDispatch> & IProps> = (props) => {
    const [email, setEmail] = useState<string>("renzo.santamaria@outlook.com");
    const [password, setPassword] = useState<string>("password");

    const handleLogin =  async () => {
        props.loginUser({email, password})
      }

    const navigateToRegister = () => {
    //props.navigation.navigate("Register")
    }

    return(
        <View style={styles.loginForm} >
            <Text style={styles.heading}>Login </Text>
            <Input
                style={"inputLight"}
                placeholder={"Email"}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Input
                style={"inputLight"}
                placeholder={"Password"}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Button
                width={'60%'}
                bgColor={Colors.accentColor}
                color={'#fff'}
                onPress={ handleLogin }
                text={"LOGIN"}
            />
            <Text onPress={props.showRegister} style={styles.registerText}>Register</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    loginForm:{
        flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        color: "white",
        fontSize: 30,
    },
    loginButton: {
        width: '60%'
    },
    registerText: {
        color: '#fff',
        textAlign: 'right',
        width: '60%',
    }
})

export default connectStateAndDispatch(LoginForm)