import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import global from "../global";
// icon สามารถเลือกได้ที่ 
// https://callstack.github.io/react-native-paper/icons.html
//

export default class LogInScreens extends React.Component {
    state = {
        email: "test@exam.com",
        password: "123456",
        // location :null
    }
    componentDidMount() {
        global.firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.props.navigation.navigate("Home");
                }
            }
        )
    }
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.centers} >
                    <Image
                        resizeMode='contain'
                        source={require("../assets/logo.png")}
                        style={styles.h} />
                </View>
                <View style={{ paddingTop: "5%", }}>
                    <TextInput
                        style={{ backgroundColor: '#fff' }}
                        label='อีเมล'
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <TextInput
                        style={{ backgroundColor: '#fff' }}
                        label='รหัสผ่าน'
                        value={this.state.password}
                        secureTextEntry={true} autoCorrect={false}
                        onChangeText={text => this.setState({ password: text })}
                    />
                </View>
                <View
                    style={styles.MainContainer}>
                    <TouchableOpacity
                        style={styles.LoginStyle} activeOpacity={0.5} onPress={() => this.login()}>
                        <Text style={styles.TextStyles}> Login </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.conregister}>
                    <Text style={styles.testregister}>Don’t have an account? </Text>
                    <Text style={styles.buttonregister} activeOpacity={0.5} onPress={() => this.register()}>
                        Sign up

                    </Text>
                </View>
            </View>
        );
    }
    async login() {
        try {
            await global.firebase.auth().signInWithEmailAndPassword(
                this.state.email,
                this.state.password
            );
        } catch (error) {
            alert(error);
        }
    }

    SignUp() {
        var { navigation } = this.props;
        navigation.navigate("Home");
    }
    async register() {
        try {
            await global.firebase.auth().createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            );
        } catch (error) {
            alert(error);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 50,
        paddingTop: 150,
    },
    conregister: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 130,
        width: Dimensions.get('window').width / 2.0,
        height: Dimensions.get('window').height / 2.0,
        maxHeight: 200,
        maxWidth: 200
    },
    testregister: {
        color: "#747474"
    },
    buttonregister: {
        flexDirection: 'row',
        fontWeight: 'bold',
        textDecorationLine: 'underline',

        width: Dimensions.get('window').width / 2.0,
        maxHeight: 200,
        maxWidth: 200
    },
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        paddingTop: "5%",
    },
    centers: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoginStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#279AF5',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: 266,
        marginTop: "10%",
        borderRadius: 5,
        margin: 5,
    },
    TextStyles: {
        color: '#fff',
        marginBottom: 4,
        fontSize: 16,
    },
    h: {
        padding: 1,
        paddingLeft: 60,
        width: 120,
        height: 120,
        marginTop: "12%",
        flexDirection: 'row',
        width: Dimensions.get('window').width / 2.0,
        maxHeight: 200,
        maxWidth: 200
    },
});

