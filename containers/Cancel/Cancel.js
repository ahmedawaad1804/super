import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';

/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import OrderItem from '../../components/OrderItem/OrderItem'

export default class Cancel extends React.Component {
    state = {
        OrderData: {}
    }
    componentDidMount() {
        // dataService.getOrders().then(res=>{
        //     this.setState({orders:res.data})
        // })
        console.log(this.props.navigation.state.params);

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.mainContainer}>
                    <Text>Adress : {this.props.navigation.state.params.address.street} {}
                        {this.props.navigation.state.params.address.route} {}
                        {this.props.navigation.state.params.address.neighbourhood} {}
                        {this.props.navigation.state.params.address.administrative_area} {}
                        {this.props.navigation.state.params.address.city} {}
                        {this.props.navigation.state.params.address.country} {}
                    </Text>
                    <Text>Clinet Info :
                        </Text>
                    <Text>Name :{this.props.navigation.state.params.customerId.username}
                    </Text>
                    <Text>Phone :{this.props.navigation.state.params.customerId.phoneNumber}
                    </Text>
                    <Text>Payment Info :{this.props.navigation.state.params.paymentInfo ? this.props.navigation.state.params.paymentInfo : "Cash"}
                    </Text>
                    <Text>Total Order :{this.props.navigation.state.params.totalOrder}
                    </Text>
                    <Text>Products :
                        </Text>
                    <FlatList
                        style={{
                            width: Dimensions.get('window').width,
                        }}
                        data={this.props.navigation.state.params.products}
                        renderItem={(item) =>
                            <View style={{ backgroundColor: colors.primary, marginHorizontal: 20, padding: 10, borderRadius: 15 }}>
                                <Text>count : {item.item.count}</Text>
                                <Text>Name : {item.item.productId.productNameAR} {item.item.productId.productNameEN}</Text>
                                <Text>Price : {item.item.productId.price}</Text>
                                <Text>Price Discount : {item.item.productId.discountPrice}</Text>
                            </View>

                        }
                    />
                    {/* <ScrollView>
                        {
                            this.props.navigation.state.params.products.map(item => {
                                return (<Text>ss</Text>)
                            })
                        }
                    </ScrollView> */}
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} onPress={() => { assign() }}>
                            <Text >assign</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => { cancel() }}>
                            <Text >cancel</Text>
                        </TouchableOpacity>
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
        paddingTop: 20,
        paddingBottom: 0

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
    }



});