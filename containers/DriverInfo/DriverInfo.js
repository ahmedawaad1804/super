import React from "react";
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Button,
  Animated,
  Input,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";

/* colors */
import colors from "../../colors";
/* services */
import dataService from "../../services/dataService";


export default class DriverInfo extends React.Component {
  static navigationOptions = { header: null };
  state = {
    orderChange: [],
    delivering: []
  };
  componentDidMount() {
    // console.log("/////////////////");
    // console.log(this.props.navigation.state.params.budget);
    this.setState({ orderChange: this.props.navigation.state.params.history })
    this.setState({ delivering: this.props.navigation.state.params.orders })

  }
  budget() {
    this.props.navigation.navigate("Budget",this.props.navigation.state.params);
  }
  current() {
    this.props.navigation.navigate("Current",this.state.delivering)

  }
  previous() {
    this.props.navigation.navigate("Previous",this.state.orderChange)

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: colors.white }} /> */}
        </View>
        <View style={styles.headerContainer}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity style={{ padding: 20 }}></TouchableOpacity>
          </View>
          <View
            style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                // fontFamily: 'Cairo-Regular',
                fontSize: 20,
              }}
            >
              {this.props.navigation.state.params.name}
            </Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 30,
                width: "70%",
              }}
            ></View>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <View>
            <Text> phone Number : {this.props.navigation.state.params.phone}</Text>
            <Text> Total Orders : {this.state.orderChange.length + this.state.delivering.length}</Text>
            <Text> Previous Orders : {this.state.orderChange.length}</Text>
            <Text> Current Orders : {this.state.delivering.length}</Text>
            <Text> budget : {this.props.navigation.state.params.budget}</Text>
          </View>
          <View style={{}}>

            <TouchableOpacity style={styles.button} onPress={() => { this.budget() }}>
              <Text >change budget</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { this.current() }}>
              <Text >Current Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { this.previous() }}>
              <Text >Previous Orders</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: "center",
  },
  cartImageStyle: {
    width: 37,
    height: 39,
    resizeMode: "contain",
  },
  mainContainer: {
    width: "100%",
    height: "89%",
    backgroundColor: colors.white,
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingBottom: 0,
  },

  headerContainer: {
    width: Dimensions.get("window").width,
    height: "11%",
    backgroundColor: colors.primary,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  button: {
    backgroundColor: colors.primary,
    height: Dimensions.get("window").height * 1.5 / 20,
    width: Dimensions.get("window").width * 9 / 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 20
  }
});
