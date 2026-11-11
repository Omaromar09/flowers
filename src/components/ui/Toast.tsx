'use client';

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-obsidian)] text-[var(--color-alabaster)] shadow-2xl border border-[var(--color-stone)]/30 backdrop-blur-md">
        <div className="w-6 h-6 rounded-full bg-[var(--color-burgundy)] flex items-center justify-center flex-shrink-0 text-white">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <p className="text-xs font-medium tracking-wide">{toastMessage}</p>
      </div>
    </div>
  );
}
