import React, {useState} from 'react';
import {View, Text, TextInput, ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';

import MyButton from '../util/Button'
import MyActivityLoader from '../util/ActivityLoader'

import config from '../../config';

export default Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('');
  const [loading, setLoading] = useState(false);

  const getLoginUrlForLoginType = (type, baseUrl) => {
    switch(type.toLowerCase()) {
      case 'admin': return baseUrl + '/admin/signin'
      case 'teacher': return baseUrl + '/teachers/signin'
      case 'student': return baseUrl + '/students/signin'
    }
  }

  const getStartScreenNameForLoginType = (type) => {
    switch(type.toLowerCase()) {
      case 'admin': return 'Admin';
      case 'teacher': return 'Teacher';
      case 'student': return 'Student';
    }
  }

  const authenticate = () => {
    setLoading(true)
    let url = getLoginUrlForLoginType(loginType, config.baseUrl);
    Axios.post(url, {username, password})
      .then((res) => {
        AsyncStorage.setItem('username', res.data.data.username)
          .then(value => {
            navigation.navigate(getStartScreenNameForLoginType(loginType));
           })
          .catch(err => {
            ToastAndroid.show(err.toString(), ToastAndroid.LONG);
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={{flex: 1}}>
        <View style={styles.container}>
        <Text style={styles.subtitle}>Welcome To</Text>
        <Text style={styles.title}>Attendance Tracking System</Text>

        <View style={styles.inputContainer}>
          <Icon name={'user'} size={24} color={'#777'} style={styles.inputIcon} />
          <TextInput value={username} placeholder={'Username'} placeholderTextColor={'#777'} style={styles.input} onChangeText={(val) => setUsername(val)} />
        </View>

        <View style={styles.inputContainer}>
          <Icon name={'lock'} size={24} color={'#777'} style={styles.inputIcon} />
          <TextInput value={password} placeholder={'Password'} placeholderTextColor={'#777'} secureTextEntry={true} style={styles.input} onChangeText={(val) => setPassword(val)} />
        </View>

        <View style={[styles.inputContainer, {marginBottom: 30,}]}>
          <Picker 
            selectedValue={loginType} 
            style={[styles.input, {width: '100%'}]} 
            onValueChange={(val) => setLoginType(val)}>
            <Picker.Item label={'-- select login type --'} />
            <Picker.Item value={'Admin'} label={'Admin'} />
            <Picker.Item value={'Student'} label={'Student'} />
            <Picker.Item value={'Teacher'} label={'Teacher'} />
          </Picker>
        </View>
        
        <MyButton 
          label={'LOGIN'}
          onPress={e => authenticate()}
        />
      
      </View>
      {
        loading && <MyActivityLoader />
      }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#3F51B5'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'serif',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'serif',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 10,
  }, 
  input: {
    fontSize: 16,
    color: '#444',
    width: '100%'
  },
  inputIcon: {
    width: 32,
    height: 32,
    top: 3,
  },
})