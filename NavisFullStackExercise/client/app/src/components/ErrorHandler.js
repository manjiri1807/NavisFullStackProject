// libs
import React, { Component } from 'react';

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      errorInfo: null,
      hasError: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      console.log('Error:', this.state.error);
      return (
        <div>
          <h1>Error</h1>
          <b>{this.state.error.toString()}</b>
          <br />
          <code>
            {this.state.errorInfo.componentStack.split('\n').map(stack => (
              <p key={stack}>{stack}</p>
            ))}
          </code>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorHandler;
