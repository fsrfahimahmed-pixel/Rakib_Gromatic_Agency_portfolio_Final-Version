import { SiteConfig, ServiceType } from '../types';

export const SITE_CONFIG: SiteConfig = {
  formEndpoint: "", // CORS-enabled endpoint supplied by form service
  contactEmail: "hello@glomatic.space",
  phone: "+1 (555) 019-2834",
  whatsapp: "15550192834", // Digits with country code; no plus sign required
  defaultCurrency: "USD",
  socials: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "Behance", url: "https://behance.net" }
  ]
};

export const SERVICE_LABELS: Record<ServiceType, string> = {
  design: "Graphic Design & Brand Identity",
  marketing: "Digital Marketing & Growth",
  both: "Both — Brand Identity and Digital Marketing",
  unsure: "Not Sure Yet"
};
