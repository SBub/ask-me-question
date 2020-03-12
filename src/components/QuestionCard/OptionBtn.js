import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {LIGHT_BLUE_GREY, CORNFLOWER_BLUE} from 'utils/colors';

const OptionBtn = ({label, onSubmit, idx}) => {
  return (
    <View style={styles.shadow}>
      <TouchableOpacity
        onPress={onSubmit}
        style={[styles.btn, idx % 2 === 0 ? styles.left : styles.right]}>
        <Text style={styles.btnText}>{label.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 18,
    paddingHorizontal: 50,
    paddingVertical: 12,
    backgroundColor: LIGHT_BLUE_GREY,
  },
  left: {marginRight: 8},
  right: {marginLeft: 8},
  btnText: {fontSize: 22, fontWeight: '500', color: CORNFLOWER_BLUE},
});

export default OptionBtn;
