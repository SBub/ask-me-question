import React, {useState, useEffect, useRef} from 'react';

import {
  Text,
  useWindowDimensions,
  StyleSheet,
  NativeModules,
  Platform,
  Animated,
} from 'react-native';

import {LIGHTISH_PURPLE} from 'utils/colors';

const {StatusBarManager} = NativeModules;

const ErrorNotification = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const animatedTop = useRef(new Animated.Value(-150)).current;
  const {width} = useWindowDimensions();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(({height}) => {
        setStatusBarHeight(height);
      });
    } else {
      setStatusBarHeight(StatusBarManager.HEIGHT);
    }
  }, []);

  useEffect(() => {
    Animated.spring(animatedTop, {
      toValue: 0,
    }).start();
  }, [animatedTop]);

  return (
    <Animated.View
      style={[
        {
          ...styles.errorContainer,
          width,
          paddingVertical: statusBarHeight,
        },
        {top: animatedTop},
      ]}>
      <Text style={styles.errText}>The ID you provided is incorrect</Text>
      <Text style={styles.errText}>Please provide a valid room ID</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: LIGHTISH_PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errText: {
    color: 'white',
    fontSize: 15,
  },
});

export default ErrorNotification;
