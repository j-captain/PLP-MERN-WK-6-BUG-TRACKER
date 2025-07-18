import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the child components to avoid Router nesting issues
vi.mock('./pages/BugListPage', () => ({
  default: () => <div data-testid="bug-list-page">BugListPage Mock</div>
}));

vi.mock('./pages/BugFormPage', () => ({
  default: () => <div data-testid="bug-form-page">BugFormPage Mock</div>
}));

vi.mock('./components/Header', () => ({
  default: () => <header data-testid="header">Header Mock</header>
}));

vi.mock('./components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer Mock</footer>
}));

describe('App Component', () => {
  it('should render Header, Footer and main content', () => {
    render(<App />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  // Add window.history manipulation for route testing
  it('should render BugListPage for / route', () => {
    window.history.pushState({}, '', '/');
    render(<App />);
    expect(screen.getByTestId('bug-list-page')).toBeInTheDocument();
  });

  it('should render BugFormPage for /add-bug route', () => {
    window.history.pushState({}, '', '/add-bug');
    render(<App />);
    expect(screen.getByTestId('bug-form-page')).toBeInTheDocument();
  });

  it('should render BugFormPage for /edit-bug/:id route', () => {
    window.history.pushState({}, '', '/edit-bug/123');
    render(<App />);
    expect(screen.getByTestId('bug-form-page')).toBeInTheDocument();
  });
});