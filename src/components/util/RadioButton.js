import React, {useState} from 'react'
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native'

export const RadioButton = (props) => {
  const {checked, tintColor, label, labelColor} = props;
  let isChecked = checked || false;
  return (
    <TouchableHighlight
      style={{flex: 1, paddingVertical: 5}}
      underlayColor='#ddd'
      onPress={e => null}
      {...props}
    >
      <View style={styles.formControl}>
        <View style={[styles.radioButton, tintColor && {borderColor: tintColor}]}>
          {
            isChecked && 
            <View style={[styles.radioButtonChecked, tintColor && {backgroundColor: tintColor}]}></View>
          }
        </View>
        {
        label && <Text style={[styles.label, labelColor && {color: labelColor,}]}>{label}</Text>
        }
      </View>
    </TouchableHighlight>
  )
}

export const RadioControl = (props) => {
  const ABSENT = -1, EXCUSED = 0, PRESENT = 1; 
  // const [value, setValue] = useState('')
  const {value, setValue} = props;
  console.log(value)
  return (
    <View style={styles.formControl}>
      <RadioButton label='Absent' onPress={e => setValue(ABSENT)} checked={(value === ABSENT) && true} />
      <RadioButton label='Excused' onPress={e => setValue(EXCUSED)} checked={(value === EXCUSED) && true} />
      <RadioButton label='Present' onPress={e => setValue(PRESENT)} checked={(value === PRESENT) && true} />
    </View>
  )
}

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
    backgroundColor: '#fff'
  },
  radioButtonChecked: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#000'
  },
  label: {
    marginLeft: 8
  },
})
