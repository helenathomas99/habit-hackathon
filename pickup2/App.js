import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ListView,
  Alert,
  AppRegistry,
  Image,
  Button,
  ImageBackground,
  DatePickerIOS,
  Picker,
  Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MapView } from 'expo';
import Leaderboard from 'react-native-leaderboard';
const axios = require('axios');
// adding a random comment
// import { Button } from ‘react-native-elements’;
 // import { Button } from "react-native-elements";


var ImagePicker = require("react-native-image-picker");
import CameraRollPicker from "react-native-camera-roll-picker";


const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

class LoginScreen extends React.Component {
  static navigationOptions = (props) => ({
    title: 'LOGIN',
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerRight: <TouchableOpacity onPress={() => {props.navigation.navigate('Register')}}><Text style={{marginRight: 25, fontWeight: "bold"}}>REGISTER</Text></TouchableOpacity>
  });

  press() {
    this.props.navigation.navigate('LoginScreen');
  }

  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container1}>
          <View style={styles.content}>
            <Text style={styles.logo}>HABIT</Text>
            <View style={styles.emptySpace}></View>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={() => {this.press()} } style={styles.buttonContainer}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} onPress={ () => {this.register()} }>
                <Text style={styles.buttonText}>REGISTER</Text>
              </TouchableOpacity>
          </View>
      </View>
    </View>
    )
  }
}

class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }

  static navigationOptions = (props) => ({
    title: "REGISTER",
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft: <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}}><Text style={{marginLeft: 25, fontWeight: "bold"}}>LOGIN</Text></TouchableOpacity>
  })

  login() {
    this.props.navigation.navigate('LoginScreen');
  }

  handleSubmit() {
    console.log("this state", this.state)
    // axios.post('http://localhost:1337/create/user')
   // fetch('/ping')}
    //   .then(res => console.log(res))
  fetch('http://a9fbf61c.ngrok.io/create/user', {
      method: 'POST',
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
      })
    .then((response) => {
      console.log("resonse from post ", response)
      return response.json()
      })
    .then((responseJson) => {
      if (responseJson.success) {
        console.log("Registration Success!", responseJson)
        this.setState({
          username: '',
          password: ''
        })
      } else {
        alert(responseJson.error)
      }
    })
    .catch((err) => {
      console.log("Registration Error! (Network)", err)
    });
    this.login()
  }

  render() {
    return (
      <DismissKeyboard>
      <View style={styles.container}>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter your username"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter a password"
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            value = {this.state.password}
          />
        </View>

        <View style={{backgroundColor: '#f4511e', borderRadius: 4, borderWidth: 0.5}}>
          <TouchableOpacity onPress={() => this.handleSubmit()}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', height: 40, width: 300, fontSize: 30, textAlign:'center'}}>JUST DO IT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
    )
  }
}

class Login extends React.Component {
  static navigationOptions = (props) => ({
    title: "Register",
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft: <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}}><Text style={{marginLeft: 25, fontWeight: "bold"}}>LOGIN</Text></TouchableOpacity>
  })

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMsg: ''
    }
  }

redirect() {
  this.props.navigation.navigate('FoodArena')
}
  // redirect() {
  //   this.props.navigation.navigate('Map');
  // }

  redirectLogin() {
    this.props.navigation.navigate('Login'); // is this wehre we redirect to arena
  }

  handleSubmit() {
    fetch('http://a9fbf61c.ngrok.io/login', {
    method: 'POST',
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    })
    })
    .then((response) => {
    console.log("resonse from post ", response)
    return response.json()
    })
    .then((responseJson) => {
      console.log("responseJson", responseJson)
    if (responseJson.success) {
      console.log("Login Success!", responseJson)
      this.setState({
        username: '',
        password: '',
      })
      this.props.navigation.navigate('FoodArena')
    } else {
      alert("Not valid username/password!")
    }
    })
    .catch((err) => {
    console.log("Login Error! (Network)", err)
    });
  }


  render() {
    return (
      <DismissKeyboard>
      <View style={styles.container}>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 20}}>
          <TextInput
            style={{height: 40, width: 300, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Username"
            placeholderTextColor='white'
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
          />
        </View>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 20}}>
          <TextInput
            style={{height: 40, width: 300, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Password"
            placeholderTextColor='white'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            value = {this.state.password}
          />
        </View>

        <View style={{backgroundColor: '#f4511e', borderRadius: 4, borderWidth: 0.5}}>
          <TouchableOpacity onPress={(e) => this.handleSubmit(e)}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', height: 40, width: 300, fontSize: 30, textAlign:'center'}}>GO!</Text>
            </View>
        </TouchableOpacity>
      </View>
      </View>
        </DismissKeyboard>
    )
  }
}

class FoodArena extends React.Component {
    constructor(props) {
      super(props);
    this.state = { // edit to make it actually update
        progress: 15,
        score: '',
        data: [
            { name: 'Helena', score: null, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
            { name: 'Diego', score: 12, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
            { name: 'Chris', score: 244, iconUrl: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
            { name: 'Thais', score: 0, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-eskimo-girl.png' },
            { name: 'Aria', score: 20, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
            { name: 'Persis', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
            { name: 'Humad', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
            { name: 'Nich', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
            { name: 'Karl', score: 80, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-afro-guy.png' },
        ]
      }
      }

  static navigationOptions = (props) => ({
    title: "FoodArena",
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft: <Text>Your Jackpot: 100</Text>
    })

    _alert = (title, body) => {
        Alert.alert(title, body,
            [{ text: 'OK', onPress: () => { } },],
            { cancelable: false }
        )
    }

    render() {
        const props = {
            labelBy: 'name',
            sortBy: 'score',
            data: this.state.data,
            icon: 'iconUrl',
            onRowPress: (item, index) => {
                this._alert(item.name + " clicked",
                    item.score + " points, wow!")
            },
            evenRowColor: '#edfcf9',
        }

        return (
            <View>
              <View>
                <Text style={{marginRight: 25, fontWeight: "bold"}}>16 days of healthy habits! 14 more Until the Jackpot!</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Example')}}>
                  <Text style={{marginRight: 25, fontWeight: "bold"}}>Upload Your Meal!</Text>
              </TouchableOpacity>
            </View>
                <View style={{ paddingTop: 50, backgroundColor: 'black', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'white', paddingBottom: 10 }}>
                        Leaderboard
                    </Text>
                </View>
                <Leaderboard {...props} />
            </View>
        )
    }
}

export class Example extends React.Component {
 constructor(props) {
   super(props);

   this.state = {
     num: 0,
     selected: [],
   };
   console.log("WHERE IS WALDO!")
 }



 submitPhoto() {
   console.log("Selected")
   console.log(this.state)
   var image = this.state.selected[0]
   fetch("http://a9fbf61c.ngrok.io/sendImage", {
     method: "POST",
     credentials: "same-origin",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       image
     })
   }).then((res)=> {
     console.log("KEYS", Object.keys(res))
     if(res.status === 200) {
       // worked
       console.log("SUCCESSFUL")
       //console.log(res.json())
       return res.json()
     } else {
       // error
       console.log("Res error")
     }
   }).then((resJson) => {
     console.log("ResJson ", resJson)
   })
   .catch((err) => {
     // network error
     console.log(err)
   })
 }

 getSelectedImages(images, current) {
   console.log("Images")
   console.log(images)
   console.log("Current")
   console.log(current + "\n")
   var num = images.length;

   this.setState({
     num: num,
     selected: images,
   });

   console.log(current);
   console.log(this.state.selected);
 }

 render() {
   return (
     <View style={styles.container}>
       <View style={styles.content}>
         <Text style={styles.text}>
           <Text style={styles.bold}> {this.state.num} </Text> images has been selected
         </Text>
         <TouchableOpacity onPress={() => {this.submitPhoto()}}>
           <Text style={{textAlign:"center", fontSize:40, height:50, color:"white"}}>Submit✈:</Text>
         </TouchableOpacity>
       </View>
         <CameraRollPicker
           scrollRenderAheadDistance={500}
           initialListSize={1}
           pageSize={3}
           removeClippedSubviews={false}
           groupTypes="SavedPhotos"
           batchSize={5}
           maximum={3}
           selected={this.state.selected}
           assetType="Photos"
           imagesPerRow={3}
           imageMargin={5}
           callback={this.getSelectedImages.bind(this)} />
     </View>
   );
 }
}



AppRegistry.registerComponent("Example", () => Example);

//position: 'aboslute', bottom: 120

export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen
  },
  LoginScreen: {
    screen: Login
  },
  FoodArena: {
    screen: FoodArena
  },
  Example: {
    screen: Example
  }
}, {initialRouteName: 'Login'});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#c0c0c0'
  },
  containerJoinGames: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  messageContainer:{
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    alignSelf: 'stretch',
    borderColor: 'black',
    padding: 5
  },
  textColor: {
    color: 'white'
  },
  // backgroundImage: {
  //   flex: 1,
  //   alignSelf: 'stretch',
  //   width: null,
  //   justifyContent: 'center'
  // },
  content: {
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textShadowColor: "#252525",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 15,
    marginBottom: 20
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 10
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  container1: {
    flex: 1,
    backgroundColor: '#db7093'
  },
  emptySpace: {
    margin: 30
  }
});
