import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import BugFormPage from './BugFormPage';
import bugService from '../services/bugService';

// Mock the bugService
vi.mock('../services/bugService');

describe('BugFormPage', () => {
  const mockBug = {
    _id: '1',
    title: 'Test Bug',
    description: 'Test Description',
    status: 'open',
    priority: 'medium'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (route = '/add-bug') => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/add-bug" element={<BugFormPage />} />
          <Route path="/edit-bug/:id" element={<BugFormPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('should render the form for adding a new bug', async () => {
    renderComponent();
    
    expect(screen.getByTestId('input-title')).toBeInTheDocument();
    expect(screen.getByTestId('input-description')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /status/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /priority/i })).toBeInTheDocument();
  });

  it('should render the form for editing an existing bug', async () => {
    bugService.getBugById.mockResolvedValue(mockBug);
    
    renderComponent('/edit-bug/1');
    
    await waitFor(() => {
      expect(bugService.getBugById).toHaveBeenCalledWith('1');
      expect(screen.getByTestId('input-title')).toHaveValue('Test Bug');
      expect(screen.getByTestId('input-description')).toHaveValue('Test Description');
    });
  });

  it('should submit the form for a new bug', async () => {
    bugService.createBug.mockResolvedValue({});
    const user = userEvent.setup();
    
    renderComponent();
    
    await user.type(screen.getByTestId('input-title'), 'New Bug');
    await user.type(screen.getByTestId('input-description'), 'New Description');
    await user.selectOptions(
      screen.getByRole('combobox', { name: /status/i }),
      'open'
    );
    await user.selectOptions(
      screen.getByRole('combobox', { name: /priority/i }),
      'medium'
    );
    
    await user.click(screen.getByRole('button', { name: /create bug/i }));
    
    expect(bugService.createBug).toHaveBeenCalledWith({
      title: 'New Bug',
      description: 'New Description',
      status: 'open',
      priority: 'medium',
      reporter: ''
    });
  });

      it('should show error when form submission fails', async () => {
      const errorMessage = 'Failed to submit';
      // Use mockImplementation to ensure proper Promise rejection
      bugService.createBug.mockImplementation(() => 
        Promise.reject(new Error(errorMessage))
      );
      
      const user = userEvent.setup();
      renderComponent();
      
      await user.type(screen.getByTestId('input-title'), 'New Bug');
      await user.type(screen.getByTestId('input-description'), 'Test description');
      
      // Use findBy* which automatically waits for the element
      user.click(screen.getByRole('button', { name: /create bug/i }));
      
      // First verify the mock was called
      await waitFor(() => {
        expect(bugService.createBug).toHaveBeenCalled();
      });
      
      // Then look for the error message
      const errorElement = await screen.findByTestId('error-message', {}, { timeout: 3000 });
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent(errorMessage);
    });
});