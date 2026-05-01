'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { CalendarDays, Clock, Users } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export default function ReservationForm() {
  const { isReservationOpen, setReservationOpen } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', date: '', time: '', guests: '2', notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time || !form.guests) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Reservation confirmed!', {
          description: `Table for ${form.guests} on ${form.date} at ${form.time}`,
        });
        setReservationOpen(false);
        setForm({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' });
      } else {
        toast.error('Failed to make reservation');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full h-10 px-3.5 rounded-xl bg-white/5 border border-white/[0.08] text-white text-sm placeholder-[#7A7A7A] focus:outline-none focus:border-[#FF6B00]/40 focus:shadow-[0_0_15px_rgba(255,107,0,0.1)] transition-all";

  return (
    <Dialog open={isReservationOpen} onOpenChange={setReservationOpen}>
      <DialogContent className="sm:max-w-md bg-[#1A1A1A] border border-white/[0.06] rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-white">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8A3D] flex items-center justify-center">
              <CalendarDays className="h-4 w-4 text-white" />
            </div>
            Reserve a Table
          </DialogTitle>
          <DialogDescription className="text-[#7A7A7A]">
            Book your dining experience at DineFlow
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#B3B3B3] text-xs font-medium">Name *</Label>
            <input id="name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required className={inputClass} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#B3B3B3] text-xs font-medium">Phone *</Label>
            <input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" value={form.phone} onChange={handleChange} required className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-[#B3B3B3] text-xs font-medium">Date *</Label>
              <input id="date" name="date" type="date" min={getMinDate()} value={form.date} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-[#B3B3B3] text-xs font-medium">Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#7A7A7A]" />
                <input id="time" name="time" type="time" value={form.time} onChange={handleChange} required className={`${inputClass} pl-9`} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="guests" className="text-[#B3B3B3] text-xs font-medium">Number of Guests *</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#7A7A7A]" />
              <input id="guests" name="guests" type="number" min="1" max="20" value={form.guests} onChange={handleChange} required className={`${inputClass} pl-9`} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-[#B3B3B3] text-xs font-medium">Special Requests</Label>
            <textarea
              id="notes" name="notes" placeholder="Allergies, special occasions, seating preferences..."
              value={form.notes} onChange={handleChange} rows={3}
              className={`${inputClass} h-auto resize-none py-2.5`}
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0 mt-2">
            <DialogClose asChild>
              <button type="button" className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#B3B3B3] bg-white/5 border border-white/[0.06] hover:text-white transition-all">
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit" disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:shadow-[0_0_30px_rgba(255,107,0,0.35)] transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Reserving...' : 'Confirm Reservation'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
