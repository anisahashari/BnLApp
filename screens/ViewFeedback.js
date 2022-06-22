import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import COLORS from '../constants/colors';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon3 from "react-native-vector-icons/FontAwesome5";
import Icon from 'react-native-vector-icons/MaterialIcons';
// import hotels from "../../consts/roomType";
import {auth, firestore, getStorage, ref, getDownloadURL} from '../firebase';

const ViewFeedback = ({navigation, route}) => {
  const [feedbackData, setfeedbackData] = useState('');
  const [userData, setUserData] = useState('');

  const handleDelete = async () => {
    firestore
      .collection('feedback')
      .doc(route.params.paramkey)
      .delete()
      .then(() => {
        console.log('Doc deleted');
        Alert.alert(
          'Feedback Deleted!',
          'Feedback details has been deleted successfully :3',
        );
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });

    navigation.replace('FeedbackHistory');
  };

  const getFeedback = async () => {
    const feedbackRef = firestore
      .collection('feedback')
      .doc(route.params.paramkey);
    const doc = await feedbackRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      setfeedbackData(doc.data());
    }

    const userRef = firestore.collection('user').doc(doc.data().by);
    const docUser = await userRef.get();
    if (!docUser.exists) {
      console.log('No such document!');
    } else {
      setUserData(docUser.data());
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS,
        paddingBottom: 20,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={style.headerImage}>
        <View style={style.header}>
          <Icon
            name="arrow-back"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
        </View>
      </ImageBackground>
      <View>
        <View style={style.header}>
          <Text style={{fontSize: 26, fontWeight: 'bold'}}>
            {route.params.paramkey}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}></View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>First name</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#4b5142',
                marginLeft: 5,
                marginRight: 15,
              }}>
              {feedbackData.firstname
                ? feedbackData.firstname
                : 'Feedback Unavailable'}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Last name</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#4b5142',
                marginLeft: 5,
                marginRight: 15,
              }}>
              {feedbackData.lastname
                ? feedbackData.lastname
                : 'Last Name Unavailable'}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Comment</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#4b5142',
                marginLeft: 5,
                marginRight: 15,
              }}>
              {feedbackData.comment
                ? feedbackData.comment
                : 'Comment Unavailable'}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Feedback By</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#4b5142',
                marginLeft: 5,
                marginRight: 15,
              }}>
              {userData.name ? userData.name : userData.username}
            </Text>
          </View>
        </View>
        <View style={style.button}>
          <Text style={style.buttonText} onPress={handleDelete}>
            Delete Feedback
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  ages: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  header2: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    backgroundColor: COLORS.adminPrimary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ViewFeedback;
