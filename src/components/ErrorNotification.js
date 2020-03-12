import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  NativeModules,
} from 'react-native';

import {LIGHTISH_PURPLE} from 'utils/colors';

const {StatusBarManager} = NativeModules;

const ErrorNotification = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const {width} = useWindowDimensions();

  useEffect(() => {
    StatusBarManager.getHeight(({height}) => {
      setStatusBarHeight(height);
    });
  }, []);

  return (
    <View
      style={{...styles.errorContainer, width, paddingTop: statusBarHeight}}>
      <Text style={styles.errText}>The ID you provided is incorrect</Text>
      <Text style={styles.errText}>Please provide a valid room ID</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    position: 'absolute',
    top: 0,
    height: 90,
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
