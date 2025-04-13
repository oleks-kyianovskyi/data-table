import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggle;