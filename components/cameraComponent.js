import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,WebView
} from 'react-native';
import Camera from 'react-native-camera';


export default class cameraComponent extends Component {


  constructor(props) {
    super(props);
    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      url:'',
      barcodetype:''
    }

    this.barcodeReceived=this.barcodeReceived.bind(this)
  }

  barcodeReceived(e) {
   
    if(e.data.length>1){
     this.setState({url:e.data})
     
    
    }
  
  }

  render() {
    return (
      <View style={styles.container}>
<Text>WELCOME TO WebView</Text>
        <WebView
            style={styles.webview}
            source = {{ uri: 
               this.state.url}}
         /> 
         <Camera
          ref={cam => this.camera = cam}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.barcodeReceived}
          style={ styles.rectangle }
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
    height: 350,
 },

rectangle: {
  height: 250,
  width: 250,
  left:55,
  borderWidth: 2,
  alignItems: 'center',
  borderColor: '#00FF00',
  backgroundColor: 'transparent'
},
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
