import React from 'react';
import axios from 'axios';


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
export const TextFieldRules = (type,value) => {
    switch(type){
        case 'email':
           return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? value : false;
           
        default:
            return false;
 
    }
}