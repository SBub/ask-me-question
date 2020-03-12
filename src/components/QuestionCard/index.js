import React, {useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import OptionBtn from './OptionBtn';
import ResultRow from './ResultRow';

import {LIGHT_BLUE_GREY, CORNFLOWER_BLUE, SAN_JUAN} from 'utils/colors';

const state = {
  question: 'Hey, what is the weather like?',
  answers: {
    Yes: 0,
    No: 0,
  },
};

const QuestionCard = ({answerSubmitted = false}) => {
  const [submitting, setSubmitting] = useState(false);
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.label}>
        {answerSubmitted ? 'Final results for: ' : 'The question is:'}
      </Text>
      <Text style={styles.questionText}>{state.question}</Text>
      {submitting ? (
        <ActivityIndicator />
      ) : !answerSubmitted ? (
        <View style={styles.btnGroup}>
          {state.answers &&
            Object.keys(state.answers).map((answer, idx) => (
              <OptionBtn
                key={answer}
                idx={idx}
                label={answer}
                onSubmit={() => {}}
              />
            ))}
        </View>
      ) : (
        <View>
          {state.answers &&
            Object.keys(state.answers).map((answer, idx) => (
              <ResultRow
                key={answer}
                answer={answer}
                value={state.answers[answer]}
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
    justifyContent: 'center',
    backgroundColor: LIGHT_BLUE_GREY,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  label: {
    color: CORNFLOWER_BLUE,
    marginBottom: 27,
    fontSize: 21,
    fontWeight: '400',
  },
  questionText: {
    fontSize: 29,
    color: SAN_JUAN,
    marginBottom: 70,
  },
  btnGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default QuestionCard;
