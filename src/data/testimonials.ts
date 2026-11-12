import type { Testimonial } from "@/types";
import { portraits } from "./images";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya & Vikram Sethi",
    role: "Bought a 3 BHK builder floor",
    city: "Greater Kailash, Delhi",
    quote:
      "Aditi talked us out of two properties we were emotionally attached to, and then found the one that actually made sense. That kind of honesty is rare in this market.",
    avatar: portraits.meera,
    rating: 5,
  },
  {
    id: "t2",
    name: "Rahul Bansal",
    role: "First-time buyer",
    city: "Noida Extension",
    quote:
      "I had a fixed budget and a lot of confusion about charges. The team walked me through stamp duty, GST and the loan math before I even shortlisted a flat.",
    avatar: portraits.rohan,
    rating: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Relocated from Bengaluru",
    city: "Sector 137, Noida",
    quote:
      "Meera understood exactly what a rental needed to feel like home for a family moving cities. She shortlisted four flats and we picked one in a weekend.",
    avatar: portraits.aditi,
    rating: 5,
  },
  {
    id: "t4",
    name: "Col. R. S. Mehta (Retd.)",
    role: "Sold an independent house",
    city: "Punjabi Bagh, Delhi",
    quote:
      "The valuation was realistic, the photography was excellent, and the negotiation was handled without drama. We closed above the price I expected.",
    avatar: portraits.kabir,
    rating: 5,
  },
  {
    id: "t5",
    name: "Sneha & Karan Malhotra",
    role: "Bought a 4 BHK in Sector 150",
    city: "Noida",
    quote:
      "Sanya sent us a comparison sheet with delivery timelines, RERA numbers and resale trends. It was the first time a broker had shown us the downside as clearly as the upside.",
    avatar: portraits.sanya,
    rating: 5,
  },
  {
    id: "t6",
    name: "Devendra Yadav",
    role: "Invested in a YEIDA plot",
    city: "Greater Noida",
    quote:
      "Arjun was patient with a first-time land buyer. He explained the difference between the airport ring and the established sectors without overselling the hype.",
    avatar: portraits.arjun,
    rating: 4,
  },
  {
    id: "t7",
    name: "Farah Khan",
    role: "Leased a commercial office",
    city: "Nehru Place, Delhi",
    quote:
      "Kabir found us a floor that fit our team and our budget, and negotiated a lease that protected us on exit. Straightforward, no surprises.",
    avatar: portraits.naina,
    rating: 5,
  },
  {
    id: "t8",
    name: "Nikhil & Ritu Arora",
    role: "Bought a 3 BHK in Alpha",
    city: "Greater Noida",
    quote:
      "We wanted a ready home near my parents and a metro. The team was clear about which sectors would work and which would not. We moved in within six weeks.",
    avatar: portraits.vikram,
    rating: 5,
  },
];
