import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'

const FloatingButton = (props) => {
  const {color, backgroundColor} = props;
  return (
    <TouchableHighlight 
      underlayColor={'#111'}
      onPress={(e) => console.log('main clicked') }
      style={[styles.container, backgroundColor && {backgroundColor}]}
      {...props}
    >
      <Text style={[styles.label, color && {color}]}>+</Text>
    </TouchableHighlight>
  )
}

export default FloatingButton

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    end: 20,
  },
  label: {
    padding: 0,
    margin: 0,
    color: '#fff',
    fontSize: 35,
    fontWeight: '100',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    top: -2,
  },
})
