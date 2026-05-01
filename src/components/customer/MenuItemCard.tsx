'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Flame } from 'lucide-react';
import { useStore, type MenuItem } from '@/store/useStore';
import { toast } from 'sonner';

interface MenuItemCardProps {
  item: MenuItem;
  index?: number;
}

export default function MenuItemCard({ item, index = 0 }: MenuItemCardProps) {
  const addToCart = useStore((s) => s.addToCart);

  const handleAddToCart = () => {
    if (!item.available) {
      toast.error('This item is currently unavailable');
      return;
    }
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    toast.success(`${item.name} added to cart`, {
      description: `$${item.price.toFixed(2)}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-luxury group cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#111]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {item.isPopular && (
            <span className="badge-popular flex items-center gap-1">
              <Flame className="h-3 w-3" /> Popular
            </span>
          )}
          {!item.available && (
            <span className="bg-black/70 text-white backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-medium border border-white/10">
              Sold Out
            </span>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute right-3 top-3">
          <span className="bg-black/60 text-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[11px] font-medium border border-white/10">
            {item.category}
          </span>
        </div>

        {/* Hover overlay with Add to Cart */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={!item.available}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name & Price */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold leading-tight line-clamp-1 text-white">
            {item.name}
          </h3>
          <span className="shrink-0 text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-[#7A7A7A] line-clamp-2 leading-relaxed mb-3">
          {item.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-white">{item.rating}</span>
          </div>
          <span className="text-[10px] text-[#7A7A7A]">({useMemo(() => 50 + Math.abs(item.id.charCodeAt(0)) % 200, [item.id])} reviews)</span>
        </div>
      </div>
    </motion.div>
  );
}
