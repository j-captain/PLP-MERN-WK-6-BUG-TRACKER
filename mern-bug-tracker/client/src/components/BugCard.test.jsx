import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BugCard from './BugCard';

describe('BugCard Component', () => {
  const mockBug = {
    _id: '1',
    title: 'Test Bug',
    description: 'Test Description',
    status: 'open',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    reporter: 'Test User'
  };

  const mockOnDelete = () => {};

  const renderBugCard = (props = {}) => {
    const defaultProps = {
      bug: mockBug,
      onDelete: mockOnDelete,
      ...props
    };
    return render(
      <MemoryRouter>
        <BugCard {...defaultProps} />
      </MemoryRouter>
    );
  };

  it('should render bug title and description', () => {
    renderBugCard();
    
    expect(screen.getByText(mockBug.title)).toBeInTheDocument();
    expect(screen.getByText(mockBug.description)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockBug.status, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockBug.priority, 'i'))).toBeInTheDocument();
  });

  it('should always render edit link and delete button (since editable prop is not used)', () => {
    renderBugCard();
    
    expect(screen.getByRole('link', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('should display reporter name and formatted creation date', () => {
    renderBugCard();
    
    expect(screen.getByText(`Reported by: ${mockBug.reporter}`)).toBeInTheDocument();
    const expectedDate = new Date(mockBug.createdAt).toLocaleDateString();
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    renderBugCard({ onDelete: mockOnDelete });
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    deleteButton.click();
    expect(mockOnDelete).toHaveBeenCalledWith(mockBug._id);
  });
});