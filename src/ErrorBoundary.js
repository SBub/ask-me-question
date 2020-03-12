import React from 'react';
import {Text} from 'react-native';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Text>Ooops!</Text>
          <Text>There is a problem with the app</Text>
          <Text>Please close this app and start it again</Text>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
