import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormField from './FormField';

describe('FormField', () => {
  const mockOnChange = vi.fn();
  
  it('should render text input with label', () => {
    render(
      <FormField 
        label="Test Label" 
        name="test" 
        value="" 
        onChange={mockOnChange} 
      />
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render textarea when type is textarea', () => {
    render(
      <FormField 
        label="Test Label" 
        name="test" 
        value="" 
        onChange={mockOnChange} 
        type="textarea" 
      />
    );
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should show required indicator when required', () => {
    render(
      <FormField 
        label="Test Label" 
        name="test" 
        value="" 
        onChange={mockOnChange} 
        required 
      />
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should show character count when maxLength is provided', () => {
    render(
      <FormField 
        label="Test Label" 
        name="test" 
        value="test" 
        onChange={mockOnChange} 
        maxLength={10} 
      />
    );
    
    expect(screen.getByText('4/10 characters')).toBeInTheDocument();
  });
});