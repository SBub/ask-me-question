import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, useWindowDimensions, Animated} from 'react-native';

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

BtnPanel.propTypes = {
  children: PropTypes.node.isRequired,
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
