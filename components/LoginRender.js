import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,Button
} from 'react-native'

import LoginAndroid from './LoginAndroid'
import LoginIOS from './LoginIOS'



export default class LoginRender extends React.Component {
 
    render () {
      navigate  = this.props.navigation.navigate;
      
      return (

        
        <View style={welcomeTextStyle.container}>
        {Platform.OS =='ios' ?  <LoginIOS navigation={navigate}/>:<LoginAndroid navigation={navigate}/>} 
        </View>
      );
    }
  }
  const welcomeTextStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  });
  

  
  