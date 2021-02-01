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


export default class Budget extends React.Component {
  static navigationOptions = { header: null };
  state = {
    budget: 0
  };
  componentDidMount() {
    console.log(this.props.navigation.state.params);
    // this.setState({ orderChange: this.props.navigation.state.params.history })
    this.setState({ budget: this.props.navigation.state.params.budget })

  }
  changeBudget(text) {
    console.log(text);
    if (text != '') {
      this.setState({ budget: parseInt(text) })
    }
    else {
      this.setState({ budget: 0 })
    }
  }
  _handleSubmit(){
    dataService.editDriver({budget:this.state.budget,driver:this.props.navigation.state.params._id,name:this.props.navigation.state.params.name}).then(res => {
      console.log(res.data);
      // console.log(res.data.token);
      // setToken(res.data.token)
      this.props.navigation.navigate("Main")
  }).catch(err => {
      console.log(err.response.data);
      // this.setState({ errorMessage: err.response.data.status })
  })

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
              Change Budget
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
          <Text>Enter new Budget</Text>
          <View style={styles.yellowContainer}>

            <View style={styles.iconView}>
              <Image source={require("../../assets/icons/user.png")}
                style={styles.imageStyle} />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Phone number"
                value={this.state.budget.toString()}
                placeholderTextColor={'#ccc'}
                width={Dimensions.get('window').width * 3 / 5}
                keyboardType={Platform.OS ? "numeric" : "number-pad"}
                autoCapitalize='none'
                onChangeText={(text) => this.changeBudget(text)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.tOpacity}
            // disabled={this.state._ckeckSignIn}
            onPress={() => this._handleSubmit()}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
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
});
