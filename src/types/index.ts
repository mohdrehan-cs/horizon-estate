export type CitySlug = "delhi" | "noida" | "greater-noida";

export type ListingType = "sale" | "rent";

export type PropertyType =
  | "Apartment"
  | "Builder Floor"
  | "Villa"
  | "Independent House"
  | "Plot"
  | "Commercial"
  | "PG";

export type Furnishing = "Unfurnished" | "Semi-furnished" | "Fully furnished";

export type Possession = "Ready to move" | "Under construction" | "New launch";

export type Facing =
  | "East"
  | "West"
  | "North"
  | "South"
  | "North-East"
  | "North-West"
  | "South-East"
  | "South-West";

export type Authority =
  | "DDA"
  | "CGHS"
  | "MCD"
  | "Noida Authority"
  | "Greater Noida Authority"
  | "YEIDA"
  | "Private";

export type Role = "buyer" | "seller" | "admin";

export interface Locality {
  slug: string;
  name: string;
  city: CitySlug;
  image: string;
  avgPrice: string;
  priceTrend: string;
  rentalYield: string;
  description: string;
  connectivity: string;
  metro: string;
  highlights: string[];
  landmarks: string[];
  lat: number;
  lng: number;
}

export interface City {
  slug: CitySlug;
  name: string;
  state: string;
  tagline: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  localities: Locality[];
  highlights: string[];
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  agency: string;
  role: string;
  city: CitySlug;
  areas: string[];
  experience: string;
  rera: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  reviews: number;
  listings: number;
  deals: string;
  bio: string;
  languages: string[];
  verified: boolean;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PropertyType;
  listingType: ListingType;
  city: CitySlug;
  locality: string;
  address: string;
  price: number;
  maintenance?: number;
  deposit?: number;
  brokerage?: string;
  bhk?: number;
  bathrooms: number;
  balconies?: number;
  carpetArea?: number;
  builtupArea: number;
  areaUnit: "sq ft" | "sq yd" | "sq m";
  floor?: number;
  totalFloors?: number;
  facing?: Facing;
  age?: string;
  furnishing: Furnishing;
  possession: Possession;
  authority?: Authority;
  ownership: "Freehold" | "Leasehold";
  transaction: "Resale" | "New booking" | "DDA scheme";
  reraNumber?: string;
  verified: boolean;
  featured: boolean;
  isNew?: boolean;
  amenities: string[];
  images: string[];
  lat: number;
  lng: number;
  metro: { station: string; distance: string; line: string };
  agentId: string;
  postedAt: string;
  views: number;
  saves: number;
  highlights: string[];
  nearby: { name: string; type: string; distance: string }[];
  priceHistory?: { date: string; price: number; event: string }[];
  projectId?: string;
}

export interface Project {
  slug: string;
  name: string;
  developer: string;
  city: CitySlug;
  locality: string;
  address: string;
  priceRange: string;
  priceFrom: number;
  configurations: string[];
  possession: string;
  reraNumber: string;
  verified: boolean;
  featured: boolean;
  images: string[];
  description: string;
  amenities: string[];
  units: string;
  lat: number;
  lng: number;
  highlights: string[];
  agentId: string;
  brochure: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  content: { heading?: string; body: string[] }[];
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface Service {
  slug: string;
  name: string;
  description: string;
  price: string;
  icon: string;
  features: string[];
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  listings: string;
  featured: string;
  leads: string;
  popular?: boolean;
  features: string[];
}

export interface Enquiry {
  id: string;
  propertyTitle: string;
  name: string;
  phone: string;
  status: "New" | "Contacted" | "Qualified" | "Closed";
  date: string;
  source: string;
  assignedTo: string;
}

export interface FilterState {
  city: string;
  locality: string;
  type: string;
  bhk: string;
  minPrice: string;
  maxPrice: string;
  possession: string;
  furnishing: string;
  verified: boolean;
  rera: boolean;
  amenities: string[];
  minArea: string;
  facing: string;
  authority: string;
  sort: string;
}
