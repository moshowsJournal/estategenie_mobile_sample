import React from 'react';

export const CustomStyles = (style_name) => {
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
                fontWeight:'normal',
                marginTop:20
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
                backgroundColor: '#f9fafa',
                padding:15,
                flex:1,
                paddingTop:30

            }
            case 'body_container_with_bottom_nav':
            return {
                backgroundColor: '#f9fafa',
                padding:15,
                flex:1,
                paddingTop:30,
                height:'85%'

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
            case 'green_text':
                return{
                    fontFamily: 'Galano Grotesque',
                    fontSize: 14,
                    lineHeight: 19,
                    textAlign: 'center',
                    color: '#00921B'
                }
                case 'use_estate_code_text':
                return{
                    fontFamily: 'Galano Grotesque',
                    fontSize: 14,
                    lineHeight: 19,
                    textAlign: 'center',
                    color: '#00921B'
                }
                case 'use_estate_code_icon':
                return{
                    marginTop:4,
                    marginRight:5,
                    color: '#00921B'
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
                    marginBottom:5,
                    width:'100%'
                }

                case 'horizontal_card':
                    return{
                        flex:1,
                        backgroundColor:'white',
                        marginTop:5,
                        marginBottom:5,
                        padding:15,
                        borderRadius:5,
                        borderWidth:1,
                        borderColor:'#DFE2E6'
                    }

                    case 'horizontal_card_with_image':
                        return{
                            flex:1,
                            flexDirection:'row',
                            backgroundColor:'white',
                            marginTop:5,
                            marginBottom:5,
                            padding:15,
                            borderRadius:5,
                            borderWidth:1,
                            borderColor:'#DFE2E6'
                        }
                    case 'card_outer_header':
                        return{fontWeight:'bold',fontSize:15,marginBottom:10,marginTop:5}
            
                case 'horizontal_card_header':
                    return{
                        fontFamily: 'Galano Grotesque',
                        fontSize: 14,
                        color: '#737A91',
                        marginBottom:5,
                        fontWeight:'bold',
                        width:'100%'
                    }
            case 'floating_input_field':
                return{
                    borderWidth:2,
                    borderColor:'#00921B',
                    padding:10,
                    fontSize:30,
                    fontWeight:'bold',
                    letterSpacing:5,
                    textAlign:'center'
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
                    padding:15
                }
            case 'submit_button_text':
                return{
                    fontFamily: 'Galano Grotesque',
                    fontSize: 14,
                    lineHeight: 22,
                    textAlign: 'center',
                    letterSpacing: 0.03,
                    color: '#FFFFFF',
                    fontWeight:'bold'
                }
                case 'aware_scroll_view':
                return{
                      flex:1,
                    backgroundColor: '#f9fafa',
                }
                case 'image_file':
                    return {
                        resizeMode:'contain',
                    }
                case 'image_container':
                    return {
                        alignItems:'center'
                        
                    }
                case 'green_card':
                    return{
                        padding:30,
                        backgroundColor:'#EFFFDA',
                        borderRadius:6,
                        borderWidth:2,
                        borderColor:'#00921B',
                        alignItems:'center'

                    }
                    case 'modal_body':
                        return{
                            height:150,
                            justifyContent:'center'
                        }
                case 'green_card_text':
                    return{
                        textAlign:'center',
                        lineHeight:30
                    }
                case 'main_navbar':
                    return{
                        backgroundColor: '#FAFAFA',
                        flex:1,
                        flexDirection:'row',
                        padding:10
                    }
                case 'navbar_title':
                    return{
                        flex:1,
                        padding:5
                    }
                case 'navbar_icons' :
                    return{
                        flex:1,
                        padding:5
                    }
                case 'greeting_text':
                    return {
                        fontSize:20,
                        fontWeight:'bold',
                        color:'#737A91'
                    }
                case 'card_container':
                    return{
                        flexDirection:'row',
                        justifyContent:'space-around',
                        flexWrap:'wrap'
                    }
                case 'card':
                    return{
                        padding:20,
                        backgroundColor:'#FFFFFF',
                        borderRadius:5,
                        marginBottom:20,
                        width:160
                    }
                case 'card_header':
                    return {
                        padding:5,
                        borderBottomWidth:1,
                        borderColor:'#DFE2E6'
                    }
                case 'card_header_text':
                    return{
                        color: '#737A91',
                        fontWeight: 'bold'
                    }
                case 'card_body_text':
                    return{
                        color:'#3B3B3B',
                        fontWeight:'bold',
                        fontSize:30

                    }
                case 'card_footer_text' : 
                    return {
                        marginTop:10,
                        color:'#00921B'
                    }
                case 'navigation_menu_list' :
                    return {
                        position:'absolute',
                        width:200,
                        right:10,
                        backgroundColor: '#FFFFFF',
                        padding: 15,
                        borderRadius:5,
                        top:40,
                        borderWidth:1,
                        borderColor:'#DFE2E6',
                        zIndex:999
                    }
                    case 'navigation_menu_item' :
                    return {
                        padding:6,
                        borderBottomWidth:1,
                        borderColor:'#DFE2E6'
                    }
                    case 'bottom_navigation_container' :
                        return {
                            width:'100%',
                            backgroundColor: '#FFFFFF',
                            padding: 15,
                            flexDirection:'row',
                            height:100,
                            position:'absolute',
                            bottom:10
                        }
                    case 'nav_item' :
                    return {
                        padding:6,
                        flex:1,
                        justifyContent:'space-around',
                        alignItems:'center'
                    }
                case 'bottom_nav_icons':
                    return{
                        fontSize:25,
                        color:'#DFE2E6'
                    }
                case 'bottom_nav_text' : 
                    return{
                        color:'#DFE2E6'
                    }
                case 'clicked_bottom_nav_icons':
                    return{
                        fontSize:25,
                        color:'#00921B'
                    }
                case 'clicked_bottom_nav_text' : 
                    return{
                        color:'#00921B'
                    }
                case 'main_container_with_bottom_nav':
                    return{
                        flex:1
                    }
                    
        default:
            return {

            }
    }
}