import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';

/* colors */
import colors from '../../colors'





const  OrderItem = (data) => {
    
    let color="red"
   console.log("s");
    return (

        <TouchableOpacity
            style={{
                paddingVertical: 5,
                paddingHorizontal: 5,
                backgroundColor: color,
                borderColor: "#eee",
                borderRadius: 5,
                elevation: 10
            }}
            onPress={() => console.log("h")}
        >
            <Text style={{ color: "#fff",fontSize:12 }}>{data.src.name}</Text>
        </TouchableOpacity>


    );

}
export default React.memo(OrderItem)
const styles = StyleSheet.create({


    orderOpacity: {
        width: Dimensions.get('window').width * 342 / 375,
        height: Dimensions.get('window').height * 160 / 812,
        borderRadius: 15,
        margin: Dimensions.get('window').width * 0.4 / 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,

        elevation: 2,
        padding: 15,
        paddingTop: 5
    },

});

