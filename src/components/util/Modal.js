import React from 'react'
import { View, StyleSheet } from 'react-native'

const Modal = (props) => {
  return (
    <View style={styles.modal}>
      {props.children}
    </View>
  )
}

export default Modal

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
  }
})
