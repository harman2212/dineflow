'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Flame, ChevronRight } from 'lucide-react';
import MenuItemCard from './MenuItemCard';
import { useStore } from '@/store/useStore';

const CATEGORIES = [
  'All',
  'Pizza',
  'Burgers',
  'Salads',
  'Seafood',
  'Pasta',
  'Appetizers',
  'Drinks',
  'Desserts',
];

const CATEGORY_ICONS: Record<string, string> = {
  Pizza: '🍕',
  Burgers: '🍔',
  Salads: '🥗',
  Seafood: '🐟',
  Pasta: '🍝',
  Appetizers: '🍗',
  Drinks: '🥤',
  Desserts: '🍰',
};

export default function MenuGrid() {
  const {
    menuItems,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useStore();

  const popularItems = useMemo(
    () => menuItems.filter((item) => item.isPopular && item.available),
    [menuItems]
  );

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (selectedCategory !== 'All') {
      items = items.filter((item) => item.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [menuItems, selectedCategory, searchQuery]);

  const showPopular = !searchQuery.trim() && selectedCategory === 'All';

  return (
    <section className="py-12 sm:py-20 bg-dots relative">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-[#FF6B00]/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Popular Categories Section */}
        {showPopular && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Popular Categories</h2>
                <p className="text-sm text-[#7A7A7A] mt-1">Explore our wide range of cuisines</p>
              </div>
              <button className="flex items-center gap-1 text-sm text-[#FF6B00] hover:text-[#FF8A3D] transition-colors">
                View All <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
              {Object.entries(CATEGORY_ICONS).map(([cat, icon], i) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex flex-col items-center gap-2 min-w-[80px] px-4 py-4 rounded-2xl border transition-all duration-300 shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-b from-[#FF6B00]/10 to-[#FF6B00]/5 border-[#FF6B00]/30 shadow-[0_0_20px_rgba(255,107,0,0.1)]'
                      : 'bg-[#1A1A1A] border-white/[0.06] hover:border-[#FF6B00]/20 hover:shadow-[0_0_15px_rgba(255,107,0,0.08)]'
                  }`}
                >
                  <span className="text-2xl">{icon}</span>
                  <span className={`text-xs font-medium ${selectedCategory === cat ? 'text-[#FF6B00]' : 'text-[#B3B3B3]'}`}>
                    {cat}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section Header - Popular Dishes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {showPopular ? (
                <>
                  Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]">Dishes</span>
                </>
              ) : (
                <>
                  {selectedCategory !== 'All' ? selectedCategory : 'All'}{' '}
                  <span className="text-[#B3B3B3]">Menu</span>
                </>
              )}
            </h2>
            <p className="text-sm text-[#7A7A7A] mt-1">
              AI-crafted descriptions for every dish
            </p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mx-auto mb-8 max-w-md"
        >
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7A7A]" />
          <input
            placeholder="Search dishes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/5 border border-white/[0.08] text-white text-sm placeholder-[#7A7A7A] focus:outline-none focus:border-[#FF6B00]/40 focus:shadow-[0_0_15px_rgba(255,107,0,0.1)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>

        {/* Category Pills (horizontal) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] text-white shadow-[0_0_20px_rgba(255,107,0,0.25)]'
                  : 'bg-white/5 text-[#B3B3B3] border border-white/[0.06] hover:text-white hover:border-[#FF6B00]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Popular Items - Horizontal Scroll (only when no filter) */}
        {showPopular && popularItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-5">
              <Flame className="h-5 w-5 text-[#FF6B00]" />
              <h3 className="text-lg font-semibold">Most Popular</h3>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {popularItems.map((item, i) => (
                <div
                  key={item.id}
                  className="w-[260px] sm:w-[280px] shrink-0"
                >
                  <MenuItemCard item={item} index={i} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filtered Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, i) => (
              <MenuItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="mb-4 rounded-full bg-white/5 p-6">
              <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#7A7A7A]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">No dishes found</h3>
            <p className="text-sm text-[#7A7A7A] mb-4">
              Try adjusting your search or filter
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-white/5 border border-white/[0.06] text-[#B3B3B3] hover:text-white hover:border-[#FF6B00]/20 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Stats Section */}
        {showPopular && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: '🍽️', value: '50+', label: 'Menu Items' },
              { icon: '📦', value: '100+', label: 'Orders Daily' },
              { icon: '⭐', value: '4.8', label: 'Average Rating' },
              { icon: '😊', value: '99%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-5 text-center hover:border-[#FF6B00]/20 transition-all duration-300 group"
              >
                <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">{stat.icon}</span>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-[#7A7A7A] mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
