import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage, Button,KeyboardAvoidingView } from 'react-native'




class Inputs extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      textLength: 0,
      isEmailValid:false,
      isPassworValid:false

    }
    this.inputValidator=this.inputValidator.bind(this)
  }




  handleEmail = (text) => {
    this.setState({ email: text })
    this.validateEmail(this.state.email) ? this.setState({isEmailValid:true}):this.setState({isEmailValid:false})
  }

  handlePassword(text) {
    this.setState({ password: text })
    this.setState({
      textLength: text.length,
    });
    text.length >= 4  ? this.setState({isPassworValid:true}):this.setState({isPassworValid:false})
    
  }


  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateEmailStyle() {
    if (this.state.email.length > 0) {
      if (this.validateEmail(this.state.email)) {
        return {
          margin: 15,
          height: 40,
          borderColor: 'green',
          borderWidth: 1
        }
      }
      else {
        return {
          margin: 15,
          height: 40,
          borderColor: 'red',
          borderWidth: 1
        }
      }
    }
    else{
      return {
        margin: 15,
        height: 40,
        borderColor: 'blue',
        borderWidth: 1
      }
    }


  }

  validatePasswordStyle() {
    if (this.state.textLength == 0) {
      return {
        margin: 15,
        height: 40,
        borderColor: 'blue',
        borderWidth: 1
      }
    }
    if (this.state.textLength < 4) {
      return {
        margin: 15,
        height: 40,
        borderColor: 'red',
        borderWidth: 1
      }
    }
    if (this.state.textLength >=4) {
  
      return {
        
        margin: 15,
        height: 40,
        borderColor: 'green',
        borderWidth: 1
      }
    }

  }
  inputValidator(){
    if(this.state.isEmailValid && this.state.isPassworValid){
      
      return false 
    }
    return true
    
  }


  render() {

    return (
      <View style={styles.container}>
      
        <TextInput
          style={this.validateEmailStyle()}
          onChangeText={this.handleEmail.bind(this)}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="#12303A"
          autoCapitalize="none"
        />
        <TextInput
          style={this.validatePasswordStyle()}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#12303A"
          autoCapitalize="none"
          onChangeText={this.handlePassword.bind(this)}
        />
        <TouchableOpacity
          disabled={this.inputValidator()}
          style={styles.submitButton}
          onPress={
            () =>
              //transfer data to  component (LoginIos)
              this.props.login(this.state.email, this.state.password)
          }>
          <Text style={styles.submitButtonText}> Submit </Text>
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
  submitButtonText: {
    color: 'white'
  }
})