import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render spinner and loading text', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(screen.getByText('Loading bugs...')).toBeInTheDocument();
  });
});