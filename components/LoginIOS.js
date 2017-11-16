import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated, Easing, Dimensions, Image, Button, AsyncStorage, KeyboardAvoidingView
} from 'react-native'
const { height, width } = Dimensions.get('window');
import Inputs from './Inputs'
import Moment from 'react-moment';
import 'moment-timezone';
import Spinner from 'react-native-loading-spinner-overlay';

export default class LoginIOS extends React.Component {

  //set props for navigation ( i used   stacknavigator inside App.js for whole app)
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.ValueXY({ x: width, y: -height }),
      visible: false
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
    this.setState({ visible: true })
    return fetch('http://todos.moonsite.co.il/api/login', {
      method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pass

      })
    })

      .then((response) => response.json()) 
      .then((responseJson) => {
        if(responseJson!="email or password mismatch"){
          this.imaFadegeAnimation();
          this.setState({ visible:false })
          AsyncStorage.setItem("token", responseJson.token).then(() => {
            navigate('todoListview')
          })
        }
        else{
          this.imageShakeAnimation()
          this.setState({ visible: false })
          
        }
      })
      .catch((error) => {
        alert('CONNECTION ERROR')
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
        toValue: { x: width, y: height / 6 },
        //bounciness:12,
        speed: 100,

      }),
      Animated.spring(this.state.position, {
        toValue: { x: width, y: -height / 6 },
        speed: 100,

      }),
      Animated.spring(this.state.position, {
        toValue: { x: width, y: 0 },
        speed: 100,
        bounciness: 15

      }),

    ]).start();
  }

  render() {
    const { position } = this.state;
    const { image, container } = styles;

    return (
      <KeyboardAvoidingView
        behavior="padding">
        <Animated.View style={{ transform: [{ translateY: position.y }] }} >
          <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: '#2E78A3' }} />
          <Image source={require('../assets/logo.png')} style={styles.image} />
        </Animated.View>

        <Inputs login={this.login} />
        <Button
          
          onPress={
            () => navigate('registerComponent')
          }
          title="Register"

        />
      </KeyboardAvoidingView>
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
    left: 80,
    width: 200,
    height: 200,

  },

})




