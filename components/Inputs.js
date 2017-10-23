import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,AsyncStorage } from 'react-native'




class Inputs extends Component {
  constructor(){
    super();
    
    this.state = {
      email: '',
      password: '',
      
   }
  }

   handleEmail = (text)=> {
      this.setState({ email: text })
   }
   handlePassword = (text) =>{
      this.setState({ password: text })
   }



   render(){

      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
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
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})