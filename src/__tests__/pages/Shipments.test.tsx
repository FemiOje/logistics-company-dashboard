import { render, screen, waitFor } from '@testing-library/react';
import { WebSocketProvider } from '../../providers/WebSocketProvider';
import Shipments from '../../pages/Shipments';


describe('Shipments Page', () => {
  test('displays shipments page', async () => {
    render(
      <WebSocketProvider>
        <Shipments />
      </WebSocketProvider>
    );
  
    await waitFor(() => {
      expect(screen.getByText('Active Shipments')).toBeInTheDocument();
    });
  });
});