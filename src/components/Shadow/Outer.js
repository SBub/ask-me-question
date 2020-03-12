import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';

const OuterShadow = ({children}) => {
  return Platform.OS === 'ios' ? (
    <View style={styles.leftTop}>
      <View style={styles.rightBottom}>{children}</View>
    </View>
  ) : (
    children
  );
};

const styles = StyleSheet.create({
  leftTop: {
    shadowColor: 'white',
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  rightBottom: {
    shadowColor: 'darkblue',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default OuterShadow;
