import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Platform, ImageBackground} from 'react-native';

import {BLUE_BAYOUX} from 'utils/colors';

const InnerShadow = ({children, customStyle, source}) => {
  return (
    <View style={[styles.container, customStyle]}>
      {Platform.OS === 'ios' ? (
        <>
          {children}
          <View
            style={[
              styles.shadow,
              styles.left,
              styles.horizontalShadow,
              styles.leftTopShadow,
            ]}
          />
          <View
            style={[
              styles.shadow,
              styles.verticalShadow,
              styles.top,
              styles.leftTopShadow,
            ]}
          />
          <View
            style={[
              styles.shadow,
              styles.right,
              styles.horizontalShadow,
              styles.rightBottomShadow,
            ]}
          />
          <View
            style={[
              styles.shadow,
              styles.verticalShadow,
              styles.bottom,
              styles.rightBottomShadow,
            ]}
          />
        </>
      ) : (
        <ImageBackground
          style={{width: '100%'}}
          source={source}
          imageStyle={{borderRadius: customStyle.borderRadius}}
          blurRadius={1}>
          {children}
        </ImageBackground>
      )}
    </View>
  );
};

InnerShadow.propTypes = {
  children: PropTypes.elementType,
  customStyle: {
    borderRadius: PropTypes.number.isRequired,
  },
  source: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: '100%',
  },
  shadow: {
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 9,
  },
  verticalShadow: {
    height: 11,
    width: '100%',
  },
  horizontalShadow: {
    width: 11,
    height: '100%',
  },
  leftTopShadow: {
    shadowColor: BLUE_BAYOUX,
  },
  rightBottomShadow: {
    shadowColor: 'white',
  },
  left: {
    left: -11,
    shadowOffset: {
      width: 2,
      height: 0,
    },
  },
  top: {
    top: -11,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  right: {
    right: -11,

    shadowOffset: {
      width: -4,
      height: 0,
    },
  },
  bottom: {
    bottom: -11,

    shadowOffset: {
      width: 0,
      height: -4,
    },
  },
});

export default InnerShadow;
