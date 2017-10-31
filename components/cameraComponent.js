import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View, WebView
} from 'react-native';
import Camera from 'react-native-camera';


export default class cameraComponent extends Component {


  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      url: '',
      isCameroOpen: true,
    }

    this.barcodeReceived = this.barcodeReceived.bind(this)
  }

  barcodeReceived(e) {

    if (e.data.length > 1) {
      this.setState({ url: e.data })


    }

  }

  toggleWebView(){

  }
  toggleCamera() {
    if (this.state.url) {
      return {
        wiidth: 0,
        height: 0
      }
    }
    else {
      return {
        height: 200,
        width: 200,
        left: 90,
        top: 180,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
      }
    }

  }

  render() {
    return (
      <View style={styles.container}>

        {/* <WebView
          
          source={{
            uri:this.state.url
          }}
        /> */}
        <Camera
          ref={cam => this.camera = cam}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.barcodeReceived}
          style={this.toggleCamera()}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        >
        </Camera>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  webview: {

  },

  rectangle: {
    height: 200,
    width: 200,
    left: 90,
    top: 180,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  },

});
