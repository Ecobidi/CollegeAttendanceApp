import React, {Component, Fragment} from 'react';
import {ActivityIndicator, View, Text, TextInput, TouchableHighlight, ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import Axios from 'axios';

import MyActivityLoader from '../util/ActivityLoader';
import MyButton from '../util/Button';

import config from '../../config';
import Toolbar from '../util/Toolbar';

export default class AddTeacher extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      teachers: [],
      code: '', title: '', teacher: '',
    };
  }

  componentDidMount() {
    let url = config.baseUrl + '/teachers/';
    Axios.get(url)
      .then((response) => {
        this.setState({
          teachers: response.data.data,
          loading: false,
        })
      })
      .catch((err) => {
        console.log(err);
        this.setState({loading: true})
      })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Icon.ToolbarAndroid
          style={styles.toolbar}
          title={'Add Course'}
          titleColor={'#fff'}
          navIconName={'arrow-left'}
          iconSize={20}
          iconColor={'#fff'}
          onIconClicked={() => this.props.navigation.replace('CourseList') }
        /> */}

        <Toolbar title='Add Course' navIconName='arrow-left'
          onIconClicked={() => this.props.navigation.goBack()} />

        <ScrollView>
          <View style={styles.contentContainer}>
            <Fragment>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Course Code</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.code}
                  onChangeText={text => this.setState({code: text})}
                  />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Course Title</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.title}
                  onChangeText={text => this.setState({title: text})}
                  />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Select Teacher</Text>
                <Picker
                  style={{fontSize: 14, color: '#222'}}
                  selectedValue={this.state.teacher} 
                  onValueChange={teacher => this.setState({teacher})}>
                  <Picker.Item label={'-- Select Teacher --'} />
                  {
                    this.state.teachers.map(item => <Picker.Item key={item.username} value={item.username} label={item.name} />)
                  }
                </Picker>
              </View>
            </Fragment>

            <MyButton 
              label='Add Course'
              onPress={e => this.addCourse()}
            />
          </View>

          {this.state.loading && <MyActivityLoader /> }
          
        </ScrollView>
          
      </View>
    )
  }

  addCourse = () => {
    const url = config.baseUrl + '/courses/';
    Axios.post(url, {code, title})
    .then(res => {
      ToastAndroid.show(code + ': ' + title + ' saved', ToastAndroid.SHORT);
      this.props.navigation.navigate('admin_CourseList');
    })
    .catch(err => {
      ToastAndroid.show('Error saving course', ToastAndroid.SHORT);
      console.log(err)
    })
  }
};

const styles = StyleSheet.create({
  toolbar: {
    height: 56, 
    backgroundColor: '#333' 
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 40,
    backgroundColor: '#eee'
  },
  loadingIndicator: { 
    flex: 1,
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#002356'
  },
  itemTextBold: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
  itemText: {
    fontSize: 12,
    color: '#333',
  },
  inputContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    borderRadius: 4,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  input: {
    color: '#222',
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  inputLabel: {
    textTransform: 'capitalize',
    fontSize: 10,
    color: '#444',
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#228959',
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    textTransform: 'uppercase',
  },
})