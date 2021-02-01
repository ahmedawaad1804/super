import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Linking, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import OrderItem from '../../components/OrderItem/OrderItem'

export default class Main extends React.Component {
    static navigationOptions = { header: null }
    state = {
        OrderData: {},
        ad: [{ ss: "df" }, { kk: "as" }],
        suplliers: [],
        branches: [],
        bottomBool: true,
        bmCost: 0
    }
    componentDidMount() {
        let beecost = 0
        for (const iterator of this.props.navigation.state.params.products) {
            beecost += iterator.productId.supplierPrice * iterator.count
        }
        this.setState({ bmCost: beecost })
        dataService.getSuppliers().then(async res => {
            let tempsupplier = []
            this.props.navigation.state.params.supplierArray.forEach(supplier => {

                res.data.suppliers.forEach(supData => {
                    if (supData._id == supplier._id) {
                        for (const iterator of supData.coords) {
                            iterator["selected"] = false
                        }
                        tempsupplier.push(supData)

                    }
                });
            });

            await this.setState({ suplliers: tempsupplier })


        }).catch(err => {
            console.log(err);

        })
        // console.log("------------------");
        // console.log(this.props.navigation.state.params);
        // console.log("------------------");

        this.setState({ OrderData: this.props.navigation.state.params.products })
    }
    toggleBottom(bool) {
        this.setState({ bottomBool: bool })
    }
    dialCall(phoneNumber) {

        // let phoneNumber = '';
        console.log(phoneNumber);
        if (Platform.OS === 'android') {
            phoneNumber = `tel:0${phoneNumber}`;
        }
        else {
            phoneNumber = `telprompt:0${phoneNumber}`;
        }

        Linking.openURL(phoneNumber);
    };
    setsupplierBranch = (branch, supplier) => {
        // console.log("----------------------------");

        // console.log(branch);
        // console.log(supplier);
        let br = [...this.state.branches]
        br.push({
            lat: parseFloat(branch.lat),
            long: parseFloat(branch.long),
            nameAR: branch.nameAR,
            nameEN: branch.nameEN,
            supID: supplier._id,
            supName: supplier.name,
        })
        console.log(br);

        this.setState({ branches: br })

    }

    assign = () => {
        this.props.navigation.navigate("Map", { params: this.props.navigation.state.params, branches: this.state.suplliers })
    }
    cancel = () => {
        console.log("cancel");
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.mainContainer}>
                    <Text style={styles.myText}>Adress : {this.props.navigation.state.params.address.street} { }
                        {this.props.navigation.state.params.address.route} { }
                        {this.props.navigation.state.params.address.neighbourhood} { }
                        {this.props.navigation.state.params.address.administrative_area} { }
                        {this.props.navigation.state.params.address.city} { }
                        {this.props.navigation.state.params.address.country} { }
                    </Text>
                    <Text style={styles.myText}>Clinet Info :
                        </Text>
                    <Text style={styles.myText}>Name :{this.props.navigation.state.params.customerId.username}
                    </Text>
                    <TouchableOpacity style={styles.myText} onPress={() => { this.dialCall(this.props.navigation.state.params.customerId.phoneNumber) }} >

                        <Text style={styles.myText}>Phone : 0{this.props.navigation.state.params.customerId.phoneNumber}</Text>

                    </TouchableOpacity>

                    <Text style={styles.myText}>Payment Info :{this.props.navigation.state.params.paymentInfo ? this.props.navigation.state.params.paymentInfo : "Cash"}
                    </Text>
                    <Text style={styles.myText}>Total Order :{this.props.navigation.state.params.totalOrder}
                    </Text>
                    <Text style={styles.myText}>Order Number :{this.props.navigation.state.params.orderTimeID}
                    </Text>
                    <Text style={styles.myText}>Date :{this.props.navigation.state.params.Date}
                    </Text>
                    <Text style={styles.myText}>Time for delivery :{this.props.navigation.state.params.timeForDilvery} minutes
                    </Text>
                    <Text style={styles.myText}>Status:{this.props.navigation.state.params.status}
                    </Text>
                    <Text style={styles.myText}>Beemall Cost:{this.state.bmCost}
                    </Text>
                    
                    <View style={{ flex: 1 }}>

                        <FlatList
                            style={{
                                width: Dimensions.get('window').width,
                                marginBottom: 30
                            }}
                            data={this.props.navigation.state.params.products}
                            renderItem={({ item }) =>
                                <View style={{ backgroundColor: colors.primary, marginHorizontal: 20, marginVertical: 7, padding: 10, borderRadius: 15 }}>

                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <Image
                                            source={{ uri: `http://www.beemallshop.com/img/productImages/${item.productId.images[0]}` }}
                                            style={styles.imageStyle}
                                        />
                                        <View style={{ marginHorizontal: 10 }}>
                                            <Text>count : {item.count}</Text>
                                            <Text>Price : {item.productId.discountPrice}</Text>
                                            <Text>Supplier price  : {item.productId.supplierPrice}</Text>
                                            <Text>Available  : {item.ispurchased.toString()}</Text>
                                        </View>
                                    </View>

                                    <Text>{item.productId.productNameAR} </Text>
                                    <Text>{item.productId.productNameEN}</Text>

                                </View>

                            }
                        />
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        {this.props.navigation.state.params.status != 'completed' && <TouchableOpacity style={styles.button} onPress={() => { this.assign() }}>
                            <Text >assign</Text>
                        </TouchableOpacity>}
                        {this.props.navigation.state.params.status != 'completed' && <TouchableOpacity style={styles.button} onPress={() => { this.cancel() }}>
                            <Text >cancel</Text>
                        </TouchableOpacity>}
                    </View>

                </View>


            </View >



        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
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
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopLeftRadius: 40,
        // borderTopRightRadius: 40,
        paddingTop: 70,
        paddingBottom: 0,
        paddingHorizontal: 30

    },
    button: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        padding: 10,
        flex: 1, marginHorizontal: 5,
        marginBottom: 30
    },
    iconViewLangCont: {



    },
    myText: {
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    productDetailsTitle: {

        paddingLeft: Dimensions.get('window').width * 16 / 375,
        paddingTop: Dimensions.get('window').height * 14 / 812,
        flexDirection: 'row'
    },
    imageStyle: {
        height: Dimensions.get('window').height * 2 / 20,
        width: Dimensions.get('window').height * 2 / 20,
        resizeMode: 'contain'
    },



});