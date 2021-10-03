import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import Button from "../styled-components/Button";
import Input from "../Input";
import { userActions } from "../../store/user-slice";
import * as Colors from '../../constants/colors'
import * as API from '../../API'

interface IProps {
    showRegister: () => void
}

const LoginForm: React.FC<IProps> = (props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useDispatch()


    const handleLogin =  async () => {
        const response = await API.login(email, password)
        console.log(response);
        
        const user = response.user
        const token = response.token
    
        dispatch(userActions.setUser({
            name: user.surname,
            lastName: user.lastname,
            email: user.email,
            token: token
        }))
        
        // console.log( 'logged in successfully!' );
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

export default LoginForm