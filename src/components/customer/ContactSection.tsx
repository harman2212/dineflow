'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['123 Culinary Avenue', 'New York, NY 10001'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['hello@dineflow.com', 'support@dineflow.com'],
  },
  {
    icon: Clock,
    title: 'Hours',
    lines: ['Mon-Fri: 11am - 10pm', 'Sat-Sun: 10am - 11pm'],
  },
];

export default function ContactSection() {
  const { setReservationOpen } = useStore();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setSending(true);
    // Simulate send
    setTimeout(() => {
      toast.success('Message sent!', { description: 'We will get back to you soon.' });
      setForm({ name: '', email: '', message: '' });
      setSending(false);
    }, 1000);
  };

  const inputClass = "w-full h-11 px-4 rounded-xl bg-white/5 border border-white/[0.08] text-white text-sm placeholder-[#7A7A7A] focus:outline-none focus:border-[#FF6B00]/40 focus:shadow-[0_0_15px_rgba(255,107,0,0.1)] transition-all";

  return (
    <section className="py-16 sm:py-24 bg-dots relative">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[600px] rounded-full bg-[#FF6B00]/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FF6B00]" />
            <span className="text-[#FF6B00] text-sm font-semibold italic tracking-wide">Get in Touch</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#FF6B00]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]">Us</span>
          </h2>
          <p className="text-[#B3B3B3] max-w-2xl mx-auto leading-relaxed">
            Have a question, feedback, or want to reserve a table? We would love to hear from you. Reach out through any channel below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            {CONTACT_INFO.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.08 }}
                  className="glass rounded-xl p-4 flex items-start gap-4 hover:border-[#FF6B00]/20 transition-all duration-300 group"
                >
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-[#FF6B00]/15 to-[#FF8A3D]/10 flex items-center justify-center group-hover:from-[#FF6B00]/25 group-hover:to-[#FF8A3D]/15 transition-all">
                    <Icon className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{info.title}</h4>
                    {info.lines.map((line) => (
                      <p key={line} className="text-sm text-[#7A7A7A]">{line}</p>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Reserve Table CTA */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setReservationOpen(true)}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:shadow-[0_0_35px_rgba(255,107,0,0.35)] transition-all duration-300"
            >
              <MessageSquare className="h-4 w-4" />
              Reserve a Table
            </motion.button>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#B3B3B3] mb-1.5">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#B3B3B3] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#B3B3B3] mb-1.5">Message</label>
                <textarea
                  placeholder="Tell us what you think..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className={`${inputClass} h-auto resize-none py-3`}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:shadow-[0_0_35px_rgba(255,107,0,0.35)] transition-all duration-300 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
