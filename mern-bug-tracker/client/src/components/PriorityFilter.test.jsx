import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PriorityFilter from './PriorityFilter';

describe('PriorityFilter', () => {
  const mockOnFilterChange = vi.fn();
  
  it('should render filter label and select', () => {
    render(<PriorityFilter onFilterChange={mockOnFilterChange} />);
    
    expect(screen.getByText('Filter by Priority:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should call onFilterChange when selection changes', async () => {
    render(<PriorityFilter onFilterChange={mockOnFilterChange} />);
    
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'High' })
    );
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('high');
  });
});