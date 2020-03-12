import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {STEEL, LIGHT_BLUE_GREY} from 'utils/colors';

const ResultRow = ({answer, value}) => {
  return (
    <View style={styles.container} key={answer}>
      <Text style={styles.resultLabel}>{answer.toUpperCase()}</Text>
      <View style={styles.resultNumberContainer}>
        <Text style={styles.resultNumber}>{value}</Text>
      </View>
    </View>
  );
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
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: LIGHT_BLUE_GREY,
  },
  resultNumber: {
    color: STEEL,
    fontWeight: '500',
    fontSize: 17,
  },
});

export default ResultRow;
