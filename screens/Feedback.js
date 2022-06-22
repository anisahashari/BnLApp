import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  Share,
  View,
  SafeAreaView,
  StyleSheet,
  Picker,
  Alert,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import COLORS from '../constants/color';
// import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon3 from "react-native-vector-icons/FontAwesome5";
// import * as ImagePicker from "expo-image-picker";

// import { Header } from "react-native-elements";
// import firebaseErrors from "../firebaseErrors";
import uuid from 'uuid';
import {
  auth,
  firestore,
  firebase,
  updateProfile,
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from '../firebase';

const Feedback = () => {
  const navigation = useNavigation();

  const [feedbackData, setFeedbackData] = useState('');
  // const [displayName, setDisplayName] = useState(auth.currentUser.displayName);

  const getFeedback = async () => {
    const feedbackRef = firestore.collection('feedback').doc(auth.currentUser.uid);
    const doc = await feedbackRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      setFeedbackData(doc.data());
    }
  };
  

//   const pickImage = async () => {
//     let pickerResult = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     console.log({pickerResult});

//     if (!pickerResult.cancelled) {
//       setImage(pickerResult);
//     }

//     handleImagePicked(pickerResult);
//   };

//   const handleImagePicked = async pickerResult => {
//     try {
//       // this.setState({ uploading: true });
//       setImage({uploading: true});

//       if (!pickerResult.cancelled) {
//         const uploadUrl = await uploadImageAsync(pickerResult.uri);
//         // this.setState({ image: uploadUrl });
//         setImage(uploadUrl);
//       }
//     } catch (e) {
//       console.log(e);
//       alert('Upload failed, sorry :(');
//     }
//   };

//   async function uploadImageAsync(uri) {
//     const blob = await new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         resolve(xhr.response);
//       };
//       xhr.onerror = function (e) {
// //         console.log(e);
// //         reject(new TypeError('Network request failed'));
// //       };
// //       xhr.responseType = 'blob';
// //       xhr.open('GET', uri, true);
// //       xhr.send(null);
//     });

//     const fileRef = ref(getStorage(), uuid.v4());
//     const result = await uploadBytes(fileRef, blob);

//     // blob.close();

//     return await getDownloadURL(fileRef);
//   }

//   const handleUpdate = async () => {

//     firestore
//       .collection('feedback')
//       .doc(auth.currentUser.uid)
//       .update({
//         firstname: feedbackData.firstname,
//         lastname: feedbackData.lastname,
//         comment: feedbackData.comment,
//       })
//       .then(() => {
//         console.log('Feedback Updated!');
//         Alert.alert(
//           'Feedback Updated!',
//           'Your Feedback has been submitted successfully!',
//         );
//       })
//       .catch(error => {
//         alert(firebaseErrors[error.code] || error.message);
//       });

//     navigation.replace('Feedback');
//   };
const handleAdd = async () => {
  firestore.collection("feedback").add({
    firstname: feedbackData.firstname,
    lastname: feedbackData.lastname,
    comment: feedbackData.comment,
    user: auth.currentUser.uid,
  });

  navigation.replace("FeedbackHistory");
};
  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FCFCFC'}}>
        {/* <Header
          backgroundColor="#e8a468"
          placement="center"
          leftComponent={
            <TouchableOpacity
              onPress={() => navigation.navigate("UserProfile")}
            >
              <Icon2 name="arrow-back-ios" size={23} color={"#fff"} />
            </TouchableOpacity>
          }
          centerComponent={{
            text: "EDIT PROFILE",
            style: { color: "#fff", fontWeight: "bold", fontSize: 15 },
          }}
        /> */}
         <View >
          <Icon
            name="arrow-left"
            size={28}
            color={COLORS.dark}
            onPress={navigation.goBack}
            style={{
              flexDirection: 'row',
              marginTop: 25,
              alignItems: 'left',
              justifyContent: 'left',
            }}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Title
            style={{
              color: COLORS.primary, 
              fontWeight: 'bold', 
              fontSize: 25, 
              marginTop: 15,
              marginBottom: 5,}} >
            F e e d b a c k
          </Title></View>
        <View>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => pickImage()}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <ImageBackground
                    source={{uri: image}}
                    style={{height: 95, width: 95}}
                    imageStyle={{borderRadius: 50}}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="camera"
                        size={33}
                        color="#cfc0f0"
                        style={{
                          opacity: 0.7,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    </View>
                  </ImageBackground> */}
                </View>
                {/* <Avatar.Image
                  source={image ? { uri: image } : { uri: photo }}
                  size={90}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#665444',
              marginLeft: 5,
              marginBottom: 5,
            }}>
            Firstname
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="account" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                borderColor="transparent"
                placeholder="First Name"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={feedbackData ? feedbackData.firstname : ''}
                onChangeText={text =>
                  setFeedbackData({...feedbackData, firstname: text})
                }></TextInput>
            </View>
          </View>

          <Text
            style={{
              fontWeight: 'bold',
              color: '#665444',
              marginLeft: 5,
              marginBottom: 5,
            }}>
            LastName
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="account-check" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                borderColor="transparent"
                placeholder="Last Name"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={feedbackData ? feedbackData.lastname : ''}
                onChangeText={text =>
                  setFeedbackData({...feedbackData, lastname: text})
                }></TextInput>
            </View>
          </View>

          <Text
            style={{
              fontWeight: 'bold',
              color: '#665444',
              marginLeft: 5,
              marginBottom: 5,
            }}>
            Comment
          </Text>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="comment" color="#665444" size={20} />
              <TextInput
                style={styles.editTextBox}
                borderColor="transparent"
                placeholder="A feedback is appreciated!"
                placeholderTextColor="#666666"
                placeholderTextSize="20"
                autoCorrect={false}
                value={feedbackData ? feedbackData.comment : ''}
                onChangeText={text =>
                  setFeedbackData({...feedbackData, comment: text})
                }></TextInput>
            </View>
          </View>
          
          <Text
            style={{
              fontWeight: 'bold',
              color: '#665444',
              marginLeft: 5,
              marginBottom: 5,
            }}></Text>
          
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText} onPress={handleAdd}>
            Save Feedback
          </Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate("FeedbackHistory")}>
            View Feedback
          </Text>
        </View>
       
      </SafeAreaView>
    </ScrollView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 13,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#7841e9',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  textBox: {
    height: 40,
    alignItems: 'center',
    paddingLeft: 20,
    flex: 1,
    backgroundColor: '#cfc0f0',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
  },
  editTextBox: {
    height: 40,
    alignItems: 'center',
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    fontSize: 15,
  },
  button: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
