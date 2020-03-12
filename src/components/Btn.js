import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Text,
} from 'react-native';

import {LIGHTER_PURPLE} from 'utils/colors';

const Btn = ({onSubmit, disabled, title}) => {
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={onSubmit}
      style={[styles.btn, {width: width * 0.85}]}
      disabled={disabled}>
      <Text style={[styles.btnText, disabled && styles.btnDisabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 20,
    backgroundColor: LIGHTER_PURPLE,
    alignItems: 'center',
  },
  btnText: {
    paddingVertical: 16,
    fontSize: 20,
    color: 'white',
  },
  btnDisabled: {
    opacity: 0.4,
  },
});

export default Btn;
