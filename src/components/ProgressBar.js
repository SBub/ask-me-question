import React, {useRef, useEffect} from 'react';

import {View, StyleSheet, Animated} from 'react-native';

import {LIGHTER_PURPLE} from 'utils/colors';

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
    <View style={styles.progressBar}>
      <Animated.View
        style={
          ([StyleSheet.absoluteFill],
          {backgroundColor: LIGHTER_PURPLE, width, borderRadius: 20})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 23,
    width: '90%',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginTop: 20,
  },
});

export default ProgressBar;
