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
      cameraType: 'back',
      url: '',
      isCameroOpen: true,
    }

    this.barcodeReceived = this.barcodeReceived.bind(this)
  }

  barcodeReceived(e) {

    if (e.data.length > 1) {
      this.setState({ url: e.data })
      this.setState({isCameroOpen:false})

    }

  }
  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }


  render() {
    return (
      <View style={styles.container}>
     
        {this.renderIf(this.state.isCameroOpen,
          <Camera
            hidden={true}
            ref={cam => this.camera = cam}
            aspect={Camera.constants.Aspect.fill}
            onBarCodeRead={this.barcodeReceived}
            style={styles.rectangle}
            cameraType={this.state.cameraType}>
          </Camera>
        )}

        {this.renderIf(!this.state.isCameroOpen,
          <WebView
            source={{
              uri: this.state.url
            }}
          />
        )}

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
