import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,AsyncStorage,Button } from 'react-native'




class Inputs extends Component {
  constructor(){
    super();
   
    this.state = {
      email: '',
      password: '',
      textLength: 0,
      
   }
  }

   handleEmail = (text)=> {
      this.setState({ email: text })
   }
   handlePassword = (text) =>{
      this.setState({ password: text })
   }



   onChangeText(text){
    this.setState({ email: text })
    this.setState({
      textLength: text.length,
    });
  
  }

  styleRender() {
    if(this.state.textLength==0){
      return {
        margin: 15,
        height: 40,
        borderColor: 'blue',
        borderWidth: 1
      }
    }
    if(this.state.textLength<4 ||this.state.textLength>6){
      return {
        margin: 15,
        height: 40,
        borderColor: 'red',
        borderWidth: 1
      }
    }
    if(this.state.textLength>=4 &&this.state.textLength<=6){
      return {
        margin: 15,
        height: 40,
        borderColor: 'green',
        borderWidth: 1
      }
    }
    this.setState({ email: text })
  }

  navigateToQR(){

  }

   render(){
   
      return (
         <View style = {styles.container}>
<Button
onPress={
    ()=>navigate('cameraComponent')
}
  title="QR Scanner"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
         
            <TextInput 

            style = {this.styleRender()}
            onChangeText={this.onChangeText.bind(this)}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               />
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  ()=>
                  //transfer data to  component (LoginIos)
                  this.props.login(this.state.email, this.state.password)
                  }>
               <Text style = {styles.submitButtonText}> Login </Text>
             
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: 'blue',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#008CBA',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})