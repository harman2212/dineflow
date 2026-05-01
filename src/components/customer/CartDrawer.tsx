'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { useState } from 'react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    setCurrentOrderId,
  } = useStore();

  const [isPlacing, setIsPlacing] = useState(false);
  const subtotal = cartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setIsPlacing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          total,
          customerName: 'Guest',
          customerPhone: '000-000-0000',
        }),
      });
      const order = await res.json();
      if (res.ok) {
        clearCart();
        setCartOpen(false);
        setCurrentOrderId(order.id);
        toast.success('Order placed successfully!', {
          description: `Order #${order.id.slice(-6)}`,
        });
      } else {
        toast.error('Failed to place order');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col bg-[#1A1A1A] border-l border-white/[0.06] sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 text-lg text-white">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8A3D] flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-white" />
            </div>
            Your Cart
            {cart.length > 0 && (
              <span className="text-sm font-normal text-[#7A7A7A]">
                ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="mb-4 rounded-full bg-white/5 p-6">
                  <ShoppingBag className="h-10 w-10 text-[#7A7A7A]" />
                </div>
                <h3 className="mb-1 font-semibold text-white">Your cart is empty</h3>
                <p className="text-sm text-[#7A7A7A]">
                  Add some delicious items to get started!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3 px-1">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3"
                  >
                    <div className="h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#111] flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium leading-tight line-clamp-1 text-white">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 shrink-0 text-[#7A7A7A] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/[0.06] text-[#B3B3B3] hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/[0.06] text-[#B3B3B3] hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {cart.length > 0 && (
          <div className="border-t border-white/[0.06] pt-4">
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-[#B3B3B3]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#B3B3B3]">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="bg-white/[0.06]" />
              <div className="flex justify-between text-base font-bold">
                <span className="text-white">Total</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            <SheetFooter className="mt-4 flex-col gap-2 sm:flex-col">
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacing}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:shadow-[0_0_35px_rgba(255,107,0,0.35)] transition-all duration-300 disabled:opacity-50"
              >
                {isPlacing ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
              </button>
              <button
                onClick={clearCart}
                className="w-full py-3 rounded-xl text-sm font-medium text-[#7A7A7A] bg-white/5 border border-white/[0.06] hover:text-red-400 hover:border-red-400/20 transition-all"
              >
                Clear Cart
              </button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
