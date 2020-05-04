import React from 'react';
import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';

export const processPostRequest = async (url,requestData) => {
    /**
     * --url,
     * --data,
     * --token
     * http://127.0.0.1:8000/api/users/resident_register?email=olamilekan_lokoso@gmail.com&firstname=Olaoluwa&surname=Adewale&password=password&phone=08140812969
     */
    console.log(url);
    try{
        try {
            const res = await axios.post(url, requestData);
            return res.data.response;
        }
        catch (error) {
            return error;
        }
    }catch(err){
        console(err);
    }
}

export const processGetRequestWithToken = async (url) => {
    /**
     * --url,
     * --data,
     * --token
     * http://127.0.0.1:8000/api/users/resident_register?email=olamilekan_lokoso@gmail.com&firstname=Olaoluwa&surname=Adewale&password=password&phone=08140812969
     */
    try{
        try {
            const api_token = await AsyncStorage.getItem('api_token');
            console.log('......token......');
            console.log(api_token);
            const res = await axios.get(url, {
                headers:{Authorization : `Bearer ${api_token}`}
            });
            console.log(res)
            return res.data.response;
        }
        catch (error) {
             console.log(error);
        }
    }catch(err){
        console(err);
    }
}

export const ProcessLoginRequest = async (url,requestData) => {
    /**
     * --url,
     * --data,
     * --token
     * http://127.0.0.1:8000/api/users/resident_register?email=olamilekan_lokoso@gmail.com&firstname=Olaoluwa&surname=Adewale&password=password&phone=08140812969
     */
    console.log(url);
    try{
        try {
            const res = await axios.post(url, requestData);
            if(res.data.response.code === 200){
                await AsyncStorage.setItem('first_name', res.data.response.user.firstname);
                await AsyncStorage.setItem('last_name', res.data.response.user.surname);
                await AsyncStorage.setItem('api_token', res.data.response.user.api_token);
            }
            return res.data.response;
        }
        catch (error) {
            return error;
        }
    }catch(err){
        console(err);
    }
}

export const TextFieldRules = (type,value) => {
    switch(type){
        case 'email':
           return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? value : false;
           
        default:
            return false;
 
    }
}