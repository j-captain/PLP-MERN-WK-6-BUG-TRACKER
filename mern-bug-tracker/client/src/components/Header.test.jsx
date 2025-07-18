import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('should render logo and navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    expect(screen.getByText('🐞 Bug Tracker')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /report bug/i })).toBeInTheDocument();
  });
});