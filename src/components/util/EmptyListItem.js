import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const EmptyListItem = (props) => {
  const {label, showIcon} = props;
  let text = label || 'Empty List';
  let withIcon = showIcon || true;
  return (
    <View style={styles.container}>
      {
        withIcon && 
        <Icon 
          color={'#F44336'}
          name={'exclamation-triangle'} 
          size={42} 
          style={styles.icon} 
        />
      }
      <Text style={styles.label}>{text}</Text>
    </View>
  )
}

export default EmptyListItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 18,
    color: '#444',
    fontFamily: 'serif',
    fontWeight: '300',
  },
  icon: {
    marginBottom: 24,
    marginTop: 12
  }
})
