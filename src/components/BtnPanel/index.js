import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  Animated,
  Keyboard,
} from 'react-native';

import {LIGHTISH_PURPLE} from 'utils/colors';

const useAnimateHeight = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 118,
      duration: 500,
    }).start();
  }, [animatedValue]);

  return {animatedValue};
};

const BtnPanel = ({children}) => {
  const {animatedValue} = useAnimateHeight();
  const {width} = useWindowDimensions();

  return (
    <Animated.View
      style={[{...styles.buttonContainer, width}, {height: animatedValue}]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 118,
    backgroundColor: LIGHTISH_PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
  },
});

export default BtnPanel;
