import React from 'react';
import '../../styles/ThemeSwitch.css';

interface ThemeSwitchProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isDark, onToggle }) => {
  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        checked={isDark}
        onChange={onToggle}
        aria-label="Toggle dark mode"
      />
      <span className="slider"></span>
    </label>
  );
};

export default ThemeSwitch;