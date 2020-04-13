import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native'
import Axios from 'axios';
import {Picker} from '@react-native-community/picker';

import MyButton from '../util/Button'

import config from '../../config';

export default ChooseCourseForAttendance = (props) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  let url = config.baseUrl + '/courses'
  
  useEffect(() => {
    console.log('ChooseCourseForAttendance useEffect()');
    
    Axios.get(url)
    .then(res => {
      setLoading(false);
      setCourses(res.data.data)
    })
    .catch(err => {
      setLoading(false)
      ToastAndroid.show('Error Fetching Courses', ToastAndroid.SHORT);
      console.log(err);
    })
  }, [])

  const proceedToAttendance = () => {
    if (!selectedCourse) {
      ToastAndroid.show('You must select a course!!!', ToastAndroid.SHORT);
      return;
    }
    props.navigation.navigate('teacher_TakeAttendance', {course: selectedCourse})
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={selectedCourse}
          style={styles.picker}
          onValueChange={course => setSelectedCourse(course)}>
          <Picker.Item label='Select Course...' value='' />
        {
          courses.length > 0  &&
          courses.map(c => <Picker.Item key={c.code} value={c.code} label={c.title} />)
        }
        </Picker>
      </View>

      <MyButton 
        onPress={e => proceedToAttendance()}
        label='Proceed To Attendance'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  pickerContainer: {
    width: '100%',
    marginHorizontal: 20,
    marginBottom: 24,
    borderColor: '#333',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
  },
  picker: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: '100%',
    color: '#333'
  },
  button: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 24,
    padding: 20,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  }
})