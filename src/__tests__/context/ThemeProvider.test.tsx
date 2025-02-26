import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const TestComponent = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme-status">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('initial theme matches system preference', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });

  test('toggles theme and persists in localStorage', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
  
    const toggleButton = screen.getByText('Toggle');
    fireEvent.click(toggleButton);
  
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
      expect(localStorage.getItem('theme')).toBe('light');
    });
  });
});