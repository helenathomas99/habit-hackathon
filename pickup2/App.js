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
  Picker
} from 'react-native';
import { StackNavigator } from 'react-navigation';
// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MapView } from 'expo';

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
        <ImageBackground source={require('./assets/architecture.jpg')} style={styles.backgroundImage}>
          <View style={styles.content}>
            <Text style={styles.logo}>PICKUP!</Text>
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
    </ImageBackground>
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
      name: '',
      age: '',
      skill: '',
      position: '',
      imgUrl: ''
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
    // console.log("this state", this.state)
      fetch('http://2aa7cc7e.ngrok.io/create/user', {
      method: 'POST',
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        age: this.state.age,
        skill: this.state.skill,
        position: this.state.postion,
        imgUrl: this.state.imgUrl
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
          password: '',
          name: '',
          age: '',
          position: '',
          skill: '',
          imgUrl: ''
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
        <Image
          style={{width: 150, height: 150, marginBottom: 20}}
          // source={{uri: 'http://www.nationalfanthem.com/ShirtPieces/Crying_Michael_Jordan_Meme_Sad_Chicago_Bulls_Fan--ZM--BLK.jpg'}}/>
            source={require('./mjtransparent.png')}
         />

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
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter your name"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({name: text})}
            value = {this.state.name}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter your position"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({position: text})}
            value = {this.state.position}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter your age"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({age: text})}
            value = {this.state.age}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter your skill level"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({skill: text})}
            value = {this.state.skill}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Optional Image Url"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({imgUrl: text})}
            value = {this.state.imgUrl}
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

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMsg: ''
    }
  }


  redirect() {
    this.props.navigation.navigate('Map');
  }

  redirectLogin() {
    this.props.navigation.navigate('LoginScreen');
  }

  handleSubmit() {
    fetch('http://2aa7cc7e.ngrok.io/login', {
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
      this.redirect()
    } else {
      alert("Not valid username/password!")
      this.redirectLogin()
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
        <Image
          style={{width: 150, height: 150, marginBottom: 20, marginTop: 45}}
          source={require('./mjtransparent.png')}
        />

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

class MapScreen extends React.Component {
  static navigationOptions = (props) => ({
    title: "Pick Your Court Young Blood",
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft: null
  })

  constructor(props) {
    super(props);
    this.state = {
      lat: 37.77,
      long: -122.401,
      latDelta: .02,
      longDelta: .015
    }
  }

  joinGame() {
    this.props.navigation.navigate('JoinScreen');
  }

  createGame() {
    this.props.navigation.navigate('CreateScreen');
  }

  displayCreateGame(e) {
    console.log(e.nativeEvent)
    e.preventDefault()
    Alert.alert(
      'Join or Create a Game',
      'BBB you already know',
      [
        {text: 'Create Game', onPress: () => this.createGame()},
        {text: 'Join Game', onPress: () => this.joinGame()},
      ],
      { cancelable: false }
    )
  }
// hellon
  render() {
    return(
      <View style={{
          flex: 1
        }}>
        <MapView style={{flex: 7}}
        region={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: this.state.latDelta,
          longitudeDelta: this.state.longDelta
        }}>
        <MapView.Marker
          coordinate = {{latitude: 37.779, longitude: -122.4058}}
          title = {"Gene Friend Recreation Center"}
          onSelect={(e)=>this.displayCreateGame(e)}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: "https://images.vexels.com/media/users/3/135385/isolated/preview/212a5985af3fc8329ada7bc2a45bad82-basketball-circle-icon-by-vexels.png"}}
            />
        </MapView.Marker>
        <MapView.Marker
          coordinate = {{latitude: 37.777, longitude: -122.406}}
          title = {"Victoria Manalo Draves Park"}
          onSelect={(e)=>this.displayCreateGame(e)}>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: "https://images.vexels.com/media/users/3/135385/isolated/preview/212a5985af3fc8329ada7bc2a45bad82-basketball-circle-icon-by-vexels.png"}}
          />
        </MapView.Marker>
        <MapView.Marker
          coordinate = {{latitude: 37.772, longitude: -122.398}}
          title = {"Mission Creek Park Basketball Court"}
          onSelect={(e)=>this.displayCreateGame(e)}>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: "https://images.vexels.com/media/users/3/135385/isolated/preview/212a5985af3fc8329ada7bc2a45bad82-basketball-circle-icon-by-vexels.png"}}
          />
          {/* <MapView.Callout tooltip={true} style={{width: 10}}>
            <TouchableOpacity  underlayColor='#dddddd'>

            </TouchableOpacity>
          </MapView.Callout> */}
        </MapView.Marker>
        <MapView.Marker
          coordinate = {{latitude: 37.773, longitude: -122.3936}}
          title = {"Mission Creek Park Pavilion"}
          onSelect={(e)=>this.displayCreateGame(e)}>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: "https://images.vexels.com/media/users/3/135385/isolated/preview/212a5985af3fc8329ada7bc2a45bad82-basketball-circle-icon-by-vexels.png"}}
          />
        </MapView.Marker>
      </MapView>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f4511e'}}>

          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              borderRadius: 4,
              justifyContent: 'center'
            }}
              onPress={() => this.handleInstanbul()}>
            <Text style={{fontWeight: 'bold', color: "white"}}>{<Icon name="user" size={20}/>}{'  '}PROFILE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              borderRadius: 4,
              justifyContent: 'center'
            }}
              onPress={() => this.handleCurrent()}>
            <Text style={{fontWeight: 'bold', color: "white"}}>GAMES{'  '}{<Icon name="trophy" size={20}/>}</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

class JoinGame extends React.Component {
  static navigationOptions = (props) => ({
    title: 'Game Time!'
  })

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {
        time: "10AM",
        gameType: "3v3",
        skillLevel: "Mad Skills",
        numberPlayers: "5",
        totalPlayers: "6",
        host: 'juan',
        imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        }, {
        time: "11AM",
        gameType: "4v4",
        skillLevel: "Sad Skills",
        numberPlayers: "3",
        totalPlayers: "8",
        host: 'will',
        imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        }, {
        time: "1PM",
        gameType: "5v5",
        skillLevel: "Sad Skills",
        numberPlayers: "8",
        totalPlayers: "10",
        host: 'asheesh',
        imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        } , {
        time: "1PM",
        gameType: "5v5",
        skillLevel: "Sad Skills",
        numberPlayers: "8",
        totalPlayers: "10",
        host: 'asheesh',
        imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        }, {
        time: "1PM",
        gameType: "5v5",
        skillLevel: "Sad Skills",
        numberPlayers: "8",
        totalPlayers: "10",
        host: 'asheesh',
        imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        }, {
        time: "1PM",
        gameType: "5v5",
        skillLevel: "Sad Skills",
        numberPlayers: "8",
        totalPlayers: "10",
        host: 'asheesh',
        imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        }, {
        time: "1PM",
        gameType: "5v5",
        skillLevel: "Sad Skills",
        numberPlayers: "8",
        totalPlayers: "10",
        host: 'asheesh',
        imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        }, {
        time: "1PM",
        gameType: "5v5",
        skillLevel: "Sad Skills",
        numberPlayers: "8",
        totalPlayers: "10",
        host: 'asheesh',
        imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        }
      ])
    }
  }

  // componentDidMount() {
  //   //fetch game data from databse
  // }

  render() {
    return (
      <View>
        {/* <View>
          <Text style={{textAlign: 'center'}}>TIME SLOTS</Text>
        </View> */}
        <ListView
        renderRow={(game) => (
          <View style={{backgroundColor: '#00264d', borderWidth: 2, borderColor: 'white', marginBottom: 5, height: 100}}>
            <TouchableOpacity>
            <View style={{display: 'flex', flexDirection: "row",
                alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{paddingTop: 15, paddingLeft: 25, color: 'white'}}>
                {game.time}
              </Text>
              <Text style={{textAlign: 'center', paddingTop: 15, color: 'white'}}>
                {game.gameType} {"\n"}
                Skill Level: {game.skillLevel} {"\n"}
                {game.numberPlayers} / {game.totalPlayers} Players
              </Text>
              <View style={{marginTop: 10, paddingRight: 20}}>
                <Text style={{color: 'white'}}>Hosted By:</Text>
                <Image style={{width: 66, height: 58}} source={{uri: (game.imgUrl)}}></Image>
              </View>
            </View>
            </TouchableOpacity>
          </View>
        )}
      dataSource={this.state.dataSource}
      />
      </View>
    )
  }
}

class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      gameType: ''
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }

  render() {
    return (
      <View style={{flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: 'white'}}>
        <View>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Select Game Time</Text>
        </View>
        <View style={{flex: 1}}>
          <DatePickerIOS
            mode="time"
            date={this.state.chosenDate}
            onDateChange={this.setDate}
          />
        </View>
        <View style={{flex: 1, bottom: 40, borderWidth: 4, height: 30}}>
          <Text style = {{color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Game Type</Text>
          <View style={{flex: 1, flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
              <TouchableHighlight underlayColor="blue" label="1v1" value="1v1"><Text style={{fontSize: 15, margin: 10}}>1v1</Text></TouchableHighlight>
              <TouchableHighlight underlayColor="blue" label="2v2" value="2v2"><Text style={{fontSize: 15, margin: 10}}>2v2</Text></TouchableHighlight>
              <TouchableHighlight underlayColor="blue" label="3v3" value="3v3"><Text style={{fontSize: 15, margin: 10}}>3v3</Text></TouchableHighlight>
              <TouchableHighlight underlayColor="blue" label="4v4" value="4v4"><Text style={{fontSize: 15, margin: 10}}>4v4</Text></TouchableHighlight>
              <TouchableHighlight underlayColor="blue" label="5v5" value="5v5"><Text style={{fontSize: 15, margin: 10}}>5v5</Text></TouchableHighlight>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: "center"}}>Skill Level</Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableHighlight><Text>Rookie</Text></TouchableHighlight>
            <TouchableHighlight><Text>Pro</Text></TouchableHighlight>
            <TouchableHighlight><Text>H.o.F.</Text></TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}
//position: 'aboslute', bottom: 120

export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen
  },
  Map: {
    screen: MapScreen
  },
  LoginScreen: {
    screen: Login
  },
  JoinScreen: {
    screen: JoinGame
  },
  CreateScreen: {
    screen: CreateGame
  }
}, {initialRouteName: 'Login'});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#00264d'
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
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center'
  },
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
    flex: 1
  },
  emptySpace: {
    margin: 30
  }
});
