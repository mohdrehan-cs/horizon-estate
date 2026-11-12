import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "buy-with-horizon",
    name: "Buy with Horizon",
    description:
      "A research-led search that starts with your budget, commute and five-year plan — not a list of sponsored projects.",
    price: "Buyer representation from 1%",
    icon: "home",
    features: [
      "Requirement and budget mapping",
      "Shortlist of three micro-markets",
      "RERA and title verification",
      "Site visits with an area specialist",
      "Negotiation and price benchmarking",
      "Loan and registration coordination",
    ],
  },
  {
    slug: "sell-with-horizon",
    name: "Sell with Horizon",
    description:
      "A calm, well-marketed sale with honest pricing, professional media and a managed negotiation.",
    price: "1.5% success fee",
    icon: "key",
    features: [
      "Data-backed valuation",
      "Professional photography and floor plans",
      "Listing across Horizon and partner portals",
      "Qualified buyer screening",
      "Site visit management",
      "Negotiation and closure support",
    ],
  },
  {
    slug: "rental-management",
    name: "Rental management",
    description:
      "End-to-end letting and management for owners who want reliable tenants and fewer midnight calls.",
    price: "From ₹3,500 / month",
    icon: "building",
    features: [
      "Tenant sourcing and screening",
      "Rent benchmarking",
      "Lease drafting and registration",
      "Move-in inspection report",
      "Rent collection and reminders",
      "Repairs and vendor coordination",
    ],
  },
  {
    slug: "legal-due-diligence",
    name: "Legal & due diligence",
    description:
      "Independent title, RERA and encumbrance checks before you commit your savings.",
    price: "From ₹18,000",
    icon: "scale",
    features: [
      "Chain of title review",
      "RERA registration verification",
      "Encumbrance and mutation checks",
      "Society and authority dues review",
      "Sale agreement review",
      "Registration support",
    ],
  },
  {
    slug: "home-loan-advisory",
    name: "Home loan advisory",
    description:
      "Unbiased loan comparison and eligibility planning across public and private lenders.",
    price: "No advisory fee",
    icon: "calculator",
    features: [
      "Eligibility and affordability review",
      "Lender comparison",
      "Documentation checklist",
      "Processing and sanction follow-up",
      "Balance transfer review",
      "EMI and prepayment planning",
    ],
  },
  {
    slug: "nri-concierge",
    name: "NRI concierge",
    description:
      "A single point of contact for overseas buyers, from virtual site visits to registration and rental.",
    price: "Custom mandate",
    icon: "globe",
    features: [
      "Video site visits",
      "Power of attorney guidance",
      "FEMA and remittance coordination",
      "Tax and repatriation liaison",
      "Property management",
      "Quarterly portfolio reporting",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const pricingFaqs = [
  {
    question: "Do you charge buyers a fee?",
    answer:
      "For resale purchases, our buyer representation fee starts at 1% of the transaction value. For new launches, the developer typically pays the channel commission, so there is no separate buyer fee. We disclose every fee in writing before you engage us.",
  },
  {
    question: "What does the listing plan include?",
    answer:
      "Every paid plan includes a verified listing, enquiry routing, performance reporting and access to our listing dashboard. Signature and Prime plans add featured placement, professional media credits and priority lead routing.",
  },
  {
    question: "Can I cancel a plan?",
    answer:
      "Yes. Monthly plans can be cancelled at any time and remain active until the end of the billing cycle. Annual plans are pro-rated on cancellation after the first 90 days.",
  },
  {
    question: "Do you manage rentals outside Delhi NCR?",
    answer:
      "Our managed rental service currently covers Delhi, Noida and Greater Noida. For other cities, we can introduce a vetted local partner but we do not directly manage the asset.",
  },
  {
    question: "Is the demo payment real?",
    answer:
      "No. This is a demonstration site. Payments and authentication are simulated, no card details are collected, and no listing or subscription is actually created.",
  },
];
