import React,{useState,useEffect} from 'react';
import {Text,View,ScrollView,TouchableOpacity,Image} from 'react-native';
import {CustomStyles,inline_style} from './Styles';
import {BottomTabNavigation} from './EstateComponent';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ModalComponent} from './EstateComponent';
export const MyService = ({navigation,route}) => {
    return(
        <View style={CustomStyles('main_container_with_bottom_nav')}>
            <View style={CustomStyles('body_container_with_bottom_nav')}>
                <ScrollView>
                    <View style={CustomStyles('section_container')}>
                        <LinearGradient   colors={['#6DCC6D','#00921B']} style={inline_style.green_card}>
                            <View style={inline_style.green_card}>
                                <Text style={inline_style.green_card_header}>Bill & Payments</Text>
                                <Text style={inline_style.green_card_text}>Make payments for all your services seamlessly, all at once!</Text>
                            </View>
                        </LinearGradient>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <TouchableOpacity style={CustomStyles('horizontal_card')}
                            onPress={()=>navigation.navigate('InvoicesList')}
                        >
                            <Text style={inline_style.bills_payment_logo}>&#8358;</Text>
                            <Text style={inline_style.service_card_header}>Bills</Text>
                            <Text style={inline_style.horizontal_card_text}>These are your subscribed 
                            services and invoices. Please click here to pay.</Text>
                            <View style={inline_style.counter_container}>
                                <Text style={inline_style.counter}>2</Text>
                                <Text style={inline_style.counter_text}>Pending Payment</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <TouchableOpacity style={CustomStyles('horizontal_card')}
                        
                        >
                            {/* <Text style={inline_style.bills_payment_logo}>&#8358;</Text> */}
                            <Ionicons name="md-sunny" style={{color:'yellow',fontSize:30,marginBottom:20}} />
                            <Text style={inline_style.service_card_header}>Available Services</Text>
                            <Text style={inline_style.horizontal_card_text}>These are services provided by the estate
                            .Please click here to subscribed.</Text>
                            <View style={inline_style.counter_container}>
                                <Text style={inline_style.counter}>200</Text>
                                <Text style={inline_style.counter_text}>Available</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={CustomStyles('section_container')}>
                        <TouchableOpacity style={CustomStyles('horizontal_card')}
                        
                        >
                            <Ionicons name="md-clipboard" style={{fontSize:30,marginBottom:20,color:'green'}}/>
                            <Text style={inline_style.service_card_header}>Transaction History</Text>
                            <Text style={inline_style.horizontal_card_text}>View Your paid invoices here</Text>
                        </TouchableOpacity>
                    </View>
                    
                </ScrollView>
            </View>
            <View style={{height:'15%',backgroundColor:'white'}}>
                <BottomTabNavigation navigation={navigation} route={route}/>
            </View>
        </View>
    );
}

export const InvoicesList = ({navigation,route}) => {
    const [showModal,manageShowModalState] = useState(false);
    return(
        <View style={CustomStyles('main_container_with_bottom_nav')}>
            <View style={CustomStyles('body_container_with_bottom_nav')}>
                <ScrollView>
                        <View style={inline_style.section_container}>
                                <Text style={inline_style.card_outer_header}>Unsettled Bills</Text>
                                 <TouchableOpacity style={CustomStyles('horizontal_card_with_image')}
                                        onPress={()=>manageShowModalState(true)}
                                    >
                                        <View style={inline_style.horizontal_card_img_container}>
                                            <Ionicons name="md-clipboard" style={inline_style.card_icon}/>
                                        </View>
                                        <View style={inline_style.horizontal_card_text_container}>
                                            <Text style={CustomStyles('horizontal_card_header')}>Memmcol Electricity Ve...</Text>
                                            <Text style={inline_style.invoice_danger_date}>Already Due – 19 / 03 / 2019</Text>
                                        </View>
                                        <View style={{marginLeft:5}}>
                                            <Text style={CustomStyles('horizontal_card_header')}>&#8358;40,000</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={CustomStyles('horizontal_card_with_image')}

                                        >
                                        <View style={inline_style.horizontal_card_img_container}>
                                            <Ionicons name="md-clipboard" style={inline_style.card_icon}/>
                                        </View>
                                        <View style={inline_style.horizontal_card_text_container}>
                                            <Text style={CustomStyles('horizontal_card_header')}>Memmcol Electricity Ve...</Text>
                                            <Text style={inline_style.invoice_danger_date}>Already Due – 19 / 03 / 2019</Text>
                                        </View>
                                        <View style={{marginLeft:5}}>
                                            <Text style={CustomStyles('horizontal_card_header')}>&#8358;40,000</Text>
                                        </View>
                                    </TouchableOpacity>
                        </View>
                        <View style={inline_style.section_container}>
                                <Text style={inline_style.card_outer_header}>Latest Bills</Text>
                                 <TouchableOpacity style={CustomStyles('horizontal_card_with_image')}

                                    >
                                        <View style={inline_style.horizontal_card_img_container}>
                                            <Ionicons name="md-clipboard" style={inline_style.card_icon}/>
                                        </View>
                                        <View style={inline_style.horizontal_card_text_container}>
                                            <Text style={CustomStyles('horizontal_card_header')}>Memmcol Electricity Ve...</Text>
                                            <Text style={inline_style.invoice_date}>Already Due – 19 / 03 / 2019</Text>
                                        </View>
                                        <View style={{marginLeft:5}}>
                                            <Text style={CustomStyles('horizontal_card_header')}>&#8358;40,000</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={CustomStyles('horizontal_card_with_image')}

                                        >
                                        <View style={inline_style.horizontal_card_img_container}>
                                            <Ionicons name="md-clipboard" style={inline_style.card_icon}/>
                                        </View>
                                        <View style={inline_style.horizontal_card_text_container}>
                                            <Text style={CustomStyles('horizontal_card_header')}>Memmcol Electricity Ve...</Text>
                                            <Text style={inline_style.invoice_date}>Already Due – 19 / 03 / 2019</Text>
                                        </View>
                                        <View style={{marginLeft:5}}>
                                            <Text style={CustomStyles('horizontal_card_header')}>&#8358;40,000</Text>
                                        </View>
                                    </TouchableOpacity>
                        </View>
                    
                    
                </ScrollView>
            </View>
            <ModalComponent showModal={showModal} manageShowModalState={manageShowModalState} navigation={navigation} params={{}} message="Please be informed that you will be charged an additional ₦15.00 as the payment processing fee. The total amount to pay is: ₦40,015.00" modal_title="Alert!" endpoint="/api/users/principal_chooses_apartment" navigate_to="ConfirmationScreen"route_info={{title:'Transaction Successful!',body:'This transaction has been authorised! Your payment for Power Outage is Successful!',screen:'MyService',button_text:'Continue'}}/>
            <View style={{height:'15%',backgroundColor:'white'}}>
                <BottomTabNavigation navigation={navigation} route={route}/>
            </View>
        </View>

    );
}
