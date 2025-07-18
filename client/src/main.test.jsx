import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders App inside StrictMode', () => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});