// AuthContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { UserType } from '@/types';
import { STORAGE_KEYS, AUTH_STORAGE_KEYS } from '@/constants/storage';
import { startupLog, startupWarn } from '@/utils/startupLogger';

type USER = {
  tokens?: any;
  app_context?: any;
  user?: UserType;
};

type AuthContextType = {
  token: any | null;
  appData: any | null;
  user: UserType | null;
  setUser: (params: USER) => Promise<void>;
  unsetUser: () => Promise<void>;
  isLoggedIn: boolean;
  checking: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  appData: null,
  user: null,
  setUser: async () => {},
  unsetUser: async () => {},
  isLoggedIn: false,
  checking: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<any | null>(null);
  const [appData, setAppData] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [checking, setChecking] = useState(true);
  const appDataRef = useRef<any | null>(null);
  const userDataRef = useRef<any | null>(null);

  useEffect(() => {
    appDataRef.current = appData;
  }, [appData]);

  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  const parseStoredJson = useCallback((value: string | null, key: string) => {
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch {
      startupWarn('auth.restore.parse-failed', { key });
      return null;
    }
  }, []);

  const checkLoggedIn = useCallback(async () => {
    try {
      const [[, storedToken], [, storedAppData], [, storedUser]] =
        await AsyncStorage.multiGet([
          STORAGE_KEYS.AUTH_TOKEN,
          STORAGE_KEYS.APP_DATA,
          STORAGE_KEYS.USER_DATA,
        ]);

      const parsedToken = parseStoredJson(
        storedToken,
        STORAGE_KEYS.AUTH_TOKEN,
      );
      const parsedAppData = parseStoredJson(
        storedAppData,
        STORAGE_KEYS.APP_DATA,
      );
      const parsedUser = parseStoredJson(storedUser, STORAGE_KEYS.USER_DATA);

      if (parsedToken && parsedUser) {
        setToken(parsedToken);
        setAppData(parsedAppData);
        setUserData(parsedUser);
        appDataRef.current = parsedAppData;
        userDataRef.current = parsedUser;
        startupLog('auth.restore.completed', {
          hasToken: true,
          hasUser: true,
          hasAppData: Boolean(parsedAppData),
        });
        return;
      }

      if (storedToken || storedAppData || storedUser) {
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.AUTH_TOKEN,
          STORAGE_KEYS.APP_DATA,
          STORAGE_KEYS.USER_DATA,
        ]);
        startupWarn('auth.restore.cleared-invalid-session');
      }
    } catch (error) {
      startupWarn('auth.restore.failed', error);
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.APP_DATA,
        STORAGE_KEYS.USER_DATA,
      ]);
    } finally {
      setChecking(false);
    }
  }, [parseStoredJson]);

  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  const setUser = useCallback(async ({
    tokens,
    app_context,
    user: newUserData,
  }: USER): Promise<void> => {
    if (tokens) {
      setToken(tokens);
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(tokens));
    }
    if (app_context) {
      const nextAppData = { ...(appDataRef.current || {}), ...app_context };
      appDataRef.current = nextAppData;
      setAppData(nextAppData);
      await AsyncStorage.setItem(
        STORAGE_KEYS.APP_DATA,
        JSON.stringify(nextAppData),
      );
    }
    if (newUserData) {
      const nextUserData = { ...(userDataRef.current || {}), ...newUserData };
      userDataRef.current = nextUserData;
      setUserData(nextUserData);
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify(nextUserData),
      );
    }
  }, []);

  const unsetUser = useCallback(async (): Promise<void> => {
    setToken(null);
    setAppData(null);
    setUserData(null);
    appDataRef.current = null;
    userDataRef.current = null;
    await AsyncStorage.multiRemove([
      ...AUTH_STORAGE_KEYS,
      STORAGE_KEYS.AVAILABILITY_STATUS,
    ]);
  }, []);

  const isLoggedIn = !!token;
  const contextValue = useMemo(
    () => ({
      checking,
      appData,
      token,
      user: userData,
      setUser,
      unsetUser,
      isLoggedIn,
    }),
    [checking, appData, token, userData, setUser, unsetUser, isLoggedIn],
  );

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
};
