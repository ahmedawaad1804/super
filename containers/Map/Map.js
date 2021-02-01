import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';

/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import CustomMarker from '../../components/CustomMarker/CustomMarker'
import CustomMarkerBr from '../../components/CustomMarkerBr/CustomMarkerBr'
/* maps */
// import MapView from "react-native-maps";
import MapView, { Marker } from "react-native-maps";
/* gps */
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
export default class Map extends React.Component {
    static navigationOptions = { header: null }
    state = {
        isMapReady: false,
        latitude: null,
        longitude: null,
        _IsCoords: false,
        drivers: [],
        coords: [],
        branch: [],
        refresh: true,
        branchIcons: [],
        colors: ["#8BA02A", "#A52619", "#3019A5", "#6B086C", "#0C7965", "#79110C", "#7F8BFC", "#FE07C2", "#FE7B07", "#020501", "#7E802D", "#499F88", "#D4AFE4", "#EA59A6"]
    }
    //8BA02A  A52619 3019A5 6B086C 0C7965 79110C 7F8BFC FE07C2 //FE7B07 020501 7E802D 499F88 D4AFE4 EA59A6

    async componentDidMount() {
        // console.log("any");
        this.setState({ _IsCoords: true })
        dataService.getDrivers().then(res => {
            this.setState({ drivers: res.data })
            // console.log(res.data);
        })
        // console.log(this.props.navigation.state.params.params.route);
        this.setState({ branch: this.props.navigation.state.params.branches }, () => {
            let tempBranches = []
            for (const sup of this.state.branch) {
                for (const branch of sup.coords) {
                    branch.lat = parseFloat(branch.lat)
                    branch.long = parseFloat(branch.long)
                    branch.selected = false
                    tempBranches.push(branch)
                }
            }
            this.setState({ branchIcons: tempBranches })
        })
        let status = await Permissions.askAsync(Permissions.LOCATION)
        let location = await Location.getCurrentPositionAsync({})
        dataService.getStaticDriversData().then(res => {
            let routes = []

            res.data.forEach(element => {
                element.orders.forEach(element => {
                    // console.log(element.route);
                    if (element.route && element.route.length != 0) {
                        routes.push(element.route)
                    }
                });
            });
            // console.log(routes.length);
            // console.log(routes[20]);
            this.setState({ coords: routes })
        })
        this.interval = setInterval(() => {
            dataService.getDrivers().then(res => {
                this.setState({ drivers: res.data })

            })
        }, 5000);


        this.setState({ latitude: location.coords.latitude })
        await this.setState({ longitude: location.coords.longitude }, () => { this.setState({ _IsCoords: true }) })
        let tempArr=[]
        for (const iterator of this.state.branchIcons) {
            this.props.navigation.state.params.params.route.forEach(br => {
                if(iterator.nameEN==br.branch){
                    iterator.selected=true
                    tempArr.push(iterator)
                }
                else{
                    tempArr.push(iterator) 
                }
            })
        }
        console.log(tempArr);



    }
    onMapLayout = () => {
        // console.log("any");
        this.setState({ isMapReady: true });
        // this.setState({ _IsCoords: true })

    }
    componentWillUnmount() {

        clearInterval(this.interval)
    }
    getRoute() {
        const mode = 'driving'; // 'walking';
        const origin = '30.061109,31.246032';
        const destination = '29.897145,31.303975';
        const language = 'ar';
        const APIKEY = 'AIzaSyD7arViUQWyZhROPL4HKcujDdNy_fi2XW4';
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
        // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}&language=${language}`;

        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                // console.log(responseJson);

                if (responseJson.routes.length) {
                    this.setState({
                        coords: this.decode(responseJson.routes[0].overview_polyline.points) // definition below
                    }, () => console.log("fff"));


                }
            }).catch(e => { console.warn(e) });
    }
    decode(t, e) { for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) { a = null, h = 0, i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]) } return d = d.map(function (t) { return { latitude: t[0], longitude: t[1] } }) }
    pressMark(orderId, driver) {
        // console.log(this.state.branchIcons);
        this.props.navigation.state.params.params.route = []
        for (const selection of this.state.branchIcons) {
            if (selection.selected) {
                this.props.navigation.state.params.params.route.push(selection)
            }
        }

        // console.log("----------------------------");
        // console.log( this.props.navigation.state.params.params.route);
        // console.log( driver);
        this.props.navigation.navigate("Assign", { order: this.props.navigation.state.params.params, driver })


    }
    selectBr(supplier, branch) {
        this.setState({ refresh: !this.state.refresh, latitude: branch.lat, longitude: branch.long })
        // console.log(branch);
        // console.log(this.state.branch);
        branch.selected = !branch.selected

        this.map.animateToRegion({
            latitude: parseFloat(branch.lat),
            longitude: parseFloat(branch.long),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,

        })
        //   console.log("sddddddddddddddddd");
        //   console.log(this.props.navigation.state.params.params.route);


    }
    render() {
        {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        {/* <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: colors.white }} /> */}
                    </View>

                    <View style={styles.mainContainer}>

                        <MapView
                            style={{ flex: 1, width: "100%", height: "100%" }}
                            initialRegion={{
                                latitude: parseFloat(this.props.navigation.state.params.params.address.lat),
                                longitude: parseFloat(this.props.navigation.state.params.params.address.long),
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                                // zoomLevel:2
                            }}
                            ref={map => { this.map = map }}
                            onLayout={() => this.onMapLayout()}
                        // onPress={() => console.log("f")}
                        >
                            {this.state.branch.map((supp, index) =>
                                // this.state.isMapReady &&
                                supp.coords.map(branch =>
                                    <Marker
                                        tracksViewChanges={false}

                                        coordinate={{ latitude: parseFloat(branch.lat), longitude: parseFloat(branch.long) }}
                                        pinColor={this.state.colors[index]}
                                    >


                                    </Marker>
                                )
                                // console.log(this.state.latitude)
                            )}
                            {this.state.drivers.map(driver => (
                                // this.state.isMapReady &&
                                // console.log(this.state.latitude)
                                <Marker

                                    tracksViewChanges={false}

                                    coordinate={{
                                        latitude: driver.currentLat ? driver.currentLat : 31.2218228,
                                        longitude: driver.currentLong ? driver.currentLong : 29.9688991
                                    }}
                                    onPress={() => { this.pressMark(this.props.navigation.state.params.params, driver) }}
                                // title={"marker.title"}
                                // image={require("../../assets/icons/cart.png")}
                                >
                                    <CustomMarker src={(driver)} order={this.props.navigation.state.params.params} />
                                </Marker>
                            ))}
                            <Marker
                                tracksViewChanges={false}

                                coordinate={{
                                    latitude: parseFloat(this.props.navigation.state.params.params.address.lat) ? parseFloat(this.props.navigation.state.params.params.address.lat) : 31.2218558,
                                    longitude: parseFloat(this.props.navigation.state.params.params.address.long )? parseFloat(this.props.navigation.state.params.params.address.long) : 29.9688921
                                }}
                                // onPress={() => { this.pressMark(this.props.navigation.state.params.params._id, driver) }}

                                image={require("../../assets/icons/user.png")}
                            // pinColor={"#413937"}
                            >
                            </Marker>

                        </MapView>
                        <View style={{
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height * 3 / 10,
                            position: 'absolute',
                            bottom: 0,
                        }}>
                            <FlatList
                                style={{
                                }}
                                horizontal
                                data={this.state.branch}
                                extraData={this.state.refresh}
                                renderItem={({ item, index }) => (
                                    <View style={{
                                        backgroundColor: this.state.colors[index] + "4D",
                                        height: Dimensions.get('window').height * 3 / 12,
                                        width: Dimensions.get('window').width * 9 / 10,
                                        marginHorizontal: 10,
                                        borderRadius: 25,

                                        alignItems: 'center'
                                    }}>
                                        <Text style={{ fontSize: 18 }}>{item.name} </Text>
                                        <ScrollView>
                                            {item.coords.map((br, key) =>

                                                <TouchableOpacity style={{
                                                    height: Dimensions.get('window').height * 1 / 27,
                                                    width: Dimensions.get('window').width * 7 / 10,
                                                    backgroundColor: br.selected ? colors.red : colors.primary,
                                                    marginVertical: 10,
                                                    borderRadius: 15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                                    onPress={() => { this.selectBr(item, br) }} >
                                                    <Text style={{ fontSize: 10, padding: 10 }}>{br.nameAR}</Text>
                                                </TouchableOpacity>


                                            )}
                                        </ScrollView>
                                    </View>
                                )
                                }
                            >

                            </FlatList>
                        </View>

                    </View>


                </View >



            )

        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        // height: '100%',
        // backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartImageStyle: {
        width: 37,
        height: 39,
        resizeMode: "contain",
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        // paddingTop: 20,
        paddingBottom: 0

    },

    headerContainer: {
        width: Dimensions.get('window').width,
        height: "11%",
        backgroundColor: colors.primary,
        alignContent: "center", justifyContent: 'center',
        flexDirection: 'row'
    },
    tOpacity: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    text: {
        // fontFamily: 'Cairo-Bold',
        fontSize: 14
    },
    instructionText: {
        marginLeft: Dimensions.get('window').width * 32 / 375,
        // fontFamily: 'Cairo-Regular',
        fontSize: 13
        ,
    },
    headerText: {
        marginLeft: Dimensions.get('window').width * 32 / 375,
        // fontFamily: 'Cairo-Regular',
        fontSize: 20
        ,
    },
    bottomMainView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 180 / 812,
    },
    orderOpacity: {
        width: Dimensions.get('window').width * 342 / 375,
        height: Dimensions.get('window').height * 95 / 812,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        flexDirection: "row",
        borderTopWidth: 1
    },
    imageStyle: {
        height: "90%",
        width: "100%",
        resizeMode: 'contain'
    },
    titleText: {
        marginLeft: Dimensions.get('window').width * 15 / 375,
        // fontFamily: 'Cairo-Bold',
        fontSize: 20,
        backgroundColor: colors.white
    },
    Text: {
        marginLeft: Dimensions.get('window').width * 15 / 375,
        // fontFamily: 'Cairo-Regular',
        fontSize: 13,
        backgroundColor: colors.white
    }
});