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
import {Login,SignUp,LogoSection,VerificationSuccessful, EnterVerificationPin} from './src/Components/HomeComponent'; 
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {onChageOfInputField} from './src/functions/HomeFunction';

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
                          name="SignUp"
                          component={SignUp}
                      /> 
                      <Stack.Screen
                        name="VerificationSuccessful"
                        component={VerificationSuccessful}
                      />
                      <Stack.Screen
                          name="EnterVerificationPin"
                          component={EnterVerificationPin}
                      />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
const Stack = createStackNavigator();
export default App;
