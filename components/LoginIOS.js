import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated, Easing, Dimensions, Image, Button, AsyncStorage
} from 'react-native'
const { height, width } = Dimensions.get('window');
import Inputs from './Inputs'



export default class LoginIOS extends React.Component {
  
  //set props for navigation ( i used   stacknavigator inside App.js for whole app)
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.ValueXY({ x: width, y: -height }),
    }
    const navigate = props.navigation;

  }

  componentDidMount() {
    Animated.sequence([
      Animated.spring(this.state.position, {
        toValue: { x: width, y: 0 },
        tension: 5

      }),

    ]).start();
  }

  login = (email, pass) => {
    return fetch('http://todos.moonsite.co.il/api/login', {
      method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pass

        // email:"mor@test.com",
        // password:"1234"

      })
    })

      .then((response) => response.json())
   
      .then((responseJson) => {
        this.imaFadegeAnimation();
        AsyncStorage.setItem("token", responseJson.token).then(()=>{
          navigate('todoListview')
        })
        


      })
      .catch((error) => {
        alert('Wrong Email or Password')
        this.imageShakeAnimation() 
      

      });
     
      

  }

  imaFadegeAnimation() {
    Animated.sequence([
      Animated.spring(this.state.position, {
        toValue: { x: width, y: height },
        tension: 10
      }),



    ]).start();

  }


  imageShakeAnimation() {
    
    Animated.sequence([
      // Animated.spring(this.state.position, {
    
      Animated.spring(this.state.position, {
        toValue: { x:width, y: height/6 },
        //bounciness:12,
        speed: 100,
        
      }),
      Animated.spring(this.state.position, {
        toValue: { x:width, y: -height/6 },
        speed: 100,
        
      }),
      Animated.spring(this.state.position, {
        toValue: { x: width, y: 0 },
        speed:100,
        bounciness:15

      }),

    ]).start();

  }

 

  render() {
    const { position } = this.state;
    const { image, container } = styles;

    return (
      <View>
   
        <Animated.View style={{ transform: [{ translateY: position.y }] }} >
          <Image source={require('../assets/chenurashka.png')} style={image} />
        </Animated.View>
        <Inputs login={this.login} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303841',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

  },
  image: {

    width: 300,
    height: 300,

  },

})




