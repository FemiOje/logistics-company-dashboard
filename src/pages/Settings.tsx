import { useTheme } from '../hooks/useTheme';
import ThemeSwitch from '../components/layout/ThemeSwitch';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="setting-item">
        <label>Dark Mode</label>
        <ThemeSwitch isDark={isDark} onToggle={toggleTheme} />
      </div>
    </div>
  );
};

export default Settings;
