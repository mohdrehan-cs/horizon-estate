import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "Terms governing use of the Horizon Estates website, property listings and advisory services in Delhi, Noida and Greater Noida.",
};

const sections: LegalSection[] = [
  {
    title: "About these terms",
    body: [
      "These terms govern your use of the Horizon Estates website and demo marketplace. By browsing the site you agree to them. If you do not agree, please stop using the site.",
      "This is a demonstration website. Listings, prices, agents, projects, reviews and dashboards are illustrative. Nothing on this site constitutes a live offer, contract or professional engagement.",
    ],
  },
  {
    title: "Use of the site",
    body: [
      "You may browse the site, save properties, use the calculators and submit demo forms for personal, non-commercial purposes. You must not attempt to disrupt the site, scrape it at scale, upload malicious code or use it to mislead another person.",
      "You are responsible for the accuracy of information you provide in a demo form. Do not enter real identity documents, bank details or other sensitive information into this demonstration environment.",
    ],
  },
  {
    title: "Listings and information accuracy",
    body: [
      "Property information is drawn from mock data prepared for this demo. In a live service, listings would be reviewed for accuracy, but measurements, prices, availability and approvals can change and should be independently verified.",
      "RERA registration numbers shown are illustrative. Before committing to any purchase, verify the project registration, title, approvals and dues with the relevant authority and a qualified legal professional.",
    ],
  },
  {
    title: "No offer or professional advice",
    body: [
      "Nothing on this site is an offer to sell or a solicitation to buy property. Calculator outputs, valuations, locality notes and market commentary are estimates for general guidance only.",
      "We are not your lawyer, tax adviser or financial adviser unless we have agreed a separate written engagement. You should obtain independent advice before signing any property document or making a payment.",
    ],
  },
  {
    title: "Accounts and demo sessions",
    body: [
      "Sign-in is simulated. A demo session does not create a real account, does not authenticate your identity and resets when you refresh or close the page. Do not reuse a real password.",
      "In a live service, you would be responsible for keeping your credentials confidential and for activity under your account. You would need to tell us promptly about any unauthorised use.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "The Horizon Estates name, brand, editorial copy, layout and original graphics are protected by applicable intellectual property laws. You may view and print pages for personal use, but you may not republish, sell or systematically extract the content without written permission.",
      "Photographs used in this demo are sourced from third-party image libraries and remain subject to their respective licences. Property images are illustrative and may not depict the actual property described.",
    ],
  },
  {
    title: "Third-party links and services",
    body: [
      "The site may link to maps, messaging services, lenders, legal providers or other third-party websites. We do not control those services and are not responsible for their content, availability or privacy practices.",
      "Any interaction with a third party is between you and that party. Commercial terms should be confirmed directly with them in writing.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "To the extent permitted by law, Horizon Estates would not be liable for indirect or consequential loss arising from use of this site, reliance on demo content, or interruption of the service.",
      "Nothing in these terms limits liability that cannot lawfully be limited. In a live engagement, the specific scope, fees and liabilities would be set out in a separate written agreement.",
    ],
  },
  {
    title: "Governing law and contact",
    body: [
      "These terms would be governed by the laws of India, with courts in Gautam Buddh Nagar, Uttar Pradesh having jurisdiction over disputes, subject to any mandatory consumer protections.",
      "For questions about these terms, contact hello@horizonestates.in or write to 3rd Floor, Tower B, Sector 18, Noida, Uttar Pradesh 201301.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      kind="Terms"
      title="The ground rules, in plain language."
      intro="What this demonstration site is, how it may be used, and the limits of the information it presents."
      updated="12 November 2026"
      sections={sections}
    />
  );
}
