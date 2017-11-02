import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, AsyncStorage, Image
} from 'react-native'
import Inputs from './Inputs'
import Spinner from 'react-native-loading-spinner-overlay';
export default class registerComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            value: '',
            visible: false
        }

    }

    register = (email, pass) => {
        this.setState({ visible: true })
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
                this.setState({ visible: false })
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
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: '#2E78A3' }} />
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





