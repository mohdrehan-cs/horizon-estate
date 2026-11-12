import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Horizon Estates would collect, use and protect personal information across its property marketplace and advisory services.",
};

const sections: LegalSection[] = [
  {
    title: "Scope of this policy",
    body: [
      "This policy describes how Horizon Estates would handle personal information collected through this website and our advisory services across Delhi, Noida and Greater Noida. It applies to buyers, sellers, tenants, landlords, agents and developers who interact with us.",
      "This demonstration site does not operate a live database. Forms, saved homes and demo sessions are simulated in your browser and are not transmitted to us or stored on a server.",
    ],
  },
  {
    title: "Information we would collect",
    body: [
      "We would collect only the information needed to respond to an enquiry, provide advice or operate a listing. This may include:",
    ],
    bullets: [
      "Contact details such as your name, phone number, email address and preferred language.",
      "Property information you share when requesting a valuation or listing a home.",
      "Search preferences, budget range, localities and timeline.",
      "Communications with our advisors, including call notes and WhatsApp messages.",
      "Technical data such as device type, browser and pages visited, collected through cookies and analytics.",
    ],
  },
  {
    title: "How we would use it",
    body: [
      "We would use your information to respond to enquiries, shortlist properties, arrange site visits, prepare valuations, coordinate legal and loan processes, and manage listings and tenancies.",
      "Where you have opted in, we would send relevant new listings, market notes and service updates. You can unsubscribe at any time. We do not sell personal information or resell enquiries to unrelated brokers.",
    ],
  },
  {
    title: "Cookies and analytics",
    body: [
      "The live site would use essential cookies to keep you signed in and remember saved searches, and analytics cookies to understand which pages and localities are useful. Analytics data would be aggregated wherever possible.",
      "You can control cookies through your browser settings. Blocking essential cookies may affect account, saved-homes and comparison features.",
    ],
  },
  {
    title: "Sharing and disclosure",
    body: [
      "We would share information only where it is necessary to deliver the service you asked for — for example, with a property owner when you request a site visit, or with a lender, lawyer or registration agent you have chosen to engage.",
      "We may use vetted service providers for hosting, communications, analytics and payments. They would be bound by confidentiality and data-processing obligations. We may disclose information where required by law or to protect our legal rights.",
    ],
  },
  {
    title: "Retention and security",
    body: [
      "We would retain enquiry records for as long as needed to provide the service and meet legal, tax and regulatory obligations, then delete or anonymise them. Listing and transaction records may be retained for statutory periods.",
      "We would use access controls, encryption in transit and staff confidentiality commitments. No system is completely secure; please avoid sending sensitive documents such as bank statements or identity proofs through unverified channels.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "Subject to applicable law, you may request access to the personal information we hold about you, ask for corrections, withdraw consent for marketing, or request deletion where there is no overriding legal obligation to retain it.",
      "To exercise these rights, write to us using the contact details below. We may need to verify your identity before acting on a request.",
    ],
  },
  {
    title: "Children's privacy",
    body: [
      "Our services are intended for adults. We do not knowingly collect personal information from anyone under 18. If you believe a minor has provided information, please contact us and we will delete it.",
    ],
  },
  {
    title: "Changes and contact",
    body: [
      "We may update this policy as our services evolve. The revised version would be published on this page with a new update date.",
      "For privacy questions, contact hello@horizonestates.in or write to 3rd Floor, Tower B, Sector 18, Noida, Uttar Pradesh 201301.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      kind="Privacy"
      title="Your information, handled with care."
      intro="A plain-language summary of what a live Horizon Estates site would collect, why it would collect it and the choices you would have."
      updated="12 November 2026"
      sections={sections}
    />
  );
}
