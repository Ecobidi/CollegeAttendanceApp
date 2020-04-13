import React, {Component, Fragment} from 'react';
import {ActivityIndicator, View, Text, TextInput, FlatList, TouchableHighlight, ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox'
import Axios from 'axios';

import config from '../../config';

export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      courses: [],
      selectedCourses: new Set(),
      username: '', name: ''
    };
  
  }

  componentDidMount() {
    // fetch courses
    let url = config.baseUrl + '/courses/';
    Axios.get(url)
      .then((response) => {
        this.setState({
          courses: response.data.data,
          loading: false,
        })
      })
      .catch((err) => {
        console.log(err);
        this.setState({loading: true})
      })
  }

  loadingComponent = (
    <View style={styles.loadingIndicator}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  );

  render() {
    return (
      <View style={{flex: 1}}>
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title={'Add Student'}
          titleColor={'#fff'}
          navIconName={'arrow-left'}
          iconSize={20}
          iconColor={'#fff'}
          onIconClicked={() => { this.props.navigation.goBack() } }
        />

        <ScrollView>
          <View style={styles.contentContainer}>
            <Fragment>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.username}
                  onChangeText={text => this.setState({username: text})}
                  />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.name}
                  onChangeText={text => this.setState({name: text})}
                  />
              </View>
            </Fragment>

            <Text style={{marginBottom: 5, marginTop: 10,}}>Select Courses</Text>
            {!this.state.loading &&
            <FlatList
            style={{minHeight: 100, maxHeight: 200, marginBottom: 20, }}
            data={this.state.courses}
            ItemSeparatorComponent={() => { return (<View style={styles.separator} />)}}
            keyExtractor={(item, index) => item.code}
            renderItem={({item, index}) => {
              console.log(item)
              return (
                <View key={index.toString()} style={styles.itemRow}>
                  <CheckBox 
                    style={{marginRight: 10,}}
                    value={this.state.selectedCourses.has(item.code)} 
                    onValueChange={ 
                      (value) => {
                        let old = this.state.selectedCourses;
                        value? old.add(item.code): old.delete(item.code);
                        this.setState({selectedCourses: old});
                      } 
                    }
                    />
                  <View>
                    <Text style={styles.itemTitle}>{item.code}</Text>
                    <View style={{flexDirection: 'row',}}>
                      <Text style={styles.itemTextBold}>Course Title: </Text>
                      <Text style={styles.itemText}>{item.title}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
            />
            }

            <TouchableHighlight 
              style={styles.button}
              onPress={e => this.addStudent()}>
              <Text style={styles.buttonText}>Add Student</Text>
            </TouchableHighlight>
          </View>

          {this.state.loading && this.loadingComponent }
          
        </ScrollView>
          
      </View>
    )
  }

  addStudent = () => {
    let url = config.baseUrl + '/students/signup';
    const {username, name, selectedCourses} = this.state;
    Axios.post(url, {username, name, courses: selectedCourses})
    .then(res => {
      ToastAndroid.show('Successfully Added Student', ToastAndroid.SHORT);
      this.props.navigation.navigate('admin_StudentList');
    })
    .catch(err => {
      ToastAndroid.show('Add Student Failed!!!', ToastAndroid.SHORT)
      console.log(err);
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
  absoluteBottom: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
  },
  separator: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  }
})