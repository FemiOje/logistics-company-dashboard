import { createContext } from 'react';
import { ThemeContextType } from '../types/types';

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
}); 