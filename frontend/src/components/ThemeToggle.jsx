import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full h-9 w-9 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4 text-orange-400" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
