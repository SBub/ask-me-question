import React, {useState} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';

import {LIGHTISH_PURPLE} from 'utils/colors';

const BtnPanel = ({children}) => {
  const [showBtnContainer, setShowBtnContainer] = useState(true);
  const {width} = useWindowDimensions();

  if (!showBtnContainer) return null;
  return <View style={{...styles.buttonContainer, width}}>{children}</View>;
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
