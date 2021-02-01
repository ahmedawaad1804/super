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


export default class DriverList extends React.Component {
  static navigationOptions = { header: null };
  state = {
    drivers: [],
    refreshing: false,
  };
  componentDidMount() {
    dataService.getStaticDriversData().then((res) => {
      // console.log("----------------------");
      console.log(res.data);
      this.setState({ drivers: res.data });
    });

  }
  componentWillUnmount() {
  }
  details(item) {
    this.props.navigation.navigate("DriverInfo",item);

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
              Drivers
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
            showsVerticalScrollIndicator={false}
            // ListHeaderComponent={this._headerItem}
            // maxToRenderPerBatch={20}
            // updateCellsBatchingPeriod={20}
            // legacyImplementation={false}
            // initialNumToRender={50}
            // ItemSeparatorComponent = { (<View><Text>asdf</Text></View>) }
            contentContainerStyle={{ paddingBottom: 100 }}
            data={this.state.drivers}
            renderItem={({ item }) => (

              // <Text>sd</Text>
              <View style={styles.orderOpacity}>
                <Text>Driver info </Text>
                <Text>Name : {item.name ? item.name : "not exist"}</Text>
                <Text>Status : {item.status ? item.status : "not exist"}</Text>
                <Text>budget : {item.budget ? item.budget : "not exist"}</Text>


                <View style={{ flexDirection: 'row' }}>

                  <TouchableOpacity style={styles.button} onPress={() => { this.details(item) }}>
                    <Text >details</Text>
                  </TouchableOpacity>
                </View>
              </View>

            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            style={{ width: "100%" }}
            keyExtractor={(item, index) => index}
            horizontal={false}
            numColumns={1}
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
    alignItems: "center",
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
    // alignItems: 'center',
    // justifyContent: 'center',
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
  tOpacity: {
    width: (Dimensions.get("window").width * 343) / 375,
    height: (Dimensions.get("window").height * 46) / 812,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  text: {
    // fontFamily: 'Cairo-Bold',
    fontSize: 14,
  },
  instructionText: {
    marginLeft: (Dimensions.get("window").width * 32) / 375,
    // fontFamily: 'Cairo-Regular',
    fontSize: 13,
  },
  headerText: {
    marginLeft: (Dimensions.get("window").width * 32) / 375,
    // fontFamily: 'Cairo-Regular',
    fontSize: 20,
  },
  bottomMainView: {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").height * 180) / 812,
  },
  orderOpacity: {
    width: Dimensions.get('window').width * 342 / 375,
    // height: Dimensions.get('window').height * 160 / 812,
    borderRadius: 15,
    margin: Dimensions.get('window').width * 0.4 / 20,
    alignItems: 'flex-start',
    alignSelf: 'center',
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
  imageStyle: {
    height: "90%",
    width: "100%",
    resizeMode: "contain",
  },
  titleText: {
    marginLeft: (Dimensions.get("window").width * 15) / 375,
    // fontFamily: 'Cairo-Bold',
    fontSize: 20,
    backgroundColor: colors.white,
  },
  Text: {
    marginLeft: (Dimensions.get("window").width * 15) / 375,
    // fontFamily: 'Cairo-Regular',
    fontSize: 13,
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    padding: 10,
    flex: 1, marginHorizontal: 5
  }
});
