'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  Sparkles,
  Lock,
  ArrowRight,
  AlertCircle,
  Calendar,
  Gift
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { DELIVERY_SLOTS, DELIVERY_SLOTS_AR } from '@/data/products';
import { PaymentMethod } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    discountAmount,
    shippingCost,
    totalAmount,
    clearCart
  } = useCart();
  const { language } = useLanguage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [buildingDetails, setBuildingDetails] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [deliverySlot, setDeliverySlot] = useState(DELIVERY_SLOTS[0]);
  const [isGift, setIsGift] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  // Development card inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage('Your basket is empty. Please select floral arrangements before checkout.');
      return;
    }

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please provide your full name, email, and phone number.');
      return;
    }

    if (!address.trim() || !city.trim()) {
      setErrorMessage('Please specify the full delivery address and city for the chilled courier.');
      return;
    }

    if (isGift && (!recipientName.trim() || !recipientPhone.trim())) {
      setErrorMessage('Please provide the recipient’s name and contact number for courier coordination.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: { fullName, email, phone },
        delivery: {
          country,
          city,
          area,
          address,
          buildingDetails,
          instructions: deliveryInstructions,
          deliveryDate,
          deliverySlot,
          isGift,
          recipientName: isGift ? recipientName : undefined,
          recipientPhone: isGift ? recipientPhone : undefined
        },
        items: items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          size: item.selectedSize,
          includeVase: item.includeVase,
          price: item.product.price
        })),
        subtotal,
        shipping: shippingCost,
        discount: discountAmount,
        total: totalAmount,
        paymentMethod
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Order processing failed on the server');
      }

      // Store in sessionStorage for success display
      sessionStorage.setItem('jv_last_order', JSON.stringify(data.order));

      clearCart();
      router.push(`/checkout/success?orderNumber=${data.order.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while authorizing your order. Please retry.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-24 px-4 text-center max-w-xl mx-auto">
        <h1 className="font-serif text-3xl font-medium">Your Basket is Empty</h1>
        <p className="text-xs text-[var(--color-obsidian)]/65 mt-2">
          Please add a botanical arrangement before checking out.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block py-2.5 px-6 rounded-lg bg-[var(--color-burgundy)] text-white text-xs uppercase font-semibold"
        >
          Explore Creations
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8 pb-6 border-b border-[var(--color-stone)]">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
          Secure White Glove Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[var(--color-obsidian)] mt-1">
          {language === 'ar' ? 'إتمام الطلب الفاخر' : 'Bespoke Order Finalization'}
        </h1>
      </div>

      {errorMessage ? (
        <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form Fields (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Patron Information */}
          <section className="p-6 rounded-2xl bg-white border border-[var(--color-stone)] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-burgundy)] text-white text-xs flex items-center justify-center font-mono">
                1
              </span>
              <span>{language === 'ar' ? 'بيانات العميل' : 'Patron Details'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-obsidian)]/80 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full text-xs p-3 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-obsidian)]/80 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="eleanor@vance-estate.com"
                  className="w-full text-xs p-3 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[var(--color-obsidian)]/80 mb-1">
                  Contact Phone (For Chilled Courier) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full text-xs p-3 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Delivery & Scheduling */}
          <section className="p-6 rounded-2xl bg-white border border-[var(--color-stone)] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-burgundy)] text-white text-xs flex items-center justify-center font-mono">
                2
              </span>
              <span>{language === 'ar' ? 'عنوان وموعد التوصيل' : 'Chilled Courier Destination'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-obsidian)]/80 mb-1">
                  Country / Territory *
                </label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-obsidian)]/80 mb-1">
                  City / Metropole *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="New York / Paris / Dubai"
                  className="w-full text-xs p-3 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[var(--color-obsidian)]/80 mb-1">
                  Street Address & Residence *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="740 Park Avenue, Apt 14B"
                  className="w-full text-xs p-3 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[var(--color-obsidian)]/80 mb-1">
                  Building Details / Gate Code / Concierge Notice
                </label>
                <input
                  type="text"
                  value={buildingDetails}
                  onChange={e => setBuildingDetails(e.target.value)}
                  placeholder="Leave with front desk concierge; ring bell twice"
                  className="w-full text-xs p-3 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                />
              </div>

              {/* Delivery Window */}
              <div>
                <label className="block text-xs font-medium text-[var(--color-obsidian)]/80 mb-1">
                  Delivery Date *
                </label>
                <input
                  type="date"
                  required
                  value={deliveryDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setDeliveryDate(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-obsidian)]/80 mb-1">
                  Courier Time Slot *
                </label>
                <select
                  value={deliverySlot}
                  onChange={e => setDeliverySlot(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                >
                  {DELIVERY_SLOTS.map((slot, sIdx) => (
                    <option key={sIdx} value={slot}>
                      {language === 'ar' ? DELIVERY_SLOTS_AR[sIdx] : slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gift Checkbox */}
            <div className="pt-4 border-t border-[var(--color-stone)]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[var(--color-obsidian)]">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={e => setIsGift(e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-burgundy)]"
                />
                <Gift className="w-4 h-4 text-[var(--color-burgundy)]" />
                <span>{language === 'ar' ? 'هذا الطلب إهداء لشخص آخر' : 'This arrangement is an anonymous or dedicated gift'}</span>
              </label>

              {isGift ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-4 rounded-xl bg-[var(--color-parchment)]/60 border border-[var(--color-stone)]">
                  <div>
                    <label className="block text-xs font-medium mb-1">Recipient Name *</label>
                    <input
                      type="text"
                      required={isGift}
                      value={recipientName}
                      onChange={e => setRecipientName(e.target.value)}
                      placeholder="Camille Laurent"
                      className="w-full text-xs p-2.5 rounded-lg border border-[var(--color-stone)] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Recipient Phone *</label>
                    <input
                      type="tel"
                      required={isGift}
                      value={recipientPhone}
                      onChange={e => setRecipientPhone(e.target.value)}
                      placeholder="+1 (555) 948-2710"
                      className="w-full text-xs p-2.5 rounded-lg border border-[var(--color-stone)] bg-white"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          {/* Section 3: Payment Architecture */}
          <section className="p-6 rounded-2xl bg-white border border-[var(--color-stone)] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-semibold text-[var(--color-obsidian)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-burgundy)] text-white text-xs flex items-center justify-center font-mono">
                3
              </span>
              <span>{language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</span>
            </h2>

            {/* Development Mode Notice */}
            <div className="p-3.5 rounded-xl bg-[var(--color-parchment)] border border-[var(--color-stone)] text-xs text-[var(--color-obsidian)]/80 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[var(--color-moss-forest)] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[var(--color-obsidian)]">
                  Safe Development Mode Active:
                </span>{' '}
                Transactions are authorized in test verification mode. You can submit with test card data or select Cash on Delivery. To connect a live gateway, set `STRIPE_SECRET_KEY` or appropriate country gateway credentials.
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[var(--color-burgundy)] bg-[var(--color-blush-silk)]/50 text-[var(--color-burgundy)]'
                    : 'border-[var(--color-stone)] hover:bg-[var(--color-parchment)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[var(--color-burgundy)]"
                  />
                  <div>
                    <p className="text-xs font-semibold">Credit or Debit Card</p>
                    <p className="text-[10px] text-[var(--color-obsidian)]/60">
                      Visa, Mastercard, American Express (256-bit encrypted)
                    </p>
                  </div>
                </div>
                <CreditCard className="w-5 h-5 text-[var(--color-obsidian)]/50" />
              </label>

              {paymentMethod === 'card' ? (
                <div className="p-4 rounded-xl bg-[var(--color-alabaster)] border border-[var(--color-stone)] space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium mb-1">Card Number (Test)</label>
                    <input
                      type="text"
                      placeholder="4242 •••• •••• 4242"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-[var(--color-stone)] bg-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-[var(--color-stone)] bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium mb-1">CVC Code</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-[var(--color-stone)] bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[var(--color-burgundy)] bg-[var(--color-blush-silk)]/50 text-[var(--color-burgundy)]'
                    : 'border-[var(--color-stone)] hover:bg-[var(--color-parchment)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[var(--color-burgundy)]"
                  />
                  <div>
                    <p className="text-xs font-semibold">Cash on Chilled Delivery (COD)</p>
                    <p className="text-[10px] text-[var(--color-obsidian)]/60">
                      Settle in cash or mobile POS terminal directly upon courier arrival
                    </p>
                  </div>
                </div>
                <Truck className="w-5 h-5 text-[var(--color-obsidian)]/50" />
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Order Confirmation Summary (5 Cols) */}
        <aside className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[var(--color-stone)] shadow-md space-y-6 sticky top-24">
          <h2 className="font-serif text-xl font-medium text-[var(--color-obsidian)]">
            {language === 'ar' ? 'ملخص الطلب' : 'Arrangement Receipt'}
          </h2>

          <div className="divide-y divide-[var(--color-stone)]/50 max-h-60 overflow-y-auto pr-1 text-xs">
            {items.map((item, idx) => {
              let basePrice = item.product.price;
              if (item.selectedSize === 'Grand') basePrice = Math.round(basePrice * 1.3);
              if (item.selectedSize === 'Majestic') basePrice = Math.round(basePrice * 1.7);
              const unitPrice = basePrice + (item.includeVase ? item.vasePrice : 0);

              return (
                <div key={idx} className="py-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 rounded-lg object-cover bg-[var(--color-stone)]"
                    />
                    <div>
                      <p className="font-medium text-[var(--color-obsidian)]">{item.product.name}</p>
                      <p className="text-[10px] text-[var(--color-obsidian)]/60">
                        {item.quantity} × {item.selectedSize}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-[var(--color-burgundy)]">
                    ${unitPrice * item.quantity}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Breakdown */}
          <div className="space-y-2 text-xs text-[var(--color-obsidian)]/80 pt-4 border-t border-[var(--color-stone)]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[var(--color-obsidian)]">${subtotal}</span>
            </div>
            {discountAmount > 0 ? (
              <div className="flex justify-between text-[var(--color-burgundy)]">
                <span>Privilege Discount</span>
                <span>-${discountAmount}</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span>Chilled Courier Shipping</span>
              <span>
                {shippingCost === 0 ? (
                  <span className="text-[var(--color-moss-forest)] font-semibold">Complimentary</span>
                ) : (
                  `$${shippingCost}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold text-[var(--color-obsidian)] pt-3 border-t border-[var(--color-stone)]">
              <span>Total Authorization</span>
              <span className="text-[var(--color-burgundy)] text-xl">${totalAmount}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] active:scale-[0.98] text-[var(--color-alabaster)] text-xs tracking-widest uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authorizing with Atelier...</span>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Confirm & Place Floral Order</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-[var(--color-obsidian)]/50 leading-relaxed">
            By confirming, you agree to the Jardin Vivant harvest schedule, climate-chilled courier delivery terms, and satisfaction guarantee.
          </p>
        </aside>
      </form>
    </div>
  );
}
