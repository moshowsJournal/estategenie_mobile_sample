import React,{useState, useEffect} from 'react';
import {Text,View,TouchableOpacity,Image,Switch, ImageBackground, TextInput} from 'react-native';
import {CustomStyles,inline_style} from './Styles';
import {processGetRequestWithToken,processPostRequestWithToken,getLocalStorageInformation} from '../functions/HomeFunction';
import {baseUrl} from './environment_variable';
import {BottomTabNavigation} from './EstateComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ConfirmationScreen} from './HomeComponent';

export const EditProfile = ({navigation,route}) =>{
    const [hideBottonNav,setHideBottomNav] = useState(false);
    const [profileImage,setProfileImage] = useState(require('../assets/images/profile_image.png'));
    const [profileInformation,setProfileInformation] = useState({
        first_name : '',
        last_name : '',
        email_address : '',
        profile_image : require('../assets/images/profile_image.png')
    })
    useEffect(()=>{
        getLocalStorageInformation().then(({$_first_name,$_last_name,$_email_address,$_profile_image}) => {
            setProfileInformation({
                first_name : $_first_name,
                last_name : $_last_name,
                email_address : $_email_address,
                profile_image : $_profile_image === null ? require('../assets/images/profile_image.png') : {uri:baseUrl+$_profile_image}
            })
            return(()=>{
                console.log('component updated');
            });
        });
    },[
        setHideBottomNav  
    ]);
    return(
        <View style={inline_style.main_container_with_bottom_nav}>
            <KeyboardAwareScrollView style={inline_style.body_container_with_bottom_nav}>
                <View style={inline_style.section_container_with_bottom_nav}>
                    <TouchableOpacity style={CustomStyles('profile_image_container')}>
                        <ImageBackground
                            style={inline_style.edit_profile_image}
                            source={profileInformation.profile_image}>
                                <View style={inline_style.upload_profile_image_icon_container}>
                                    <Image 
                                        source={require('../assets/images/upload_image.png')}
                                    />
                                </View>
                        </ImageBackground>

                    </TouchableOpacity>

                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>First Name</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="First Name"
                            value={profileInformation.first_name}
                        />
                    </View>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>First Name</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="Last Name"
                            value={profileInformation.last_name}
                        />
                    </View>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>Email</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="Email Address"
                            value={profileInformation.email_address}
                            editable={false}
                        />
                    </View>
                    <TouchableOpacity style={CustomStyles('form_group')}>
                        <View
                            style={CustomStyles('submit_button')}
                        >
                            <Text style={CustomStyles('submit_button_text')}>Update Profile</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
           {
               !hideBottonNav && (
                    <View style={{height:'15%',backgroundColor:'white'}}>
                        <BottomTabNavigation navigation={navigation} route={route}/>
                    </View>
               )
           }
        </View>
    )
}

export const UpdatePassword = ({navigation,route}) =>{
    const [hideBottonNav,setHideBottomNav] = useState(false);
    return(
        <View style={inline_style.main_container_with_bottom_nav}>
            <KeyboardAwareScrollView style={inline_style.body_container_with_bottom_nav}>
                <View style={inline_style.section_container_with_bottom_nav}>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>Current Password</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="Current Password"
                            placeholderTextColor="#e0cdcd"
                        />
                    </View>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>New Password</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="New Password"
                            placeholderTextColor="#e0cdcd"
                        />
                    </View>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>Confirm Password</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="Confirm Password"
                            placeholderTextColor="#e0cdcd"
                        />
                    </View>
                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate('ConfirmationScreen',{
                                title : 'Password Updated!',
                                body : 'Your password has been successfully updated',
                                button_text : 'Go to Profile',
                                screen : 'MyProfile'
                            });
                        }}
                        style={inline_style.form_group}
                    >
                        <View
                            style={CustomStyles('submit_button')}
                        >
                            <Text style={CustomStyles('submit_button_text')}>Update Password</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
           {
               !hideBottonNav && (
                    <View style={{height:'15%',backgroundColor:'white'}}>
                        <BottomTabNavigation navigation={navigation} route={route}/>
                    </View>
               )
           }
        </View>
    )
}

export const MyProfile = ({navigation,route}) => {
    const [profileImage,setProfileImage] = useState(require('../assets/images/profile_image.png'));
    const [fullName, setFullName] = useState('');
    // useEffect(()=>{
    //     console.log('My Profile Did Mount')
    //     getLocalStorageInformation().then(({$_first_name,$_last_name,$_profile_image}) => {
    //         if($_profile_image !== null){
    //             setProfileImage({uri:baseUrl+$_profile_image});
    //         }
    //         setFullName($_first_name+' '+$_last_name);
    //     }); 
    //     return()=>{
    //         console.log('Component updated...');
    //     };
    // },[
    //     profileImage
    // ]);
    return(
        <View style={CustomStyles('main_container_with_bottom_nav')}>
            <ScrollView style={CustomStyles('body_container_with_bottom_nav')}>
                <View style={CustomStyles('section_container')}>
                    <View style={CustomStyles('profile_image_container')}>
                        <Image
                            style={inline_style.edit_profile_image}
                            source={profileImage} 
                        />
                    </View>
                    <Text style={CustomStyles('card_header_text')}>{fullName}</Text>
                </View>
                <View style={CustomStyles('section_container')}>
                    <View style={inline_style.profile_top_item_divider}></View>
                    <TouchableOpacity 
                        style={CustomStyles('item_container')}
                        onPress={()=>{
                            navigation.navigate('EditProfile')
                        }}
                    >
                        <Text style={CustomStyles('item_text')}>Edit Profile</Text>
                        <MaterialIcons 
                                name='navigate-next'
                                style={inline_style.icon_style}
                            />
                    </TouchableOpacity>
                    <View style={inline_style.profile_bottom_item_divider}></View>
                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate('UpdatePassword')
                        }}
                        style={CustomStyles('item_container')}
                    >
                        <Text style={CustomStyles('item_text')}>Update Password</Text>
                        <MaterialIcons 
                                name='navigate-next'
                                style={inline_style.icon_style}
                            />
                    </TouchableOpacity>
                    <View style={inline_style.profile_bottom_item_divider}></View>
                    <TouchableOpacity style={CustomStyles('item_container')}>
                        <Text style={CustomStyles('item_text')}>Finger Unlock</Text>
                        <View>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={"#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                value={false}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={inline_style.profile_bottom_item_divider}></View>
                    <TouchableOpacity style={CustomStyles('item_container')}>
                        <Text style={CustomStyles('item_text')}>Allow for Push Notifications</Text>
                        <View>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={"#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                value={false}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={inline_style.profile_bottom_item_divider}></View>
                    <TouchableOpacity style={CustomStyles('item_container')}>
                        <Text style={CustomStyles('item_text')}>Sign Out</Text>
                        <MaterialIcons 
                                name='power-settings-new'
                                style={inline_style.icon_style}
                            />
                    </TouchableOpacity>
                    <View style={inline_style.profile_bottom_item_divider}></View>
                </View>
            </ScrollView>
            <View style={{height:'15%',backgroundColor:'white'}}>
                <BottomTabNavigation navigation={navigation} route={route}/>
            </View>
        </View>
    )
}