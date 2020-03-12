/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Input from 'components/Input';
import BtnPanel from 'components/BtnPanel';
import Btn from 'components/Btn';
import ErrorNotification from 'components/ErrorNotification';
import ProgressBar from 'components/ProgressBar';
import QuestionCard from 'components/QuestionCard';
import ErrorBoundary from './src/ErrorBoundary';

import {LIGHT_BLUE_GREY} from 'src/utils/colors';

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Input />
      <ProgressBar />
      <QuestionCard />
      <BtnPanel>
        <Btn onSubmit={() => {}} disabled={false} title="Process" />
      </BtnPanel>
      <ErrorNotification />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_BLUE_GREY,
  },
});

export default App;
