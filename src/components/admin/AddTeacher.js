import React, {Component, Fragment} from 'react';
import {ActivityIndicator, View, Text, TextInput, TouchableHighlight, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import config from '../../config';

export default class AddTeacher extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      fName: '', lName: '', phone: '', email: '',
    };

    // this.myCourses = courses.map((item, index) => { return {id: index, item, checked: false} });
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
          title={'Add Teacher'}
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
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.fName}
                  onChangeText={text => this.setState({fName: text})}
                  />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.lName}
                  onChangeText={text => this.setState({lName: text})}
                  />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Contact Number</Text>
                <TextInput
                  style={styles.input}
                  keyboardType={'phone-pad'}
                  value={this.state.phone}
                  onChangeText={text => this.setState({phone: text})}
                  />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  keyboardType={'email-address'}
                  value={this.state.email}
                  onChangeText={text => this.setState({email: text})}
                  />
              </View>
            </Fragment>

            <TouchableHighlight 
              style={[styles.button, {marginTop: 20,}]}
              onPress={e => this.addTeacher()}>
              <Text style={styles.buttonText}>Add Teacher</Text>
            </TouchableHighlight>
          </View>

          {this.state.loading && this.loadingComponent }
          
        </ScrollView>
          
      </View>
    )
  }

  addTeacher = () => {
    let url = config.baseUrl + '/teachers/signup';
    const {username, lName, fName, phone, email, } = this.state;
    Axios.post(url, {username, name: `${lName} ${fName}`, phone, email})
    .then(res => {
      ToastAndroid.show("Successfully Added Teacher");
      this.props.navigation.navigate("admin_TeacherList");
    })
    .catch(err => {
      ToastAndroid.show("Add Student Failed!!!")
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
})