import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
 
import '@testing-library/jest-dom/vitest';

// Mock React Router if needed
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}));

// Optional: Provide a default Router wrapper
globalThis.Wrapper = ({ children }) => (
  <MemoryRouter>
    {children}
  </MemoryRouter>
);