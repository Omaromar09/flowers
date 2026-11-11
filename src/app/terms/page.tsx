'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="pb-8 mb-8 border-b border-[var(--color-stone)]">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[var(--color-obsidian)] mt-2">
          Terms of Service & Floral Commission
        </h1>
        <p className="mt-2 text-xs text-[var(--color-obsidian)]/60">
          Last revised: January 2026 • Governing Jardin Vivant Haute Botanique SAS
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[var(--color-obsidian)]/80 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)]">
            1. Nature of Living Botanical Creations
          </h2>
          <p>
            Flowers are natural living organisms subject to seasonal variation, climate terroir, and slight chromatic variance. While our masters adhere strictly to stem specifications and volume tiers, minor organic differences between display photography and delivered arrangements celebrate natural botanical individuality.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)]">
            2. Harvest Substitutions
          </h2>
          <p>
            In rare cases where sudden climatic events affect dawn harvesting of a specific accent stem, our masters reserve the right to substitute with an accent bloom of equal or superior value and matching color tone without compromising architectural balance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)]">
            3. Delivery Commitments & Residence Access
          </h2>
          <p>
            The patron is responsible for providing accurate delivery address details and ensuring someone is present or that reception staff/concierge are authorized to receive climate-chilled floral containers during the scheduled delivery window.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)]">
            4. Cancellation and Order Amendments
          </h2>
          <p>
            Due to our advance dawn harvesting reservations with growers, orders may be amended or canceled up to 24 hours prior to the scheduled delivery date. Orders already dispatched to chilled couriers cannot be canceled.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)]">
            5. Intellectual Property
          </h2>
          <p>
            All botanical photography, 3D floral experiences, editorial literature, and brand marks are the exclusive property of Jardin Vivant Haute Botanique.
          </p>
        </section>
      </div>
    </div>
  );
}
