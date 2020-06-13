import React,{useState, useEffect} from 'react';
import {Text,View,TouchableOpacity,Image,Switch, ImageBackground, TextInput, Picker} from 'react-native';
import {CustomStyles,inline_style} from './Styles';
import {processGetRequestWithToken,processPostRequestWithToken,
    getLocalStorageInformation,processFormDataRequestWithToken} from '../functions/HomeFunction';
import {baseUrl} from './environment_variable';
import {BottomTabNavigation} from './EstateComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ConfirmationScreen} from './HomeComponent';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';

export const EditProfile = ({navigation,route}) =>{
    const [hideBottonNav,setHideBottomNav] = useState(false);
    const [profileImage,setProfileImage] = useState(require('../assets/images/profile_image.png'));
    const [profileInformation,setProfileInformation] = useState({
        first_name : '',
        last_name : '',
        email_address : '',
        profile_image : require('../assets/images/profile_image.png'),
        new_upload : {},
        phone : ''
    });
    const [processing,setProcessing] = useState(false);
    const [image_is_set,setImageStatus] = useState(false);
    useEffect(()=>{
        getLocalStorageInformation().then(({$_first_name,$_last_name,$_email_address,$_profile_image,$_phone}) => {
            setProfileInformation({
                first_name : $_first_name,
                last_name : $_last_name,
                email_address : $_email_address,
                profile_image : $_profile_image === null ? require('../assets/images/profile_image.png') : {uri:baseUrl+$_profile_image},
                phone : $_phone
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
                    <View style={CustomStyles('profile_image_container')}>
                        <ImageBackground
                            style={inline_style.edit_profile_image}
                            source={profileInformation.profile_image}>
                                <View style={inline_style.upload_profile_image_icon_container}>
                                </View>
                        </ImageBackground>
                    </View>

                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>First Name</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="First Name"
                            value={profileInformation.first_name}
                            onChangeText={(value)=> setProfileInformation({... profileInformation,first_name:value})}
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
                            onChangeText={(value)=> setProfileInformation({... profileInformation,last_name:value})}
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
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>Phone</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="Phone Number"
                            value={profileInformation.phone}
                            keyboardType="numeric"
                        />
                    </View>
                    
                    <TouchableOpacity style={inline_style.form_group}
                    onPress={()=>{
                        ImagePicker.openPicker({
                            width: 300,
                            height: 400,
                            cropping: true
                          }).then(image => {
                            setProfileInformation({... profileInformation,new_upload:image});
                            setImageStatus(true);
                          });
                    }}
                    >
                        <Text style={inline_style.label_text}>Upload Profile Image</Text>
                        <Picker
                            style={inline_style.input_field}
                        />
                        <View style={{position:'absolute',right:20,top:40}}>
                        {
                            image_is_set ? <Image 
                            source={require('../assets/images/green-check-mark.png')}
                            style={{width:30,height:30,borderRadius:50,bottom:5}}
                        /> : <Image 
                        source={require('../assets/images/camera.png')}
                    /> 
                        }
                            
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={CustomStyles('form_group')}
                        onPress={()=>{
                            let formData = new FormData();
                            formData.append('firstname',profileInformation.first_name);
                            formData.append('surname',profileInformation.last_name);
                            formData.append('phone',profileInformation.phone);
                            if(image_is_set){
                                formData.append('profile_image',{uri:profileInformation.new_upload.path,name:'image.jpeg',
                                type : profileInformation.new_upload.mime});
                            }
                            setProcessing(true);
                            processFormDataRequestWithToken(`${baseUrl}/api/users/update_profile`,formData).then(res=>{
                                setProcessing(false);
                                if(res.code === 200){
                                    let user_information = {
                                        $_first_name : res.user.firstname,
                                        $_last_name : res.user.surname,
                                        $_phone : res.user.phone,
                                        $_profile_image : res.user.user_photo,
                                        $_email_address : res.user.email
                                    }
                                    AsyncStorage.setItem('user_information',JSON.stringify(user_information)).then(res=>{
                                        return navigation.navigate('ConfirmationScreen',{
                                            title : 'Update Saved!',
                                            body : 'Your changes have been successfully saved',
                                            button_text : 'Continue',
                                            screen:'MyProfile'
                                        });
                                    });
                                }
                                //toast a failure message
                            }).catch(err=>{
                                setProcessing(false);
                                console.log(error);
                            });
                        }}
                    >
                        <View
                            style={CustomStyles('submit_button')}
                        >
                            <Text style={CustomStyles('submit_button_text')}>{processing ? 'Please Wait ...' : 'Update Profile'}</Text>
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
    useEffect(()=>{
        console.log('My Profile Did Mount')
        getLocalStorageInformation().then(({$_first_name,$_last_name,$_profile_image}) => {
            if($_profile_image !== null){
                setProfileImage({uri:baseUrl+$_profile_image});
            }
            setFullName($_first_name+' '+$_last_name);
        }); 
        return()=>{
            console.log('Component updated...');
        };
    },[
       
    ]);
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
                    <TouchableOpacity style={CustomStyles('item_container')}
                        onPress={()=>navigation.navigate('Login')}
                    >
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