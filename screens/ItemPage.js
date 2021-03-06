// import React, { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/core";
// import {
//   View,
//   SafeAreaView,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   Image,
//   Text,
//   FlatList,
//   ScrollView,
//   Dimensions,
//   Animated,
//   CheckBox,
// } from "react-native";
// import { Header } from "react-native-elements";
// import color from "../constants/colors";
// // import Icon2 from "react-native-vector-icons/MaterialIcons";
// import item from "../constants/ItemType";
// import { firestore, auth } from "../firebase";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// //import Icon3 from "react-native-vector-icons/FontAwesome5";

// const ItemPage = () => {
//   const navigation = useNavigation();
//   const [items, setItems] = useState([]);
//   const [numCols, setColumnNo] = useState(2);

//   const [isSelected, setSelection] = useState(false);

//   // const CatsCard = ({ cat }) => {
//   //   return (
//   //     <TouchableOpacity
//   //       activeOpacity={1}
//   //       onPress={() => navigation.navigate("CatDetails", cat)}
//   //     >
//   //       <Animated.View style={styles.CatsCard}>
//   //         <Image style={styles.CatsCardImage} source={cat.image} />
//   //         <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
//   //           <Text style={{ fontSize: 16, fontWeight: "bold" }}>{cat.name}</Text>
//   //           <Text
//   //             style={{ fontSize: 11, fontWeight: "bold", color: COLORS.grey }}
//   //           >
//   //             {cat.age}
//   //           </Text>
//   //         </View>
//   //       </Animated.View>
//   //     </TouchableOpacity>
//   //   );
//   // };

//   const itemRef = firestore
//     .collection("item")
//     .where("owner", "==", auth.currentUser.uid);

//   useEffect(async () => {
//     itemRef.onSnapshot((querySnapshot) => {
//       const itemArray = [];
//       querySnapshot.forEach((doc) => {
//         const {
//           id,
//           color,
//           amount,
//           name,
//           owner,
//         } = doc.data();
//         catArray.push({
//           id: doc.id,
//           color,
//           amount,
//           name,
//           owner,
//         });
//       });
//       setItems(itemArray);
//     });
//   }, []);

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: COLORS.background, paddingTop: 20 }}
//     >
//       {/* for button */}
//       {/* <View style={{ flexDirection: "row" }}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate("AddCats")}
//           style={styles.menuButton}
//         >
//           <Image
//             source={require("../../assets/happy.png")}
//             resizeMode="center"
//             style={styles.menuImage2}
//           />
//           <Text style={styles.menuText}>Add new cat</Text>
//         </TouchableOpacity>
//       </View> */}

//       {/* cats */}
//       <View style={styles.container}>
//         {/* <Text
//           style={{
//             fontWeight: "bold",
//             color: "#665444",
//             marginLeft: 12,
//             marginBottom: -20,
//             fontSize: 20,
//           }}
//         >
//           Registered Cat Lists
//         </Text> */}
//         <FlatList
//           data={item}
//           contentContainerStyle={{
//             paddingBottom: 30,
//           }}
//           key={numCols}
//           numColumns={numCols} ></FlatList>
//           // renderItem={({ item }) => <CatsCard cat={item} />}

//         //   renderItem={({ item }) => (
//         //     <TouchableOpacity
//         //       activeOpacity={1}
//         //       onPress={() =>
//         //         navigation.navigate("ItemDetails", { paramkey: item.id })
//         //       }
            
//               <Animated.View style={styles.CatsCard}>
//                 <Image
//                   style={styles.CatsCardImage}
//                   source={{ uri: item.image }}
//                 />
//                 <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
//                   <Text style={{ fontSize: 16, fontWeight: "bold" }}>
//                     <CheckBox
//                       value={isSelected}
//                       onValueChange={setSelection}
//                       style={styles.checkbox}
//                     />
//                     {item.name}
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 11,
//                       fontWeight: "bold",
//                       color: COLORS.grey,
//                     }}
//                   >
//                     {item.birthdate}
//                   </Text>
//                 </View>
//               </Animated.View>
//             // </TouchableOpacity>
//             )}
//       </View>
//     </SafeAreaView>
//   );
// };
// export default CatPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     marginLeft: 10,
//   },
//   userInfoSection: {
//     paddingHorizontal: 30,
//     marginBottom: 35,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//     fontWeight: "500",
//   },
//   row: {
//     flexDirection: "row",
//     marginBottom: 13,
//   },
//   button: {
//     backgroundColor: "#e8a468",
//     width: 150,
//     padding: 10,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 15,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   infoBoxWrapper: {
//     borderBottomColor: "#dddddd",
//     borderBottomWidth: 1,
//     borderTopColor: "#dddddd",
//     borderTopWidth: 1,
//     flexDirection: "row",
//     height: 100,
//   },
//   infoBox: {
//     width: "50%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   name: {
//     fontSize: 15,
//     fontWeight: "bold",
//   },
//   menuWrapper: {
//     marginTop: 10,
//   },
//   cardImage: {
//     height: 200,
//     width: "100%",
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },
//   cardButton: {
//     alignItems: "center",
//     backgroundColor: "#ffe3c9",
//     borderColor: "#e0c3a8",
//     borderRadius: 15,
//     height: 250,
//     width: 200,
//     marginTop: 30,
//   },
//   menuItem: {
//     flexDirection: "row",
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//   },
//   menuItemText: {
//     color: "#777777",
//     marginLeft: 20,
//     fontWeight: "600",
//     fontSize: 16,
//     lineHeight: 26,
//   },
//   header: {
//     marginTop: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 20,
//     justifyContent: "space-between",
//   },
//   textBox: {
//     height: 40,
//     alignItems: "center",
//     paddingLeft: 20,
//     flex: 1,
//     backgroundColor: COLORS.secondary,
//     borderTopLeftRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomRightRadius: 20,
//     flexDirection: "row",
//   },
//   menuImage: {
//     marginTop: 20,
//     width: 50,
//     height: 80,
//   },
//   menuImage2: {
//     marginTop: 20,
//     width: 45,
//     height: 80,
//   },
//   menuImage3: {
//     marginTop: 20,
//     width: 45,
//     height: 80,
//   },
//   menuText: {
//     fontSize: 12,
//     marginTop: -10,
//   },
//   menuButton: {
//     alignItems: "center",
//     backgroundColor: "#ffe3c9",
//     borderColor: "#e0c3a8",
//     borderRadius: 15,
//     height: 150,
//     width: 120,
//     marginLeft: 16,
//     marginTop: 30,
//   },
//   CatsCard: {
//     height: 160,
//     width: 160,
//     backgroundColor: COLORS.white,
//     elevation: 15,
//     marginHorizontal: 13,
//     borderRadius: 10,
//     marginTop: 15,
//   },
//   CatsCardImage: {
//     height: 105,
//     width: "100%",
//     borderTopRightRadius: 10,
//     borderTopLeftRadius: 10,
//   },
//   checkbox: {
//     alignSelf: "center",
//   },
// });