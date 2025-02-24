import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import ThemeSwitch from './ThemeSwitch';
import '../../styles/Header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header">
      <button className="menu-button" onClick={onMenuClick}>
        ☰
      </button>
      <h1>Logistics Dashboard</h1>
      <div className="header-right">
        <ThemeSwitch isDark={isDark} onToggle={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;