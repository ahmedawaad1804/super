import React from 'react';
import { Image, Dimensions } from 'react-native';
import { createSwitchNavigator, createStackNavigator,createAppContainer} from 'react-navigation';
import Main from '../Main/Main'
import Map from '../Map/Map'
import Order from '../Order/Order'
import Assign from '../Assign/Assign'
import Login from '../Login/Login'
import MapDriver from '../MapDriver/MapDriver'
import DriverList from '../DriverList/DriverList'
import DriverInfo from '../DriverInfo/DriverInfo'
import Current from '../Current/Current'
import Previous from '../Previous/Previous'
import Budget from '../Budget/Budget'
import CurrentOrder from '../CurrentOrder/CurrentOrder'
const Stack = createStackNavigator({
   
    Main,
    Map,
    Order,
    Assign,
    MapDriver,
    DriverList,
    DriverInfo,
    Current,
    Previous,
    Budget,
    CurrentOrder
})
const switchNavigator = createSwitchNavigator({
    Login,
    Stack
})

// const App = createAppContainer(Stack);
// const AppContainer = createAppContainer(switchNavigator);
export default switchNavigator