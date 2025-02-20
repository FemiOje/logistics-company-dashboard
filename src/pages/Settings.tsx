import { useTheme } from '../hooks/useTheme';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="setting-item">
        <label>Dark Mode</label>
        <button onClick={toggleTheme}>
          {isDark ? 'Disable' : 'Enable'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
