// import React, { useState } from "react";
// import {
//   ImageBackground,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   Picker,
// } from "react-native";
// import { useNavigation } from "@react-navigation/core";
// import {
//   Avatar,
//   Title,
//   Caption,
//   Text,
//   TextInput,
//   TouchableRipple,
// } from "react-native-paper";
// // import DatePicker from "react-native-datepicker";
// // import { Header } from "react-native-elements";
// import COLORS from "../constants/colors";
// // import Icon2 from "react-native-vector-icons/MaterialIcons";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// // import Icon3 from "react-native-vector-icons/Ionicons";
// import Fontisto from "react-native-vector-icons/Fontisto";
// // import * as ImagePicker from "expo-image-picker";
// // import firebaseErrors from "../../../firebaseErrors";
// import uuid from "uuid";
// import {
//   auth,
//   firestore,
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytes,
// } from "../firebase";

// const AddItems = () => {
//   const navigation = useNavigation();
//   const [date, setDate] = useState("");
//   const [itemData, setItemData] = useState("");
// //   const [image, setImage] = useState("");

// //   const photo = auth.currentUser.photoURL;

//   const pickImage = async () => {
//     let pickerResult = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     console.log({ pickerResult });

//     if (!pickerResult.cancelled) {
//       setImage(pickerResult);
//     }

//     handleImagePicked(pickerResult);
//   };

//   const handleImagePicked = async (pickerResult) => {
//     try {
//       // this.setState({ uploading: true });
//       setImage({ uploading: true });

//       if (!pickerResult.cancelled) {
//         const uploadUrl = await uploadImageAsync(pickerResult.uri);
//         // this.setState({ image: uploadUrl });
//         setImage(uploadUrl);
//       }
//     } catch (e) {
//       console.log(e);
//       alert("Upload failed, sorry :(");
//     }
//   };

//   const handleAdd = async () => {
//     firestore.collection("item").add({
//       name: itemData.name,
//       amount: itemData.amount,
//       color: itemData.color,
//       owner: auth.currentUser.uid,
//     });

//     navigation.replace("ItemPage");
//   };

//   // useEffect(() => {
//   //   getCat();
//   // }, []);

//   async function uploadImageAsync(uri) {
//     const blob = await new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         resolve(xhr.response);
//       };
//       xhr.onerror = function (e) {
//         console.log(e);
//         reject(new TypeError("Network request failed"));
//       };
//       xhr.responseType = "blob";
//       xhr.open("GET", uri, true);
//       xhr.send(null);
//     });

//     const fileRef = ref(getStorage(), uuid.v4());
//     const result = await uploadBytes(fileRef, blob);

//     // blob.close();

//     return await getDownloadURL(fileRef);
//   }

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: COLORS.background }}
//     >
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* <Header
//           backgroundColor="#e8a468"
//           placement="center"
//           leftComponent={
//             <TouchableOpacity onPress={navigation.goBack}>
//               <Icon2 name="arrow-back-ios" size={23} color={"#fff"} />
//             </TouchableOpacity>
//           }
//           centerComponent={{
//             text: "ADD CATS",
//             style: { color: "#fff", fontWeight: "bold", fontSize: 15 },
//           }}
//         /> */}

//         <View>
//           <View style={styles.userInfoSection}>
//             <View
//               style={{
//                 flexDirection: "row",
//                 marginTop: 15,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <TouchableOpacity onPress={() => pickImage()}>
//                 <View
//                   style={{
//                     height: 100,
//                     width: 100,
//                     borderRadius: 15,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ImageBackground
//                     style={{ height: 95, width: 95 }}
//                     imageStyle={{ borderRadius: 50 }}
//                   >
//                     <View
//                       style={{
//                         flex: 1,
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Icon
//                         name="camera"
//                         size={33}
//                         color="#fff"
//                         style={{
//                           opacity: 0.7,
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       />
//                     </View>
//                   </ImageBackground>
//                 </View>
//               </TouchableOpacity>
//             </View>
//             <View style={{ justifyContent: "center", alignItems: "center" }}>
//               <Text
//                 style={{
//                   marginTop: 10,
//                   marginBottom: 5,
//                   color: "#665444",
//                   fontSize: 15,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Upload Photo
//               </Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.userInfoSection}>
//           <Text
//             style={{
//               fontWeight: "bold",
//               color: "#665444",
//               marginLeft: 5,
//               marginBottom: 5,
//             }}
//           >
//             Full Name *
//           </Text>
//           <View style={styles.row}>
//             <View style={styles.textBox}>
//               <Icon name="cat" color="#665444" size={20} />
//               <TextInput
//                 style={styles.editTextBox}
//                 borderColor="transparent"
//                 placeholder="Name"
//                 placeholderTextColor="#666666"
//                 placeholderTextSize="20"
//                 autoCorrect={false}
//                 value={itemData ? itemData.name : ""}
//                 onChangeText={(text) => setItemData({ ...itemData, name: text })}
//               ></TextInput>
//             </View>
//           </View>

//           <Text
//             style={{
//               fontWeight: "bold",
//               color: "#665444",
//               marginLeft: 5,
//               marginBottom: 5,
//             }}
//           >
//             Amount *
//           </Text>
//           <View style={styles.row}>
//             <View style={styles.textBox}>
//               <Icon name="human-male-female" color="#665444" size={20} />
//               <Picker
//                 selectedValue={itemData.amount}
//                 style={{ height: 50, width: 290, marginLeft: 20 }}
//                 onValueChange={(itemValue) =>
//                   setCatData({ ...itemData, amount: itemValue })
//                 }
//               >
//                 <Picker.Item label="Not Set" value="" />
//                 <Picker.Item label="Female" value="Female" />
//                 <Picker.Item label="Male" value="Male" />
//               </Picker>
//             </View>
//           </View>

//           <Text
//             style={{
//               fontWeight: "bold",
//               color: "#665444",
//               marginLeft: 5,
//               marginBottom: 5,
//             }}
//           >
//             Birth Date
//           </Text>
//           <View style={styles.row}>
//             <View style={styles.textBox}>
//               <Icon name="cake-variant" color="#665444" size={20} />
//               <DatePicker
//                 style={styles.datePickerStyle}
//                 date={date}
//                 mode="date"
//                 placeholder="Select date"
//                 format="DD/MM/YYYY"
//                 minDate="01-01-1900"
//                 showIcon={false}
//                 confirmBtnText="Confirm"
//                 cancelBtnText="Cancel"
//                 customStyles={{
//                   // dateIcon: {
//                   //   position: 'absolute',
//                   //   right: -5,
//                   //   top: 4,
//                   //   marginLeft: 0,
//                   // },
//                   dateInput: {
//                     borderColor: "#b3a396",
//                     alignItems: "flex-start",
//                     fontSize: 16,
//                     marginLeft: 20,
//                     borderWidth: 0,
//                     borderBottomWidth: 0.6,
//                   },
//                   placeholderText: {
//                     fontSize: 15,
//                     color: "#666666",
//                   },
//                   dateText: {
//                     fontSize: 17,
//                   },
//                 }}
//                 // value={catData ? catData.birth_date : ""}
//                 // onChangeText={(date) =>
//                 //   setCatData({ ...catData, birth_date: date })
//                 // }
//                 // onDateChange={(date) => {
//                 //   setDate(date);
//                 // }}
//               />
//               {/* <TextInput
//                     style={styles.editTextBox}
//                     placeholder="Birth Date"
//                     placeholderTextColor="#666666"
//                     placeholderTextSize="20"
//                     // autoCorrect={false}
//                     // value={userData ? userData.name : ""}
//                     // onChangeText={(text) =>
//                     //   setUserData({ ...userData, name: text })
//                     // }
//                   ></TextInput> */}
//             </View>
//           </View>

//           <Text
//             style={{
//               fontWeight: "bold",
//               color: "#665444",
//               marginLeft: 5,
//               marginBottom: 5,
//             }}
//           >
//             Color *
//           </Text>
//           <View style={styles.row}>
//             <View style={styles.textBox}>
//               <Icon3 name="add-circle" color="#665444" size={20} />
//               <TextInput
//                 style={styles.editTextBox}
//                 placeholder="Color"
//                 placeholderTextColor="#666666"
//                 placeholderTextSize="20"
//                 autoCorrect={false}
//                 value={itemData ? itemData.color : ""}
//                 onChangeText={(text) =>
//                   setItemData({ ...itemData, color: text })
//                 }
//               ></TextInput>
//             </View>
//           </View>

//           <Text
//             style={{
//               fontWeight: "bold",
//               color: "#665444",
//               marginLeft: 5,
//               marginBottom: 5,
//             }}
//             ></Text>

//           <Text
//             style={{
//               fontWeight: "bold",
//               color: "#665444",
//               marginLeft: 5,
//               marginBottom: 5,
//             }}
//           ></Text>
//  </View>
          
//         <View style={styles.button}>
//           <Text style={styles.buttonText} onPress={handleAdd}>
//             Save Item
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AddItems;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 30,
//   },
//   userInfoSection: {
//     paddingHorizontal: 30,
//     marginBottom: 35,
//   },
//   title: {
//     fontSize: 24,
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
//   menuWrapper: {
//     marginTop: 10,
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
//   editTextBox: {
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
//     fontSize: 15,
//   },
//   button: {
//     height: 52,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: COLORS.primary,
//     marginHorizontal: 20,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   datePickerStyle: {
//     width: 310,
//   },
// });