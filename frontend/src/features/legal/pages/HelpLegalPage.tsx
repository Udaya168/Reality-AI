import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, FileText, Scale, HelpCircle, ChevronDown,
  Mail, ArrowUpRight, ArrowLeft, CheckCircle2, AlertTriangle,
  Lock, BookOpen, Building2, Phone
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I find properties on Reality?',
    answer:
      'You can browse our curated architectural portfolio through the Explore page, or filter directly by category—such as Villas, Residential Plots (Land), and Commercial properties using the main navigation bar. Our advanced search lets you refine listings by location, price bracket, architectural style, square footage, and specific bedroom configurations. Click on any property card to view high-resolution photography, architectural dossiers, and location coordinates.',
  },
  {
    id: 'faq-2',
    question: 'How do I create an account?',
    answer:
      'Click the "LOGIN" button in the top navigation bar and select the "SIGN UP" tab. Enter your full legal name, verified email address, 10-digit telephone number, and create a secure password. Alternatively, you can use "Continue with Google" for instant one-click onboarding. Once registered, you will have immediate access to your personal Wishlist and the ability to list private properties.',
  },
  {
    id: 'faq-3',
    question: 'How does property verification work?',
    answer:
      'Every property submitted to Reality Architectural undergoes a multi-point verification protocol before publication. Our curation team cross-checks legal title ownership, municipal survey records (e.g., e-Khata, RERA registrations, encumbrance clearances), architectural authenticity of photographs, and fair market valuation. Listings that pass all checks receive the verified Reality Architectural dossier badge.',
  },
  {
    id: 'faq-4',
    question: 'How do I add properties to my wishlist?',
    answer:
      'Every property card across the home page, explore view, and category collections features a heart icon in the upper corner. Simply click the heart icon on any card to save that residence to your Wishlist. You can access all your saved architectural properties anytime by clicking the Wishlist link in the main navigation bar, complete with live counters and immediate remove options.',
  },
  {
    id: 'faq-5',
    question: 'How can I contact property owners?',
    answer:
      'On any verified property details dossier, logged-in members can click "Contact Owner" or "Schedule Private Viewing". You will be provided with direct verified phone and WhatsApp links to the property owner or their appointed architect/custodian, ensuring completely transparent, direct negotiations without broker distortion.',
  },
  {
    id: 'faq-6',
    question: 'How do I list my property?',
    answer:
      'Click the "List Property" button located in the navigation bar or footer. You will be guided through our structured listing form where you provide property category, title, pricing, location, dimensions, bedroom/bathroom configurations, and upload authentic architectural photos. Upon submission, the property is stored securely in your private vault for curation review.',
  },
  {
    id: 'faq-7',
    question: 'Can I edit or remove my property listing?',
    answer:
      'Yes. Navigate to "My Properties" via the top navigation bar or user profile menu. You will see all your active, pending, and past listings. From there, you can update pricing, refine descriptions, manage image galleries, mark listings as under-offer or sold, or permanently remove your property from the public marketplace.',
  },
  {
    id: 'faq-8',
    question: 'How do I manage my listed properties?',
    answer:
      'The "My Properties" dashboard serves as your comprehensive listing command centre. It displays live status indicators, buyer engagement metrics, direct inquiries, and verification status for all residences under your ownership. You can filter between active, under-review, and closed portfolios seamlessly.',
  },
  {
    id: 'faq-9',
    question: 'What should I do if I find incorrect property information?',
    answer:
      'If you notice discrepancies in pricing, boundary measurements, or photographic representations on any property, please click the "Report Listing" link on the property dossier or email our integrity desk at official@mavrostech.in with the property link and details. Our compliance team audits reports within 24 business hours.',
  },
  {
    id: 'faq-10',
    question: 'How can I contact customer support?',
    answer:
      'Our dedicated client advisory team is reachable via email at official@mavrostech.in and telephone at +91 63614 92452 (Monday through Saturday, 9:00 AM – 6:00 PM IST). You can also click the "Contact Support" button at the bottom of this Help Centre for priority assistance.',
  },
  {
    id: 'faq-11',
    question: 'Is Reality directly involved in property transactions?',
    answer:
      'Reality Architectural is an independent curated marketplace and discovery platform connecting verified buyers and sellers directly. While we provide legal dossiers, verification checks, and escrow advisory referrals, the final sale deed, registration, and monetary payments take place directly between buyer and seller in accordance with local municipal sub-registrar laws.',
  },
  {
    id: 'faq-12',
    question: 'How can I report a suspicious listing?',
    answer:
      'We enforce zero-tolerance for fraudulent listings, unauthorized broker re-uploads, or watermarked third-party photography. You can flag suspicious activity directly on any listing or email official@mavrostech.in with subject "Suspicious Listing Report". Flagged properties are immediately quarantined pending owner documentary confirmation.',
  },
];

export const HelpLegalPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#102B46] selection:bg-[#183653] selection:text-white pb-24">
      {/* Top Header / Introduction */}
      <section className="pt-12 sm:pt-16 pb-10 border-b border-[#E3DBD0]/80 bg-[#FAF9F5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-['DM_Sans',system-ui,sans-serif] text-[#52687D] hover:text-[#183653] transition-colors py-1 px-3 -ml-3 rounded-full hover:bg-black/5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#7896B2] block mb-2 font-medium">
              REALITY ARCHITECTURAL &bull; LEGAL &amp; GOVERNANCE
            </span>
            <h1 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#102B46] tracking-tight leading-tight">
              Help &amp; Legal Centre
            </h1>
            <p className="mt-3.5 text-sm sm:text-base text-[#52687D] font-['DM_Sans',system-ui,sans-serif] leading-relaxed">
              Transparent platform policies, standards of architectural authenticity, user agreements, and comprehensive support documentation for owners, architects, and buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Section Navigation Bar */}
      <div className="sticky top-20 z-40 bg-[#F8F7F3]/95 backdrop-blur-md border-b border-[#E3DBD0] py-2.5 px-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar text-xs font-mono">
          <button
            type="button"
            onClick={() => scrollToSection('privacy')}
            className="px-3.5 py-1.5 rounded-full hover:bg-[#183653] hover:text-white transition-all text-[#354B60] whitespace-nowrap cursor-pointer border border-[#E0D9CD]"
          >
            01. Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('terms')}
            className="px-3.5 py-1.5 rounded-full hover:bg-[#183653] hover:text-white transition-all text-[#354B60] whitespace-nowrap cursor-pointer border border-[#E0D9CD]"
          >
            02. Terms &amp; Conditions
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('standards')}
            className="px-3.5 py-1.5 rounded-full hover:bg-[#183653] hover:text-white transition-all text-[#354B60] whitespace-nowrap cursor-pointer border border-[#E0D9CD]"
          >
            03. Platform Standards
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="px-3.5 py-1.5 rounded-full hover:bg-[#183653] hover:text-white transition-all text-[#354B60] whitespace-nowrap cursor-pointer border border-[#E0D9CD]"
          >
            04. FAQs &amp; Help
          </button>
        </div>
      </div>

      {/* Main Single Continuous Document Container */}
      <main className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20">

        {/* ========================================================================= */}
        {/* SECTION 01 — PRIVACY POLICY                                               */}
        {/* ========================================================================= */}
        <section id="privacy" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#183653] text-white flex items-center justify-center font-mono text-xs font-semibold">
              01
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#7896B2]">
              Legal Documentation
            </span>
          </div>

          <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#102B46] tracking-tight mb-4">
            Privacy Policy
          </h2>
          <p className="text-xs font-mono text-[#8493A1] mb-8">
            Last Updated: November 2026 &bull; Effective Globally for Reality Architectural (operated by Mavros Tech)
          </p>

          <div className="space-y-8 text-sm text-[#354B60] font-['DM_Sans',system-ui,sans-serif] leading-relaxed">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                1. Introduction &amp; Privacy Commitment
              </h3>
              <p>
                Reality Architectural (&ldquo;Reality&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), operated by Mavros Tech, is dedicated to protecting the privacy, confidentiality, and data sovereignty of individuals who browse, explore, or list properties on our platform. We operate with strict adherence to applicable data protection legislation, including India’s Digital Personal Data Protection Act (DPDPA 2023) and international best practices.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                2. Personal Information Collected
              </h3>
              <p className="mb-2">
                We collect personal information necessary to deliver verified architectural marketplace services:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#455A64]">
                <li><strong>Identity Data:</strong> Full legal name, salutation, and official identification for ownership validation.</li>
                <li><strong>Contact Data:</strong> Verified email address, telephone/mobile number, and mailing address.</li>
                <li><strong>Account Credentials:</strong> Secure hashed credentials managed through enterprise Supabase authentication vaults.</li>
                <li><strong>Property Data:</strong> Survey numbers, municipal Khata IDs, floor plans, geographic coordinates, and property photographs uploaded by sellers.</li>
                <li><strong>Technical &amp; Telemetry Data:</strong> IP address, device specifications, browser type, and interaction session records to safeguard platform integrity.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                3. Account &amp; Registration Information
              </h3>
              <p>
                When creating an account via email or Google OAuth authentication, your profile attributes are stored in an encrypted database managed via Supabase. We do not store plain-text passwords or financial payment instrument numbers. You retain the right to edit, audit, or request the purging of your profile at any time.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                4. How Personal Information Is Used
              </h3>
              <p className="mb-2">Your information is processed strictly for legitimate operational purposes:</p>
              <ul className="list-disc pl-5 space-y-1 text-[#455A64]">
                <li>Facilitating direct communication between verified buyers and property owners.</li>
                <li>Conducting documentary and cadastral verification of listed residences.</li>
                <li>Powering personal Wishlist curation, inquiry management, and seller listing dashboards.</li>
                <li>Detecting fraudulent listings, spam inquiries, and unauthorized commercial bot scrapers.</li>
                <li>Transmitting transactional service alerts, security notifications, and platform updates.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                5. Data Storage &amp; Security
              </h3>
              <p>
                All data in transit is encrypted using Transport Layer Security (TLS 1.3), and resting database records are secured using AES-256 standards. Row-Level Security (RLS) policies ensure that only verified owners can modify or delete their respective listings, preventing cross-tenant leakage or unauthorized edits.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                6. Cookies &amp; Analytics
              </h3>
              <p>
                We employ essential session cookies strictly required for persistent user authentication and wishlist state preservation across visits. We do not sell tracking cookies or provide behavioral advertising trackers to third-party ad networks.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                7. Third-Party Services
              </h3>
              <p>
                Our infrastructure interfaces with audited third-party service providers: Supabase (Authentication and Postgres database storage), Google Cloud Identity (OAuth verification), and Vercel/Netlify hosting networks. These providers operate under stringent data processing agreements that forbid secondary usage of platform records.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                8. Data Retention &amp; Deletion
              </h3>
              <p>
                We retain user profiles for as long as your account remains active. Property records remain archived for legal audit and compliance requirements. You can submit an immediate account and data deletion request by emailing official@mavrostech.in. All personal identifiers will be permanently expunged within 30 days of request receipt.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                9. User Rights
              </h3>
              <p>
                Under prevailing data privacy mandates, you possess the right to: access your personal records, rectify inaccurate data, withdraw consent for communications, obtain a portable machine-readable export of your listings, and lodge inquiries with our designated Data Protection Officer.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                10. Privacy Contact Information
              </h3>
              <p>
                For questions regarding this policy or our data practices, contact:
                <br />
                <strong>Privacy Officer &bull; Mavros Tech / Reality Architectural</strong>
                <br />
                Email: <a href="mailto:official@mavrostech.in" className="text-[#183653] font-semibold underline">official@mavrostech.in</a> &bull; Phone: +91 63614 92452
              </p>
            </div>
          </div>
        </section>

        {/* Subtle Divider */}
        <div className="border-t border-[#E3DBD0]" />

        {/* ========================================================================= */}
        {/* SECTION 02 — TERMS & CONDITIONS                                           */}
        {/* ========================================================================= */}
        <section id="terms" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#183653] text-white flex items-center justify-center font-mono text-xs font-semibold">
              02
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#7896B2]">
              User Agreement
            </span>
          </div>

          <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#102B46] tracking-tight mb-4">
            Terms &amp; Conditions
          </h2>
          <p className="text-xs font-mono text-[#8493A1] mb-8">
            Binding Agreement Governing Use of the Reality Architectural Platform
          </p>

          <div className="space-y-8 text-sm text-[#354B60] font-['DM_Sans',system-ui,sans-serif] leading-relaxed">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing, browsing, registering for, or submitting content to Reality Architectural (the &ldquo;Platform&rdquo;), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms &amp; Conditions. If you do not accept these terms, you must discontinue use immediately.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                2. User Registration &amp; Account Responsibilities
              </h3>
              <p>
                Account holders must provide accurate, current, and verifiable legal information. You are solely responsible for safeguarding your login credentials and for all activities that occur under your authenticated session. You must notify Reality immediately of any suspected unauthorized access.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                3. Buyer Responsibilities
              </h3>
              <p>
                Prospective buyers and investors are responsible for conducting independent legal, financial, and physical due diligence prior to executing binding property contracts or disbursing funds. Reality provides verified dossiers to assist discovery, but independent title searches and physical site inspections remain standard commercial requisites.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                4. Seller &amp; Property-Owner Responsibilities
              </h3>
              <p>
                Users who list properties represent and warrant that they are the legal owners or officially authorized custodians of the property with full authority to advertise. Sellers must ensure all submitted prices, dimension metrics, boundary claims, encumbrance states, and occupancy statuses are truthful and devoid of deception.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                5. Property Listing Guidelines
              </h3>
              <p>
                All listings must showcase residential estates, villas, architectural developments, approved residential plots, or commercial premises meeting our curation threshold. Duplicate listings, deceptive bait-and-switch pricing, and promotional spam are strictly prohibited and will result in immediate delisting.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                6. Accuracy of Property Information
              </h3>
              <p>
                While Reality employs automated and manual verification protocols, listings reflect information submitted by owners and architects. Reality does not warrant that descriptions, square footage measures, or municipal zone codes are entirely free from human error, and parties must rely on statutory conveyance documents.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                7. Property Visits &amp; Negotiations
              </h3>
              <p>
                In-person walkthroughs, architectural tours, and commercial negotiations organized via the platform must be conducted respectfully, safely, and in compliance with local civil law. Reality accepts no liability for personal injury, property damage, or contractual disputes arising during private visits.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                8. Payments &amp; Transactions
              </h3>
              <p>
                Reality Architectural is a curation, listing, and discovery service. The platform does not collect purchase consideration, escrow earnest deposits, or stamp duty fees on behalf of transacting parties. Real-estate conveyance funds must be transacted directly through legitimate banking and legal escrow accounts established by the transacting parties.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                9. Platform Responsibilities &amp; Limitations
              </h3>
              <p>
                Reality provides its platform on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the maximum extent permitted by applicable Indian law, Reality and Mavros Tech disclaim all express or implied warranties, including fitness for a specific real-estate investment purpose or uninterrupted service availability.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                10. Intellectual Property
              </h3>
              <p>
                All brand identity assets, interface designs, codebase, typography arrangements, and editorial curation are the proprietary intellectual property of Reality Architectural and Mavros Tech. Architectural photographs uploaded by owners remain their property, with a worldwide non-exclusive license granted to Reality to display and market the listing.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                11. Dispute Resolution
              </h3>
              <p>
                These Terms are governed by the laws of India. Any legal dispute, controversy, or claim arising out of or relating to platform usage shall be submitted to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                12. Account Suspension &amp; Termination
              </h3>
              <p>
                Reality reserves the unilateral right to suspend, throttle, or terminate the account of any user who violates platform standards, uploads fraudulent titles, engages in aggressive communication, or attempts reverse-engineering of platform systems.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                13. Changes to Terms
              </h3>
              <p>
                We reserve the right to amend these Terms at any time. Notice of substantial revisions will be posted on this Help &amp; Legal Centre. Continued usage following published modifications constitutes full acceptance of the updated Terms.
              </p>
            </div>
          </div>
        </section>

        {/* Subtle Divider */}
        <div className="border-t border-[#E3DBD0]" />

        {/* ========================================================================= */}
        {/* SECTION 03 — PLATFORM STANDARDS                                           */}
        {/* ========================================================================= */}
        <section id="standards" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#183653] text-white flex items-center justify-center font-mono text-xs font-semibold">
              03
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#7896B2]">
              Curation &amp; Integrity
            </span>
          </div>

          <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#102B46] tracking-tight mb-4">
            Platform Standards
          </h2>
          <p className="text-xs font-mono text-[#8493A1] mb-8">
            The Quality, Accuracy, and Architectural Benchmarks Expected Across Reality
          </p>

          <div className="space-y-8 text-sm text-[#354B60] font-['DM_Sans',system-ui,sans-serif] leading-relaxed">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                1. Property Verification Standards
              </h3>
              <p>
                Every listing showcased on Reality must undergo verification before being assigned public visibility. Verification involves cross-referencing published data with cadastral map records, municipal approval sanction orders, and land conversion orders to confirm legitimacy.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                2. Ownership &amp; Documentation Requirements
              </h3>
              <p>
                Property owners and developers must be prepared to submit documentary substantiation upon request, including recent Khata certificates, latest tax paid receipts, encumbrance certificates (EC Form 15/16), and RERA registration credentials for ongoing developments.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                3. Authentic Property Photographs
              </h3>
              <p>
                Reality Architectural is built on visual truth. All uploaded images must reflect the actual property in its genuine built form. We do not permit watermarked stock images, heavily misleading CGI renders presented as completed structures, or photos sourced from third-party broker catalogs without rights.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                4. Accurate Pricing &amp; Location Information
              </h3>
              <p>
                Prices must reflect true, all-inclusive or transparently disaggregated asking figures. Artificial deflated pricing intended to solicit clicks is strictly banned. Map coordinates and neighborhood citations must pinpoint the true location of the estate rather than an unrelated prime landmark.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                5. Genuine Property Descriptions
              </h3>
              <p>
                Editorial descriptions must detail the true materials, structural age, orientation, square footage (super built-up, carpet, and plot size), and architectural intent. Exaggerated, unsubstantiated claims regarding zoning clearances or future infrastructure are removed during review.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                6. Listing Quality Standards
              </h3>
              <p>
                To maintain our publication aesthetic, listings must feature clear high-resolution landscape photography, proper typography, accurate room breakdowns, and complete specifications. Low-resolution blurry captures or collages will be flagged for re-upload.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                7. Professional Communication
              </h3>
              <p>
                All communications between buyers, architects, and owners must remain courteous, professional, and transparent. Harassment, discriminatory language, or unsolicited marketing spam is grounds for immediate membership revocation.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                8. Prohibited Misleading Listings
              </h3>
              <p>
                Strictly prohibited content includes: properties subject to stay orders or litigation without disclosure, agricultural land falsely advertised as converted residential plots, unauthorized subleases, and properties with disputed boundary claims.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                9. Reporting Suspicious Properties
              </h3>
              <p>
                Our community plays a critical role in platform integrity. If you detect an inaccurate or suspicious listing, report it immediately to our compliance desk at official@mavrostech.in. All reports receive rapid human review within 24 hours.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#183653] mb-2">
                10. Platform Moderation &amp; Compliance
              </h3>
              <p>
                Our curation desk retains complete editorial discretion to edit, request updates to, or permanently unpublish any property that drops below our architectural quality or legal transparency benchmarks.
              </p>
            </div>
          </div>
        </section>

        {/* Subtle Divider */}
        <div className="border-t border-[#E3DBD0]" />

        {/* ========================================================================= */}
        {/* SECTION 04 — FREQUENTLY ASKED QUESTIONS (Q&A ACCORDION)                   */}
        {/* ========================================================================= */}
        <section id="faq" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#183653] text-white flex items-center justify-center font-mono text-xs font-semibold">
              04
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#7896B2]">
              Knowledge Base
            </span>
          </div>

          <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#102B46] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#52687D] font-['DM_Sans',system-ui,sans-serif] mb-8">
            Click on any question below to expand the detailed answer.
          </p>

          <div className="space-y-3.5">
            {FAQS.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E0D9CD] bg-white overflow-hidden transition-colors shadow-[0_2px_8px_rgba(24,54,83,0.02)]"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-[#FAF9F6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#183653]"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-[#102B46] pr-4">
                      {item.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full bg-[#183653]/5 flex items-center justify-center text-[#183653] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 bg-[#183653] text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#4A647D] font-['DM_Sans',system-ui,sans-serif] leading-relaxed border-t border-[#F0EBE1] bg-[#FAF9F5]/50">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Subtle Divider */}
        <div className="border-t border-[#E3DBD0]" />

        {/* ========================================================================= */}
        {/* NEED MORE HELP? (BOTTOM CALLOUT)                                          */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#183653] text-[#F8F7F3] relative overflow-hidden shadow-xl border border-white/10">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7896B2] block mb-2 font-semibold">
              DIRECT CLIENT SUPPORT
            </span>
            <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight">
              Need More Help?
            </h3>
            <p className="mt-3 text-sm text-[#CBD5E1] font-['DM_Sans',system-ui,sans-serif] leading-relaxed">
              Have specific legal questions regarding title verification, listing your private architectural residence, or scheduling a confidential tour? Our advisory desk is here to assist.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href="mailto:official@mavrostech.in"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#183653] font-semibold hover:bg-[#F8F7F3] transition-all shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Support</span>
              </a>

              <a
                href="mailto:official@mavrostech.in"
                className="inline-flex items-center gap-2 px-4 py-3 text-white/90 hover:text-white transition-colors"
              >
                <span>official@mavrostech.in</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-[#AABBD0] hover:text-white transition-colors"
              >
                <span>Return to Home</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Ambient Decorative Accents */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#354B60]/40 blur-3xl pointer-events-none" />
        </section>

      </main>
    </div>
  );
};
