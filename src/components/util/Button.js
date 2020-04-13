import React from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native'

const Button = (props) => {
  const {label, color, backgroundColor, size} = props;
  let _size = size || 'normal';
  return (
    <TouchableHighlight 
      style={[styles.button, backgroundColor && {backgroundColor}, (_size.toLowerCase() === 'small') && {padding: 10}]}
      {...props}
      >
      <Text style={[styles.buttonText, color && {color}, (_size.toLowerCase() === 'small') && {fontSize: 13}]}>
        {label}</Text>
    </TouchableHighlight>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    //backgroundColor: '#FFC107',
    //backgroundColor: '#F44336',
    backgroundColor: '#FF1744',
    //backgroundColor: '#D81B60',
    //borderColor: '#D81B60A7',
    //backgroundColor: '#333',
    //borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    //textTransform: 'uppercase',
    fontWeight: '600',
  }
})