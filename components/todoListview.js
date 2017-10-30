import React, { Component } from 'react';
import {
  Text, Image,
  View, StyleSheet,
  ScrollView, AsyncStorage, Animated,
  FlatList, TextInput, TouchableOpacity, Button
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { SwipeableFlatList, SwipeableListItem } from 'react-native-swipeable-flat-list';
import Swipeout from 'react-native-swipeout';

class todoListview extends React.Component {

  constructor() {
    super();
    this.state = {
      fadeAnim: new Animated.Value(0),
      taskList: [],
      token: '',
      task: '',
      id:''

    }
    this.deleteSelectedtask = this.deleteSelectedtask.bind(this)
  }

  componentDidMount() {

    Animated.sequence([
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: 5000,
        }
      ),
    ]).start();
    AsyncStorage.getItem("token").then((value) => {
      this.setState({
        token: value
      })
      this.getTasks()
    }).done();
  }

  newTask = () => {

    fetch('http://todos.moonsite.co.il/api/tasks', {
      method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.state.token,
      },
      body: JSON.stringify({
        task: this.state.task,
        order: 1

      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        this.getTasks();

      })
      .catch((error) => {


      });





  }

  handleTask = (text) => {
    this.setState({ task: text })
  }

  getTasks = () => {
    fetch('http://todos.moonsite.co.il/api/tasks', {
      method: 'GET', headers: {
        'Accept': 'application/json',
        'Authorization': this.state.token,
        'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          taskList: responseJson.tasks
        })

      })
      .catch((error) => {

      });

  }

  deleteSelectedtask=() =>{
    
   alert('Task Was Deleted')

    fetch('http://todos.moonsite.co.il/api/tasks/'+this.state.id, {
      method: 'DELETE', headers: {
        'Accept': 'application/json',
        'Authorization': this.state.token,
        'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((responseJson) => {
      this.getTasks()

      })
      .catch((error) => {

      });

  }
  
  render() {
    const { fadeAnim } = this.state;
    const { container } = styles;
    const { navigate } = this.props.navigation;


    var deleteButton = [
      {
        text: 'Delete',
        borderColor: '#346CB8',
        borderWidth: 1,
        backgroundColor: '#C32C31',
        underlayColor: '#2E78A3',
        onPress: () => { 
          this.deleteSelectedtask();
        },
      }
    ]
    return (
      <View>
        <Animated.View style={[container, { opacity: fadeAnim }]}>

          <TextInput style={styles.inputTask}
            underlineColorAndroid="transparent"
            placeholder="New Task"
            placeholderTextColor="#346CB8"
            onChangeText={this.handleTask}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={
              () => this.newTask()

            }>
            <Text style={styles.submitButtonText}> Add New task </Text>
          </TouchableOpacity>
          <FlatList
            data={this.state.taskList}
            renderItem={({ item }) =>
              <Swipeout
                onOpen={()=>
                this.setState({'id':item._id})
              
                }
                autoClose={true}
                buttonWidth={100}
                right={deleteButton}>
                <View>
                  <Text style={styles.item}>{item.task}</Text>
                </View>
              </Swipeout>
            } />

        </Animated.View>

      </View>
    )
  }
}
export default todoListview

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 30,
    margin: 2,
    borderColor: '#346CB8',
    borderWidth: 1,
    backgroundColor: '#e6e4e2'
  },
  input: {
    margin: 15,
    height: 40,
    width: 100,
    borderColor: '#346CB8',
    borderWidth: 1
  },
  inputTask: {
    margin: 15,
    height: 40,
    borderColor: '#346CB8',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#2E78A3',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  },
  container: {
    backgroundColor: 'white',


  },

})

