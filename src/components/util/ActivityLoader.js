import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const activityLoader = (props) => {
  const {color, size} = props;
  let myColor = color || '#aaa';
  let mySize = size || 'large';
  return (
    <View style={styles.loadingIndicator}>
      <ActivityIndicator size={mySize} color={myColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingIndicator: { 
    flex: 1,
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
})

export default activityLoader
