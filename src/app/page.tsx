'use client';

import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/customer/HeroSection';
import MenuGrid from '@/components/customer/MenuGrid';
import AboutSection from '@/components/customer/AboutSection';
import ContactSection from '@/components/customer/ContactSection';
import CartDrawer from '@/components/customer/CartDrawer';
import OrderTracking from '@/components/customer/OrderTracking';
import ReservationForm from '@/components/customer/ReservationForm';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function HomePage() {
  const { view, activeSection, menuItems, setMenuItems, setActiveSection } = useStore();

  // Fetch menu items on mount
  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/menu');
        if (res.ok) {
          const data = await res.json();
          setMenuItems(data);
        }
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    }
    fetchMenu();
  }, [setMenuItems]);

  // Track active section via IntersectionObserver
  const handleSectionRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-80px 0px -40% 0px' }
    );

    // Observe all sections
    const sections = node.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'customer' ? (
            <motion.div
              key="customer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={handleSectionRef}
            >
              <div data-section id="home">
                <HeroSection />
              </div>

              <div data-section id="menu">
                <MenuGrid />
              </div>

              <div data-section id="about">
                <AboutSection />
              </div>

              <div data-section id="contact">
                <ContactSection />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdminDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {view === 'customer' && <Footer />}

      {/* Overlays */}
      <CartDrawer />
      <ReservationForm />
      <OrderTracking />
    </div>
  );
}
