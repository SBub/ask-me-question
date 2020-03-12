/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  InteractionManager,
} from 'react-native';

import Input from 'components/Input';
import BtnPanel from 'components/BtnPanel';
import Btn from 'components/Btn';
import ErrorNotification from 'components/ErrorNotification';
import ProgressBar from 'components/ProgressBar';
import QuestionCard from 'components/QuestionCard';
import ErrorBoundary from './src/ErrorBoundary';

import API from './src/utils/server';

import QuestionProvider, {
  SET_QUESTION,
  useQuestionDispatch,
  useQuestionState,
} from './src/context/QuestionProvider';
import ErrorProvider, {
  useErrorState,
  useErrorDispatch,
  SET_ERROR,
  DISMISS_ERROR,
} from './src/context/ErrorProvider';

import {LIGHT_BLUE_GREY} from 'src/utils/colors';

const Main = () => {
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const question = useQuestionState();
  const error = useErrorState();
  const dispatchToError = useErrorDispatch();
  const dispatchToQuestion = useQuestionDispatch();

  useEffect(() => {
    if (code.length === 4) {
      setShowProgressBar(true);
      Keyboard.dismiss();
      handleSubmit();
    }
  }, [code, handleSubmit]);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    try {
      const res = await API.fetchRoom(code);
      InteractionManager.runAfterInteractions(() => {
        dispatchToQuestion({type: SET_QUESTION, payload: res});
        setCode('');
      });
    } catch (err) {
      dispatchToError({type: SET_ERROR, payload: err});
    } finally {
      setSubmitting(false);
      setShowProgressBar(false);
    }
  }, [code, dispatchToError, dispatchToQuestion]);

  const startOver = () => {
    dispatchToQuestion({type: SET_QUESTION, payload: {}});
    setAnswerSubmitted(false);
  };

  const resetInput = () => {
    dispatchToError({type: DISMISS_ERROR});
    setCode('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputProgress}>
        <Input code={code} onChange={setCode} onReset={resetInput} />
        {showProgressBar && <ProgressBar />}
      </View>
      <QuestionCard
        answerSubmitted={answerSubmitted}
        onSubmitAnswer={setAnswerSubmitted}
      />
      <BtnPanel>
        {question.id ? (
          <Btn onSubmit={startOver} title="Start Over" />
        ) : (
          <Btn
            onSubmit={handleSubmit}
            disabled={code.length < 4 || !!error}
            submitting={submitting}
            title={(submitting && '...') || 'Process'}
          />
        )}
      </BtnPanel>
      {error && <ErrorNotification />}
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <ErrorProvider>
        <QuestionProvider>
          <Main />
        </QuestionProvider>
      </ErrorProvider>
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
  inputProgress: {
    width: '85%',
  },
});

export default App;
