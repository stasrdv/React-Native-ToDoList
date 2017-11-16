import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,Button,AsyncStorage
} from 'react-native'

import LoginIOS from './LoginIOS'


export default class LoginRender extends React.Component {
 

  componentDidMount() {
    
        AsyncStorage.getItem("token").then((value) => {
         

         if(value){
           navigate('todoListview');
         }
        }).done();
      }




    render () {
      navigate  = this.props.navigation.navigate;
      
      return (

        
        <View >
         <LoginIOS navigation={navigate}/>
        </View>
      );
    }
  }
 
  

  
  