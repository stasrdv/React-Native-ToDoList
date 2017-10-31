import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, AsyncStorage,Image
} from 'react-native'
import Inputs from './Inputs'


export default class registerComponent extends React.Component {
    constructor() {

        super();

        state = {
            value: ''
        }
        radio_props = [
            { label: 'Male', value: 0 },
            { label: 'Female', value: 1 }
        ];
    }

    register = (email, pass) => {
        return fetch('http://todos.moonsite.co.il/api/register', {
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
                AsyncStorage.setItem("token", responseJson.token).then(() => {
                    navigate('todoListview')
                })


            })
            .catch((error) => {

                alert('User already Exists')



            });



    }


    render() {

        return (
            <View>
             <Image source={require('../assets/user.png')} style={styles.image} />
                <Inputs login={this.register} />
            </View>

        );
    }
}
const styles = StyleSheet.create({
    
    image: {
      left: 80,
      width: 200,
      height: 200,
  
    },
  
  })
  




