import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import OptionBtn from './OptionBtn';
import ResultRow from './ResultRow';

import API from 'utils/server';
import {
  SET_QUESTION,
  useQuestionDispatch,
  useQuestionState,
} from 'context/QuestionProvider';
import {useErrorDispatch, SET_ERROR} from 'context/ErrorProvider';

import {LIGHT_BLUE_GREY, CORNFLOWER_BLUE, SAN_JUAN} from 'utils/colors';

const QuestionCard = ({answerSubmitted, onSubmitAnswer}) => {
  const [submitting, setSubmitting] = useState(false);

  const questionState = useQuestionState();
  const dispatchToQuestion = useQuestionDispatch();
  const dispatchToError = useErrorDispatch();

  const submitAnswer = useCallback(
    async option => {
      setSubmitting(true);
      try {
        const res = await API.submitAnswer(questionState.id, option);
        dispatchToQuestion({type: SET_QUESTION, payload: res});
        onSubmitAnswer(true);
      } catch (err) {
        dispatchToError({type: SET_ERROR, payload: err});
      } finally {
        setSubmitting(false);
      }
    },
    [questionState.id, dispatchToQuestion, dispatchToError, onSubmitAnswer],
  );

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.label}>
        {answerSubmitted ? 'Final results for: ' : 'The question is:'}
      </Text>
      <Text style={styles.questionText}>{questionState.question}</Text>
      {submitting ? (
        <View style={{height: 70}}>
          <ActivityIndicator />
        </View>
      ) : !answerSubmitted ? (
        <View style={styles.btnGroup}>
          {questionState.answers &&
            Object.keys(questionState.answers).map((answer, idx) => (
              <OptionBtn
                key={answer}
                idx={idx}
                label={answer}
                onSubmit={() => submitAnswer(answer)}
              />
            ))}
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          {questionState.answers &&
            Object.keys(questionState.answers).map(answer => (
              <ResultRow
                key={answer}
                answer={answer}
                value={questionState.answers[answer]}
              />
            ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '98%',
    borderRadius: 24,
    justifyContent: 'space-between',
    backgroundColor: LIGHT_BLUE_GREY,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  label: {
    color: CORNFLOWER_BLUE,
    fontSize: 21,
    fontWeight: '400',
    marginBottom: 27,
  },
  questionText: {
    fontSize: 29,
    color: SAN_JUAN,
    marginBottom: 70,
  },
  btnGroup: {
    height: 70,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  resultsContainer: {
    height: 70,
    width: '100%',
  },
});

export default QuestionCard;
