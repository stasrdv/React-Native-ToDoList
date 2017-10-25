import React from 'react';
import { StyleSheet, Text, View, Platform,AppRegistry } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import LoginRender from './components/LoginRender'
import todoListview from './components/todoListview'
import LoginAndroid from './components/LoginAndroid'
import cameraComponent  from './components/cameraComponent'
import registerComponent from './components/registerComponent'



export default class App extends React.Component {

  render() {
    return (
      <AppRouter></AppRouter>
    );
  }
}

export const AppRouter = StackNavigator({
  LoginRender: { screen: LoginRender },
  todoListview: { screen: todoListview },
  cameraComponent:{screen:cameraComponent},
  registerComponent:{screen:registerComponent}
 
});

AppRegistry.registerComponent('AppRouter', () => AppRouter);





