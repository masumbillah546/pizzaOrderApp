export type UserType = {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  profileImage?: string;
  createdAt: string;
};

export type TechnicianType = {
  id: string;
  fullName: string;
  phoneNumber: string;
  profileImage?: string;
  rating: number;
  specialty: string[];
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  isAvailable: boolean;
};

export type RepairServiceType = {
  id: string;
  title: string;
  icon: string;
  description: string;
  basePrice: number;
};

export type RepairStatusType = 
  | 'pending' 
  | 'accepted' 
  | 'en_route' 
  | 'arrived' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export type RepairRequestType = {
  id: string;
  customerId: string;
  serviceType: RepairServiceType;
  technicianId?: string;
  technician?: TechnicianType;
  status: RepairStatusType;
  description: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  images?: string[];
  estimatedCost?: number;
  finalCost?: number;
  paymentStatus?: 'pending' | 'completed' | 'failed';
  rating?: number;
  review?: string;
  createdAt: string;
  updatedAt: string;
  eta?: number; // estimated time of arrival in minutes
};

export interface MessageType {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export type TechnicianNotificationEventType = {
  user_notification_event_id: string;
  admin_notification_campaign_id?: string | null;
  notification_type: string;
  title: string;
  body: string;
  rich_body_html?: string | null;
  cover_image_url?: string | null;
  action_url?: string | null;
  action_label?: string | null;
  delivery_status?: string | null;
  channels?: string[];
  payload?: Record<string, unknown>;
  read_at?: string | null;
  visible_from_at?: string | null;
  visible_until_at?: string | null;
  archive_after_at?: string | null;
  archived_at?: string | null;
  created_at?: string | null;
};

export type TechnicianJobContactType = {
  contact_number?: string | null;
};

export type TechnicianJobLocationType = {
  service_method?: string | null;
  pickup_address?: string | null;
  city?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
};

export type TechnicianJobAttachmentType = {
  id: string;
  file_url: string;
  file_type?: string | null;
  created_at?: string | null;
};

export type TechnicianJobStatusHistoryType = {
  id: string;
  status: string;
  changed_by?: string | null;
  created_at?: string | null;
};

export type TechnicianJobSettlementType = {
  ticket_settlement_id: string;
  technician_offer_id: string | null;
  quoted_price_amount: number | null;
  travel_surcharge_amount: number;
  customer_payable_amount: number;
  currency: string;
  platform_fee_rate_pct: number;
  platform_fee_amount: number;
  technician_net_earning_amount: number;
  payment_status: 'pending' | 'paid' | string;
  payment_method_code: string | null;
  payment_reference: string | null;
  payment_recorded_at: string | null;
  service_completed_at: string | null;
  warranty_enabled: boolean;
  warranty_duration_days: number | null;
  warranty_starts_at: string | null;
  warranty_expires_at: string | null;
  warranty_status: string;
  warranty_days_remaining: number | null;
  warranty_days_passed: number | null;
  selected_offer_snapshot?: Record<string, unknown>;
};

export type TechnicianJobReviewType = {
  ticket_review_id: string;
  rating: number;
  review_text: string | null;
  submitted_at: string | null;
};

export type TechnicianEarningItemType = {
  ticket_id: string;
  ticket_number: string;
  status: string;
  device_category: string | null;
  device_type: string | null;
  issue_type: string | null;
  city: string | null;
  settlement: TechnicianJobSettlementType | null;
  review: TechnicianJobReviewType | null;
  created_at: string | null;
  updated_at: string | null;
};

export type TechnicianEarningsResultType = {
  items: TechnicianEarningItemType[];
  summary: {
    total_paid_jobs: number;
    gross_revenue: number;
    platform_fee_total: number;
    net_earning_total: number;
  };
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type TechnicianJobType = {
  id: string;
  ticket_number?: string | null;
  client_id?: string | null;
  assigned_technician_id?: string | null;
  active_match_run_id?: string | null;
  device_category?: string | null;
  device_type?: string | null;
  brand?: string | null;
  model?: string | null;
  issue_type?: string | null;
  issue_description?: string | null;
  service_method?: string | null;
  pickup_address?: string | null;
  city?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  contact_number?: string | null;
  priority?: string | null;
  service_timing?: string | null;
  scheduled_at?: string | null;
  original_ticket_id?: string | null;
  is_warranty_claim?: boolean;
  status?: string | null;
  cancelled_by?: string | null;
  cancel_reason?: string | null;
  communication_unlocked?: boolean;
  customer_contact?: TechnicianJobContactType | null;
  service_location?: TechnicianJobLocationType | null;
  settlement?: TechnicianJobSettlementType | null;
  review?: TechnicianJobReviewType | null;
  attachments?: TechnicianJobAttachmentType[];
  status_history?: TechnicianJobStatusHistoryType[];
  created_at?: string | null;
  updated_at?: string | null;
};

// 2. Response interface
export interface ApiResponse {
  status: number;
  message?: string;
  json: () => Promise<any>; // Simplified, can be improved
  [key: string]: any;
}

// 3. Custom error type
export interface ApiError extends Error {
  name: string;
  response?: ApiResponse;
}
