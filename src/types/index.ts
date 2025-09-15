// Contentstack content types
export interface ContentstackEntry {
  uid: string;
  locale: string;
  _version: number;
  ACL: Record<string, any>;
  _in_progress: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  publish_details: {
    time: string;
    user: string;
    environment: string;
    locale: string;
  };
  url: string;
}

// Tour content type
export interface Tour extends ContentstackEntry {
  title: string;
  description: string;
  country: string;
  duration: string;
  price: number;
  tags: string[];
}

// FAQ content type
export interface FAQ extends ContentstackEntry {
  title: string;
  question: string;
  answers: string;
  tags: string[];
}

// Booking form data
export interface BookingFormData {
  tourId: string;
  tourTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelDate: string;
  travelers: number;
  specialRequests?: string;
}

// API response types
export interface ContentstackResponse<T> {
  entries: T[];
  count: number;
}

// Component props
export interface TourCardProps {
  tour: Tour;
  onBook: (tour: Tour) => void;
}

export interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

export interface BookingFormProps {
  tour: Tour;
  onSubmit: (data: BookingFormData) => void;
  isLoading?: boolean;
}
