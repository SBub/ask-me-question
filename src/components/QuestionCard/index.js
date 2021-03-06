import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import OptionBtn from './OptionBtn';
import ResultRow from './ResultRow';

const {width} = Dimensions.get('window');

import API from 'utils/server';
import {
  SET_QUESTION,
  useQuestionDispatch,
  useQuestionState,
} from 'context/QuestionProvider';
import {
  useErrorDispatch,
  useErrorState,
  SET_ERROR,
} from 'context/ErrorProvider';

import {LIGHT_BLUE_GREY, CORNFLOWER_BLUE, SAN_JUAN} from 'utils/colors';
import OuterShadow from '../Shadow/Outer';

const QuestionCard = React.memo(({answerSubmitted, onSubmitAnswer}) => {
  const [submitting, setSubmitting] = useState(false);

  const error = useErrorState();
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
    <OuterShadow>
      <View style={styles.cardContainer}>
        <Text style={styles.label}>
          {answerSubmitted ? 'Final results for: ' : 'The question is:'}
        </Text>
        <Text style={styles.questionText}>{questionState.question}</Text>
        {submitting ? (
          <View style={{height: 70, width: '100%'}}>
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
            {!error &&
              questionState.answers &&
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
    </OuterShadow>
  );
});

QuestionCard.propTypes = {
  answerSubmitted: PropTypes.bool.isRequired,
  onSubmitAnswer: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 60,
    borderRadius: 24,
    justifyContent: 'space-between',
    backgroundColor: LIGHT_BLUE_GREY,
    paddingHorizontal: 24,
    paddingVertical: 24,
    elevation: 5,
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
    marginBottom: 40,
  },
  btnGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  resultsContainer: {
    height: 70,
  },
});

export default QuestionCard;
