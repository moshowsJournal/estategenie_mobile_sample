import React from 'react';
import {Text, View,TextInput, TouchableOpacity, Button} from 'react-native';
import {CustomStyles} from './Styles';

export const Home = () => {
    return(
        <View>
            <View style={CustomStyles('nav_container')}>
                <Text style={CustomStyles('login_nav_content')}>Estate Genie</Text>
            </View>
            <View style={CustomStyles('body_container')}>
                    <View style={CustomStyles('section_container')}>
                        <Text style={CustomStyles('header_text')}>Welcome</Text>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <Text style={CustomStyles('p_text')}>We sent your login details to your Email.
                Enter the details below to access your account.</Text>
                    </View>
                    <View style={CustomStyles('section_container')}>
                            <View style={CustomStyles('form_group')}>
                                <Text style={CustomStyles('label_text')}>Email Address</Text>
                                <TextInput 
                                    placeholder="Enter Email Address"
                                    style={CustomStyles('input_field')}
                                />
                            </View>
                            <View style={CustomStyles('form_group')}>
                                <Text style={CustomStyles('label_text')}>Password</Text>
                                <TextInput 
                                    placeholder="Enter Password"
                                    style={CustomStyles('input_field')}
                                />
                            </View>
                            <TouchableOpacity style={CustomStyles('form_group')}>
                                    <View style={CustomStyles('submit_button')}>
                                        <Text style={CustomStyles('submit_button_text')}>Login</Text>
                                    </View>
                            </TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}