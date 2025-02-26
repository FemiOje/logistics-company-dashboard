import { renderHook, waitFor } from '@testing-library/react';
import { useWebSocketData } from '../../hooks/useWebSocketData';

interface TestData {
  value: number;
}

test('useWebSocketData handles initial state', async () => {
  const initialData: TestData = { value: 0 };
  const { result } = renderHook(() => useWebSocketData<TestData>(initialData));

  await waitFor(() => {
    expect(result.current.data).toEqual(initialData);
  });
});