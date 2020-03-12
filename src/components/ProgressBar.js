import React, {useRef, useEffect} from 'react';

import {View, StyleSheet, Animated} from 'react-native';

import {LIGHTER_PURPLE} from 'utils/colors';

import InnerShadow from './Shadow/Inner';

const ProgressBar = () => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const width = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: 100,
      duration: 4000,
    }).start();
  }, [animatedWidth]);

  return (
    <InnerShadow
      customStyle={{...styles.inherit, marginTop: 20}}
      source={require('assets/input_bg.png')}>
      <View style={[styles.inherit, styles.progressBar, {width: '100%'}]}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill],
            {backgroundColor: LIGHTER_PURPLE, width, borderRadius: 20})
          }
        />
      </View>
    </InnerShadow>
  );
};

const styles = StyleSheet.create({
  inherit: {
    height: 23,
    width: '90%',
    borderRadius: 20,
  },
  progressBar: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
});

export default ProgressBar;
