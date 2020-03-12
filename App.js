/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Keyboard,
  InteractionManager,
  useWindowDimensions,
  Animated,
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

const useAnimations = () => {
  const {height} = useWindowDimensions();

  const animatedInput = useRef(new Animated.Value(height / 3)).current;
  const animatedQuestion = useRef(new Animated.Value(-400)).current;

  const showQuestion = () => {
    Animated.sequence([
      Animated.timing(animatedInput, {
        toValue: height,
        duration: 500,
      }),
      Animated.timing(animatedQuestion, {
        toValue: height / 6,
        duration: 500,
      }),
    ]).start();
  };

  const showInput = () => {
    Animated.sequence([
      Animated.timing(animatedQuestion, {
        toValue: -400,
        duration: 500,
      }),
      Animated.timing(animatedInput, {
        toValue: height / 3,
        duration: 500,
      }),
    ]).start();
  };

  return {animatedInput, animatedQuestion, showInput, showQuestion};
};

const Main = () => {
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const question = useQuestionState();
  const error = useErrorState();
  const dispatchToError = useErrorDispatch();
  const dispatchToQuestion = useQuestionDispatch();

  const {
    animatedInput,
    animatedQuestion,
    showInput,
    showQuestion,
  } = useAnimations();

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
        showQuestion();
      });
    } catch (err) {
      dispatchToError({type: SET_ERROR, payload: err});
    } finally {
      setSubmitting(false);
      setShowProgressBar(false);
    }
  }, [code, dispatchToError, dispatchToQuestion, showQuestion]);

  const startOver = () => {
    showInput();
    InteractionManager.runAfterInteractions(() => {
      dispatchToQuestion({type: SET_QUESTION, payload: {}});
      setAnswerSubmitted(false);
    });
  };

  const resetInput = () => {
    dispatchToError({type: DISMISS_ERROR});
    setCode('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.inputProgress, styles.section, {top: animatedInput}]}>
        <Input code={code} onChange={setCode} onReset={resetInput} />
        {showProgressBar && <ProgressBar />}
      </Animated.View>
      <Animated.View style={[styles.section, {top: animatedQuestion}]}>
        <QuestionCard
          answerSubmitted={answerSubmitted}
          onSubmitAnswer={setAnswerSubmitted}
        />
      </Animated.View>
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
    alignItems: 'center',
  },
  section: {
    position: 'absolute',
  },
});

export default App;
