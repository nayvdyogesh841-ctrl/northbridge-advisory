import type {
  Differentiator,
  FaqItem,
  NavLink,
  ProcessStep,
  Service,
  Stat,
  Testimonial,
} from "@/types";

export const site = {
  name: "Northbridge Advisory",
  shortName: "Northbridge",
  tagline: "Chartered Accountants & Business Advisors",
  description:
    "Northbridge Advisory is a firm of Chartered Accountants offering tax planning, GST compliance, audit & assurance, company registration, and business advisory for growing companies.",
  email: "hello@northbridge.co",
  phone: "+91 98765 43210",
  address: "Level 8, Northbridge House, Bandra Kurla Complex, Mumbai 400051",
  url: "https://northbridge.co",
  // Professional credentials — the details a serious client checks for.
  firmRegNo: "ICAI FRN 118472W",
  gstin: "27AABCN1429R1ZK",
  hours: "Mon–Fri, 10:00–19:00 IST",
};

export const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const clients: string[] = [
  "Meridian Foods",
  "Aster Textiles",
  "Volt Mobility",
  "Harbour Retail",
  "Cedar Health",
  "Kinetic Labs",
  "Northwind Logistics",
];

export const heroStats: Stat[] = [
  { value: "18+", label: "Years in practice" },
  { value: "600+", label: "Businesses served" },
  { value: "₹400Cr+", label: "Filings managed" },
  { value: "100%", label: "ICAI-registered team" },
];

// Compact service tags surfaced in the hero so the "what" is legible in seconds.
export const heroServiceTags: string[] = [
  "Tax Planning",
  "GST Compliance",
  "Audit & Assurance",
  "Company Registration",
  "Business Advisory",
];

// Slim trust bar below the hero — qualitative assurances that complement the
// numeric stat band above (no repetition of the same figures).
export const trustSignals: string[] = [
  "ICAI-registered Chartered Accountants",
  "Fixed, transparent fees",
  "Deadlines we always keep",
  "A single dedicated advisor",
];

export const advisor = {
  name: "CA Aditya Rao",
  credential: "FCA · Managing Partner",
  image: "/advisor.jpg",
  eyebrow: "Meet your advisor",
  heading: "A Chartered Accountant who knows your business by name",
  body: "Every Northbridge engagement is led personally by a qualified Chartered Accountant — not handed to a rotating desk. You get one accountable partner across tax, GST, audit, and advisory, who understands your numbers as well as you do.",
  points: [
    "Fellow member of the ICAI (FCA)",
    "18+ years advising Indian startups & SMEs",
    "Direct line — no call centres, no handoffs",
  ],
};

export const services: Service[] = [
  {
    id: "tax-planning",
    title: "Tax Planning",
    description:
      "Year-round direct-tax strategy that keeps your liability lawful, lean, and predictable — for the business and its promoters.",
    points: [
      "Corporate & personal income tax",
      "Advance tax & capital gains planning",
      "TDS structuring and assessments",
    ],
    featured: true,
  },
  {
    id: "gst-compliance",
    title: "GST Compliance",
    description:
      "End-to-end GST from registration to returns and reconciliations, so input credits are never left on the table.",
    points: [
      "Monthly & annual return filing",
      "GSTR-2B reconciliation",
      "Notices, refunds & appeals",
    ],
  },
  {
    id: "audit-assurance",
    title: "Audit & Assurance",
    description:
      "Statutory, internal, and tax audits delivered on time with clear findings your board and bankers can trust.",
    points: [
      "Statutory & tax audit",
      "Internal controls review",
      "Due diligence support",
    ],
  },
  {
    id: "company-registration",
    title: "Company Registration",
    description:
      "Incorporate the right structure the right way — from name approval to your first board resolution.",
    points: [
      "Pvt Ltd, LLP & OPC setup",
      "ROC & MCA filings",
      "Licenses & startup registrations",
    ],
  },
  {
    id: "business-advisory",
    title: "Business Advisory",
    description:
      "A finance partner on call — cash-flow, MIS, funding readiness, and the numbers behind every big decision.",
    points: [
      "Virtual CFO & MIS reporting",
      "Fund-raising & valuation support",
      "Budgeting and unit economics",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery call",
    description:
      "We understand your numbers, obligations, and goals in a focused, no-obligation consultation.",
  },
  {
    step: "02",
    title: "Tailored plan",
    description:
      "You receive a clear scope, timeline, and fixed fee — no surprises, no jargon, no retainers you don't need.",
  },
  {
    step: "03",
    title: "Ongoing partnership",
    description:
      "We execute, file, and advise on schedule, with a dedicated Chartered Accountant who knows your business.",
  },
];

export const differentiators: Differentiator[] = [
  {
    title: "ICAI-qualified team",
    description:
      "Every engagement is led by a Chartered Accountant registered with the Institute of Chartered Accountants of India.",
  },
  {
    title: "Fixed, transparent fees",
    description:
      "Scoped pricing agreed upfront. You always know what you're paying and precisely what you get for it.",
  },
  {
    title: "Deadlines we keep",
    description:
      "Statutory dates are non-negotiable. Our workflow and reminders mean you never file late or pay a penalty.",
  },
  {
    title: "One point of contact",
    description:
      "A single dedicated advisor who understands your business — not a call centre or a rotating desk.",
  },
];

export const stats: Stat[] = [
  { value: "600+", label: "Businesses advised" },
  { value: "98%", label: "Client retention" },
  { value: "18+", label: "Years of practice" },
  { value: "0", label: "Late-filing penalties" },
];

export const testimonials: Testimonial[] = [
  {
    result: "3 years of GST cleaned up in one quarter",
    quote:
      "Northbridge restructured our tax position and cleaned up three years of GST in a single quarter. We finally trust our numbers.",
    name: "Priya Nair",
    role: "Founder",
    company: "Cedar Health",
  },
  {
    result: "Every filing submitted ahead of deadline",
    quote:
      "The most responsive CA firm we've worked with. Filings are early, advice is plain-English, and nothing slips through the cracks.",
    name: "Rohan Mehta",
    role: "CFO",
    company: "Volt Mobility",
  },
  {
    result: "Incorporation to first audit, one advisor",
    quote:
      "They set up our company, our books, and our first audit. Having one advisor across all of it saved us months.",
    name: "Anita Deshpande",
    role: "Managing Director",
    company: "Aster Textiles",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What size of business do you work with?",
    answer:
      "From first-time founders incorporating a company to established firms with ₹100Cr+ turnover. Our engagement is scoped to your stage, so you only pay for the depth of support you actually need.",
  },
  {
    question: "How is your fee structured?",
    answer:
      "We agree a fixed fee against a clear scope before any work begins. Recurring compliance is billed as a predictable monthly or annual retainer; one-off projects are quoted upfront. No hidden hourly surprises.",
  },
  {
    question: "Can you take over from our current accountant?",
    answer:
      "Yes. We handle the full transition — obtaining records, reconciling open items, and coordinating with your previous advisor — so nothing is missed and no deadline is disrupted.",
  },
  {
    question: "Do you work with clients outside Mumbai?",
    answer:
      "Absolutely. We serve clients across India and abroad through secure document sharing and video consultations. Most of our engagements run entirely remotely.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "After the discovery call you'll have a proposal within two business days. Once approved, onboarding typically completes within a week, sooner when a statutory deadline is approaching.",
  },
];
