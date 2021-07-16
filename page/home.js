import * as React from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity, SafeAreaView, Linking,
    Dimensions,
    ScrollView,
} from 'react-native';
import global from "../global";
import Carousel from 'react-native-snap-carousel';


export default class HomeScreen extends React.Component {
    state =
        {
            loading: true,
            eventData: [],
            data: []
        }


    componentDidMount() {
        global.firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user })
            } else {
                this.props.navigation.navigate("Login");
            }
        }
        );
        this.getEventsFromApi();
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: false, eventData: [],
            activeIndex: 0,
            data: [
                {
                    image:
                        'https://www.thelivingos.com/wp-content/uploads/2021/03/767px-01.png',
                    urls: 'https://www.thelivingos.com/',
                },
                {
                    image:
                        'https://notebookspec.com/web/wp-content/uploads/2020/02/Capewqrgfg3346.png',
                    urls:
                        'https://www.google.co.th/maps',
                },
                {
                    image:
                        'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                    urls:
                        'null',
                }
            ],

        }
    }

    logout_pressed() {
        global.firebase.auth().signOut()
    }
    _renderItem({ item, index }) {
        return (
            <View
                style={{
                    borderRadius: 5,
                    padding: 80,
                }}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => Linking.openURL(item.urls)}>
                    <Image
                        style={{ width: 200, height: 110 }}
                        resizeMode="contain"
                        source={{ uri: item.image }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <ScrollView>

                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Carousel
                            imageKey={'image'}
                            ref={(ref) => (this.carousel = ref)}
                            data={this.state.data}
                            sliderWidth={400}
                            itemWidth={400}
                            renderItem={this._renderItem}
                            onSnapToItem={(index) => this.setState({ activeIndex: index })}
                        />
                    </View>
                </ScrollView>
                <FlatList
                    data={this.state.eventData}
                    renderItem={({ item }) =>
                        <EventBox item={item} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
    async getEventsFromApi() {
        try {
            let response = await fetch(
                'https://jsonplaceholder.typicode.com/photos',
            );
            let responseJson = await response.json();
            this.setState({
                loading: false,
                eventData: responseJson
            });
        } catch (error) {
            console.error(error);
        }
    }

}
function EventBox(props) {

    var item = props.item;

    return (
        <View style={styles.eventBox}>
            <View>
                <Text style={styles.eventText}>{item.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.eventImage} source={{ uri: item.url }} />
                    <Image style={styles.eventImage} source={{ uri: item.thumbnailUrl }} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    eventBox: {
        flexDirection: "row",
        marginTop: 10,
    },
    eventImage: {
        width: 100,
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    eventText: {
        color: "#00A"
    },
    eventAddress: {
        color: "#55A",
        fontSize: 11,
    }
    ,
    eventDate: {
        fontSize: 11,
    }

});