import { renderHook } from '@testing-library/react-hooks';
import { useTheme } from '../../hooks/useTheme';

test('useTheme returns initial theme', () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.isDark).toBe(false);
});