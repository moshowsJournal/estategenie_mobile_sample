import React from 'react';

export const CustomStyles = (style_name) => {
    console.log(style_name);
    switch(style_name){
        case 'login_nav_content':
            return {
                color: 'green',
                textAlign:'center',
                padding: 10,
                lineHeight:30,
                letterSpacing:0.3,
                fontSize: 30,
                fontFamily: 'Galada-Regular',
                fontStyle:'normal',
                fontWeight:'normal'
            }

            case 'nav_container':
            return {
                backgroundColor : '#FFFFFF',
                boxShadow: "0px 12px 23px rgba(58, 111, 175, 0.08)",
                padding:20,
                paddingTop:30
            }
            case 'body_container':
            return {
                backgroundColor: '#E5E5E5',
                padding:15,
                height:'100%',
                paddingTop:30

            }
            case 'header_text':
            return {
                fontFamily: 'Galano Grotesque',
                fontSize: 24,
                lineHeight: 36,
                fontWeight:'bold',
                textAlign: 'center',
                //letterSpacing: '0.06em',
                color: '#111111'
            }
            case 'p_text':
                return{
                    fontFamily: 'Galano Grotesque',
                    fontSize: 14,
                    lineHeight: 19,
                    textAlign: 'center',
                    color: '#737A91'
                }
            case 'section_container':
                return{
                    margin: 20
                }
            case 'label_text':
                return{
                    fontFamily: 'Galano Grotesque',
                    fontSize: 14,
                    lineHeight: 19,
                    color: '#737A91',
                    marginBottom:5
                }
            case 'input_field':
                return{
                    backgroundColor: '#FFFFFF',
                    borderColor:'#00921B',
                    borderWidth: 2,
                    color: 'black',
                    borderRadius: 6,
                    paddingLeft:20
                }
            case 'form_group':
                return{
                    marginTop:5,
                    marginBottom:5
                }
            case 'submit_button':
                return{
                    backgroundColor: '#00921B',
                    borderRadius: 6,
                    padding:10
                }
            case 'submit_button_text':
                return{
                    fontFamily: 'Galano Grotesque',
                    fontSize: 14,
                    lineHeight: 22,
                    textAlign: 'center',
                    letterSpacing: 0.03,
                    color: '#FFFFFF'
                }
        default:
            return {

            }
    }
}