import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/layout/Header';
import { ThemeProvider } from '../../providers/ThemeProvider';

describe('Header', () => {
  test('renders header title', () => {
    render(
      <ThemeProvider>
        <Header onMenuClick={() => {}} />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Logistics Dashboard')).toBeInTheDocument();
  });

  test('toggles theme when switch is clicked', () => {
    const mockToggle = jest.fn();
    render(
      <ThemeProvider>
        <Header onMenuClick={() => {}} />
      </ThemeProvider>
    );

    const themeSwitch = screen.getByRole('checkbox');
    fireEvent.click(themeSwitch);
    expect(themeSwitch).toBeChecked();
  });
});