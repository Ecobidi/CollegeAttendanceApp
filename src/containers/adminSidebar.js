import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default sideBar = ({navigation, current = ''}) => {
  return (
    <View style={styles.sidebar}>
      <TouchableHighlight underlayColor={'#777'} style={[styles.sideBarItemContainer, current.toLowerCase() == 'student' && styles.active]} onPress={() => navigation.navigate('StudentList')}>
        <View style={styles.sidebarItem}>
          <Icon name={'group'} size={20} color={'#aaa'} />
          <Text style={styles.sidebarText}>Student</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'#777'} style={[styles.sideBarItemContainer, current.toLowerCase() == 'teacher' && styles.active]} onPress={() => navigation.navigate('TeacherList')}>
        <View style={styles.sidebarItem}>
          <Icon name={'slideshare'} size={20} color={'#aaa'} />
          <Text style={styles.sidebarText}>Teacher</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'#777'} style={[styles.sideBarItemContainer, current.toLowerCase() == 'course' && styles.active]} onPress={() => navigation.navigate('CourseList')}>
        <View style={styles.sidebarItem}>
          <Icon name={'book'} size={20} color={'#aaa'} />
          <Text style={styles.sidebarText}>Course</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'#777'} style={[styles.sideBarItemContainer, current.toLowerCase() == 'attendance' && styles.active]} onPress={() => navigation.navigate('AttendanceHome')}>
        <View style={styles.sidebarItem}>
          <Icon name={'hospital-o'} size={20} color={'#aaa'} />
          <Text style={styles.sidebarText}>Attendance</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'#777'} style={styles.sideBarItemContainer} onPress={() => {}}>
        <View style={styles.sidebarItem}>
          <Icon name={'sign-out'} size={20} color={'#aaa'} />
          <Text style={styles.sidebarText}>Logout</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
  },
  sideBarItemContainer: {
    width: '100%', 
    borderBottomWidth:  StyleSheet.hairlineWidth, 
    borderBottomColor: '#bbb',
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sidebarText: {
    color: '#222',
    fontSize: 16,
    marginLeft: 20,
  },
  active: {
    backgroundColor: '#777',
  },
})