import React from 'react';

import {View, StyleSheet} from 'react-native';

import {LIGHTER_PURPLE, PALE_GREY} from 'utils/colors';

const ProgressBar = () => {
  return (
    <View style={styles.progressBar}>
      <View
        style={
          ([StyleSheet.absoluteFill],
          {backgroundColor: LIGHTER_PURPLE, width: '50%', borderRadius: 20})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 23,
    width: '100%',
    borderColor: PALE_GREY,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
});

export default ProgressBar;
