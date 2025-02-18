import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="header">
      <button className="menu-button" onClick={onMenuClick}>
        ☰
      </button>
      <h1>Logistics Dashboard</h1>
      <div className="profile">
        <span>User Profile</span>
      </div>
    </header>
  );
};

export default Header;