'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';
import { type MenuItem } from '@/store/useStore';
import { toast } from 'sonner';

const CATEGORIES = ['Pizza', 'Burgers', 'Salads', 'Seafood', 'Pasta', 'Appetizers', 'Drinks', 'Desserts'];

interface AddEditItemDialogProps {
  open: boolean;
  item: MenuItem | null;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
}

export default function AddEditItemDialog({ open, item, onClose, onSave }: AddEditItemDialogProps) {
  const [form, setForm] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price?.toString() || '',
    category: item?.category || 'Pizza',
    image: item?.image || '',
    available: item?.available ?? true,
    isPopular: item?.isPopular ?? false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const isEdit = !!item;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImproveDescription = async () => {
    if (!form.name || !form.description) {
      toast.error('Please enter a name and description first');
      return;
    }
    setIsImproving(true);
    try {
      const res = await fetch('/api/improve-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, description: form.description }),
      });
      if (res.ok) {
        const data = await res.json();
        setForm({ ...form, description: data.description });
        toast.success('Description improved with AI!');
      } else {
        toast.error('Failed to improve description');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsImproving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price || !form.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSaving(true);
    try {
      const url = isEdit ? `/api/menu/${item.id}` : '/api/menu';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
      });
      if (res.ok) {
        const savedItem = await res.json();
        onSave(savedItem);
      } else {
        toast.error('Failed to save item');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) { onClose(); return; }
    setForm({
      name: item?.name || '',
      description: item?.description || '',
      price: item?.price?.toString() || '',
      category: item?.category || 'Pizza',
      image: item?.image || '',
      available: item?.available ?? true,
      isPopular: item?.isPopular ?? false,
    });
  };

  const inputClass = "w-full h-10 px-3.5 rounded-xl bg-white/5 border border-white/[0.08] text-white text-sm placeholder-[#7A7A7A] focus:outline-none focus:border-[#FF6B00]/40 focus:shadow-[0_0_15px_rgba(255,107,0,0.1)] transition-all";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg bg-[#1A1A1A] border border-white/[0.06] rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">{isEdit ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
          <DialogDescription className="text-[#7A7A7A]">
            {isEdit ? 'Update the details of this menu item' : 'Add a new dish to your restaurant menu'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label className="text-[#B3B3B3] text-xs font-medium">Name *</Label>
            <input name="name" placeholder="e.g., Margherita Pizza" value={form.name} onChange={handleChange} required className={inputClass} />
          </div>

          {/* Description with AI button */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[#B3B3B3] text-xs font-medium">Description *</Label>
              <button
                type="button"
                onClick={handleImproveDescription}
                disabled={isImproving}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#FF6B00] bg-[#FF6B00]/10 hover:bg-[#FF6B00]/15 transition-all disabled:opacity-50"
              >
                {isImproving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                {isImproving ? 'Improving...' : '✨ Improve with AI'}
              </button>
            </div>
            <textarea
              name="description" placeholder="Describe the dish..." value={form.description} onChange={handleChange} required rows={3}
              className={`${inputClass} h-auto resize-none py-2.5`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-[#B3B3B3] text-xs font-medium">Price ($) *</Label>
              <input name="price" type="number" step="0.01" min="0" placeholder="14.99" value={form.price} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-[#B3B3B3] text-xs font-medium">Category *</Label>
              <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                <SelectTrigger className="h-10 rounded-xl bg-white/5 border-white/[0.08] text-white text-sm focus:ring-0 focus:border-[#FF6B00]/40">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-white/[0.06] rounded-xl">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-[#B3B3B3] focus:text-white focus:bg-white/5 rounded-lg">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#B3B3B3] text-xs font-medium">Image URL</Label>
            <input name="image" placeholder="/food/my-dish.png" value={form.image} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <Switch id="item-available" checked={form.available} onCheckedChange={(checked) => setForm({ ...form, available: checked })} />
              <Label htmlFor="item-available" className="cursor-pointer text-sm text-[#B3B3B3]">Available</Label>
            </div>
            <div className="flex items-center gap-2.5">
              <Switch id="item-popular" checked={form.isPopular} onCheckedChange={(checked) => setForm({ ...form, isPopular: checked })} />
              <Label htmlFor="item-popular" className="cursor-pointer text-sm text-[#B3B3B3]">Popular</Label>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 mt-2">
            <DialogClose asChild>
              <button type="button" className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#B3B3B3] bg-white/5 border border-white/[0.06] hover:text-white transition-all">Cancel</button>
            </DialogClose>
            <button
              type="submit" disabled={isSaving}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:shadow-[0_0_30px_rgba(255,107,0,0.35)] transition-all disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Item'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
