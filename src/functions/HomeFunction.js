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
    try {
        let user_information = await AsyncStorage.getItem('user_information');
        console.log('......token......');
        const res = await axios.get(url, {
            headers:{Authorization : `Bearer ${JSON.parse(user_information).$_api_token}`}
        });
        console.log('........ response ..........');
        return res.data.response;
    }
    catch (error) {
         console.log(error);
         return error;
    }
}

export const processPostRequestWithToken = async (url,requestData) => {
    /**
     * --url,
     * --data,
     * --token
     * http://127.0.0.1:8000/api/users/resident_register?email=olamilekan_lokoso@gmail.com&
     * firstname=Olaoluwa&surname=Adewale&password=password&phone=08140812969
     */
    try {
        const user_information = await AsyncStorage.getItem('user_information');
        console.log(requestData);
        const res = await axios.post(url, requestData,{
            headers:{Authorization : `Bearer ${JSON.parse(user_information).$_api_token}`}
        });
        return res.data.response;
    }
    catch (error) {
         console.log(error);
    }
}

export const processFormDataRequestWithToken = async (url,requestData) => {
    /**
     * --url,
     * --data,
     * --token
     * http://127.0.0.1:8000/api/users/resident_register?email=olamilekan_lokoso@gmail.com&
     * firstname=Olaoluwa&surname=Adewale&password=password&phone=08140812969
     */
    try {
        const user_information = await AsyncStorage.getItem('user_information');
        console.log(requestData);
        const res = await axios.post(url, requestData,{
            headers:{
                Authorization : `Bearer ${JSON.parse(user_information).$_api_token}`,
                'Content-Type' : 'multipart/form-data'
            }
        });
        return res.data.response;
    }
    catch (error) {
         console.log(error);
    }
}

export const ProcessLoginRequest = async (url,requestData) => {
    /**
     * --url,
     * --data,
     * --token
     * http://127.0.0.1:8000/api/users/resident_register?email=olamilekan_lokoso@gmail.com
     * &firstname=Olaoluwa&surname=Adewale&password=password&phone=08140812969
     */
    console.log(url);
    try{
        try {
            const res = await axios.post(url,requestData);
            console.log(res);
            if(res.data.response.code === 200){
                let user_information = {
                    $_first_name : res.data.response.user.firstname,
                    $_last_name : res.data.response.user.surname,
                    $_api_token : res.data.response.user.api_token,
                    $_email_address: res.data.response.user.email,
                    $_profile_image : res.data.response.user.user_photo,
                    $_phone : res.data.response.user.phone
                }
                await AsyncStorage.setItem('user_information',JSON.stringify(user_information));
            }
            return res.data.response;
        }
        catch (error) {
            console.log('--- Axios has error ---');
            console.log(error);
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

export const getLocalStorageInformation = async () => {
    console.log('... getting the information ...');
    let user_information = await AsyncStorage.getItem('user_information');
    console.log(user_information);
    return JSON.parse(user_information);
}