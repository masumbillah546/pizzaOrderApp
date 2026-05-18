import { AlertProvider } from './AlertContext';
import { AuthProvider } from './AuthContext';
import { LoadingProvider } from './LoadingContext';
import { ThemeProvider } from './ThemeContext';

export const AppProviders = ({ children }) => (
  <AuthProvider>
    <LoadingProvider>
      <AlertProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AlertProvider>
    </LoadingProvider>
  </AuthProvider>
);
