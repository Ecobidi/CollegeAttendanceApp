import React, {Component, Fragment} from 'react';
import { DrawerLayoutAndroid, View, Text, FlatList, StyleSheet} from 'react-native';
import Axios from 'axios';

import config from '../../config'

import SideBar from '../../containers/adminSidebar';
import MyActivityLoader from '../util/ActivityLoader';
import MyFloatingButton from '../util/FloatingButton';
import MyToolbar from '../util/Toolbar';
import EmptyListItem from '../util/EmptyListItem';

export default class TeacherList extends Component {
  constructor(props) {
    super(props);
    this.drawerRef = React.createRef();
    this.drawerOpen = false;
    this.state = {
      loading: true,
      teachers: []
    }
  }

  getDrawerOpen = () => {
    return this.drawerOpen;
  }

  componentDidMount() {
    let url = config.baseUrl + '/students/';
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

  mainComponent = () => { return (
    <Fragment>
      <FlatList
      data={this.state.teachers}
      ListEmptyComponent={() => <EmptyListItem label='No Teacher Available!' />}
      ItemSeparatorComponent={() => { return (<View style={styles.separator} />)}}
      keyExtractor={(item) => item._id}
      renderItem={({item, index}) => {
        return (
          <View style={styles.itemRowStyle}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <View style={{flexDirection: 'row',}}>
              <Text style={[styles.itemText, {fontWeight: '700'}]}>Current Courses: </Text>
              <Text ellipsizeMode={'tail'} numberOfLines={2} style={styles.itemText}>{item.courses.join(', ')}</Text>
            </View>
          </View>
        );
      }}
      />

      <MyFloatingButton 
        onPress={(e) => {this.props.navigation.navigate('admin_AddTeacher')}}
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
          renderNavigationView={() => <SideBar navigation={this.props.navigation} current={'teacher'} /> } 
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
    fontSize: 12,
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