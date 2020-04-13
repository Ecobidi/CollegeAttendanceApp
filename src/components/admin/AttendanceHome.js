import React, {Component, Fragment} from 'react';
import {ActivityIndicator, View, TextInput, Text, TouchableHighlight, ScrollView, DrawerLayoutAndroid, StyleSheet,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import Axios from 'axios';

import config from '../../config';
import SideBar from '../../containers/adminSidebar';
import CheckListModal from '../util/CheckListModal';

export default class AttendanceHome extends Component {
  constructor(props) {
    super(props);
    this.drawerRef = React.createRef()
    this.drawerOpen = false;
    this.state = {
      loading: true,
      startDate: new Date(),
      endDate: new Date(),
      showStartDatePicker: false,
      showEndDatePicker: false,
      showCourseModal: false,
      showStudentModal: false,
      courses: [],
      students: []
    }
  }

  formatDateYYYYMMDD = (date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  componentDidMount() {
    const getCourses = () => Axios.get(config.baseUrl + '/courses')
    const getStudents = () => Axios.get(config.baseUrl + '/students')
    Axios.all([getCourses(), getStudents()])
      .then(Axios.spread((coursesResponse, studentsResponse) => {
        this.setState({
          courses: coursesResponse.data.data,
          students: studentsResponse.data.data,
          loading: false
        })
      }))
      .catch(e => {
        console.log(e);
        this.setState({loading: true})
      })
  }

  loadingComponent = (
    <View style={styles.loadingIndicator}>
      <ActivityIndicator size={'large'} color={'#aaa'} />
    </View>
  )

  mainComponent = () => {
    return (
      <ScrollView style={{flex: 1}}>
      <View style={styles.contentContainer}>
        <TouchableHighlight 
          underlayColor={'#bbb'}
          style={styles.inputContainer} 
          onPress={(e) => this.setState({showStartDatePicker: true})} >
          <Fragment>
            <Text style={styles.inputLabel}>Start Date</Text>
            <View style={styles.innerInputContainer}>
              <TextInput
                style={styles.input}
                placeholder={'Choose Start Date...'}
                value={this.formatDateYYYYMMDD(this.state.startDate)}
                editable={false}
                />
              <Icon name={'calendar'} size={24} color={'#ff7700'} style={{position: 'absolute', bottom: 0, right: 0,}}/>
            </View>
          </Fragment>
        </TouchableHighlight>

        <TouchableHighlight 
          underlayColor={'#bbb'}
          style={styles.inputContainer} 
          onPress={(e) => this.setState({showEndDatePicker: true})}>
          <Fragment>
          <Text style={styles.inputLabel}>End Date</Text>
          <View style={styles.innerInputContainer}>
            <TextInput
              style={styles.input}
              placeholder={'Choose End Date...'}
              value={this.formatDateYYYYMMDD(this.state.endDate)}
              editable={false}
              />
            <Icon name={'calendar'} size={24} color={'#ff7700'} style={{position: 'absolute', bottom: 0, right: 0,}}/>
          </View>
          </Fragment>
        </TouchableHighlight>


        <View style={{ width: '100%', paddingVertical: 20, paddingHorizontal: 20,}}>
          <TouchableHighlight 
            underlayColor={'#bbb'} 
            onPress={(e) => {this.setState({showCourseModal: true})}}
            style={styles.button}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={'hospital-o'} size={24} color={'#fff'} style={{marginRight: 12,}} />
            <Text style={styles.buttonText}>Course Attendance</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            underlayColor={'#bbb'} 
            onPress={(e) => {this.setState({showStudentModal: true})}} 
            style={[styles.button, {backgroundColor: '#ff6500'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={'hospital-o'} size={24} color={'#fff'} style={{marginRight: 12,}} />
            <Text style={styles.buttonText}>Student Attendance</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      {
        (this.state.showStartDatePicker && 
        <DateTimePicker
          value={this.state.startDate} 
          onChange={this.handleStartDatePicker} />)
      }
      {
        (this.state.showEndDatePicker && 
        <DateTimePicker 
          value={this.state.endDate} 
          onChange={this.handleEndDatePicker} />)
      }
    </ScrollView>
    )
  }

  handleStartDatePicker = (evt, date) => {
    this.setState({
      startDate: date || this.state.startDate,
      showStartDatePicker: false
    });
  }

  handleEndDatePicker = (evt, date) => {
    this.setState({
      endDate: date || this.state.endDate,
      showEndDatePicker: false
    });
  }

  handleCloseCourseModal = () => {
    this.setState({showCourseModal: false});
  }

  handleCloseStudentModal = () => {
    this.setState({showStudentModal: false});
  }

  handleCourseRequest = (courses) => {
    this.props.navigation.navigate('CourseAttendanceReport', {courses, startDate: this.state.startDate, endDate: this.state.endDate})
  }

  handleStudentRequest = (students) => {
    this.props.navigation.navigate('StudentAttendanceReport', {students, startDate: this.state.startDate, endDate: this.state.endDate})
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title={'Attendance'}
          titleColor={'#fff'}
          navIconName={'navicon'}
          iconSize={20}
          iconColor={'#fff'}
          onIconClicked={() => {
            if (this.drawerOpen) this.drawerRef.current.closeDrawer();
            else this.drawerRef.current.openDrawer();
          } }
        />
        <DrawerLayoutAndroid
          style={{flex: 1, height: "100%"}}
          ref={this.drawerRef}
          drawerBackgroundColor={'#fff'}
          drawerPosition={'left'}
          drawerWidth={300}
          renderNavigationView={() => <SideBar navigation={this.props.navigation}/>}
          onDrawerOpen={() => this.drawerOpen = true}
          onDrawerClose={() => this.drawerOpen = false} >
          
          {
          this.state.loading ? this.loadingComponent : this.mainComponent()
          }
        </DrawerLayoutAndroid>
        
        {
          this.state.showCourseModal && 
          <CheckListModal
            data={this.state.courses}
            itemTitlePropName={'code'} 
            onClose={this.handleCloseCourseModal}
            onSubmit={this.handleCourseRequest}
            />
        }

        {
          this.state.showStudentModal && 
          <CheckListModal
            data={this.state.students}
            itemTitlePropName={'username'} 
            onClose={this.handleCloseStudentModal}
            onSubmit={this.handleStudentRequest}
            />
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  toolbar: {
    height: 56, 
    backgroundColor: '#333' 
  },
  loadingIndicator: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    borderRadius: 4,
    paddingHorizontal: 5,
    marginVertical: 5,
    width: '100%',
  },
  innerInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  input: {
    color: '#222',
    fontSize: 16,
    padding: 0,
    margin: 0,
    width: '100%',
  },
  inputLabel: {
    textTransform: 'capitalize',
    fontSize: 10,
    color: '#444',
  },
  button: {
    justifyContent: 'flex-start',
    borderRadius: 4,
    backgroundColor: '#228959',
    padding: 10,
    margin:  14,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'capitalize',
  },
})