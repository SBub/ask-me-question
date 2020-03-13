import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

import {STEEL} from 'utils/colors';
import InnerShadow from '../Shadow/Inner';

const ResultRow = ({answer, value}) => {
  return (
    <View style={styles.container} key={answer}>
      <Text style={styles.resultLabel}>{answer.toUpperCase()}</Text>
      <InnerShadow
        customStyle={{borderRadius: 8}}
        source={require('assets/result_bg.png')}>
        <View style={styles.resultNumberContainer}>
          <Text style={styles.resultNumber}>{value}</Text>
        </View>
      </InnerShadow>
    </View>
  );
};

ResultRow.propTypes = {
  answer: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 17,
    color: STEEL,
  },
  resultNumberContainer: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultNumber: {
    color: STEEL,
    fontWeight: '500',
    fontSize: 17,
  },
});

export default ResultRow;
