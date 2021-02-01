import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  Map from './containers/Map/Map'
import  Main from './containers/Main/Main'
import Navigation from './containers/Navigation/Navigation'
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigation />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    marginTop:50
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
