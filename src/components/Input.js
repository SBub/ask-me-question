import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import InnerShadow from './Shadow/Inner';

const Input = ({code, onChange, onReset}) => {
  return (
    <InnerShadow customStyle={styles.inherit} source={require('assets/bg.png')}>
      <TextInput
        value={code}
        onChangeText={onChange}
        keyboardType="numeric"
        placeholder="Provide 4-digits room ID here"
        style={[styles.inherit, styles.input]}
        onFocus={onReset}
      />
    </InnerShadow>
  );
};

const styles = StyleSheet.create({
  inherit: {
    borderRadius: 15,
    width: '100%',
    height: 54,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    paddingLeft: 15,
  },
});

export default Input;
