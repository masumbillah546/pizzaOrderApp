import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDark: false,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('system');
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    if (theme === 'system') {
      setIsDark(colorScheme === 'dark');
    } else {
      setIsDark(theme === 'dark');
    }
  }, [theme, colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}