import type { ImageSourcePropType } from 'react-native';

export type SessionUser = {
  id: string;
  name: string;
  firstName: string | null;
  middleInitial: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  userType: string | null;
  systemRole: string | null;
  loginStatus: string | null;
  verified: boolean;
  blocked: boolean;
  dateOfBirth: string | null;
  joiningDate: string | null;
  verificationDate: string | null;
  profileImageUrl: string | null;
  permissions: string[];
  memberProfile: {
    addressLine1: string | null;
    addressLine2: string | null;
    shieldNumber: string | null;
    essNumber: string | null;
    current_subscription_status: string | null;
    last_subscription_date: string | null;
    last_subscription_expire_date: string | null;
    lastSubscriptionDate: string | null;
    lastSubscriptionExpireDate: string | null;
    currentSubscriptionStatus: string | null;
    currentSubscriptionPaymentType: string | null;
    commandName: string | null;
    activeMemberFlag: boolean | null;
  } | null;
};

export type StoredSessionSnapshot = {
  apiBaseUrl: string;
  token: string | null;
  user: SessionUser | null;
};

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  attributes: string;
  // image?: ImageSourcePropType;
  image?: string;
  category: string;
  quantity?: number;
};
