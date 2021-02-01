import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Linking, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import OrderItem from '../../components/OrderItem/OrderItem'

export default class CurrentOrder extends React.Component {
    static navigationOptions = { header: null }
    state = {
        OrderData: {},
        ready:false
       
    }
    componentDidMount() {
        console.log(this.props.navigation.state.params);
        dataService.getSpecificOrder(this.props.navigation.state.params).then((res) => {
    
            console.log('////////////////');
            console.log(res.data[0]);
            this.setState({OrderData:res.data[0],ready:true})
          });
    }
    
    render() {
        return (
            <View style={styles.container}>

                {this.state.ready &&<View style={styles.mainContainer}>
                    <Text style={styles.myText}>Adress : {this.state?.OrderData.address.street} { }
                        {this.state.OrderData.address.route} { }
                        {this.state.OrderData.address.neighbourhood} { }
                        {this.state.OrderData.address.administrative_area} { }
                        {this.state.OrderData.address.city} { }
                        {this.state.OrderData.address.country} { }
                    </Text>
                    <Text style={styles.myText}>Clinet Info :
                        </Text>
                    <Text style={styles.myText}>Name :{this.state.OrderData.customerId.username}
                    </Text>
                    <TouchableOpacity style={styles.myText} onPress={() => { this.dialCall(this.state.OrderData.customerId.phoneNumber) }} >

                        <Text style={styles.myText}>Phone : 0{this.state.OrderData.customerId.phoneNumber}</Text>

                    </TouchableOpacity>

                    <Text style={styles.myText}>Payment Info :{this.state.OrderData.paymentInfo ? this.state.OrderData.paymentInfo : "Cash"}
                    </Text>
                    <Text style={styles.myText}>Total Order :{this.state.OrderData.totalOrder}
                    </Text>
                    <Text style={styles.myText}>Order Number :{this.state.OrderData.orderTimeID}
                    </Text>
                    <Text style={styles.myText}>Date :{this.state.OrderData.Date}
                    </Text>
                    <Text style={styles.myText}>Time for delivery :{this.state.OrderData.timeForDilvery} minutes
                    </Text>
                    <Text style={styles.myText}>Status:{this.state.OrderData.status}
                    </Text>
                  

                    <View style={{ flex: 1 }}>

                        <FlatList
                            style={{
                                width: Dimensions.get('window').width,
                                marginBottom: 30
                            }}
                            data={this.state.OrderData.products}
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


                   

                </View>}


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
        justifyContent: 'flex-start',
        // borderTopLeftRadius: 40,
        // borderTopRightRadius: 40,
        paddingTop: 15,
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