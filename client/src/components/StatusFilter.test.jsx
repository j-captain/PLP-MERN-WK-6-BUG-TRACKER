import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StatusFilter from './StatusFilter';

describe('StatusFilter', () => {
  const mockOnFilterChange = vi.fn();
  
  it('should render filter label and select', () => {
    render(<StatusFilter onFilterChange={mockOnFilterChange} />);
    
    expect(screen.getByText('Filter by Status:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should call onFilterChange when selection changes', async () => {
    render(<StatusFilter onFilterChange={mockOnFilterChange} />);
    
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'In Progress' })
    );
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('in-progress');
  });
});