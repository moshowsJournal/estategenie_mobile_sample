import React,{useState,useEffect} from 'react';
import {Text,View,TouchableOpacity,TextInput,Picker,Image,Modal} from 'react-native';
import ToastNotification from 'react-native-toast-notification'
import {get_login_user_information} from './HomeComponent'
import {CustomStyles} from './Styles';
import {processGetRequestWithToken,processPostRequestWithToken} from '../functions/HomeFunction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {baseUrl} from './environment_variable';
export const FindYourEstate = ({navigation,route}) => {
    const [estates,setEstate] = useState([]);
    const [countries,setCountry] = useState([]);
    const [countryCodes,setCountryCodes] = useState([]);
    useEffect(()=>{
        processGetRequestWithToken(`${baseUrl}/api/users/get_all_estates`).then(res =>{
            console.log(res);
            setEstate(Object.values(res.estates));
            setCountryCodes(Object.keys(res.estates));
        }).catch(err => { 
            console.log(err);
        })
        return () => {
            console.log('Yes ....')
        }
    },[
        countries
    ]);
    return(
        <View style={CustomStyles('main_container_with_bottom_nav')}>
            <View style={CustomStyles('body_container_with_bottom_nav')}>
                <View style={CustomStyles('section_container')}>
                    <View style={CustomStyles('form_group')}>
                        <Text style={CustomStyles('label_text')}>Estate Code</Text>
                        <TextInput 
                            style={CustomStyles('input_field')}
                        />
                    </View>
                    <TouchableOpacity style={CustomStyles('form_group')}>
                        <View
                            style={CustomStyles('submit_button')}
                        >
                            <Text style={CustomStyles('submit_button_text')}>Find Estate</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView style={CustomStyles('section_container')}>
                    {
                        countryCodes.map((country_code,index) =>{
                            return(
                                <View key={index}>
                                    <Text style={{fontWeight:'bold',fontSize:15}}>{country_code}</Text>
                                    {
                                        estates[index].map((estate,key)=>{
                                            return(
                                                <TouchableOpacity style={CustomStyles('horizontal_card')}
                                                        onPress={()=>navigation.navigate('ApartmentsInEstate',{
                                                            estate_name : estate.estate_name,
                                                            estate_id : estate.estate_id
                                                        })}
                                                        key={key}
                                                    >
                                                    <Text style={CustomStyles('horizontal_card_header')}>{estate.estate_name}</Text>
                                                    <Text style={CustomStyles('label_text')}>{estate.estate_address}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
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
export const ModalComponent = ({showModal,manageShowModalState,navigation,apartment_id,building_unit_id,estate_id}) => {
    const [processing,setProcessing] = useState(false);
    return(
        <Modal
            visible={showModal}
            presentationStyle="fullScreen"
            animationType="fade"
        >
            <View style={{justifyContent:'center',marginTop:'50%'}}>
                    <View style={CustomStyles('section_container')}>
                        <Text style={CustomStyles('header_text')}>Validate Apartment!</Text>
                    </View>
                    <View style={CustomStyles('section_container')}>
                            <View style={CustomStyles('image_container')}>
                                <Image 
                                    style={CustomStyles('image_file')}
                                    source={require('../assets/images/vector.png')}
                                />
                            </View>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <Text style={CustomStyles('p_text')}>
                            You are about to validate that you are the principal resident of this Apartment.
                        </Text>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <TouchableOpacity style={CustomStyles('form_group')}
                            onPress={()=>{
                                let requestData = {
                                    apartment_id,
                                    building_unit_id,
                                    estate_id 
                                }
                                setProcessing(true);
                               processPostRequestWithToken(`${baseUrl}/api/users/principal_chooses_apartment`,requestData).then(res => {
                                   console.log(res);
                                   if(res.code === 200){
                                        manageShowModalState(false)
                                       return navigation.navigate('ApartmentSelectedConfirmation');
                                   }
                                   return setProcessing(false);
                               });
                            }}
                            disabled={processing}
                        >
                                <View style={CustomStyles('submit_button')}>
                        <Text style={CustomStyles('submit_button_text')}>{processing ? 'Please Wait...' : 'Proceed'}</Text>
                                </View>
                        </TouchableOpacity>
                        {processing !== true && (
                            <Text
                                style={CustomStyles('p_text')}
                                onPress={()=>manageShowModalState(false)}
                            >
                                Cancel Validate
                            </Text>
                        )}
                    </View>
            </View>
        </Modal>
    )
}

export const ApartmentSelectedConfirmation = ({navigation}) => (
    <View style={CustomStyles('body_container')}>
                    <View style={CustomStyles('section_container')}>
                        <Text style={CustomStyles('header_text')}>You are all set!</Text>
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
                        Access to an open online Estate Management platform where anyone, anywhere, can sign up and begin living their best lives right away. Have Fun!
                        </Text>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <TouchableOpacity style={CustomStyles('form_group')}
                            onPress={()=>navigation.navigate('Overview')}
                        >
                                <View style={CustomStyles('submit_button')}>
                                    <Text style={CustomStyles('submit_button_text')}>Go to Overview</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
            </View>
)

export const ApartmentsInEstate = ({navigation,route}) => {
    const [showModal,manageShowModalState] = useState(false);
    const [buildings,setBuildingState] = useState([]);
    const [selectedApartmentId,setSelectedApartmentId] = useState();
    const [selectedBuildingId,setSelectedBuildingId] = useState();
    useEffect(()=>{
        processGetRequestWithToken(`${baseUrl}/api/users/get_buildings_from_estate?estate_id=${route.params.estate_id}`).then(res => {
            if(res.code === 200){
                setBuildingState(res.buildings);
            }
        
        }).catch(error => {
            console.log(error);
        })
    },[

    ]);
    return(
        <View style={CustomStyles('main_container_with_bottom_nav')}>
            <View style={CustomStyles('body_container_with_bottom_nav')}>
                <ScrollView style={CustomStyles('section_container')}>
                    
                    {
                        buildings.map((building, index) => {
                            let building_name = building.building_name;
                            return(
                                <>
                                    <Text key={index} style={CustomStyles('card_outer_header')}>{building.building_name}</Text>
                                    {
                                        building.apartments.map((apartment,key)=>{
                                            return(
                                                <TouchableOpacity key={key} style={CustomStyles('horizontal_card_with_image')}
                                                    onPress={()=>{
                                                        setSelectedApartmentId(apartment.apartment_id);
                                                        setSelectedBuildingId(apartment.building_unit_id);
                                                        manageShowModalState(true)
                                                    }}

                                                >
                                                    <View style={{flex:1}}>
                                                        <Image 
                                                            style={CustomStyles('image_file')}
                                                            source={require('../assets/images/apartment.png')}
                                                        />
                                                    </View>
                                                    <View style={{flex:5}}>
                                            <Text style={CustomStyles('horizontal_card_header')}>{apartment.apartment_name}, {building_name}, {route.params.estate_name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </>
                            )
                        })
                    }
                    
                </ScrollView>
            </View>
            <ModalComponent showModal={showModal} manageShowModalState={manageShowModalState} navigation={navigation} apartment_id={selectedApartmentId} building_unit_id={selectedBuildingId} estate_id={route.params.estate_id}/>
            <View style={{height:'15%',backgroundColor:'white'}}>
                <BottomTabNavigation navigation={navigation} route={route}/>
            </View>
        </View>
    )
}

export const BottomTabNavigation = ({route,navigation}) => {
    return(
        <View style={CustomStyles('bottom_navigation_container')}>

                <TouchableOpacity style={CustomStyles('nav_item')}
                    onPress={()=>navigation.navigate('Overview')}
                >
                    {route.name === 'Overview' ? 
                        <MaterialIcons name="apps" style={CustomStyles('clicked_bottom_nav_icons')}/> : 
                        <MaterialIcons name="apps" style={CustomStyles('bottom_nav_icons')}/>}

                    {route.name === 'Overview' ? 
                        <Text style={CustomStyles('clicked_bottom_nav_text')}>Overview</Text> : 
                        <Text style={CustomStyles('bottom_nav_text')}>Overview</Text>}
                    
                </TouchableOpacity>
                
                <TouchableOpacity style={CustomStyles('nav_item')}
                    onPress={()=> console.log('Go to my apartments')}
                >
                    {route.name === 'apartments' || route.name.includes('Estate') || route.name.includes('Apartment') ? 
                        <MaterialIcons name="domain" style={CustomStyles('clicked_bottom_nav_icons')}/> : 
                        <MaterialIcons name="domain" style={CustomStyles('bottom_nav_icons')}/>}

                    {route.name === 'apartments' || route.name.includes('Estate') || route.name.includes('Apartment') ? 
                        <Text style={CustomStyles('clicked_bottom_nav_text')}>Apartments</Text> : 
                        <Text style={CustomStyles('bottom_nav_text')}>Apartments</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={CustomStyles('nav_item')}>
                    {route === 'service' ? 
                        <MaterialIcons name="work" style={CustomStyles('clicked_bottom_nav_icons')}/> : 
                        <MaterialIcons name="work" style={CustomStyles('bottom_nav_icons')}/>}

                    {route === 'service' ? 
                        <Text style={CustomStyles('clicked_bottom_nav_text')}>Service</Text> : 
                        <Text style={CustomStyles('bottom_nav_text')}>Service</Text>}
                </TouchableOpacity>


                <TouchableOpacity style={CustomStyles('nav_item')}
                    onPress={()=>navigation.navigate('MyProfile')}
                >
                    {route.name === 'profile' || route.name.includes('Profile') ? <MaterialIcons name="person" style={CustomStyles('clicked_bottom_nav_icons')}/> : <MaterialIcons name="person" style={CustomStyles('bottom_nav_icons')}/>}
                    {route.name === 'profile' || route.name.includes('Profile') ? <Text style={CustomStyles('clicked_bottom_nav_text')}>Person</Text> : <Text style={CustomStyles('bottom_nav_text')}>Profile</Text>}
                    
                </TouchableOpacity>
        </View>
    )
}

export const UseEstateCodeNavItem = ({navigation}) => {
    return (
        <TouchableOpacity 
        style={{marginRight:10,flexDirection:'row',justifyContent:'space-around'}}
        onPress={()=>navigation.navigate('FindByEstateCode')}
        >
                                  <MaterialIcons name="home" style={CustomStyles('use_estate_code_icon')}/>
                                  <Text style={CustomStyles('use_estate_code_text')}>Use Estate Code</Text>
                                </TouchableOpacity>
    )
}

export const FindByEstateCode = () => {
    return(
        <View>
            <Text>Find By Estate Code</Text>
        </View>
    )
}