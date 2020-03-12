import React, {useContext, createContext, useReducer} from 'react';

export const SET_ERROR = 'SET_ERROR';
export const DISMISS_ERROR = 'DISMISS_ERROR';

const ErrorDispatch = createContext();
const ErrorState = createContext();

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case SET_ERROR: {
      return action.payload;
    }
    case DISMISS_ERROR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

const ErrorProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ErrorDispatch.Provider value={dispatch}>
      <ErrorState.Provider value={state}>{children}</ErrorState.Provider>
    </ErrorDispatch.Provider>
  );
};

export const useErrorDispatch = () => {
  return useContext(ErrorDispatch);
};

export const useErrorState = () => {
  return useContext(ErrorState);
};

export default ErrorProvider;
