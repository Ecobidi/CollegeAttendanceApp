import React, { Component } from 'react'
import {View, Text, FlatList, Dimensions, TouchableHighlight, BackHandler, StyleSheet,} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default class CheckedListModal extends Component {
  constructor(props) {
    super(props);
    let data = props.data || [];
    this.state = {
      visible: true,
      data: data,
      // checkedData: new Array(data.length).fill(false),
      checkedData: new Set()
    }
    Dimensions.addEventListener('change', () => {this.forceUpdate()});
  }

  render() {
    let {itemTitlePropName, } = this.props;
    let {width, height} = Dimensions.get('window');
    return (
      <View style={styles.modal}>
        <View style={[{width: width * 0.75, height: height * 0.75}, styles.modalContent]}>
          <Text 
            style={styles.close} 
            onPress={e => this.props.onClose()}>X</Text>
          <FlatList
            style={styles.list}
            data={this.state.data}
            keyExtractor={(item) => item._id}
            renderItem={({item, index}) => {
              // return (
              //   <View style={styles.itemRow}>
              //     <CheckBox value={this.state.checkedData[index]} onValueChange={(val) => { 
              //       let oldCheckedData = [...this.state.checkedData];
              //       oldCheckedData[index] = val;
              //       this.setState({
              //         checkedData: oldCheckedData
              //       })
              //      }}/>
              //     <Text style={styles.itemText}>{item[itemTitlePropName]}</Text>
              //   </View>
              // )
              return (
                <View style={styles.itemRow}>
                  <CheckBox 
                    value={this.state.checkedData.has(item[itemTitlePropName])} 
                    onValueChange={(val) => { 
                      let old = this.state.checkedData;
                      val ? old.add(item[itemTitlePropName]): old.delete(item[itemTitlePropName]);
                      this.setState({
                        checkedData: old
                      })
                   }}/>
                  <Text style={styles.itemText}>{item[itemTitlePropName]}</Text>
                </View>
              )
            }}
          />

          <TouchableHighlight 
            style={[styles.button, styles.fixedBottom]}
            onPress={(e) => {
              //console.log([...this.state.checkedData])
              this.props.onSubmit([...this.state.checkedData])
            }}
            >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0, bottom: 0, right: 0, left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    borderRadius: 5,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 80,
  },
  close: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    position: 'absolute',
    top: 0, right: 0,
    zIndex: 2000,
    height: 45, width: 45,
    borderRadius: 25,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  list: {
    width: '100%',
    minHeight: 200,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 4,
    borderRadius: 2,
  },
  itemText: {
    fontSize: 12,
    color: '#333',
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#228959',
    padding: 14,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
})