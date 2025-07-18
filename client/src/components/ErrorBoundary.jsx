import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h2 style={styles.title}>Something went wrong!</h2>
          <p style={styles.message}>{this.state.error.toString()}</p>
          <button onClick={this.handleReset} style={styles.button}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f8d7da',
    borderRadius: '8px',
    border: '1px solid #f5c6cb',
    margin: '20px 0',
  },
  title: {
    color: '#721c24',
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  message: {
    color: '#721c24',
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#721c24',
    color: 'white',
    padding: '10px 25px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#5a1a1c',
    },
  },
};

export default ErrorBoundary;