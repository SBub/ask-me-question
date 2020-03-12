import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

import {LIGHT_BLUE_GREY} from '../utils/colors';

const Input = ({code, onChange, onReset}) => {
  return (
    <TextInput
      value={code}
      onChangeText={onChange}
      keyboardType="numeric"
      placeholder="Provide 4-digits room ID here"
      style={styles.input}
      onFocus={onReset}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 54,
    backgroundColor: 'transparent',
    borderRadius: 15,
    borderWidth: 1,
    // borderColor: LIGHT_BLUE_GREY,
    borderColor: '#d3d3d3', // for focus
    paddingLeft: 15,
  },
});

export default Input;
