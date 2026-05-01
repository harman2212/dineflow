'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Search, Clock, CheckCircle2, ChefHat, Truck, Package, X } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface OrderStatus {
  status: string;
  createdAt: string;
}

const ORDER_STEPS = [
  { key: 'pending', label: 'Order Placed', icon: Package, description: 'Your order has been received' },
  { key: 'preparing', label: 'Preparing', icon: ChefHat, description: 'Our chefs are working on it' },
  { key: 'ready', label: 'Ready', icon: CheckCircle2, description: 'Your order is ready for pickup' },
  { key: 'delivered', label: 'Delivered', icon: Truck, description: 'Enjoy your meal!' },
];

export default function OrderTracking() {
  const { currentOrderId, setCurrentOrderId } = useStore();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [simulatedStep, setSimulatedStep] = useState(0);
  const estimatedTimeRef = useRef(25);
  const [displayTime, setDisplayTime] = useState(25);
  const currentStepRef = useRef(0);

  const fetchOrderStatus = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`);
      if (res.ok) {
        const order = await res.json();
        setOrderStatus(order);
        const stepIndex = ORDER_STEPS.findIndex((s) => s.key === order.status);
        const step = stepIndex >= 0 ? stepIndex : 0;
        setSimulatedStep(step);
        currentStepRef.current = step;
      }
    } catch {
      setOrderStatus({ status: 'pending', createdAt: new Date().toISOString() });
      setSimulatedStep(0);
      currentStepRef.current = 0;
      setIsTracking(true);
    }
  }, []);

  const startTracking = useCallback((id: string) => {
    setCurrentOrderId(id);
    fetchOrderStatus(id);
    setIsTracking(true);
    estimatedTimeRef.current = 25;
    setDisplayTime(25);
    currentStepRef.current = 0;
  }, [fetchOrderStatus, setCurrentOrderId]);

  // Auto-track when dialog opens with a currentOrderId (e.g. after placing order)
  useEffect(() => {
    if (currentOrderId && !isTracking) {
      setOrderIdInput(currentOrderId);
      startTracking(currentOrderId);
    }
  }, [currentOrderId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Timer simulation - uses refs for mutable values to avoid re-creating interval
  useEffect(() => {
    if (!isTracking || !orderStatus) return;
    const STEP_DURATIONS = [25, 8, 6];
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += 1000;
      const remaining = Math.max(0, estimatedTimeRef.current - elapsed / 1000);
      if (remaining <= 0 && currentStepRef.current < ORDER_STEPS.length - 1) {
        currentStepRef.current++;
        setSimulatedStep(currentStepRef.current);
        estimatedTimeRef.current = STEP_DURATIONS[currentStepRef.current - 1];
        elapsed = 0;
      }
      setDisplayTime(Math.max(0, Math.ceil(Math.max(0, estimatedTimeRef.current - elapsed / 1000))));
    }, 1000);
    return () => clearInterval(timer);
  }, [isTracking, orderStatus]);

  const getStepStatus = (index: number) => {
    if (index < simulatedStep) return 'completed';
    if (index === simulatedStep) return 'active';
    return 'pending';
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setCurrentOrderId(null);
      setIsTracking(false);
      setOrderStatus(null);
      setSimulatedStep(0);
      setOrderIdInput('');
      setDisplayTime(25);
    }
  };

  return (
    <Dialog open={!!currentOrderId} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-[#1A1A1A] border border-white/[0.06] rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-white">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8A3D] flex items-center justify-center">
              <Truck className="h-4 w-4 text-white" />
            </div>
            Track Your Order
          </DialogTitle>
          <DialogDescription className="text-[#7A7A7A]">
            Real-time updates on your order status
          </DialogDescription>
        </DialogHeader>

        {!isTracking ? (
          <div className="mx-auto flex max-w-sm gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7A7A]" />
              <input
                placeholder="Enter order ID..."
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && orderIdInput.trim() && startTracking(orderIdInput.trim())}
                className="w-full h-11 pl-10 rounded-xl bg-white/5 border border-white/[0.08] text-white text-sm placeholder-[#7A7A7A] focus:outline-none focus:border-[#FF6B00]/40 transition-all"
              />
            </div>
            <button
              onClick={() => orderIdInput.trim() && startTracking(orderIdInput.trim())}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] shadow-[0_0_20px_rgba(255,107,0,0.25)] hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] transition-all"
            >
              Track
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 mt-2">
            {/* Order Info */}
            <div className="glass rounded-2xl p-5 border-gradient">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#7A7A7A] uppercase tracking-wider">Order ID</p>
                  <p className="font-mono font-semibold text-white mt-0.5 text-sm">
                    {currentOrderId || orderIdInput}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#FF6B00]/10 px-4 py-2">
                  <Clock className="h-4 w-4 text-[#FF6B00]" />
                  <span className="text-sm font-semibold text-[#FF6B00]">~{displayTime} min</span>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="relative space-y-0">
              {ORDER_STEPS.map((step, index) => {
                const status = getStepStatus(index);
                const Icon = step.icon;
                const isLast = index === ORDER_STEPS.length - 1;
                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="relative flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                          status === 'completed'
                            ? 'border-[#FF6B00] bg-gradient-to-br from-[#FF6B00] to-[#FF8A3D] text-white shadow-[0_0_20px_rgba(255,107,0,0.3)]'
                            : status === 'active'
                            ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00] shadow-[0_0_25px_rgba(255,107,0,0.2)]'
                            : 'border-white/10 bg-[#1A1A1A] text-[#7A7A7A]'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      {!isLast && (
                        <div
                          className={`h-12 w-0.5 transition-all duration-500 ${
                            status === 'completed' ? 'bg-gradient-to-b from-[#FF6B00] to-[#FF8A3D]/30' : 'bg-white/[0.06]'
                          }`}
                        />
                      )}
                    </div>
                    <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                      <h4 className={`text-sm font-semibold transition-colors ${
                        status === 'completed' ? 'text-[#FF6B00]' : status === 'active' ? 'text-white' : 'text-[#7A7A7A]'
                      }`}>
                        {step.label}
                        {status === 'active' && (
                          <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="ml-2 inline-block h-2 w-2 rounded-full bg-[#FF6B00]"
                          />
                        )}
                      </h4>
                      <p className="text-xs text-[#7A7A7A] mt-0.5">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => handleClose(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-[#B3B3B3] bg-white/5 border border-white/[0.06] hover:text-white hover:border-[#FF6B00]/20 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
