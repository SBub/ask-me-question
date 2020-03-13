import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {LIGHT_BLUE_GREY, CORNFLOWER_BLUE} from 'utils/colors';

import OuterShadow from 'components/Shadow/Outer';

const OptionBtn = ({label, onSubmit, idx}) => {
  return (
    <OuterShadow>
      <TouchableOpacity
        onPress={onSubmit}
        style={[styles.btn, idx % 2 === 0 ? styles.left : styles.right]}>
        <Text style={styles.btnText}>{label.toUpperCase()}</Text>
      </TouchableOpacity>
    </OuterShadow>
  );
};

OptionBtn.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 18,
    paddingHorizontal: 50,
    paddingVertical: 12,
    backgroundColor: LIGHT_BLUE_GREY,
    elevation: 5,
  },
  left: {marginRight: 8},
  right: {marginLeft: 8},
  btnText: {fontSize: 22, fontWeight: '500', color: CORNFLOWER_BLUE},
});

export default OptionBtn;
