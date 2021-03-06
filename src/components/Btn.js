import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Text,
} from 'react-native';

import {LIGHTER_PURPLE} from 'utils/colors';
import OuterShadow from './Shadow/Outer';

const Btn = ({onSubmit, disabled, title}) => {
  const {width} = useWindowDimensions();
  return (
    <OuterShadow>
      <TouchableOpacity
        onPress={onSubmit}
        style={[styles.btn, {width: width * 0.85}]}
        disabled={disabled}>
        <Text style={[styles.btnText, disabled && styles.btnDisabled]}>
          {title}
        </Text>
      </TouchableOpacity>
    </OuterShadow>
  );
};

Btn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 20,
    backgroundColor: LIGHTER_PURPLE,
    alignItems: 'center',
    elevation: 5,
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
