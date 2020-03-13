import React, {useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import {TextInput, StyleSheet, Keyboard} from 'react-native';
import InnerShadow from './Shadow/Inner';

import {LINK_WATER, CORNFLOWER_BLUE} from 'utils/colors';

const Input = React.memo(({code, onChange, onReset}) => {
  const [focused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onReset();
  };

  const handleUnfocus = () => {
    setIsFocused(false);
  };

  useLayoutEffect(() => {
    let keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleUnfocus,
    );
    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <InnerShadow customStyle={styles.inherit} source={require('assets/bg.png')}>
      <TextInput
        value={code}
        onChangeText={onChange}
        keyboardType="numeric"
        placeholder="Provide 4-digits room ID here"
        style={[styles.inherit, styles.input, focused && styles.focus]}
        onFocus={handleFocus}
      />
    </InnerShadow>
  );
});

Input.propTypes = {
  code: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  inherit: {
    borderRadius: 15,
    width: '100%',
    height: 54,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: LINK_WATER,
    paddingLeft: 15,
    zIndex: 100,
  },
  focus: {
    borderColor: CORNFLOWER_BLUE,
  },
});

export default Input;
