import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-card/20 border border-border hover:bg-card/40 transition-all duration-300 hover:scale-110"
      title={theme === 'light' ? t('theme.dark') : t('theme.light')}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-foreground" />
      ) : (
        <Sun className="w-5 h-5 text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle;