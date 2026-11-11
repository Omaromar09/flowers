'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Bespoke Private Event',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
          {language === 'ar' ? 'خدمة العملاء والكونسيرج' : 'Private Concierge'}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-medium text-[var(--color-obsidian)] mt-2">
          {language === 'ar' ? 'تواصل مع خبراء الدار' : 'Consult Our Master Botanists'}
        </h1>
        <p className="mt-4 text-xs sm:text-base text-[var(--color-obsidian)]/75">
          {language === 'ar'
            ? 'سواء كنت تخطط لزفاف أسطوري، أو ترغب في اشتراك زهور أسبوعي لمنزلك، فريقنا في خدمتك.'
            : 'Whether organizing an unforgettable matrimonial celebration, designing private salon installations, or seeking advice on care, our concierges await your inquiry.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[var(--color-stone)] shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[var(--color-blush-silk)] text-[var(--color-burgundy)] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-medium text-[var(--color-obsidian)]">
                Inquiry Received by Concierge
              </h2>
              <p className="text-xs text-[var(--color-obsidian)]/70 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Our master floral curator will review your details and contact you within 4 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs text-[var(--color-burgundy)] font-semibold underline"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-obsidian)] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lady Genevieve"
                    className="w-full text-xs p-3 rounded-xl border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--color-obsidian)] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="genevieve@estate.com"
                    className="w-full text-xs p-3 rounded-xl border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-obsidian)] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+33 1 42 68 00 00"
                    className="w-full text-xs p-3 rounded-xl border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--color-obsidian)] mb-1">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                  >
                    <option value="Bespoke Private Event">Bespoke Matrimonial & Grand Gala</option>
                    <option value="Residence Floral Subscription">Residence Floral Subscription</option>
                    <option value="Corporate Hospitality">Corporate & Luxury Hotel Accounts</option>
                    <option value="Order Inquiries">Existing Order Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-obsidian)] mb-1">
                  How may our floral masters assist you? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your event date, preferred flowers, color palette, or special requirements..."
                  className="w-full text-xs p-3 rounded-xl border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] active:scale-[0.98] text-white text-xs tracking-wider uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit to Concierge</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Salon Locations & Direct Contact (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--color-parchment)] border border-[var(--color-stone)] space-y-5">
            <h3 className="font-serif text-xl font-medium text-[var(--color-obsidian)]">
              Direct Concierge Lines
            </h3>

            <div className="space-y-4 text-xs text-[var(--color-obsidian)]/80">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[var(--color-burgundy)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[var(--color-obsidian)]">Telephone Concierge</p>
                  <p>Paris: +33 (0)1 42 68 00 00</p>
                  <p>London: +44 (0)20 7946 0912</p>
                  <p>Dubai: +971 4 388 9000</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[var(--color-burgundy)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[var(--color-obsidian)]">Electronic Correspondence</p>
                  <p>concierge@jardin-vivant.com</p>
                  <p>events@jardin-vivant.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[var(--color-burgundy)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[var(--color-obsidian)]">Salon & Delivery Hours</p>
                  <p>Monday – Saturday: 08:00 – 21:00 CET</p>
                  <p>Sunday Chilled Delivery: 09:00 – 17:00 CET</p>
                </div>
              </div>
            </div>
          </div>

          {/* Boutique Addresses */}
          <div className="p-6 rounded-2xl bg-white border border-[var(--color-stone)] space-y-4 text-xs">
            <h4 className="font-serif text-base font-semibold text-[var(--color-obsidian)]">
              Physical Boutiques
            </h4>
            <div className="space-y-3 text-[var(--color-obsidian)]/80">
              <div className="pb-3 border-b border-[var(--color-stone)]/50">
                <p className="font-semibold text-[var(--color-obsidian)]">Paris Atelier Principal</p>
                <p className="text-[11px] text-[var(--color-obsidian)]/60">24 Place Vendôme, 75001 Paris, France</p>
              </div>
              <div className="pb-3 border-b border-[var(--color-stone)]/50">
                <p className="font-semibold text-[var(--color-obsidian)]">London Mayfair Salon</p>
                <p className="text-[11px] text-[var(--color-obsidian)]/60">14 Mount Street, Mayfair, London W1K 2RF</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-obsidian)]">Dubai Flagship Pavilion</p>
                <p className="text-[11px] text-[var(--color-obsidian)]/60">Boulevard Plaza Tower 1, Downtown Dubai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
