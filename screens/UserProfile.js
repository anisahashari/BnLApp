import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  Share,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import COLORS from '../constants/colors';
// import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon3 from "react-native-vector-icons/FontAwesome5";
// import { Header } from "react-native-elements";
import {
  auth,
  firebase,
  firestore,
  getStorage,
  ref,
  getDownloadURL,
} from '../firebase';

// import Share from 'react-native-share';

import files from '../assets/filesBase64';

const UserProfile = () => {
  const navigation = useNavigation();
  const email = auth.currentUser.email;
  // const photo = auth.currentUser.photoURL;

  const [userData, setUserData] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getUser = async () => {
    const userRef = firestore.collection('user').doc(auth.currentUser.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      setUserData(doc.data());
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FCFCFC', paddingTop: 20}}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }><View style={{justifyContent: 'right', alignItems: 'right'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditUserProfile')}  
          style={{
            color: COLORS.primary, 
            marginTop: 15,
            marginBottom: 5,}} >
          <Icon name="account-edit" size={40} color={'#7841e9'} />
        </TouchableOpacity></View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Title
            style={{
              color: COLORS.primary, 
              fontWeight: 'bold', 
              fontSize: 25, 
              marginTop: 15,
              marginBottom: 5,}} >
            M y   P r o f i l e
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
              <Avatar.Image source={{uri: userData.image}} size={90} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                    color: '#665444',
                  },
                ]}>
                {userData.name}
              </Title>
              <Caption style={styles.caption}>@{userData.username}</Caption>
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="email" color="#665444" size={25} />
              <Text style={{color: '#665444', marginLeft: 20}}>{email}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="cellphone" color="#665444" size={25} />
              <Text style={{color: '#665444', marginLeft: 20}}>
                {userData.phone ? userData.phone : 'Phone number not set'}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="gender-male-female" color="#665444" size={25} />
              <Text style={{color: '#665444', marginLeft: 20}}>
                {userData.gender ? userData.gender : 'Gender not set'}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textBox}>
              <Icon name="view-agenda" color="#665444" size={25} />
              <Text style={{color: '#665444', marginLeft: 20}}>
                {userData.gender ? userData.age : 'Age not set'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.menuWrapper}>
          <View
            style={{
              borderBottomColor: '#e6e4e3',
              borderBottomWidth: 0.5,
            }}
          />
        </View>
        <View >
          <Icon
            name="arrow-left"
            size={28}
            color={COLORS.dark}
            onPress={navigation.goBack}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;

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
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  // header: {
  //   marginTop: 10,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginHorizontal: 20,
  //   justifyContent: "space-between",
  // },
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
  detailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    flex: 1,
    bottom: -60,
    borderRadius: 18,
    elevation: 10,
    padding: 20,
    justifyContent: 'center',
  },
  comment: {
    marginTop: 10,
    fontSize: 12.5,
    color: COLORS.dark,
    lineHeight: 20,
    marginHorizontal: 20,
  },
  footer: {
    height: 100,
    backgroundColor: COLORS.light,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconCon: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  btn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
});
