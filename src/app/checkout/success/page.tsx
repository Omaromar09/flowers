'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Truck, Clock, Sparkles, Printer, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumberParam = searchParams.get('orderNumber') || 'JV-2026-98142';
  const { language } = useLanguage();

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F1321', '#B83A5D', '#F6D06E', '#F6E7E4', '#8A9A86']
      });
    } catch {
      // ignore
    }

    // Try reading last order from sessionStorage
    try {
      const stored = sessionStorage.getItem('jv_last_order');
      if (stored) {
        setOrderData(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Success Badge */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[var(--color-blush-silk)] text-[var(--color-burgundy)] flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)] block">
          Order Successfully Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[var(--color-obsidian)]">
          {language === 'ar' ? 'شكراً لاختيارك دار جاردان فيفان' : 'Thank You for Your Patronage'}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-obsidian)]/70 max-w-lg mx-auto leading-relaxed">
          {language === 'ar'
            ? 'تم اعتماد طلبك وسيقوم كبير المنسقين ببدء تنسيق أزهارك المنتقاة عند فجر يوم التوصيل.'
            : 'Your floral commission has been received. Our master florists will dawn-cut and hand-tie your arrangement before chilled courier dispatch.'}
        </p>

        <div className="inline-block p-3.5 rounded-xl bg-white border border-[var(--color-stone)] shadow-xs mt-2">
          <span className="text-xs text-[var(--color-obsidian)]/60">Order Reference Token: </span>
          <span className="font-mono text-sm font-bold text-[var(--color-burgundy)] tracking-wider">
            {orderData?.orderNumber || orderNumberParam}
          </span>
        </div>
      </div>

      {/* Fulfillment Status Timeline */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-[var(--color-stone)] shadow-xs">
        <h2 className="font-serif text-lg font-medium text-[var(--color-obsidian)] mb-6">
          {language === 'ar' ? 'مراحل تجهيز وتوصيل الباقة' : 'Floral Fulfillment Journey'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {[
            {
              title: 'Confirmed',
              desc: 'Receipt Verified',
              active: true,
              icon: CheckCircle2
            },
            {
              title: 'Master Crafting',
              desc: 'Dawn-Cut Selection',
              active: true,
              icon: Sparkles
            },
            {
              title: 'Chilled Courier',
              desc: 'Climate Container',
              active: false,
              icon: Truck
            },
            {
              title: 'Hand Delivered',
              desc: 'Arrival at Residence',
              active: false,
              icon: Clock
            }
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mb-2.5 ${
                  step.active
                    ? 'bg-[var(--color-burgundy)] text-white shadow-sm'
                    : 'bg-[var(--color-parchment)] text-[var(--color-obsidian)]/40 border border-[var(--color-stone)]'
                }`}
              >
                <step.icon className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-[var(--color-obsidian)]">{step.title}</p>
              <p className="text-[11px] text-[var(--color-obsidian)]/60">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Itemized Order Summary */}
      {orderData ? (
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white border border-[var(--color-stone)] shadow-xs space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-[var(--color-stone)]">
            <h3 className="font-serif text-lg font-medium text-[var(--color-obsidian)]">
              Itemized Receipt
            </h3>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-burgundy)] hover:underline cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[var(--color-obsidian)]/80">
            <div>
              <p className="font-semibold text-[var(--color-obsidian)] mb-1">Patron</p>
              <p>{orderData.customer?.fullName}</p>
              <p>{orderData.customer?.email}</p>
              <p>{orderData.customer?.phone}</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--color-obsidian)] mb-1">Destination Address</p>
              <p>{orderData.delivery?.address}</p>
              <p>
                {orderData.delivery?.city}, {orderData.delivery?.country}
              </p>
              <p className="text-[var(--color-moss-forest)] font-mono mt-1">
                Scheduled: {orderData.delivery?.deliveryDate} ({orderData.delivery?.deliverySlot})
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="divide-y divide-[var(--color-stone)]/50 pt-4 border-t border-[var(--color-stone)] text-xs">
            {orderData.items?.map((item: any, i: number) => (
              <div key={i} className="py-2.5 flex justify-between items-center">
                <span>
                  {item.quantity}× {item.name} ({item.size})
                </span>
                <span className="font-mono font-semibold">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Financials */}
          <div className="pt-4 border-t border-[var(--color-stone)] space-y-1.5 text-xs text-right">
            <p>Subtotal: ${orderData.subtotal}</p>
            {orderData.discount > 0 ? (
              <p className="text-[var(--color-burgundy)]">Discount: -${orderData.discount}</p>
            ) : null}
            <p>
              Courier:{' '}
              {orderData.shipping === 0 ? 'Complimentary' : `$${orderData.shipping}`}
            </p>
            <p className="text-base font-serif font-bold text-[var(--color-burgundy)] pt-2 border-t border-[var(--color-stone)]">
              Total Investment: ${orderData.total}
            </p>
          </div>
        </div>
      ) : null}

      {/* Action Links */}
      <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/shop"
          className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[var(--color-burgundy)] text-white text-xs tracking-wider uppercase font-semibold hover:bg-[var(--color-burgundy-hover)] transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <span>Return to Floral Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-white border border-[var(--color-stone)] text-[var(--color-obsidian)] text-xs tracking-wider uppercase font-semibold hover:bg-[var(--color-parchment)] transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-xs text-[var(--color-obsidian)]/60">
          Loading your verified floral receipt...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
