import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();
  
  it('should render search input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search bugs...')).toBeInTheDocument();
  });

  it('should call onSearch when typing', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    await userEvent.type(screen.getByRole('textbox'), 'test');
    
    expect(mockOnSearch).toHaveBeenCalledWith('t');
    expect(mockOnSearch).toHaveBeenCalledWith('te');
    expect(mockOnSearch).toHaveBeenCalledWith('tes');
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});