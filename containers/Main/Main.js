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
import DateTimePicker from '@react-native-community/datetimepicker';
/* colors */
import colors from "../../colors";
/* services */
import dataService from "../../services/dataService";
/* components */
import OrderItem from "../../components/OrderItem/OrderItem";

export default class Main extends React.Component {
  static navigationOptions = { header: null };
  state = {
    orders: [],
    refreshing: false,
    date: new Date(),
    show: false,
    mode: 'date',
    ordersModified: []
  };
  componentDidMount() {
    dataService.getOrders().then((res) => {
    
      this.setState({ ordersModified: res.data }, () => { this.setState({ orders: this.state.ordersModified }) });
    });
    this.interval = setInterval(() => {
      dataService.getOrders().then((res) => {
        this.setState({ ordersModified: res.data });

      });
    }, 5000);
  }
  assign = (item) => {
    console.log(item._id);
    this.props.navigation.navigate("Map", item);
  };
  cancel = (item) => {
    dataService
      .cancelOrder({
        id: item._id,
        cancelObject: {
          canceledBy: "supervisor",
          message: "Canceled by supervisor",
        },
      })
      .then((res) => {
        console.log(res.data);
        // this.setState({ orders: res.data })
      });
    // console.log(item);
  };
  details = (item) => {
    // console.log("----------------------------");
    // console.log(item);
    this.props.navigation.navigate("Order", item);
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onRefresh() {
    // this.setState({ refreshing: true })
    dataService.getOrders().then((res) => {
      this.setState({ ordersModified: res.data }, () => { this.setState({ orders: this.state.ordersModified }) });

    });
  }
  gotomap() {
    this.props.navigation.navigate("MapDriver");
  }
  gotoList() {
    this.props.navigation.navigate("DriverList");

  }
  onChange = (event, date) => {
    let tempArr = []
    for (const iterator of this.state.ordersModified) {
      // console.log(new Date(iterator.Date).toDateString());
      if (new Date(iterator.Date).toDateString() == new Date(date).toDateString()) {
        tempArr.push(iterator)
      }
    }

    // console.log(new Date(date).toDateString() )
    this.setState({ show: false, orders: tempArr })

  }
  setShow() {
    this.setState({ show: true })
  }
  resetAll(){
    
    this.setState({  orders: this.state.ordersModified })

  }
  today(){
    let toDay=[]
    this.state.ordersModified.forEach(order=>{
     
      if (new Date(order.Date).toDateString()== new Date(Date.now()).toDateString()) {
        toDay.push(order)
      }
    })
    this.setState({orders:toDay})
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.show &&
          (<DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.onChange}

          />

          )}

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
              Orders
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
          <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { this.today() }}>
              <Text style={{color:colors.white}} >Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { this.setShow() }}>
              <Text style={{color:colors.white}} >pick Date</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { this.resetAll() }}>
              <Text style={{color:colors.white}} >reset</Text>
            </TouchableOpacity>
           
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}

            contentContainerStyle={{ paddingBottom: 100 }}
            data={this.state.orders}
            renderItem={({ item }) => (
              // <Text>sd</Text>
              <OrderItem
                // handlePress={() => this.handlePress(item)}
                src={item}
                assign={() => this.assign(item)}
                cancel={() => this.cancel(item)}
                details={() => this.details(item)}
              />
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
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                height: (Dimensions.get("window").height * 1) / 12,
                backgroundColor: colors.primary,
                width: Dimensions.get("window").width,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1

              }}
              onPress={() => { this.gotomap() }}
            >
              <Text style={{ fontSize: 20 }}>Go to map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: (Dimensions.get("window").height * 1) / 12,
                backgroundColor: colors.primary,
                width: Dimensions.get("window").width,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1

              }}
              onPress={() => { this.gotoList() }}
            >
              <Text style={{ fontSize: 20 }}>Drivers</Text>
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
    width: (Dimensions.get("window").width * 342) / 375,
    height: (Dimensions.get("window").height * 95) / 812,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.white,
    flexDirection: "row",
    borderTopWidth: 1,
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
    width: Dimensions.get("window").width * 6 / 20,
    height: Dimensions.get("window").height * 1 / 20,
    alignSelf: 'center',
    backgroundColor: '#e6502f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 5,
  },
  btnContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  }
});
