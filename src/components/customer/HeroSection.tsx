'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background burger image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/hero-burger.png')" }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/85 to-[#0F0F0F]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]/40" />
        {/* Orange glow accent */}
        <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-[#FF6B00]/10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[400px] rounded-full bg-[#FF8A3D]/8 blur-[120px]" />
      </div>

      {/* 20% OFF Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ delay: 1.5, duration: 0.5, type: 'spring' }}
        className="absolute top-24 right-8 lg:right-20 z-10 hidden md:block"
      >
        <div className="relative px-5 py-3 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF8A3D] shadow-[0_0_40px_rgba(255,107,0,0.3)]">
          <p className="text-xs font-semibold text-white/80 uppercase tracking-widest">Limited Offer</p>
          <p className="text-3xl font-black text-white leading-tight">20% OFF</p>
          <p className="text-[10px] text-white/70 font-medium mt-0.5">On first order</p>
          {/* Decorative dot */}
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#FF8A3D] animate-pulse" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gradient-to-r from-[#FF6B00] to-transparent" />
            <span className="text-[#FF6B00] text-sm font-semibold italic tracking-wide">
              Good food, Good mood
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            Delicious Food{' '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF8A3D] to-[#FFB366]">
              Delivered Fast
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-base sm:text-lg text-[#B3B3B3] leading-relaxed mb-8 max-w-lg"
          >
            Discover amazing dishes made with fresh ingredients, crafted by AI-powered intelligence, delivered right to your door.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollTo('menu')}
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] shadow-[0_0_25px_rgba(255,107,0,0.25)] hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Order Now
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('menu')}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FF6B00]/30 transition-all duration-300"
            >
              View Menu
            </button>
          </motion.div>

          {/* Quick Stats under CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="flex items-center gap-6 mt-10 pt-8 border-t border-white/[0.06]"
          >
            {[
              { value: '30 min', label: 'Avg Delivery' },
              { value: '4.8', label: 'Rating' },
              { value: '500+', label: 'Dishes' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-[#7A7A7A]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F0F0F] to-transparent z-10" />
    </section>
  );
}
