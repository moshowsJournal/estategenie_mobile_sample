import React,{useState,useEffect} from 'react';
import {Text,View,TouchableOpacity,ScrollView,Image,TextInput,Picker,Switch} from 'react-native';
import {processGetRequestWithToken,processPostRequestWithToken,processFormDataRequestWithToken} from '../functions/HomeFunction';
import { baseUrl } from './environment_variable';
import {CustomStyles,inline_style} from './Styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BottomTabNavigation} from './EstateComponent';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';


export const MyApartments = ({navigation,route}) =>{
    const [occupants,setApartment] = useState([]);
    useEffect(()=>{
        processGetRequestWithToken(`${baseUrl}/api/users/get_customer_apartments`).then(res=>{
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
                                                estate_code : occupant.estate.estate_id,
                                                building_unit_id : occupant.building_unit_id 
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
    let init_first_name = route.params.first_name !== undefined ? route.params.first_name : '';
    let init_surname = route.params.surname !== undefined ? route.params.surname : '';
    let init_association_type = route.params.association_type !== undefined ? route.params.association_type : '';
    let init_phone = route.params.phone_number !== undefined ? route.params.phone_number : '';
    const [hideBottonNav,setHideBottomNav] = useState(false);
    const [first_name,setFirstName] = useState(init_first_name);
    const [last_name,setLastName] = useState(init_surname);
    const [occupant_type,setOccupantType] = useState(init_association_type);
    const [phone_number,setPhoneNumber] = useState(init_phone);
    const [occupant_image,setOccupantImage] = useState();
    const [processing,setProcessing] = useState(false);
    const [image_is_set,setImageStatus] = useState(false);
    return(
        <View style={inline_style.main_container_with_bottom_nav}>
            <KeyboardAwareScrollView style={inline_style.body_container_with_bottom_nav}>
                <View style={inline_style.section_container_with_bottom_nav}>
                    <View style={inline_style.form_group}>
                        <Text style={inline_style.label_text}>Type of Occupant</Text>
                        <Picker
                            mode="dropdown"
                            style={inline_style.input_field}
                            selectedValue={occupant_type}
                            onValueChange={(value)=>setOccupantType(value)} 
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
                            onChangeText={(text)=>setFirstName(text)}
                            value={first_name}
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
                            onChangeText={(text)=>setLastName(text)}
                            value={last_name}
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
                            onChangeText={(text)=>setPhoneNumber(text)}
                            value={phone_number}
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
                            setOccupantImage(image);
                            setImageStatus(true);
                          });
                    }}
                    >
                        <Text style={inline_style.label_text}>Occupant Image</Text>
                        <Picker 
                            onFocus={()=> setHideBottomNav(true)}
                            onBlur={()=>setHideBottomNav(false)}
                            style={inline_style.input_field}
                            placeholder="Select Occupant Image"
                            placeholderTextColor="#e0cdcd"
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
                    <TouchableOpacity 
                        onPress={()=>{
                            setProcessing(true);
                            let formData = new FormData();
                            formData.append('firstname',first_name);
                            formData.append('surname',last_name);
                            formData.append('phone',phone_number);
                            formData.append('association_type',occupant_type);
                            formData.append('apartment_id',route.params.apartment_id);
                            formData.append('estate_id',route.params.estate_id);
                            formData.append('building_unit_id',route.params.building_unit_id);
                            formData.append('profile_image', {uri: occupant_image.path, name: 'image.jpg', type: occupant_image.mime});
                            formData.append('occupant_username',route.params.occupant_username);
                            let endpoint = route.params.first_name !== undefined ? '/api/users/edit_occupant_details' 
                            : '/api/users/add_occupant';
                            processFormDataRequestWithToken(`${baseUrl}${endpoint}`,formData).then(res=>{
                                console.log(res);
                                setProcessing(false);
                                if(res.code === 200 && (route.params.first_name === undefined)){
                                    navigation.navigate('ConfirmationScreen',{
                                        title : 'Occupant Added!',
                                        body : `You have successfully added a new Occupant: ${first_name} ${last_name} as ${occupant_type}.`,
                                        button_text : 'Go to Apartments',
                                        screen : 'MyApartments'
                                    });
                                }
                                if(res.code === 200 && (route.params.first_name !== undefined)){
                                    navigation.navigate('ConfirmationScreen',{
                                        title : 'Occupant Edited!',
                                        body : `You have successfully edited Occupant: ${first_name} ${last_name}'s record`,
                                        button_text : 'Go to Apartments',
                                        screen : 'MyApartments'
                                    });
                                }
                            }).catch(error=>{
                                setProcessing(false);
                                console.log(error);
                            });
                        }}
                        style={inline_style.form_group}
                        disabled={processing}
                    >
                        <View
                            style={CustomStyles('submit_button')}
                        >
                            {
                            route.params.first_name !== undefined ? <Text style={CustomStyles('submit_button_text')}>{ processing ? 'Please Wait ...' : 'Edit Occupant'}</Text> : <Text style={CustomStyles('submit_button_text')}>{ processing ? 'Please Wait ...' : 'Add Occupant'}</Text>
                        }
                            

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
        processGetRequestWithToken(`${baseUrl}/api/users/get_apartment_occupants?apartment_id=${route.params.apartment_id}`).then(res=>{
            console.log(res);
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
            <ScrollView style={CustomStyles('body_container_with_bottom_nav')}>
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
                <View style={inline_style.list_container}>
                    {
                        occupants.length === 0 ? <View 
                            style={CustomStyles('horizontal_card')}
                        
                        >
                                <Text style={CustomStyles('horizontal_card_header')}>No Record Found :( </Text>
                            </View> : 
                        occupants.filter(occupant=>occupant.status !== 'removed').map((occupant,index) => {
                            return(
                                <TouchableOpacity key={index} style={CustomStyles('horizontal_card_with_image')}
                                    onPress={()=>{
                                        navigation.navigate('OccupantDetails',{
                                            first_name : `${occupant.user.firstname}`,
                                            surname : `${occupant.user.surname}`,
                                            association_type : `${occupant.association_type}`,
                                            phone_number : occupant.user.phone,
                                            date_created : moment(occupant.created_date).format('MMMM Do YYYY'),
                                            profile_image : occupant.user.user_photo,
                                            apartment_id : occupant.apartment_id,
                                            building_unit_id : occupant.building_unit_id,
                                            estate_id : occupant.estate_id,
                                            occupant_username : occupant.occupant_username
                                        });
                                    }}
                                    disabled={occupant.association_type === 'PRINCIPAL-RESIDENT' ? true : false}
                                >
                                    <View style={inline_style.horizontal_card_img_container}>
                                        <Image 
                                            style={CustomStyles('image_file')}
                                            source={occupant.user.user_photo === null ? require('../assets/images/green_placeholder.png') : {uri:`${baseUrl}${occupant.user.user_photo}`}}
                                        />
                                    </View>
                                    <View style={inline_style.horizontal_card_text_container}>
                                <Text style={CustomStyles('horizontal_card_header')}>{occupant.user.firstname +' '+occupant.user.surname}</Text>
                                        <Text style={inline_style.horizontal_card_text}>{occupant.association_type}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <View style={{height:'15%',backgroundColor:'white'}}>
                <BottomTabNavigation navigation={navigation} route={route}/>
            </View>
        </View>
    )
}

export const OccupantDetails = ({navigation,route})=> {
    const [profile_image,setProfileImage] = useState(require('../assets/images/profile_image.png'))
    useEffect(()=>{
        if(route.params.profile_image !== null){
            setProfileImage({uri:`${baseUrl}${route.params.profile_image}`});
        }
    },[

    ]);
    return(
        <View style={CustomStyles('main_container_with_bottom_nav')}>
            <View style={CustomStyles('body_container_with_bottom_nav')}>
                <ScrollView>
                    <View style={CustomStyles('section_container')}>
                        <View style={CustomStyles('profile_image_container')}>
                            <Image
                                style={inline_style.edit_profile_image}
                                source={profile_image} 
                            />
                        </View>
                    </View>
                    <View style={inline_style.section_container_with_border_line}> 
                        <View style={{marginBottom:10,marginTop:20}}>
                            <Text style={inline_style.horizontal_card_header}>{route.params.first_name} {route.params.surname}</Text>
                            <Text style={inline_style.horizontal_card_text}>{route.params.association_type}</Text>
                        </View>
                        <View style={{marginBottom:10}}>
                            <Text style={inline_style.horizontal_card_header}>Phone Number</Text>
                            <Text style={inline_style.horizontal_card_text}>{route.params.phone_number}</Text>
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={inline_style.horizontal_card_header}>Date Added</Text>
                            <Text style={inline_style.horizontal_card_text}>{route.params.date_created}</Text>
                        </View>
                    </View>
                    <View style={inline_style.section_container}>
                        <Text style={{fontWeight:'bold'}}>Rights in Apartment</Text>
                        <TouchableOpacity style={CustomStyles('row_horizontal_card')}>
                            <Text style={CustomStyles('item_text')}>Manage Apartment</Text>
                            <View>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={"#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    value={false}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={{height:'15%',backgroundColor:'white'}}>
                <BottomTabNavigation navigation={navigation} route={route}/>
            </View>
        </View>
    )
}