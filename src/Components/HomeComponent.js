import React,{useState,useReducer} from 'react';
import {Text, View,TextInput, TouchableOpacity, Button,Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomStyles} from './Styles';
import {processPostRequest,TextFieldRules} from '../functions/HomeFunction';
import {baseUrl} from './environment_variable';

export const LogoSection = () => (
    <View>
        <Text style={CustomStyles('login_nav_content')}>Estate Genie</Text>
    </View>
)

export const Login = ({navigation}) => {
    const [email,setEmailAddress] = useState('');
    const [password,setPassword] = useState('');
    const [processing,setProcessing] = useState(false);
    return(
        <KeyboardAwareScrollView style={CustomStyles('aware_scroll_view')}>
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
                                            onChangeText={(value)=>setEmailAddress(value)}

                                        />
                                    </View>
                                    <View style={CustomStyles('form_group')}>
                                        <Text style={CustomStyles('label_text')}>Password</Text>
                                        <TextInput 
                                            secureTextEntry={true}
                                            placeholder="Enter Password"
                                            style={CustomStyles('input_field')}
                                            onChangeText={(value)=>setPassword(value)}
                                        />
                                    </View>
                                    <TouchableOpacity style={CustomStyles('form_group')}
                                        onPress={()=>{
                                            let loginDetails = {
                                                password,
                                                email
                                            }
                                            let emailTest = TextFieldRules('email',email);
                                            if(emailTest === false){
                                                alert('Invalid email format');
                                                setProcessing(false);
                                                return false;
                                            }
                                            setProcessing(true);
                                            processPostRequest(`${baseUrl}/api/users/login`,loginDetails).then(response =>{
                                                console.log(response);
                                                setProcessing(false)
                                                if(('errors' in response)){
                                                    alert('Opps! Please all fields are required');
                                                    setProcessing(false);
                                                    return false;
                                                 }
                                                 if(('message' in response)){
                                                    alert(response.message);
                                                    setProcessing(false);
                                                    if(response.message.includes('Account has not been activated')){
                                                        navigation.navigate('EnterVerificationPin',{email})
                                                    }
                                                     return false;
                                                 }
                                            }).catch(error=>{
                                                setProcessing(false);
                                            });
                                        }}
                                        disabled={processing}
                                    >
                                            <View style={CustomStyles('submit_button')}>
                                    <Text style={CustomStyles('submit_button_text')}>{processing ? 'Please Wait...' : 'Login'}</Text>
                                            </View>
                                    </TouchableOpacity>
                            </View>
                            <View style={CustomStyles('section_container')}>
                                <Text
                                        style={CustomStyles('p_text')}
                                        onPress={()=>navigation.navigate('SignUp')}
                                    >Already have an account? <Text style={CustomStyles('green_text')}> SignUp Here</Text></Text>
                            </View>
                    </View>
        </KeyboardAwareScrollView>
    )
}

export const SignUp = ({navigation}) => {
    const [firstName,setFirstName] = useState('');
    const [emailAddress,setEmailAddress] = useState('');
    const [lastName,setLastName] = useState('');
    const [password,setPassword] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [processing,setProcessing] = useState(false);
    
    return(
        <KeyboardAwareScrollView style={CustomStyles('aware_scroll_view')}>
            <View style={CustomStyles('body_container')}>
                    <View style={CustomStyles('section_container')}>
                        <Text style={CustomStyles('header_text')}>Sign Up</Text>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <Text style={CustomStyles('p_text')}>We sent your login details to your Email.
                Enter your details below to create an account.</Text>
                    </View>
                    <View style={CustomStyles('section_container')}>
                            <View style={CustomStyles('form_group')}>
                                <Text style={CustomStyles('label_text')}>Email Address</Text>
                                <TextInput 
                                    placeholder="Enter Email Address"
                                    value={emailAddress}
                                    style={CustomStyles('input_field')}
                                    keyboardType='email-address'
                                    onChangeText={(value)=>setEmailAddress(value)}
                                />
                            </View>
                            <View style={CustomStyles('form_group')}>
                                <Text style={CustomStyles('label_text')}>First Name</Text>
                                <TextInput 
                                    onChangeText={(value)=> setFirstName(value)}
                                    placeholder="Enter First Name"
                                    style={CustomStyles('input_field')}
                                    
                                />
                            </View>
                            <View style={CustomStyles('form_group')}>
                                <Text style={CustomStyles('label_text')}>Last Name</Text>
                                <TextInput 
                                    onChangeText={(value)=> setLastName(value)}
                                    placeholder="Enter Last Name"
                                    style={CustomStyles('input_field')}
                                    
                                />
                            </View>
                            <View style={CustomStyles('form_group')}>
                                <Text style={CustomStyles('label_text')}>Password</Text>
                                <TextInput 
                                    onChangeText={(value)=> setPassword(value)}
                                    placeholder="Enter Password"
                                    secureTextEntry={true}
                                    style={CustomStyles('input_field')}
                                />
                            </View>
                            <View style={CustomStyles('form_group')}>
                                <Text style={CustomStyles('label_text')}>Phone Number</Text>
                                <TextInput 
                                    onChangeText={(value)=> setPhoneNumber(value)}
                                    placeholder="Enter Phone Number"
                                    keyboardType='numeric'
                                    style={CustomStyles('input_field')}
                                />
                            </View>
                            <TouchableOpacity style={CustomStyles('form_group')}
                                onPress={()=> {
                                    setProcessing(!processing)
                                    let email = TextFieldRules('email',emailAddress);
                                    if(email === false){
                                        alert('Invalid email format');
                                        setProcessing(false);
                                        return false;
                                    }
                                    let userInformation = {
                                        email,
                                        firstname:firstName,
                                        surname:lastName,
                                        password:password,
                                        phone:phoneNumber
                                    }
                                    processPostRequest(`${baseUrl}/api/users/resident_register`,userInformation).then(response => {
                                        console.log(response);
                                        if(('errors' in response)){
                                           let emailIsTaken =  (response.errors.email !== undefined) && ((response.errors.email.join(' ').includes('The email has already been taken'))) ? true : false;
                                           if(emailIsTaken){
                                                alert('Opps! Email address is taken');
                                           }else{
                                                alert('Opps! Please all fields are required');
                                           }
                                            setProcessing(false);
                                            return false;
                                        }
                                        if(('message' in response)){
                                            alert(response.message);
                                            setProcessing(false);
                                            return false;
                                        }
                                        if(response.code === 200){
                                            navigation.navigate('EnterVerificationPin',{email:response.user.email});
                                        }
                                    });
                                }}
                                disabled={processing}
                            >
                                    <View style={CustomStyles('submit_button')}>
    <Text style={CustomStyles('submit_button_text')}>{ processing ? 'Please Wait ...' : 'Sign Up'}</Text>
                                    </View>
                            </TouchableOpacity>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <Text
                                style={CustomStyles('p_text')}
                                onPress={()=>navigation.navigate('Login')}
                            >Already have an account? <Text style={CustomStyles('green_text')}> Login Here</Text></Text>
                    </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export const EnterVerificationPin = ({route,navigation}) => {
    const [verificationCode,setVerificationCode] = useState('');
    const [processing,setProcessing] = useState(false);
    console.log(route.params);
    return(
        <KeyboardAwareScrollView style={CustomStyles('aware_scroll_view')}>
        <View style={CustomStyles('body_container')}>
            <View style={CustomStyles('section_container')}>
                <Text style={CustomStyles('header_text')}>Enter Verification Pin</Text>
            </View>
            <View style={CustomStyles('section_container')}>
                <View style={CustomStyles('image_container')}>
                    <Image 
                        style={CustomStyles('image_file')}
                        source={require('../assets/images/illustration.png')}
                    />
                </View>
            </View>
            <View style={CustomStyles('section_container')}>
                <Text style={CustomStyles('p_text')}>
                Success! Your verification pin has been sent to your email address. Please enter pin here to verify your account.</Text>
            </View>
            <View style={CustomStyles('section_container')}>
                <View style={CustomStyles('form_group')}>
                        <Text style={CustomStyles('label_text')}>Enter Code:</Text>
                        <TextInput 
                            style={CustomStyles('floating_input_field')}
                            keyboardType='numeric'
                            maxLength={6}
                            onChangeText={(value)=>{setVerificationCode(value)}}
                        />
                </View>
                <TouchableOpacity 
                    style={CustomStyles('form_group')}
                    onPress={()=>{
                        setProcessing(true);
                        let verificationParams = {
                            activation_code : verificationCode,
                            email:route.params.email
                        }
                        console.log(verificationParams);
                        processPostRequest(`${baseUrl}/api/users/verify_customer_email`,verificationParams).then(response =>{
                            console.log(response);
                            if(('errors' in response)){
                                alert('Opps! Please enter verification code');
                                setProcessing(false);
                                return false;
                            }
                            if(('message' in response) && response.code !== 200){
                                alert(response.message);
                                setProcessing(false);
                                return false;
                            }
                            if(response.code === 200){
                                navigation.navigate('VerificationSuccessful');
                            }
                        }).catch(error=>{
                            setProcessing(false);
                            alert('Opps! Please retry');
                        })
                    }}
                    disabled={processing}
                >
                        <View style={CustomStyles('submit_button')}>
                <Text style={CustomStyles('submit_button_text')}>{processing ? 'Please Wait...' : 'Verify'}</Text>
                        </View>
                </TouchableOpacity>
            </View>
        </View>
    </KeyboardAwareScrollView>
    )   
    
};

export const VerificationSuccessful = ({navigation}) => (
    <View style={CustomStyles('body_container')}>
                    <View style={CustomStyles('section_container')}>
                        <Text style={CustomStyles('header_text')}>Verification Successful!</Text>
                    </View>
                    <View style={CustomStyles('section_container')}>
                            <View style={CustomStyles('image_container')}>
                                <Image 
                                    style={CustomStyles('image_file')}
                                    source={require('../assets/images/illustration.png')}
                                />
                            </View>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <Text style={CustomStyles('p_text')}>
                        You have successfully verified your account. Log in and continue the good work you already started.</Text>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <TouchableOpacity style={CustomStyles('form_group')}
                            onPress={()=>navigation.navigate('Login')}
                        >
                                <View style={CustomStyles('submit_button')}>
                                    <Text style={CustomStyles('submit_button_text')}>Go to Login</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
            </View>
)