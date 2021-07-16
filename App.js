import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import global from './global';
import LogInScreens from './page/login';
import HomeScreen from './page/home';

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    logined: false,
    user: null,
  };
  componentDidMount() {
    global.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.setState({ user: user })
      } else {
          this.props.navigation.navigate("Login");
      }
  }
  );
    global.app = this;
  }
  logout_pressed() {
    global.firebase.auth().signOut()
}
  render() {
    if (global.config['apiKey'] == undefined) {
      return <ErrorConfig />;
    }
    var screen = "Login";
    //if(this.state.logined) screen = "Home";   

    screen = "Home";
    return (
      <NavigationContainer theme={global.theme}>
        <Stack.Navigator initialRouteName={screen}>
          <Stack.Screen name="Login" component={LogInScreens} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{
            headerRight: () => (
              <Button
              onPress={() => this.logout_pressed()}
                title="ออกจากระบบ"
                color="#00cc00"
              />
            ),
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function ErrorConfig() {
  return (<View style={{ marginTop: 100, backgroundColor: "#FAA", padding: 40 }}>
    <Text>Please setup Firebase config in global.js</Text>
  </View>);
}