import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { apiRequest } from '@/api/client';
import { APP_VERSION, DEFAULT_API_BASE_URL } from '@/config/env';
import type { SessionUser, StoredSessionSnapshot } from './types';
import { StackActions } from '@react-navigation/native';
import { navigationRef } from '@/navigation/RootNavigator';

const SESSION_STORAGE_KEY = '@nypd-columbia/session';
const DEVICE_ID_STORAGE_KEY = '@nypd-columbia/device-id';

type SessionStatus = 'booting' | 'signed_out' | 'signed_in';

type LoginResponse = {
  message: string;
  token: string;
  user: BackendUser;
};

type RegisterResponse = {
  message: string;
  user: BackendUser;
};

type MeResponse = {
  user: BackendUser;
};

type BackendUser = {
  id: string;
  name: string;
  first_name?: string | null;
  middle_initial?: string | null;
  last_name?: string | null;
  email: string;
  phone: string | null;
  date_of_birth?: string | null;
  user_type: string | null;
  system_role: string | null;
  login_status: string | null;
  verified?: boolean;
  blocked?: boolean;
  joining_date?: string | null;
  profile_image_url?: string | null;
  verification_date?: string | null;
  permissions: string[];
  member_profile: {
    address_line_1: string | null;
    address_line_2: string | null;
    shield_number: string | null;
    ess_number: string | null;
    last_subscription_date: string | null;
    last_subscription_expire_date: string | null;
    current_subscription_status: string | null;
    current_subscription_payment_type: string | null;
    command_name: string | null;
    active_member_flag: boolean | null;
  } | null;
};

type DeviceRegistrationInput = {
  pushToken: string;
  notificationsEnabled: boolean;
};

type RegistrationInput = {
  firstName: string;
  middleInitial: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  essReferenceNumber: string;
};

type SessionState = {
  bootstrapped: boolean;
  status: SessionStatus;
  apiBaseUrl: string;
  token: string | null;
  user: SessionUser | null;
  busy: boolean;
  error: string | null;
  registrationMessage: string | null;
  lastDeviceSyncAt: string | null;
  deviceSyncError: string | null;
  bootstrap: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  register: (input: RegistrationInput) => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (values: Partial<SessionUser>) => Promise<void>;
  updateUserPhoto: (values: { file: any }) => Promise<void>;
  registerDevice: (input: DeviceRegistrationInput) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  clearRegistrationMessage: () => void;
};

function mapUser(user: BackendUser): SessionUser {
  return {
    id: user.id,
    name: user.name,
    firstName: user.first_name ?? null,
    middleInitial: user.middle_initial ?? null,
    lastName: user.last_name ?? null,
    email: user.email,
    phone: user.phone,
    dateOfBirth: user.date_of_birth ?? null,
    userType: user.user_type,
    systemRole: user.system_role,
    loginStatus: user.login_status,
    verified: Boolean(user.verified),
    blocked: Boolean(user.blocked),
    permissions: user.permissions ?? [],
    joiningDate: user.joining_date ?? null,
    profileImageUrl: user.profile_image_url ?? null,
    verificationDate: user.verification_date ?? null,
    memberProfile: user.member_profile
      ? {
          ...user.member_profile,
          addressLine1: user.member_profile.address_line_1,
          addressLine2: user.member_profile.address_line_2,
          shieldNumber: user.member_profile.shield_number,
          essNumber: user.member_profile.ess_number,
          lastSubscriptionDate: user.member_profile.last_subscription_date,
          lastSubscriptionExpireDate:
            user.member_profile.last_subscription_expire_date,
          currentSubscriptionStatus:
            user.member_profile.current_subscription_status,
          currentSubscriptionPaymentType:
            user.member_profile.current_subscription_payment_type,
          commandName: user.member_profile.command_name,
          activeMemberFlag: user.member_profile.active_member_flag,
        }
      : null,
  };
}

async function readStoredSession(): Promise<StoredSessionSnapshot | null> {
  const raw = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredSessionSnapshot;
  } catch {
    return null;
  }
}

async function writeStoredSession(
  snapshot: StoredSessionSnapshot,
): Promise<void> {
  await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(snapshot));
}

async function getOrCreateDeviceId(): Promise<string> {
  const existing = await AsyncStorage.getItem(DEVICE_ID_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const generated = `device-${Date.now()}-${Math.round(
    Math.random() * 1_000_000,
  )}`;
  await AsyncStorage.setItem(DEVICE_ID_STORAGE_KEY, generated);
  return generated;
}

function snapshotFromState(state: SessionState): StoredSessionSnapshot {
  return {
    apiBaseUrl: state.apiBaseUrl,
    token: state.token,
    user: state.user,
  };
}

export const useSessionStore = create<SessionState>((set, get) => ({
  bootstrapped: false,
  status: 'booting',
  apiBaseUrl: DEFAULT_API_BASE_URL,
  token: null,
  user: null,
  busy: false,
  error: null,
  registrationMessage: null,
  lastDeviceSyncAt: null,
  deviceSyncError: null,

  bootstrap: async () => {
    const stored = await readStoredSession();

    if (!stored) {
      set({
        bootstrapped: true,
        status: 'signed_out',
      });
      return;
    }

    set({
      apiBaseUrl: DEFAULT_API_BASE_URL,
      token: stored.token,
      user: stored.user,
      status: stored.token ? 'signed_in' : 'signed_out',
      bootstrapped: true,
    });

    if (stored.token) {
      try {
        await get().refreshUser();
      } catch {
        await get().signOut();
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
    }
  },

  signIn: async (email, password) => {
    set({ busy: true, error: null });

    try {
      const response = await apiRequest<LoginResponse>(
        {
          apiBaseUrl: get().apiBaseUrl,
        },
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
            // platform: Platform.OS === 'ios' ? 'ios' : 'android',
            // device_name: `NYPD Columbia ${Platform.OS}`,
            // device_id: await getOrCreateDeviceId(),
            // app_version: APP_VERSION,
            // os_version: String(Platform.Version),
          }),
        },
      );

      set({
        status: 'signed_in',
        token: response.token,
        user: mapUser(response.user),
        error: null,
        registrationMessage: null,
      });

      await writeStoredSession(snapshotFromState(get()));
      if (response.user.login_status === 'verified') {
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: 'MainStack' }],
        });
      } else {
        navigationRef.current?.navigate('VerificationGate');
      }
    } catch (error) {
      // console.log(error.status);
      if (error.status === 403) {
        navigationRef.current?.navigate('VerificationGate');
      } else {
        set({
          error: error instanceof Error ? error.message : 'Unable to sign in.',
        });
      }

      throw error;
    } finally {
      set({ busy: false });
    }
  },

  register: async input => {
    set({ busy: true, error: null, registrationMessage: null });

    try {
      const response = await apiRequest<RegisterResponse>(
        {
          apiBaseUrl: get().apiBaseUrl,
        },
        '/auth/register',
        {
          method: 'POST',
          body: JSON.stringify({
            first_name: input.firstName.trim(),
            middle_name: input.middleInitial?.trim() || undefined,
            last_name: input.lastName.trim(),
            email: input.email.trim().toLowerCase(),
            ess_number: input.essReferenceNumber?.trim() || undefined,
            password: input.password,
            // password_confirmation: input.passwordConfirmation,
            // platform: Platform.OS === 'ios' ? 'ios' : 'android',
            // device_name: `NYPD Columbia ${Platform.OS}`,
            // device_id: await getOrCreateDeviceId(),
            // app_version: APP_VERSION,
            // os_version: String(Platform.Version),
          }),
        },
      );

      set({
        user: mapUser(response.user),
        busy: false,
        error: null,
        registrationMessage: null, // response.message,
      });
      if (response.user.login_status !== 'verified') {
        navigationRef.current?.dispatch(
          StackActions.replace('VerificationGate'),
        );
      }
    } catch (error) {
      set({
        busy: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unable to complete registration.',
      });
      throw error;
    }
  },

  refreshUser: async () => {
    const state = get();
    if (!state.token) {
      return;
    }

    const response = await apiRequest<MeResponse>(
      {
        apiBaseUrl: state.apiBaseUrl,
        token: state.token,
      },
      '/auth/me',
    );

    set({
      // token: 'response.token',
      status: 'signed_in',
      user: mapUser(response.user),
    });

    await writeStoredSession(snapshotFromState(get()));
  },

  updateUser: async values => {
    const state = get();
    if (!state.token) {
      return;
    }
    set({ busy: true, error: null, registrationMessage: null });

    try {
      const response = await apiRequest<MeResponse>(
        {
          apiBaseUrl: state.apiBaseUrl,
          token: state.token,
        },
        '/member/profile',
        {
          method: 'POST',
          body: JSON.stringify({
            first_name: values.firstName,
            middle_name: values.middleName,
            last_name: values.lastName,
            email: values.email,
            phone_number: values.phone,
            date_of_birth: values.dateOfBirth,
          }),
        },
      );

      set({
        user: mapUser(response.user),
      });

      await writeStoredSession(snapshotFromState(get()));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Unable to update user details.',
      });
    } finally {
      set({ busy: false });
    }
  },

  updateUserPhoto: async values => {
    const state = get();
    if (!state.token) {
      return;
    }
    set({ busy: true, error: null, registrationMessage: null });
    const formData = new FormData();
    formData.append('file', values.file);
    try {
      const response = await apiRequest<MeResponse>(
        {
          apiBaseUrl: state.apiBaseUrl,
          token: state.token,
        },
        '/member/profile',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      set({
        user: mapUser(response.user),
      });

      await writeStoredSession(snapshotFromState(get()));
      navigationRef.current?.goBack();
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Unable to update user details.',
      });
    } finally {
      set({ busy: false });
    }
  },

  registerDevice: async ({ pushToken, notificationsEnabled }) => {
    const state = get();
    if (!state.token || !pushToken) {
      return;
    }

    try {
      await apiRequest<{ message: string }>(
        {
          apiBaseUrl: state.apiBaseUrl,
          token: state.token,
        },
        '/auth/device-token',
        {
          method: 'POST',
          body: JSON.stringify({
            device_name: `NYPD Columbia ${Platform.OS}`,
            device_id: await getOrCreateDeviceId(),
            platform: Platform.OS === 'ios' ? 'ios' : 'android',
            push_token: pushToken,
            app_version: APP_VERSION,
            os_version: String(Platform.Version),
            notifications_enabled: notificationsEnabled,
          }),
        },
      );

      set({
        lastDeviceSyncAt: new Date().toISOString(),
        deviceSyncError: null,
      });
    } catch (error) {
      set({
        deviceSyncError:
          error instanceof Error
            ? error.message
            : 'Unable to sync device token.',
      });
    }
  },

  signOut: async () => {
    const state = get();
    set({ busy: true });
    if (state.token) {
      try {
        await apiRequest(
          {
            apiBaseUrl: state.apiBaseUrl,
            token: state.token,
          },
          '/auth/logout',
          {
            method: 'POST',
          },
        );
      } catch {
        // Ignore logout transport failures and still clear local state.
      } finally {
        set({
          status: 'signed_out',
          token: null,
          user: null,
          error: null,
          busy: true,
          lastDeviceSyncAt: null,
          deviceSyncError: null,
        });

        await writeStoredSession(snapshotFromState(get()));
        set({ busy: false, error: null });
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
    }
  },

  clearError: () => set({ error: null }),
  clearRegistrationMessage: () => set({ registrationMessage: null }),
}));
