import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Linking, Platform, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { AsyncStorage } from 'react-native';
/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import OrderItem from '../../components/OrderItem/OrderItem'
/* token */
import { setToken } from '../../utility/storage'
export default class Main extends React.Component {
    state = {
        OrderData: {},
        adresses: [],
        username: "",
        password: "",
        errorMessage: " ",
        isCashed:false
    }
    async componentDidMount() {
     let username= await AsyncStorage.getItem('username')
     console.log(username);
        if(username){
            let password= await AsyncStorage.getItem('password')
            if(password&&username){
                this.setState({isCashed:true,username:username,password:password})
            }
            else{
               await AsyncStorage.removeItem('phonenumber')
               await AsyncStorage.removeItem('password')
            }
        }
        
       
    }

    _handlePUsername(text) {
        this.setState({ username: text })
    }
    _handlePassword(text) {
        this.setState({ password: text })
    }
  async rememberme(){
        try {
            await AsyncStorage.setItem(
              'username', this.state.username
            );
            await AsyncStorage.setItem(
              'password', this.state.password
            );
            console.log("we saved");
          } catch (error) {
            // Error saving data
            console.log(error);
      
          }
    }
    _handleSubmit() {
        this.rememberme()
        dataService.authunticate(this.state.username,this.state.password).then(res => {
            // console.log(res.data);
            // console.log(res.data.token);
            setToken(res.data.token)
            this.props.navigation.navigate("Stack")
        }).catch(err => {
            console.log(err.response.data);
            this.setState({ errorMessage: err.response.data.status })
        })
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.mainContainer}>
                    <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                    <Text> </Text>
                    <Text>Enter User Name and Password</Text>
                    <View style={[styles.yellowContainer,]}>

                        <View style={styles.iconView}>
                            <Image source={require("../../assets/icons/user.png")}
                                style={styles.imageStyle} />
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Phone number"
                                value={this.state.username}
                                placeholderTextColor={'#ccc'}
                                width={Dimensions.get('window').width * 3 / 5}
                                keyboardType={Platform.OS ? "numeric" : "number-pad"}
                                autoCapitalize='none'
                                onChangeText={(text) => this._handlePUsername(text)}
                            />
                        </View>
                    </View>


                    <View style={styles.yellowContainer}>
                        <View style={styles.iconView}>
                            <Image source={require("../../assets/icons/password.png")}
                                style={styles.imageStyle} />
                        </View>
                        <View style={styles.textInputViewPass}>
                            <TextInput
                                style={styles.textInputStyle}
                                value={this.state.password}
                                placeholder="Password"
                                placeholderTextColor={'#ccc'}
                                width={Dimensions.get('window').width * 3 / 5}

                                secureTextEntry={true}
                                autoCapitalize='none'
                                onChangeText={(text) => this._handlePassword(text)}
                            />
                        </View>


                    </View>
                    <TouchableOpacity style={styles.tOpacity}
                        // disabled={this.state._ckeckSignIn}
                        onPress={() => this._handleSubmit()}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>

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
    }
    ,
    yellowContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: '#FDFDDD',
        borderRadius: 35,
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
    },
    iconView: {
        borderTopLeftRadius: 35,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#FFF064',
        width: Dimensions.get('window').width * 54 / 375,
        height: Dimensions.get('window').height * 46 / 812,

    },
    imageStyle: {
        width: 10,
        height: 10,
        padding: 10,
        resizeMode: "contain"
    },
    imageStyleEye: {
        width: 10,
        height: 10,
        padding: 10,
        resizeMode: "contain"
    },
    textInputViewPass: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: Dimensions.get('window').width * (343 - 110) / 375,
        height: Dimensions.get('window').height * 46 / 812,
    },
    textInputStyle: {
        paddingHorizontal: 10,
    },
    tOpacity: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        paddingHorizontal: 10,
        width: Dimensions.get('window').width * (343) / 375,
    
      }


});