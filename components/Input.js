
import React from 'react';
import {
    View,
    TextInput,
    Keyboard,
    Platform,
    StyleSheet,
    Text,
} from 'react-native';
 
import { style }  from './style';
import {globalStyle} from '../../assets/styles/globalStyle'
 
class Input extends React.Component{
 
   
    constructor(props){
        super(props)
        this.state={
            value:'',       
        }
    }
   
 
render(){
    return (
        <View>
         <TextInput
            onChangeText={(text) =>this.props.onChangeText(text)}
            style={[this.props.style, (this.props.valid ? {} : this.props.errorStyle)]}
            placeholder={this.props.placeholder}
            keyboardType={this.props.keyboardType}
            value={this.props.value}
          >
          
        </TextInput>
        <Text style={globalStyle.errorMsgStyle} >{this.props.errorMsg}</Text>
        </View>
        )
}
 }
 
export default Input;
 
const styles=StyleSheet.create({
 
    inpuDiv:{
        width:200,
        height:50,
        borderWidth:1,
        borderRadius: 5,
        textAlign:'center'
    },
 
})
