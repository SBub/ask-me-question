import React, {useContext, createContext, useReducer} from 'react';

export const SET_QUESTION = 'SET_QUESTION';

const QuestionState = createContext();
const QuestionDispatch = createContext();

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_QUESTION: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const QuestionProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuestionDispatch.Provider value={dispatch}>
      <QuestionState.Provider value={state}>{children}</QuestionState.Provider>
    </QuestionDispatch.Provider>
  );
};

export const useQuestionState = () => {
  return useContext(QuestionState);
};

export const useQuestionDispatch = () => {
  return useContext(QuestionDispatch);
};

export default QuestionProvider;
