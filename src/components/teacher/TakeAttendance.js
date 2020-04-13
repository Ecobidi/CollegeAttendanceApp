import React, {useState, useEffect,} from 'react';
import {Text, View, StyleSheet, FlatList, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

import config from '../../config';
import MyActivityLoader from '../util/ActivityLoader';
import Button from '../util/Button';
import {RadioControl} from '../util/RadioButton';
import Toolbar from '../util/Toolbar';
import Modal from '../util/Modal';


const ABSENT = -1, EXCUSED = 0, PRESENT = 1; 

export default TakeAttendance = (props) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState(new Map());
  const [attendanceValues, setAttendanceValues] = useState([])
  const [loading, setLoading] = useState(true);
  const [showSubmitDialog, setShowSubmitDialog] = useState(true)
  const url = config.baseUrl + '/students';

  const mapStudentsAttendance = (students) => {
    let map = new Map();
    students.forEach(student => {
      map.set(student.username, undefined); //set all students a default -1000
    })
    return map;
  }

  const fetchStudents = (url) => {
    console.log(props.navigation.state.params)
    Axios.get(url)
    .then(res => {
      let students = res.data.data;
      setStudents(students);
      setAttendance(mapStudentsAttendance(students));
      setLoading(false);
    })
    .catch(err => {
      ToastAndroid.show('Error fetching students', ToastAndroid.SHORT);
      setLoading(false);
      console.log(err)
    })
  }

  const updateAttendance = (username, value) => {
    let map = attendance;
    map.set(username, value);
    setAttendance(map);
    setAttendanceValues([...map.values()])
    console.log(username, value)
  }

  const submitDialog = ({absent, excused, present}) => {
    return (
      <Modal>
        <View style={styles.modalContent}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Total Students: {students.length}</Text>

          <View style={styles.modalContentList}>
            <View style={{marginHorizontal: 6, }}>
              <Text style={styles.labelText}>Present</Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>{present.length}</Text>
            </View>
            <View style={{marginHorizontal: 6, }}>
              <Text style={styles.labelText}>Absent</Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>{absent.length}</Text>
            </View>
            <View style={{marginHorizontal: 6, }}>
              <Text style={styles.labelText}>Excused</Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>{excused.length}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button label='Submit' size='small' onPress={e => proceedToSubmit()} />
            <View style={{marginHorizontal: 6}}></View>
            <Button label='Cancel' size='small' onPress={e => setShowSubmitDialog(false)} backgroundColor='#444' />
          </View>
        </View>
      </Modal>
    )
  }

  const proceedToSubmit = () => {

  }

  const getDetailedAttendance = () => {
    let obj = {
      absent: [], present: [], excused: []
    }
    attendance.forEach((value, key) => {
      switch(value) {
        case ABSENT: { obj.absent.push(key); break; }
        case EXCUSED: { obj.excused.push(key); break; }
        case PRESENT: { obj.present.push(key); break; }
      }
    })

    return obj;
  }

  // component did mount/update
  useEffect(() => {
    console.log('TakeAttendance useEffect()');
    fetchStudents(url);
  }, [])

  return (
    <View style={{flex: 1}}>
      <Toolbar 
        title='Take Attendance'
        navIconName='arrow-left'
        onIconClicked={() => props.navigation.goBack()}
      />
      <View style={styles.container}>
        {
        loading ? 
          <MyActivityLoader /> :
          <FlatList
            data={students}
            extraData={attendanceValues}
            keyExtractor={(item) => item.username}
            renderItem={({item, index}) => { return (<EachStudent student={item} value={attendance.get(item.username)} setAttendance={updateAttendance} />) }}
          />
      }
        <Button 
          label='Proceed' 
          onPress={e => {
            let index = [...attendance.values()].indexOf(undefined);
            if (index != -1) {
              ToastAndroid.show('You must select all students', ToastAndroid.LONG);
              return;
            }
            setShowSubmitDialog(true)
          }} 
        />

        { showSubmitDialog && submitDialog(getDetailedAttendance()) }

      </View>
      
      
    </View>
  )
}

const EachStudent = (props) => {
  const {student, value, setAttendance} = props;
  return (
    <View style={styles.row}>
      <Text style={{fontSize: 16, color: '#333'}}>{student.name}</Text>
      <View style={styles.formGroup}>
        <RadioControl setValue={(value) => setAttendance(student.username, value)} value={value} />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  row: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  formGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    textAlign: 'center',
    padding: 2,
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  modalContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 24
  },
  modalContentList: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16
  },
  labelText: { 
    fontWeight: '600', 
    textAlign: 'center', 
    fontSize: 16,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    textDecorationColor: '#444',
    paddingHorizontal: 5,
  }
})