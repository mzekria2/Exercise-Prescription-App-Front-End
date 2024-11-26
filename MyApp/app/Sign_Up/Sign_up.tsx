import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import {signUpScreenStyles} from "./Sign_up.styles"

const SignUp = () => {

    return(
        <View style={signUpScreenStyles.signUpContainer}>
        <Text style={signUpScreenStyles.signUpTitle}>Create Your Account</Text>

        <TextInput style={signUpScreenStyles.signUpInput} placeholder='Enter your Email Address'/>
        <TextInput style={signUpScreenStyles.signUpInput} placeholder='Enter your Email Address'/>
        <TextInput style={signUpScreenStyles.signUpInput} placeholder='Confirm your Password' secureTextEntry/>
        <TextInput style={signUpScreenStyles.signUpInput} placeholder='Confirm Email Address'/>
        <TextInput style={signUpScreenStyles.signUpInput} placeholder='Create a Password' secureTextEntry/>

    <TouchableOpacity  style={signUpScreenStyles.signUpButton}>
        <Button title = 'Create Account' />
    </TouchableOpacity>
    </View>
    );
};

export default SignUp; 