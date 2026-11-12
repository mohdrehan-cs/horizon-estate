import type { Project } from "@/types";
import { gallery, img } from "./images";

export const projects: Project[] = [
  {
    slug: "aurora-heights",
    name: "Aurora Heights",
    developer: "Meridian Group",
    city: "noida",
    locality: "sector-150",
    address: "Sector 150, Noida 201310",
    priceRange: "₹3.4 Cr – ₹5.8 Cr",
    priceFrom: 34000000,
    configurations: ["3 BHK", "4 BHK", "4 BHK Penthouse"],
    possession: "Dec 2026",
    reraNumber: "UPRERAPRJ543210",
    verified: true,
    featured: true,
    images: gallery.modernVilla,
    description:
      "Aurora Heights is a low-density residential enclave in Sector 150, arranged around a two-acre central green. Four towers of 24 storeys hold only four homes per floor, each with a private lift lobby and deep balconies. The project sits minutes from the Noida–Greater Noida Expressway and the proposed Jewar Airport corridor.",
    amenities: [
      "65,000 sq ft clubhouse",
      "Temperature-controlled pool",
      "Tennis and pickleball courts",
      "Forest walk and yoga deck",
      "Concierge and valet",
      "EV charging in basement",
      "Kids' discovery zone",
      "Co-working lounge",
    ],
    units: "268 residences across 4 towers",
    lat: 28.4419,
    lng: 77.5099,
    highlights: [
      "Only 4 homes per floor",
      "2-acre central green",
      "Private lift lobbies",
      "IGBC Gold pre-certified",
    ],
    agentId: "sanya-kapoor",
    brochure: "Aurora Heights — Project Brochure",
  },
  {
    slug: "northline-greens",
    name: "Northline Greens",
    developer: "Northline Developers",
    city: "noida",
    locality: "noida-extension",
    address: "Noida Extension, Greater Noida West 201009",
    priceRange: "₹72 L – ₹1.28 Cr",
    priceFrom: 7200000,
    configurations: ["2 BHK", "3 BHK", "3 BHK + Study"],
    possession: "Jun 2027",
    reraNumber: "UPRERAPRJ982145",
    verified: true,
    featured: true,
    images: gallery.cityApartment,
    description:
      "Northline Greens brings a calmer, greener format to Noida Extension. Three towers surround a landscaped podium with a 400-metre walking loop, a toddlers' garden and a residents' club. Efficient 2 and 3 BHK layouts are priced for first-time buyers, with a construction-linked plan and tied-up home loans.",
    amenities: [
      "Podium clubhouse",
      "400 m walking loop",
      "Swimming pool with deck",
      "Fitness studio",
      "Toddlers' garden",
      "EV-ready parking",
      "Multipurpose hall",
      "Retail plaza",
    ],
    units: "612 apartments across 3 towers",
    lat: 28.57,
    lng: 77.45,
    highlights: [
      "Construction-linked plan",
      "Tied-up home loans",
      "EV-ready basement",
      "Schools within 2 km",
    ],
    agentId: "sanya-kapoor",
    brochure: "Northline Greens — Project Brochure",
  },
  {
    slug: "crescent-park",
    name: "Crescent Park",
    developer: "Crescent Living",
    city: "greater-noida",
    locality: "knowledge-park",
    address: "Knowledge Park V, Greater Noida 201310",
    priceRange: "₹85 L – ₹1.65 Cr",
    priceFrom: 8500000,
    configurations: ["3 BHK", "4 BHK", "Villa"],
    possession: "Ready to move",
    reraNumber: "UPRERAPRJ660418",
    verified: true,
    featured: true,
    images: gallery.gardenVilla,
    description:
      "Crescent Park is a completed low-rise community in Knowledge Park V, built around a crescent-shaped park. Apartments and villas share a clubhouse, a 25-metre pool and a residents' cafe. The location places universities, the Expo Centre and the Yamuna Expressway within easy reach, with the Jewar Airport as the long-term catalyst.",
    amenities: [
      "Crescent central park",
      "25 m lap pool",
      "Residents' cafe",
      "Indoor games room",
      "Amphitheatre",
      "Jogging track",
      "Solar common areas",
      "Visitor parking",
    ],
    units: "184 homes, ready to move",
    lat: 28.451,
    lng: 77.535,
    highlights: [
      "Ready to move",
      "Low-rise community",
      "Crescent park",
      "Airport corridor",
    ],
    agentId: "arjun-verma",
    brochure: "Crescent Park — Project Brochure",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);

export const projectImages = {
  aurora: img.construction,
  northline: gallery.cityApartment[0],
  crescent: gallery.gardenVilla[0],
};
