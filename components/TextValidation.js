
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    AsyncStorage,
    Platform
} from 'react-native';
 
import Input from '../Input'



export default class TextValidation extends Component {
 
    constructor(props){
       
        super(props);
        this.state = {
            value: '',
            valid:false,
         
            
         }
    }
 
    onChangeText(text){
        this.setState({value:text})
            if(text.length>=2) {
                this.setState({valid:true})
            } else{
                this.setState({valid:false})
             }
     
        
 
     }
 
     render(){
         return(
            <Input
            onChangeText= {this.onChangeText.bind(this)}
            placeholder='enter name'
            value = {this.state.value} 
            errorStyle  = {globalStyle.erorInput}   
            style={globalStyle.inputStyle} 
            valid = {this.state.valid}
            errorMsg={(this.state.valid ? '' : 'enter corect name')}
            />
            
         );
     }


}