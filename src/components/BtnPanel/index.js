import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  Animated,
  Keyboard,
} from 'react-native';

import {LIGHTISH_PURPLE} from 'utils/colors';

const useAnimateHeight = () => {
  const [showBtnContainer, setShowBtnContainer] = useState(true);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 118,
      duration: 500,
    }).start();
  }, [animatedValue]);

  useEffect(() => {
    if (showBtnContainer) {
      Animated.spring(animatedValue, {
        toValue: 118,
        duration: 1000,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 1000,
      }).start();
    }
  }, [showBtnContainer, animatedValue]);

  useEffect(() => {
    let keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowBtnContainer(false);
    });
    return () => {
      keyboardShowListener.remove();
    };
  }, []);
  useEffect(() => {
    let keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowBtnContainer(true);
    });
    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  return {animatedValue, showBtnContainer};
};

const BtnPanel = ({children}) => {
  const {animatedValue, showBtnContainer} = useAnimateHeight();
  const {width} = useWindowDimensions();

  if (!showBtnContainer) return null;
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
