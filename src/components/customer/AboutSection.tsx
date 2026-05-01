'use client';

import { motion } from 'framer-motion';
import { Heart, Award, Leaf, Clock, Users, Star } from 'lucide-react';

const FEATURES = [
  {
    icon: Heart,
    title: 'Crafted with Passion',
    description: 'Every dish is prepared by our award-winning chefs who bring years of culinary expertise and genuine love for food to every plate.',
  },
  {
    icon: Leaf,
    title: 'Farm Fresh Ingredients',
    description: 'We source directly from local farms and trusted suppliers to ensure the highest quality, freshest ingredients in every meal we serve.',
  },
  {
    icon: Award,
    title: 'Award Winning Cuisine',
    description: 'Recognized by top food critics and culinary associations worldwide for our innovative fusion of traditional recipes with modern techniques.',
  },
  {
    icon: Clock,
    title: 'Fast & Reliable Delivery',
    description: 'Our optimized delivery system ensures your food arrives hot and fresh within 30 minutes, every single time you order.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We believe in giving back. A portion of every order supports local food banks and community dining programs in your neighborhood.',
  },
  {
    icon: Star,
    title: 'AI-Powered Experience',
    description: 'Our intelligent system learns your preferences to recommend dishes you will love, making every dining experience uniquely personal.',
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[#FF6B00]/[0.03] blur-[120px] pointer-events-none" />

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
            <span className="text-[#FF6B00] text-sm font-semibold italic tracking-wide">Our Story</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#FF6B00]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]">DineFlow</span>
          </h2>
          <p className="text-[#B3B3B3] max-w-2xl mx-auto leading-relaxed">
            Born from a passion for exceptional food and cutting-edge technology, DineFlow redefines the dining experience.
            We combine culinary artistry with AI intelligence to bring you flavors that inspire.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.08 }}
                className="glass rounded-2xl p-6 hover:border-[#FF6B00]/20 transition-all duration-300 group"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#FF6B00]/15 to-[#FF8A3D]/10 flex items-center justify-center mb-4 group-hover:from-[#FF6B00]/25 group-hover:to-[#FF8A3D]/15 transition-all">
                  <Icon className="h-5 w-5 text-[#FF6B00]" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#7A7A7A] leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mt-14 rounded-2xl glass border-gradient p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10K+', label: 'Happy Customers' },
              { value: '200+', label: 'Menu Items' },
              { value: '4.9', label: 'Average Rating' },
              { value: '50+', label: 'Expert Chefs' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]">
                  {stat.value}
                </p>
                <p className="text-xs text-[#7A7A7A] mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
