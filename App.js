/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React , {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Login,SignUp,LogoSection,VerificationSuccessful, EnterVerificationPin,ForgotPassword,PasswordReset,ConfirmationScreen,OverView,NavBarRightMenu,BottomTabNavigation} from './src/Components/HomeComponent'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {FindYourEstate,UseEstateCodeNavItem,FindByEstateCode,ApartmentsInEstate,ApartmentSelectedConfirmation} from './src/Components/EstateComponent';
import {MyProfile, EditProfile,UpdatePassword} from './src/Components/ProfileComponent';
import {MyApartments, ApartmentDetails, AddOccupant,OccupantDetails} from './src/Components/ApartmentComponent';
import {MyService,InvoicesList} from './src/Components/ServiceComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomStyles } from './src/Components/Styles';

class App extends Component{
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator
                  
                  screenOptions={{
                    headerTitleAlign:'center',
                    headerStyle:{
                    },
                    headerTitle: props => (<LogoSection />)
                  }}
                >
                      
                    
                      
                      {/* <Stack.Screen 
                          name="Login"
                          component={Login}
                      /> */}
                      <Stack.Screen
                          name="MyApartments"
                          component={MyApartments}
                          options={ ({navigation,route}) => {
                            return{
                              headerTitleAlign:'left',
                            headerStyle:{
                              backgroundColor:'#FAFAFA'
                            },
                            headerTintColor : "black",
                            headerTitleStyle:{
                                fontWeight:'bold',
                                fontSize:18
                            },
                            headerTitle: "My Apartments",
                            headerRight : () => (
                              <NavBarRightMenu navigation={navigation} route={route}/>
                            ),
                            }
                        }}
                      />

                      <Stack.Screen 
                        name="InvoicesList"
                        component={InvoicesList}
                        options={({navigation,route})=>{
                          return{
                              headerTitleAlign:'left',
                              headerStyle:{
                                backgroundColor:'#FAFAFA'
                              },
                              headerTintColor : "black",
                              headerTitleStyle:{
                                  fontWeight:'bold',
                                  fontSize:18
                              },
                              headerTitle: "My Services",
                              headerRight : () => (
                                <NavBarRightMenu navigation={navigation} route={route}/>
                              ),
                          }
                        }}
                        
                      />

                      <Stack.Screen 
                          name="MyService"
                          component={MyService}
                          options={({navigation,route})=>{
                            return{
                                headerTitleAlign:'left',
                                headerStyle:{
                                  backgroundColor:'#FAFAFA'
                                },
                                headerTintColor : "black",
                                headerTitleStyle:{
                                    fontWeight:'bold',
                                    fontSize:18
                                },
                                headerTitle: "My Services",
                                headerRight : () => (
                                  <NavBarRightMenu navigation={navigation} route={route}/>
                                ),
                            }
                          }}
                      
                      />

                      <Stack.Screen 
                          name="ApartmentDetails"
                          component={ApartmentDetails}
                          options={({navigation,route})=>{
                            return{
                              headerTitleAlign:'left',
                              headerStyle:{
                                backgroundColor:'#FAFAFA'
                              },
                              headerTintColor : "black",
                              headerTitleStyle:{
                                  fontWeight:'bold',
                                  fontSize:18
                              },
                              headerTitle: route.params.apartment_name,
                              headerRight : () => (
                                <NavBarRightMenu navigation={navigation} route={route}/>
                              ),
                            }
                          }}
                      />
                        <Stack.Screen 
                          name="OccupantDetails"
                          component={OccupantDetails}
                          options={({navigation,route})=>{
                            return{
                              headerTitleAlign:'left',
                              headerStyle:{
                                backgroundColor:'#FAFAFA'
                              },
                              headerTintColor : "black",
                              headerTitleStyle:{
                                  fontWeight:'bold',
                                  fontSize:18
                              },
                              headerTitle: `${route.params.first_name} ${route.params.surname}`,
                              headerRight : () => (
                                <NavBarRightMenu navigation={navigation} route={route} />
                              ),
                            }
                          }}
                        
                        />
                        <Stack.Screen 
                            name="AddOccupant"
                            component={AddOccupant}
                            options={({navigation,route})=>{
                              return{
                                headerTitleAlign:'left',
                                headerStyle:{
                                  backgroundColor:'#FAFAFA'
                                },
                                headerTintColor : "black",
                                headerTitleStyle:{
                                    fontWeight:'bold',
                                    fontSize:18
                                },
                                headerTitle: route.params.route_name,
                                headerRight : () => (
                                  <NavBarRightMenu navigation={navigation} route={route}/>
                                ),
                              }
                            }}
                        />

                        <Stack.Screen
                          name="FindYourEstate"
                          component={FindYourEstate}
                          options={ ({navigation}) => {
                            return{
                              headerTitleAlign:'left',
                            headerStyle:{
                              backgroundColor:'#FAFAFA'
                            },
                            headerTintColor : "black",
                            headerTitleStyle:{
                                fontWeight:'bold',
                                fontSize:18
                            },
                            headerTitle: "Find Your Estate",
                            headerRight : () => (
                              <UseEstateCodeNavItem navigation={navigation}/>
                            ),
                            }
                        }}
                      />
                      <Stack.Screen
                          name="MyProfile"
                          component={MyProfile}
                          options={ ({navigation}) => {
                            return{
                              headerTitleAlign:'left',
                              headerStyle:{
                                backgroundColor:'#FAFAFA'
                              },
                              headerTintColor : "black",
                              headerTitleStyle:{
                                  fontWeight:'bold',
                                  fontSize:18
                              },
                              headerTitle: "My Profile",
                            }
                        }}
                      />

                      <Stack.Screen 
                        name="UpdatePassword"
                        component={UpdatePassword}
                        options={ ({navigation}) => {
                            return{
                              headerTitleAlign:'left',
                              headerStyle:{
                                backgroundColor:'#FAFAFA'
                              },
                              headerTintColor : "black",
                              headerTitleStyle:{
                                  fontWeight:'bold',
                                  fontSize:18
                              },
                              headerTitle: "Update Password",
                            }
                        }}
                      />

                      <Stack.Screen 
                          name="EditProfile"
                          component={EditProfile}
                          options={() =>{
                              return{
                                headerTitleAlign:'left',
                                headerTitle:'Edit Profile',
                                headerStyle:{
                                  backgroundColor:'#FAFAFA'
                                },
                                headerTintColor : "black",
                                headerTitleStyle:{
                                    fontWeight:'bold',
                                    fontSize:18
                                }
                              }
                          }}
                      
                      />

                      <Stack.Screen
                          name="Overview"
                          component={OverView}
                          options={ ({navigation,route}) => {
                            return{
                              headerTitleAlign:'left',
                              headerStyle:{
                                backgroundColor:'#FAFAFA'
                              },
                              headerTintColor : "black",
                              headerTitleStyle:{
                                  fontWeight:'bold',
                                  fontSize:18
                              },
                              headerTitle: "Overview",
                              headerRight : () => (
                                <NavBarRightMenu navigation={navigation} route={route}/>
                              ),
                            }
                        }}
                      />
                      

                        <Stack.Screen
                          name="ApartmentsInEstate"
                          component={ApartmentsInEstate}
                          options={ ({navigation,route}) => {
                            return{
                              headerTitleAlign:'left',
                              headerStyle:{
                                backgroundColor:'#FAFAFA'
                              },
                              headerTintColor : "black",
                              headerTitleStyle:{
                                  fontWeight:'bold',
                                  fontSize:18
                              },
                              headerTitle: route.params.estate_name,
                            }
                        }}
                      />

<Stack.Screen
                          name="ApartmentSelectedConfirmation"
                          component={ApartmentSelectedConfirmation}
                          options={ ({navigation,route}) => {
                            return{
                              headerTitleAlign:'left',
                              headerStyle:{
                                backgroundColor:'#FAFAFA'
                              },
                              headerTintColor : "black",
                              headerTitleStyle:{
                                  fontWeight:'bold',
                                  fontSize:18
                              },
                              headerTitle: 'Apartment Selected'
                            }
                        }}
                      />



                      <Stack.Screen
                          name="FindByEstateCode"
                          component={FindByEstateCode}
                          options={({navigation}) => {
                            return{
                              headerTitleAlign:'left',
                              headerStyle:{
                                backgroundColor:'#FAFAFA'
                              },
                              headerTintColor : "black",
                              headerTitleStyle:{
                                  fontWeight:'bold',
                                  fontSize:18
                              },
                              headerTitle: "Find Your Estate with Code",
                          }
                          }}
                      >

                      </Stack.Screen>
                      <Stack.Screen
                        name="ConfirmationScreen"
                        component={ConfirmationScreen}
                      />
                      <Stack.Screen
                          name="ForgotPassword"
                          component={ForgotPassword}
                      />
                      <Stack.Screen
                        name="PasswordReset"
                        component={PasswordReset}
                      />
                      <Stack.Screen 
                          name="SignUp"
                          component={SignUp}
                      /> 
                      <Stack.Screen
                          name="EnterVerificationPin"
                          component={EnterVerificationPin}
                      />
                      <Stack.Screen
                        name="VerificationSuccessful"
                        component={VerificationSuccessful}
                      />
                      
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
const Stack = createStackNavigator();
export default App;
