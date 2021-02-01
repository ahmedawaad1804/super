import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';

// floating menu 
import { FloatingMenu } from 'react-native-floating-action-menu';

/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import CustomMarkerEmpty from '../../components/CustomMarkerEmpty/CustomMarkerEmpty'
/* maps */
// import MapView from "react-native-maps";
import MapView, { Marker } from "react-native-maps";

export default class MapDriver extends React.Component {
    static navigationOptions = { header: null }

    state = {
        items: [],
        isMapReady: false,
        latitude: null,
        longitude: null,
        _IsCoords: false,
        drivers: [],
        coords: [],
        branch: [],
        refresh: true,
        branchIcons: [],
        isMenuOpen: false,
    }

    async componentDidMount() {
        // console.log("any");
        this.setState({ _IsCoords: true })
        dataService.getDrivers().then(res => {
            this.setState({ drivers: res.data })
            console.log(res.data);
            let tempArr = []
            for (const iterator of res.data) {
                tempArr.push({ label: iterator.name, image: require('../../assets/icons/telephone.png'), data: iterator })
            }
            this.setState({ items: tempArr })
        })

    }
    onMapLayout = () => {
        // console.log("any");
        // this.setState({ isMapReady: true });
        // this.setState({ _IsCoords: true })

    }
    componentWillUnmount() {

    }
    handleMenuToggle = isMenuOpen => {
        this.setState({ isMenuOpen });
        // console.log("Sd");
    }
    handleItemPress = (item, index) => {
        if (item.data.currentLat && item.data.currentLong) {
            this.map.animateToRegion({
                latitude: item.data.currentLat,
                longitude: item.data.currentLong,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,

            })
        }
    }
    renderItemIcon = (item, index, menuState) => { }
    renderMenuIcon = (menuState) => {
        const { menuButtonDown } = menuState;


    }
    render() {

        return (

            <View style={styles.container}>
                <FloatingMenu
                    isOpen={this.state.isMenuOpen}
                    items={this.state.items}
                    onMenuToggle={this.handleMenuToggle}
                    onItemPress={this.handleItemPress}
                    renderItemIcon={this.renderItemIcon}
                    borderColor={colors.white}
                    backgroundUpColor={colors.red}
                    renderMenuIcon={this.renderMenuIcon}
                    position="top-right"
                    top={70}
                />
                <View style={{ flex: 1 }}>
                    {/* <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: colors.white }} /> */}
                </View>

                <View style={styles.mainContainer}>

                    <MapView
                        style={{ flex: 1, width: "100%", height: "100%" }}
                        initialRegion={{
                            latitude: 31.2278951,
                            longitude: 29.9690073,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                            // zoomLevel:2
                        }}
                        ref={map => { this.map = map }}
                    // onLayout={() => this.onMapLayout()}
                    // onPress={() => console.log("f")}
                    >

                        {this.state.drivers.map(driver => (
                            // this.state.isMapReady &&
                            // console.log(this.state.latitude)
                            <Marker
                                tracksViewChanges={false}
                                coordinate={{
                                    latitude: driver.currentLat ? driver.currentLat : 31.2218228,
                                    longitude: driver.currentLong ? driver.currentLong : 29.9688991
                                }}
                            // title={"marker.title"}
                            // image={require("../../assets/icons/cart.png")}
                            >
                                <CustomMarkerEmpty src={driver} />
                            </Marker>
                        ))}


                    </MapView>


                </View>


            </View >



        )



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
        paddingBottom: 0

    },

    headerContainer: {
        width: Dimensions.get('window').width,
        // height: "11%",
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