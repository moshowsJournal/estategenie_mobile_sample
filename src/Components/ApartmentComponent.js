import React,{useState,useEffect} from 'react';
import {Text,View,TouchableOpacity,ScrollView,Image,TextInput,Picker} from 'react-native';
import {processGetRequestWithToken,processPostRequestWithToken} from '../functions/HomeFunction';
import { baseUrl } from './environment_variable';
import {CustomStyles,inline_style} from './Styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BottomTabNavigation} from './EstateComponent';


export const MyApartments = ({navigation,route}) =>{
    const [occupants,setApartment] = useState([]);
    useEffect(()=>{
        processGetRequestWithToken(`${baseUrl}/api/users/get_customer_apartments`).then(res=>{
            console.log('..... Apartments .......');
            console.log(res);
            if(res.code === 200){
                setApartment(res.occupant);
            }
            return(()=>{
                console.log(occupant);
            });
        }).catch(error=>{
            console.log(error);
        });
    },[
         
    ]);
    return(
        <View style={CustomStyles('main_container_with_bottom_nav')}>
            <View style={CustomStyles('body_container_with_bottom_nav')}>
                <ScrollView style={CustomStyles('section_container')}>
                    
                    {
                        occupants.map((occupant,key) => {
                                return(
                                    <TouchableOpacity key={key} style={CustomStyles('horizontal_card_with_image')}
                                        onPress={()=>{
                                            navigation.navigate('ApartmentDetails',{
                                                apartment_id : occupant.apartment.apartment_id,
                                                apartment_name : occupant.apartment.apartment_name,
                                                estate_address : `${occupant.estate.estate_address}`,
                                                estate_country : occupant.estate.estate_country,
                                                estate_code : occupant.estate.estate_id 
                                            });
                                        }}

                                    >
                                        <View style={inline_style.horizontal_card_img_container}>
                                            <Image 
                                                style={CustomStyles('image_file')}
                                                source={require('../assets/images/apartment.png')}
                                            />
                                        </View>
                                        <View style={inline_style.horizontal_card_text_container}>
                                            <Text style={CustomStyles('horizontal_card_header')}>{occupant.estate.estate_name}</Text>
                                            <Text style={inline_style.horizontal_card_text}>{occupant.apartment.apartment_name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                        })
                    }
                    
                </ScrollView>
            </View>
            <View style={{height:'15%',backgroundColor:'white'}}>
                <BottomTabNavigation navigation={navigation} route={route}/>
            </View>
        </View>
    );
}

export const AddOccupant = ({navigation,route}) =>{
    const [hideBottonNav,setHideBottomNav] = useState(false);
    return(
        <View style={inline_style.main_container_with_bottom_nav}>
            <KeyboardAwareScrollView style={inline_style.body_container_with_bottom_nav}>
                <View style={inline_style.section_container_with_bottom_nav}>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>Type of Occupant</Text>
                        <Picker
                            mode="dropdown"
                            style={inline_style.input_field} 
                        >
                            <Picker.Item label="Select type" value="" />
                            <Picker.Item label="CO-PRICIPAL RESIDENT" value="CO-PRICIPAL-RESIDENT" />
                            <Picker.Item label="DOMESTIC STAFF" value="DOMESTIC-STAFF" />
                            <Picker.Item label="DEPENDENT" value="DEPENDENT" />
                        </Picker>
                        <View style={{position:'absolute',right:20,top:40}}>
                            <Image 
                                source={require('../assets/images/arrow_down.png')}
                            />
                        </View>
                    </View>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>First Name</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="Enter First Name"
                            placeholderTextColor="#e0cdcd"
                        />
                    </View>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>Last Name</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="Enter Last Name"
                            placeholderTextColor="#e0cdcd"
                        />
                    </View>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>Phone Number</Text>
                        <TextInput 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="Enter Phone Number"
                            placeholderTextColor="#e0cdcd"
                        />
                    </View>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>Occupant Image</Text>
                        <Picker 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="Select Occupant Image"
                            placeholderTextColor="#e0cdcd"
                        />
                        <View style={{position:'absolute',right:20,top:40}}>
                            <Image 
                                source={require('../assets/images/camera.png')}
                            />
                        </View>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate('ConfirmationScreen',{
                                title : 'Occupant Added!',
                                body : `You have successfully added a new Occupant: ${first_name} ${last_name} as ${association_type}.`,
                                button_text : 'Go to Apartments',
                                screen : 'MyApartments'
                            });
                        }}
                        style={inline_style.form_group}
                    >
                        <View
                            style={CustomStyles('submit_button')}
                        >
                            <Text style={CustomStyles('submit_button_text')}>Add Occupant</Text>
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

export const ApartmentDetails = ({navigation,route})=>{
    const [occupants,setOccupants] = useState([]);
    useEffect(()=>{
        processGetRequestWithToken(`${baseUrl}/api/users/get_apartment_occupants?apartment_id=${route.apartment_id}`).then(res=>{
            if(res.code === 200){
                setOccupants(res.occupants);
            }
        }).catch(error => {
            console.log(error);
        });
    },[

    ]);
    return(
        <View style={CustomStyles('main_container_with_bottom_nav')}>
            <View style={CustomStyles('body_container_with_bottom_nav')}>
                <View style={inline_style.section_container}>
                    <View style={{width:40,height:40}}>
                        <Image 
                            style={CustomStyles('image_file')}
                            source={require('../assets/images/apartment.png')}
                        />
                    </View>
                </View>
                <View style={inline_style.section_container_with_border_line}> 
                    <View style={{marginBottom:10,marginTop:20}}>
                        <Text style={inline_style.horizontal_card_text}>Address</Text>
                        <Text style={inline_style.horizontal_card_header}>{route.params.estate_address}</Text>
                    </View>
                    <View style={{marginBottom:10}}>
                        <Text style={inline_style.horizontal_card_text}>Estate Country</Text>
                        <Text style={inline_style.horizontal_card_header}>{route.params.estate_country}</Text>
                    </View>
                    <View style={{marginBottom:20}}>
                        <Text style={inline_style.horizontal_card_text}>Estate Code</Text>
                        <Text style={inline_style.horizontal_card_header}>{route.params.estate_code}</Text>
                    </View>

                </View>
                <ScrollView>
                    {
                        occupants.length === 0 ? <TouchableOpacity style={CustomStyles('horizontal_card')}>
                                <Text style={CustomStyles('horizontal_card_header')}>No Record Found :( </Text>
                            </TouchableOpacity> : 
                        occupants.map((occupant,index) => {
                            return(
                                <TouchableOpacity key={index} style={CustomStyles('horizontal_card_with_image')}
                                    onPress={()=>{
                                        navigation.navigate('ApartmentDetails',{
                                            apartment_id : occupant.apartment.apartment_id
                                        });
                                    }}
                                >
                                    <View style={inline_style.horizontal_card_img_container}>
                                        <Image 
                                            style={CustomStyles('image_file')}
                                            source={require('../assets/images/apartment.png')}
                                        />
                                    </View>
                                    <View style={inline_style.horizontal_card_text_container}>
                                        <Text style={CustomStyles('horizontal_card_header')}></Text>
                                        <Text style={inline_style.horizontal_card_text}></Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={{height:'15%',backgroundColor:'white'}}>
                <BottomTabNavigation navigation={navigation} route={route}/>
            </View>
        </View>
    )
}