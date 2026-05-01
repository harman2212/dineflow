'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Home,
  LayoutGrid,
  Info,
  Phone,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const NAV_LINKS = [
  { label: 'Home', section: 'home', icon: Home },
  { label: 'Menu', section: 'menu', icon: LayoutGrid },
  { label: 'About', section: 'about', icon: Info },
  { label: 'Contact', section: 'contact', icon: Phone },
];

export default function Navbar() {
  const {
    view,
    setView,
    cartCount,
    setCartOpen,
    setReservationOpen,
    activeSection,
    setActiveSection,
    searchQuery,
    setSearchQuery,
  } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const count = cartCount();

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 64; // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleNavClick = (section: string) => {
    if (view !== 'customer') {
      setView('customer');
      // Wait for AnimatePresence exit (300ms) + enter to complete before scrolling
      setTimeout(() => scrollToSection(section), 400);
    } else {
      scrollToSection(section);
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Transparent dark blur navbar */}
      <div className="absolute inset-0 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/[0.06]" />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="DineFlow"
            className="h-9 w-9 rounded-[10px] shadow-lg shadow-[#FF6B00]/20 group-hover:shadow-[#FF6B00]/40 transition-shadow"
          />
          <span className="text-lg font-bold tracking-wide">
            Dine<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]">Flow</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <button
                key={link.section}
                onClick={() => handleNavClick(link.section)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  isActive && view === 'customer'
                    ? 'text-[#FF6B00]'
                    : 'text-[#B3B3B3] hover:text-white'
                }`}
              >
                {link.label}
                {isActive && view === 'customer' && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-[#FF6B00]/10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-[#B3B3B3] hover:text-white hover:bg-white/5 transition-all"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative h-9 w-9 flex items-center justify-center rounded-full text-[#B3B3B3] hover:text-white hover:bg-white/5 transition-all"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          {/* Order Now button - Desktop */}
          <button
            onClick={() => handleNavClick('menu')}
            className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] hover:shadow-[0_0_25px_rgba(255,107,0,0.4)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Order Now
          </button>

          {/* Admin Toggle - subtle */}
          <button
            onClick={() => setView(view === 'admin' ? 'customer' : 'admin')}
            className={`hidden md:flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
              view === 'admin'
                ? 'bg-[#FF6B00]/10 text-[#FF6B00]'
                : 'text-[#7A7A7A] hover:text-[#B3B3B3] hover:bg-white/5'
            }`}
            title={view === 'admin' ? 'Switch to Customer' : 'Admin Panel'}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full text-[#B3B3B3] hover:text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search bar dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative border-b border-white/[0.06] bg-[#0F0F0F]/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-2xl px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7A7A]" />
                <input
                  autoFocus
                  placeholder="Search dishes, ingredients..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    // Auto-scroll to menu to show search results
                    if (view !== 'customer') {
                      setView('customer');
                      setTimeout(() => scrollToSection('menu'), 400);
                    } else if (activeSection !== 'menu') {
                      scrollToSection('menu');
                    }
                  }}
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/[0.08] text-white placeholder-[#7A7A7A] text-sm focus:outline-none focus:border-[#FF6B00]/40 focus:shadow-[0_0_15px_rgba(255,107,0,0.1)] transition-all"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative border-b border-white/[0.06] bg-[#0F0F0F]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.section;
                return (
                  <button
                    key={link.section}
                    onClick={() => handleNavClick(link.section)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      isActive && view === 'customer'
                        ? 'bg-[#FF6B00]/10 text-[#FF6B00]'
                        : 'text-[#B3B3B3] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  setReservationOpen(true);
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[#B3B3B3] hover:bg-white/5 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Reserve Table
              </button>
              <div className="mt-2 border-t border-white/[0.06] pt-2 flex flex-col gap-2">
                <button
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]"
                  onClick={() => handleNavClick('menu')}
                >
                  Order Now
                </button>
                <button
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-[#B3B3B3] bg-white/5 hover:bg-white/10 border border-white/[0.06]"
                  onClick={() => {
                    setView(view === 'admin' ? 'customer' : 'admin');
                    setMobileOpen(false);
                  }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  {view === 'admin' ? 'Customer View' : 'Admin Panel'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
