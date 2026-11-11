'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="pb-8 mb-8 border-b border-[var(--color-stone)]">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
          Legal Protocols
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[var(--color-obsidian)] mt-2">
          Privacy & Patron Data Confidentiality
        </h1>
        <p className="mt-2 text-xs text-[var(--color-obsidian)]/60">
          Last revised: January 2026 • Compliant with GDPR, CCPA, and International Data Protection Acts
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[var(--color-obsidian)]/80 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)]">
            1. Uncompromising Commitment to Patron Discretion
          </h2>
          <p>
            Jardin Vivant operates with the highest discretion expected of luxury European and Middle Eastern salons. We treat patron identities, recipient destinations, and personal calligraphy gift messages as strictly confidential.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)]">
            2. Personal Information Collected
          </h2>
          <p>
            When placing a floral order or subscribing to the Seasonal Gazette, we collect:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Patron identity (full legal name, billing and correspondence email, telephone).</li>
            <li>Delivery destination (physical residence address, gate access instructions).</li>
            <li>Recipient information (name and courier contact number for gift coordination).</li>
            <li>Encrypted payment tokens processed through PCI-DSS Level 1 certified gateways.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)]">
            3. Zero Sale of Data
          </h2>
          <p>
            We do not sell, license, or barter your personal records to third-party advertising networks. Your information is accessed solely by our master florists and chilled courier dispatchers to execute your order.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)]">
            4. Calligraphy and Gift Message Retention
          </h2>
          <p>
            Personal gift messages penned on our deckled cotton cards are stored for order fulfillment and deleted from active transmission databases after 30 days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)]">
            5. Inquiries & Data Rights
          </h2>
          <p>
            Patrons may request complete erasure or export of their data at any time by contacting our Data Protection Officer at privacy@jardin-vivant.com.
          </p>
        </section>
      </div>
    </div>
  );
}
