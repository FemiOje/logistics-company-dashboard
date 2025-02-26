import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

jest.mock('../providers/WebSocketProvider', () => ({
  WebSocketProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('Routing', () => {
  test('renders dashboard on root path', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByText('Connecting to server...')).not.toBeInTheDocument();
    });

    expect(await screen.findByText('In Transit')).toBeInTheDocument();
    expect(await screen.findByText('Delayed')).toBeInTheDocument();
    expect(await screen.findByText('Delivered')).toBeInTheDocument();
  });

  test('navigates to shipments page', async () => {
    render(
      <MemoryRouter initialEntries={['/shipments']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Active Shipments')).toBeInTheDocument();
  });

  test('navigates to settings page', async () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });
});
