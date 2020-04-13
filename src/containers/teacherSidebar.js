import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default sideBar = ({navigation, current = ''}) => {
  return (
    <View style={styles.sidebar}>
      <TouchableHighlight underlayColor={'#777'} style={[styles.sideBarItemContainer, current.toLowerCase() == 'home' && styles.active]} onPress={() => navigation.navigate('CourseList')}>
        <View style={styles.sidebarItem}>
          <Icon name={'home'} size={20} color={'#aaa'} />
          <Text style={styles.sidebarText}>Home</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#777'} style={[styles.sideBarItemContainer, current.toLowerCase() == 'students' && styles.active]} onPress={() => navigation.navigate('Students')}>
        <View style={styles.sidebarItem}>
          <Icon name={'group'} size={20} color={'#aaa'} />
          <Text style={styles.sidebarText}>Students</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#777'} style={[styles.sideBarItemContainer, current.toLowerCase() == 'takeAttendance' && styles.active]} onPress={() => navigation.navigate('TakeAttendance')}>
        <View style={styles.sidebarItem}>
          <Icon name={'edit'} size={20} color={'#aaa'} />
          <Text style={styles.sidebarText}>Take Attendance</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#777'} style={[styles.sideBarItemContainer, current.toLowerCase() == 'viewAttendance' && styles.active]} onPress={() => navigation.navigate('ViewAttendance')}>
        <View style={styles.sidebarItem}>
          <Icon name={'hospital-o'} size={20} color={'#aaa'} />
          <Text style={styles.sidebarText}>View Attendance</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#777'} style={[styles.sideBarItemContainer, current.toLowerCase() == 'changePassword' && styles.active]} onPress={() => navigation.navigate('ChangePassword')}>
        <View style={styles.sidebarItem}>
          <Icon name={'key'} size={20} color={'#aaa'} />
          <Text style={styles.sidebarText}>Change Password</Text>
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