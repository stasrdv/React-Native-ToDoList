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
import Spinner from 'react-native-loading-spinner-overlay';
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
      id: '',
      editMode: false,
      tasktext: '',
      visible: false

    }
    this.deleteSelectedtask = this.deleteSelectedtask.bind(this)
  }

  componentDidMount() {
    this.setState({ visible: true })
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


  handleTask = (text) => {
    this.setState({ task: text })
  }

  newTask = () => {
    this.textInput.clear()
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
        this.setState({ visible: false })
        this.setState({
          taskList: responseJson.tasks
        })

      })
      .catch((error) => {

      });
  }
  deleteSelectedtask = () => {
    fetch('http://todos.moonsite.co.il/api/tasks/' + this.state.id, {
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

  updateSelectedTask = () => {
    this.setState({
      editMode: !this.state.editMode,
      visible: true,
    })
    this.textInput.clear()
    fetch('http://todos.moonsite.co.il/api/tasks/' + this.state.id, {
      method: 'PUT', headers: {
        'Accept': 'application/json',
        'Authorization': this.state.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        task: this.state.task,
        order: 1

      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ visible: false })
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
        backgroundColor: '#fe3b31',
        underlayColor: '#2E78A3',
        type: 'delete',
        onPress: () => {
          this.deleteSelectedtask();
        },
      }
    ]

    var editButton = [
      {
        text: 'Edit',
        backgroundColor: '#03a792',
        underlayColor: '#2E78A3',
        type: 'edit',
        onPress: () => {
          this.setState({ editMode: true })
          this.textInput.clear()
        },
      }
    ]
    return (
      <View>
        <Button
          onPress={
            () => navigate('cameraComponent')
          }
          title="QR Scanner"
          color="#2286fc"
          backgroundColor='#f3f3f3'
        />
        <Animated.View style={[container, { opacity: fadeAnim }]}>
          {this.state.editMode == false ?
            <View>
              <TextInput style={styles.inputTask}
                ref={input => { this.textInput = input }}
                underlineColorAndroid="transparent"
                placeholder="New Task"
                placeholderTextColor="#346CB8"
                onChangeText={this.handleTask} />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={
                  () => this.newTask()}>
                <Text style={styles.submitButtonText}> Add New task </Text>
              </TouchableOpacity>
            </View> :
            <View>
              <TextInput style={styles.inputTask}
                ref={input => { this.textInput = input }}
                underlineColorAndroid="transparent"
                placeholder={this.state.tasktext}
                placeholderTextColor="#346CB8"
                onChangeText={this.handleTask} />
              <TouchableOpacity
                style={styles.editButton}
                onPress={
                  () => this.updateSelectedTask()}>
                <Text style={styles.editButtonText}> Save Changes </Text>
              </TouchableOpacity>
            </View>}
          <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: '#2E78A3' }} />
          <FlatList
            data={this.state.taskList}
            renderItem={({ item }) =>
              <Swipeout
                onOpen={() =>
                  this.setState({ 'id': item._id, 'tasktext': item.task })
                }
                buttonWidth={80}
                autoClose={true}
                left={editButton}
                right={deleteButton}>
                <View>
                  <Text style={styles.item}>{item.task}</Text>
                </View>
              </Swipeout>

            }/>
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
    borderColor: '#2286fc',
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  input: {
    margin: 15,
    height: 40,
    width: 100,
    borderColor: '#2286fc',
    borderWidth: 1
  },
  inputTask: {
    margin: 15,
    height: 40,
    borderColor: '#2286fc',
    borderWidth: 1
  },
  editTask: {
    width: 200,
    right: 220,
    borderColor: '#346CB8',
    borderWidth: 1,
    height: 40,
    backgroundColor: '#e6e4e2'
  },
  submitButton: {
    backgroundColor: '#2286fc',
    padding: 10,
    margin: 15,
    height: 40,
  },
  editButton: {
    backgroundColor: '#5add72',
    padding: 10,
    margin: 15,
    height: 40,

  },
  editButtonText: {
    color: 'white'
  },
  submitButtonText: {
    color: 'white'
  },
  container: {
    backgroundColor: 'white',


  },

})

