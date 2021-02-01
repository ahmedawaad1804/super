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


export default class Previous extends React.Component {
  static navigationOptions = { header: null };
  state = {
    orders: []
  };
  componentDidMount() {
    console.log(this.props.navigation.state.params);
    // this.setState({ orderChange: this.props.navigation.state.params.history })
    // this.setState({ delivering: this.props.navigation.state.params.orders })

  }
  gotoOrder(item) {
    this.props.navigation.navigate("CurrentOrder",item.orderid)
    // console.log(item);
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
              style={{ fontSize: 20, }}            >
              Order History
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
          <FlatList
            style={{
              width: Dimensions.get('window').width,
              marginBottom: 30
            }}
            data={this.props.navigation.state.params}
            renderItem={({ item }) =>
              <TouchableOpacity style={styles.orderOpacity} onPress={()=>this.gotoOrder(item)}>

                <View style={{ marginBottom: 10 }}>

                  <View style={{ marginHorizontal: 10 }}>
                    <Text>budget before : {item.budgetbefore.toFixed(1)}</Text>
                    <Text>budget after : {item.budgetafter.toFixed(1)}</Text>
                    <Text>income : {item.income.toFixed(1)}</Text>
                    <Text>outcome : {item.outcome.toFixed(1)}</Text>
                    <Text>difference : {(item.outcome + item.income).toFixed(1)}</Text>

                  </View>
                </View>
              </TouchableOpacity>

            }
          />
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
  },
  orderOpacity: {
    width: Dimensions.get('window').width * 342 / 375,
    // height: Dimensions.get('window').height * 160 / 812,
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
