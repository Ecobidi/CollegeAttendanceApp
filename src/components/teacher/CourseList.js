import React, {Component, Fragment} from 'react';
import {ActivityIndicator, DrawerLayoutAndroid, View, Text, FlatList, TouchableHighlight, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';

import config from '../../config';

import SideBar from '../../containers/teacherSidebar';
import MyActivityLoader from '../util/ActivityLoader';
import MyToolbar from '../util/Toolbar';
import EmptyListItem from '../util/EmptyListItem';

export default class CourseList extends Component {
  constructor(props) {
    super(props);
    this.drawerRef = React.createRef();
    this.drawerOpen = false;
    this.state = {
      loading: true,
      courses: []
    }
  }

  fetchCourses = (username) => {
    let url = config.baseUrl + `/teachers/${username}/courses`;
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

  getDrawerOpen = () => {
    return this.drawerOpen;
  }

  componentDidMount() {
    // retrieve username and fetch courses
    AsyncStorage.getItem('username')
      .then(username => {
        this.fetchCourses(username);
      })
    
  }

  mainComponent = () => { return (
    <Fragment>
      <FlatList
      ListEmptyComponent={() => <EmptyListItem /> }
      data={this.state.courses}
      ItemSeparatorComponent={() => { return (<View style={styles.separator} />)}}
      keyExtractor={(item) => item.code}
      renderItem={({item, index}) => {
        return (
          <View style={styles.itemRowStyle}>
            <Text style={styles.itemTitle}>{item.code}</Text>
            <View style={{flexDirection: 'row',}}>
              <Text style={styles.itemTextBold}>Course Name: </Text>
              <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.itemText}>{item.title}</Text>
            </View>
          </View>
        );
      }}
      />
    </Fragment>
  )}

  render() {
    return (
      <View style={{flex: 1}}>
        <MyToolbar 
          drawer={this.drawerRef.current}
          getDrawerOpen={this.getDrawerOpen} 
        />
        <View style={{flex: 1}}>
          <DrawerLayoutAndroid
          ref={this.drawerRef}
          drawerWidth={300}
          drawerBackgroundColor={'#fff'}
          drawerPosition={'left'}
          renderNavigationView={() => <SideBar navigation={this.props.navigation} current={'course'} />} 
          onDrawerOpen={() => this.drawerOpen = true }
          onDrawerClose={() => this.drawerOpen = false} >
  
            <View style={styles.contentContainer}>
              { this.state.loading ? <MyActivityLoader /> : this.mainComponent() }
            </View>
  
          </DrawerLayoutAndroid>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee'
  },
  itemRowStyle: {
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 10,
    width: '100%',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#002356'
  },
  itemTextBold: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    maxWidth: '60%',
  },
  separator: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    marginVertical: 5,
  }
})