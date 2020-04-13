import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableHighlight, ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Axios from 'axios'

import config from '../../config'

export default class StudentAttendanceReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  formatDateYYYYMMDD = (date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  buildUrlQuery = (students) => {
    let url = config.baseUrl + '/attendance/find_by_students/?';
    for (let i = 0; i < students.length; i++) {
      url = url.concat('username=' + escape(students[i]) + '&')
    }
    let {startDate, endDate} = this.props.navigation.state.params;
    url = url.concat('startDate=' + this.formatDateYYYYMMDD(startDate) + '&endDate=' + this.formatDateYYYYMMDD(endDate) + '&')
    return url;
  }

  componentDidMount() {
    const students = this.props.navigation.state.params['students']
    let url = this.buildUrlQuery(students)
    Axios.get(url)
      .then(response => {
        let byCourses = this.mergeSameCourses(response.data.data)
        byCourses.forEach((item) => {
          item._present = this.mergeSameStudents(item._present)
          item._absent = this.mergeSameStudents(item._absent)
          item._excused = this.mergeSameStudents(item._excused)
        })
        let data = this.arrangeByStudents(byCourses, this.props.navigation.state.params['students'])
        this.setState({data})
      })
      .catch(err => { console.log(err) })
  }

  render() {
    let {startDate, endDate} = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title={'Attendance Report'}
          titleColor={'#fff'}
          navIconName={'arrow-left'}
          iconSize={20}
          iconColor={'#fff'}
          onIconClicked={() => this.props.navigation.navigate('AttendanceHome') }
          actions={[{title: 'Download', show: 'never'}]}
          onActionSelected={position => ToastAndroid.show('Download', ToastAndroid.SHORT)}
        />

        <ScrollView style={{flex: 1}}>
          <View style={styles.contentContainer}>
            <View style={{padding: 12, marginBottom: 16, backgroundColor: '#fff', elevation: 10}}>
              <Text>Attendance Report from {startDate.toDateString()} to {endDate.toDateString()}</Text>
            </View>
            {
              this.state.data.map(atd => <EachStudent key={atd.student} data={atd} />)
            }
          </View>
        </ScrollView>
      </View>
    )
  }

  mergeSameStudents = (array) => {
    let data = new Map();
    array.forEach(({username, name, count}) => {
      if (data.has(username)) {
        let current = data.get(username)
        data.set(username, {username, name, count: ++current.count})
      } else {
        data.set(username, {username, name, count: 1})
      }
    })
    return [...data.values()];
  }
  
  mergeSameCourses = (array) => {
    let data = new Map()//[...array];
    array.forEach(({course, _absent, _present, _excused}) => {
      if (data.has(course)) { // update existing info
        let current = data.get(course);
        data.set(course, {
          course,
          totalAttendance: current.totalAttendance + 1,
          _absent: [...current._absent, ..._absent],
          _present: [...current._present, ..._present],
          _excused: [...current._excused, ..._excused]
        })
      } else {
        data.set(course, {course, _absent, _present, _excused, totalAttendance: 1})
      }
    })
    return [...data.values()];
  }
  
  getCount = (arr, value) => {
    let data = arr.find(a => a.username == value)
    return data ? data.count : 0;
  }

  getStudents = (array) => {
    let students = new Set();
    array.forEach(({_present, _absent, _excused}) => {
      _present.forEach(item => students.add(item.username));
      _absent.forEach(item => students.add(item.username));
      _excused.forEach(item => students.add(item.username))
    })
    return [...students.values()]
  }
  
  arrangeByStudents = (byCourses, students) => {
    let mStudents = new Map();
    students.forEach(student => {
      byCourses.forEach(({course, _absent, _present, _excused, totalAttendance}) => {
        let data = {
          course,
          totalAttendance,
          _absent: this.getCount(_absent, student),
          _present: this.getCount(_present, student),
          _excused: this.getCount(_excused, student)
        }
        if (mStudents.has(student)) {
          let current = mStudents.get(student)
          mStudents.set(student, {...current, data: [...current.data, data]})
        } else {
          mStudents.set(student, {student, data: [data]})
        }
      })
    })
    return [...mStudents.values()];
  }
  
  arrangeByCourses = (byCourses, students) => {
    let map = new Map();
    byCourses.forEach(({course, totalAttendance, _absent, _excused, _present}) => {
      let container = []
      students.forEach(student => {
        let data = {
          username: student,
          _absent: this.getCount(_absent, student),
          _excused: this.getCount(_excused, student),
          _present: this.getCount(_present, student)
        }
        container.push(data)
      })
      map.set(course, {course, totalAttendance, data: container});
    })
    return [...map.values()];
  }
}

class EachStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    }
  }
  render() {
    let {student, data} = this.props.data;
    return (
      <View style={styles.card}>
        <TouchableHighlight
          underlayColor='#efefef'
          style={{width: '100%'}}
          onPress={e => this.setState({hidden: !this.state.hidden})}
          >
          <View style={styles.toggleButton}>
            <Text style={styles.listTitle}>{student}</Text>
            {this.state.hidden ? 
              <Icon size={18} color='#fff' name='angle-down' /> :
              <Icon size={18} color='#fff' name='angle-up' />
            }
          </View>
        </TouchableHighlight>
        { !this.state.hidden &&
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={[styles.listHeaderText, styles.listFirstItem]}>Student</Text>
            <Text style={styles.listHeaderText}>Present</Text>
            <Text style={styles.listHeaderText}>Absent</Text>
            <Text style={styles.listHeaderText}>Excused</Text>
          </View>
          {
            data.map(({course, totalAttendance, _absent, _excused, _present}) => {
              return(
                <View key={course} style={styles.listItem}>
                  <Text style={[styles.listItemText, styles.listFirstItem]}>{course}</Text>
                  <Text style={styles.listItemText}>
                    {_present}({((_present / totalAttendance) * 100).toFixed(1)}%)
                  </Text>
                  <Text style={styles.listItemText}>
                    {_absent}({((_absent / totalAttendance) * 100).toFixed(1)}%)
                  </Text>
                  <Text style={styles.listItemText}>
                    {_excused}({((_excused / totalAttendance) * 100).toFixed(1)}%)
                  </Text>
                </View>
              )
            })
          }
        </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: 50, 
    backgroundColor: '#333' 
  },
  card: {
    backgroundColor: '#fff',
    bottom: 12,
    marginVertical: 6,
    elevation: 6,
  },
  toggleButton: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#ff6500aa'
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  listFirstItem: {
    textAlign: 'left',
    width: '30%',
  },
  listHeaderText: {
    fontWeight: 'bold',
    marginVertical: 12,
    width: (70 / 3) + '%',
    textAlign: 'center',
    color: '#333'
  },
  listItemText: {
    textAlign: 'center',
    width: (70 / 3) + '%',
    color: '#444'
  }
})