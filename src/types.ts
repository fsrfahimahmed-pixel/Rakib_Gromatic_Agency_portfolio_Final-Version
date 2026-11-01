export type ServiceType = 'design' | 'marketing' | 'both' | 'unsure';

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  brief: string;
  direction: string;
  deliverables: string[];
  service: ServiceType;
  filterCategories: ('identity' | 'design' | 'digital')[];
  cardLayout: 'wide' | 'narrow';
  offset?: boolean;
  delay?: string;
  image?: {
    src: string;
    srcset: string;
    sizes: string;
    alt: string;
  };
}

export interface SiteSocial {
  label: string;
  url: string;
}

export interface SiteConfig {
  formEndpoint: string;
  contactEmail: string;
  phone: string;
  whatsapp: string;
  defaultCurrency: string;
  socials: SiteSocial[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  service: ServiceType | '';
  serviceLabel: string;
  description: string;
  budget: string;
  currency: string;
  budgetUnsure: boolean;
  timeline: string;
  designDeliverables: string[];
  brandStatus: string;
  platforms: string[];
  campaignStatus: string;
  goals: string;
  unclearNeeds: string;
  contactMethod: 'Email' | 'WhatsApp' | 'Phone';
  phone: string;
}

export type FilterCategory = 'all' | 'identity' | 'design' | 'digital';

export type OrbitMode = 'identity' | 'growth';
