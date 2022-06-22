import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
// import Icon3 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../constants/colors";
// import { PrimaryButton } from "../../consts/button";
import { firestore } from "../firebase";

const FeedbackHistory = ({ navigation }) => {
  const [feedback, setFeedback] = useState([]);

  const feedbackRef = firestore.collection("feedback");

  useEffect(async () => {
    feedbackRef.onSnapshot((querySnapshot) => {
      const feedbackArray = [];
      querySnapshot.forEach((doc) => {
        const { firstname,lastname,user,comment } = doc.data();
        feedbackArray.push({
          id: doc.id,
          firstname,
          lastname,
          user,
          comment,
        });
      });
      setFeedback(feedbackArray);
    });
  }, []);

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        {/* <Image source={{}} style={{ height: 80, width: 80 }} /> */}
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          
          <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: -10 }}>
            Feedback ID : {item.firstname}
          </Text>
          <Text style={{ fontSize: 15, color: COLORS.grey, marginTop: 10 }}>
            {item.start} - {item.end}
          </Text>
          {/* <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 9 }}>
            Room Type
          </Text> */}
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Icon
            name="arrow-forward"
            size={23}
            color={"#4b5142"}
            onPress={() =>
              navigation.navigate("ViewFeedback", { paramkey: item.id })
            }
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS,
        flex: 1,
        paddingTop: 20,
      }}
    >
      <View style={style.header}>
          <Icon
            name="arrow-back"
            size={28}
            color={COLORS}
            onPress={navigation.goBack}
          />
        </View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            color: COLORS,
            marginLeft: 23,
            fontSize: 17,
            marginBottom: 5,
          }}
        >
          All Feedback From User
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={feedback}
          renderItem={({ item }) => <CartCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 80,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default FeedbackHistory;