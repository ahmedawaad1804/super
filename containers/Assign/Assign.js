import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Linking, Platform, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';

/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import OrderItem from '../../components/OrderItem/OrderItem'

export default class Main extends React.Component {
    state = {
        OrderData: {},
        adresses: []
    }
    componentDidMount() {
        dataService.getDriverOrder(this.props.navigation.state.params.driver._id).then(res => {
            // console.log(res.data.orders);
            // console.log("address");
            this.setState({})
            let addressArr = []
            res.data.orders.map(res => {
                addressArr.push(res.address)
            })

            this.setState({ adresses: addressArr })
        }).catch(err => {
            console.log(err.response);
        })
    }
    assign = () => {
        // console.log("-------------------------------");

        // console.log(this.props.navigation.state.params.order);
        // console.log("-------------------------------");
        // console.log(this.props.navigation.state.params.driver);

        // console.log(this.props.navigation.state.params);
        dataService.assignOrder(this.props.navigation.state.params.order, this.props.navigation.state.params.driver).then(res => {
            // this.setState({ drivers: res.data })
            console.log(res.data);
            this.props.navigation.navigate('Main')
        }).catch(err => { console.log(err); })

    }
    cancel = () => {
        console.log(this.props.navigation.state.params.orderId);
    }
    dialCall(phoneNumber) {

        // let phoneNumber = '';
        console.log(phoneNumber);
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phoneNumber}`;
        }
        else {
            phoneNumber = `telprompt:${phoneNumber}`;
        }

        Linking.openURL(phoneNumber);
    };
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.mainContainer}>


                    <Text style={styles.text}>الاسم : {this.props.navigation.state.params.driver.name}</Text>
                    <Text> </Text>

                    <TouchableOpacity onPress={() => { this.dialCall(this.props.navigation.state.params.driver.phone) }} >

                        <Text style={styles.text}>الهاتف : {this.props.navigation.state.params.driver.phone}</Text>

                    </TouchableOpacity>
                    <Text style={styles.text}>الحالة : {this.props.navigation.state.params.driver.status}</Text>

                    <Text style={styles.text}>الميزانية : {this.props.navigation.state.params.driver.budget}</Text>
                    <Text style={styles.text}>تكلفة الاوردر : {this.props.navigation.state.params.order.totalOrder}</Text>
                    <Text style={styles.text,{backgroundColor:this.props.navigation.state.params.order.totalOrder>this.props.navigation.state.params.driver.budget?'red':'green'}}>سماحية الميزانية</Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        
                       
                        contentContainerStyle={{ paddingBottom: 100 }}
                        data={this.state.adresses}

                        renderItem={({ item }) => (
                        <Text style={{marginVertical:5}}>
                            {item.street} {item.route} {item.neighbourhood} {item.administrative_area} {item.city}
                        
                        </Text>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                        style={{ width: '100%' }}
                        keyExtractor={(item, index) => index}
                        horizontal={false}
                        numColumns={1}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} onPress={() => { this.assign() }}>
                            <Text >تكليف</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => { this.cancel() }}>
                            <Text >الغاء</Text>
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
        marginHorizontal: 5,
        marginBottom: 30
    },
    text:{
        fontSize:16,
        fontWeight:'bold'
    }



});