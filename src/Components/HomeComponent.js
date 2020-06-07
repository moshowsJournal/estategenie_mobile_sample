import React,{useState,useEffect} from 'react';
import {Text, View,TextInput, Button,Image, TouchableOpacityComponent} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomStyles} from './Styles';
import {processPostRequest,TextFieldRules,ProcessLoginRequest} from '../functions/HomeFunction';
import {baseUrl} from './environment_variable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomTabNavigation} from './EstateComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer,NavigationActions } from '@react-navigation/native';
import {FindYourEstate,UseEstateCodeNavItem,FindByEstateCode} from './EstateComponent';
import AsyncStorage from '@react-native-community/async-storage';

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
                                            ProcessLoginRequest(`${baseUrl}/api/users/login`,loginDetails).then(response =>{
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
                                                navigation.navigate('Overview',{firstname:response.user.firstname});
                                            }).catch(error=>{
                                                console.log(error);
                                                setProcessing(false);
                                            });
                                        }}
                                        disabled={processing}
                                    >
                                            <View style={CustomStyles('submit_button')}>
                                    <Text style={CustomStyles('submit_button_text')}>{processing ? 'Please Wait...' : 'Login'}</Text>
                                            </View>
                                    </TouchableOpacity>
                                    <Text
                                        style={CustomStyles('p_text')}
                                        onPress={()=>navigation.navigate('ForgotPassword')}
                                    >Forgot Password ?</Text>
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


export const PasswordReset = ({navigation}) => {
    const [email,setEmailAddress] = useState('');
    const [password,setPassword] = useState('');
    const [processing,setProcessing] = useState(false);
    return(
        <KeyboardAwareScrollView style={CustomStyles('aware_scroll_view')}>
                    <View style={CustomStyles('body_container')}>
                            <View style={CustomStyles('section_container')}>
                                <Text style={CustomStyles('header_text')}> Reset Your Password</Text>
                            </View>
                            <View style={CustomStyles('section_container')}>
                                        <View style={CustomStyles('form_group')}>
                                            <Text style={CustomStyles('label_text')}>New Password</Text>
                                            <TextInput 
                                                placeholder="Enter Password"
                                                style={CustomStyles('input_field')}
                                                secureTextEntry={true}
                                            />
                                        </View>
                                        <View style={CustomStyles('form_group')}>
                                            <Text style={CustomStyles('label_text')}>Confirm Password</Text>
                                            <TextInput 
                                                placeholder="Confirm Password"
                                                style={CustomStyles('input_field')}
                                                secureTextEntry={true}
                                            />
                                        </View>
                                        <TouchableOpacity style={CustomStyles('form_group')}
                                            onPress={
                                                () => navigation.navigate('ConfirmResetPassword')
                                            }
                                            
                                        >
                                                <View style={CustomStyles('submit_button')}>
                                        <Text style={CustomStyles('submit_button_text')}>Reset Password</Text>
                                                </View>
                                        </TouchableOpacity>
                                </View>
                    </View>
        </KeyboardAwareScrollView>
    )
}


export const ForgotPassword = ({navigation}) => {
    const [email,setEmailAddress] = useState('');
    const [password,setPassword] = useState('');
    const [processing,setProcessing] = useState(false);
    return(
        <KeyboardAwareScrollView style={CustomStyles('aware_scroll_view')}>
                    <View style={CustomStyles('body_container')}>
                            <View style={CustomStyles('section_container')}>
                                <Text style={CustomStyles('header_text')}> Forgot Your Password? </Text>
                            </View>
                            <View>
                                <View style={CustomStyles('section_container')}>
                                    <Text style={CustomStyles('p_text')}>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</Text>
                                </View>
                                <View style={CustomStyles('section_container')}>
                                        <View style={CustomStyles('form_group')}>
                                            <Text style={CustomStyles('label_text')}>Email Address</Text>
                                            <TextInput 
                                                placeholder="Enter Email Address"
                                                style={CustomStyles('input_field')}
                                                keyboardType='email-address'
                                            />
                                        </View>
                                        <TouchableOpacity style={CustomStyles('form_group')}
                                        
                                            
                                        >
                                                <View style={CustomStyles('submit_button')}>
                                        <Text style={CustomStyles('submit_button_text')}>Reset Password</Text>
                                                </View>
                                        </TouchableOpacity>
                                </View>
                            </View>
                            {/* <View>
                                    <View style={CustomStyles('section_container')}>
                                        <View style={CustomStyles('green_card')}>
                                            <Text style={CustomStyles('green_card_text')}>
                                                We’ve sent password recovery
                                                instructions to your email address: "thesamuelbello@gmail.com"
                                            </Text>
                                        </View>
                                    </View>
                            </View> */}
                            <View style={CustomStyles('section_container')}>
                                <Text
                                        style={CustomStyles('p_text')}
                                        onPress={()=>navigation.navigate('Login')}
                                    >Remember your password ? <Text style={CustomStyles('green_text')}> Login Here</Text></Text>
                            </View>
                    </View>
        </KeyboardAwareScrollView>
    )
}
export const NavigatioMenuList = ({navigation}) => {
    return(
        <View 
            style={CustomStyles('navigation_menu_list')}
        >
            <View>
                <Text
                    style={CustomStyles('navigation_menu_item')}
                >Bills & Payments</Text>
                <Text
                     style={CustomStyles('navigation_menu_item')}
                >Transactions</Text>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('FindYourEstate')}
                >
                <Text
                     style={CustomStyles('navigation_menu_item')}
                >New Estate Registration</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('AddOccupant')}
                >
                    <Text
                        style={CustomStyles('navigation_menu_item')}
                    >Add Occupant</Text>
                </TouchableOpacity>
                <Text
                     style={CustomStyles('navigation_menu_item')}
                >Add Domestic Staff</Text>
                <Text
                     style={CustomStyles('navigation_menu_item')}
                >Book Visitor</Text>
                <Text
                     style={CustomStyles('navigation_menu_item')}
                >Register Vehicle</Text>
                <Text
                     style={CustomStyles('navigation_menu_item')}
                >Report Incident</Text>
            </View>
        </View>
    );
}
export const NavBarRightMenu = ({navigation}) => {
    let [showNavMenu,setShowNavMenu] = useState(false)
    return(
        <View style={CustomStyles('main_navbar')}>
            <TouchableOpacity
               style={CustomStyles('navbar_icons')} 
            >
                <Image 
                    source={require('../assets/images/notifications.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> {
                    setShowNavMenu(!showNavMenu);
                }}
                style={CustomStyles('navbar_icons')}
            >
                <Image 
                        source={require('../assets/images/menu.png')}
                    />
            </TouchableOpacity>
            {showNavMenu && <NavigatioMenuList navigation={navigation} />}
        </View>
    )
}


export const get_login_user_information = async  () => {
    const user_information = await AsyncStorage.getItem('user_information');
    console.log('----user information- --');
    console.log(user_information);
    return JSON.parse(user_information);
}

export const OverView = ({navigation,route}) => {
    const [firstName,setFirstName] = useState(' ');
    useEffect(()=>{
        get_login_user_information().then(({$_first_name})=>{
            setFirstName($_first_name);
        }).catch(err =>{
            console.log(err);
        });
    },[
        firstName
    ]);
    return(
        <View style={CustomStyles('main_container_with_bottom_nav')}>
            <View style={CustomStyles('body_container_with_bottom_nav')}>
                <View style={CustomStyles('section_container')}> 
                    <Text style={CustomStyles('greeting_text')}>
                    Good Morning {firstName} !
                    </Text>
                </View> 
                <View style={CustomStyles('section_container')}>
                    <View style={CustomStyles('card_container')}>
                            <TouchableOpacity
                                onPress={()=>alert('Hi there!')}
                                style={CustomStyles('card')}
                            >
                                <View style={CustomStyles('card_header')}>
                                    <Text style={CustomStyles('card_header_text')}>Fixed Services</Text>
                                </View>
                                <View style={CustomStyles('card_body')}>
                                    <Text style={CustomStyles('card_body_text')}>02</Text>
                                </View>
                                <View style={CustomStyles('card_footer')}>
                                    <Text style={CustomStyles('card_footer_text')}>View All ></Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={CustomStyles('card')}>
                                <View style={CustomStyles('card_header')}>
                                    <Text style={CustomStyles('card_header_text')}>Flexible Services</Text>
                                </View>
                                <View style={CustomStyles('card_body')}>
                                    <Text style={CustomStyles('card_body_text')}>05</Text>
                                </View>
                                <View style={CustomStyles('card_footer')}>
                                    <Text style={CustomStyles('card_footer_text')}>View All ></Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>alert('Hi there!')}
                                style={CustomStyles('card')}
                            >
                                <View style={CustomStyles('card_header')}>
                                    <Text style={CustomStyles('card_header_text')}>Apartments</Text>
                                </View>
                                <View style={CustomStyles('card_body')}>
                                    <Text style={CustomStyles('card_body_text')}>10</Text>
                                </View>
                                <View style={CustomStyles('card_footer')}>
                                    <Text style={CustomStyles('card_footer_text')}>View All ></Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={CustomStyles('card')}>
                                <View style={CustomStyles('card_header')}>
                                    <Text style={CustomStyles('card_header_text')}>Vehicles</Text>
                                </View>
                                <View style={CustomStyles('card_body')}>
                                    <Text style={CustomStyles('card_body_text')}>05</Text>
                                </View>
                                <View style={CustomStyles('card_footer')}>
                                    <Text style={CustomStyles('card_footer_text')}>View All ></Text>
                                </View>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{height:'10%',backgroundColor:'white'}}>
                <BottomTabNavigation navigation={navigation} route={route}/>
            </View>
        </View> 
    )
}

// export const BottomTabNavigation = () => {
//     return(
//         <Tab.Navigator
//                 screenOptions={{
//                     tabStyle:{
//                         position:'absolute',
//                         width:'100%'
//                     }
//                 }}
//         >
//             <Tab.Screen
//                 name="Overview"
//                 component={OverView}
//                 options={{
//                   tabBarLabel: 'Home',
//                   tabBarIcon: ({ color, size }) => (
//                     <MaterialIcons name="apps" color={color} size={size} />
//                   ),
//                 }}
//             />
//             <Tab.Screen 
//                 name="Apartments" 
//                 component={FindYourEstate} 
//                 options={{
//                     tabBarLabel:'Apartments',
//                     tabBarIcon: ({ color, size }) => (
//                         <MaterialIcons name="domain" color={color} size={size} />
//                     ),
//                 }}
//             />
//             <Tab.Screen 
//                 name="Services" 
//                 component={VerificationSuccessful} 
//                 options={{
//                     tabBarLabel:'Service',
//                     tabBarIcon: ({ color, size }) => (
//                         <MaterialIcons name="work" color={color} size={size} />
//                       ),
//                 }}
//             />
//             <Tab.Screen 
//                 name="Profile" 
//                 component={VerificationSuccessful} 
//                 options={{
//                     tabBarLabel:'Profile',
//                     tabBarIcon: ({ color, size }) => (
//                         <MaterialIcons name="person" color={color} size={size} />
//                       ),
//                 }}
//             />
//         </Tab.Navigator>
//     )
// }

const Tab = createBottomTabNavigator();
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

export const ConfirmationScreen = ({navigation,route}) => (
    <View style={CustomStyles('body_container')}>
        <View style={CustomStyles('section_container')}>
            <Text style={CustomStyles('header_text')}>{route.params.title}</Text>
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
            {route.params.body ? route.params.body : 'You have successfully reset your password. Log in and continue the good work you already started.'} 
            </Text>
        </View>
        <View style={CustomStyles('section_container')}>
            <TouchableOpacity style={CustomStyles('form_group')}
                onPress={()=>navigation.navigate(route.params.screen)}
            >
                <View style={CustomStyles('submit_button')}>
                    <Text style={CustomStyles('submit_button_text')}>{route.params.button_text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
)