'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AddEditItemDialog from './AddEditItemDialog';
import { useStore, type MenuItem } from '@/store/useStore';
import { toast } from 'sonner';

export default function MenuItemManager() {
  const { menuItems, setMenuItems } = useStore();
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !item.available }),
      });
      if (res.ok) {
        const updated = await res.json();
        setMenuItems(menuItems.map((m) => (m.id === item.id ? { ...m, ...updated } : m)));
        toast.success(`${item.name} is now ${!item.available ? 'available' : 'unavailable'}`);
      }
    } catch {
      toast.error('Failed to update item');
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/menu/${deleteItem.id}`, { method: 'DELETE' });
      if (res.ok) {
        setMenuItems(menuItems.filter((m) => m.id !== deleteItem.id));
        toast.success(`${deleteItem.name} deleted`);
        setDeleteItem(null);
      }
    } catch {
      toast.error('Failed to delete item');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleItemSaved = (item: MenuItem) => {
    if (editItem) {
      setMenuItems(menuItems.map((m) => (m.id === item.id ? item : m)));
      toast.success(`${item.name} updated`);
    } else {
      setMenuItems([item, ...menuItems]);
      toast.success(`${item.name} added to menu`);
    }
    setEditItem(null);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Menu Items</h2>
          <p className="text-sm text-[#7A7A7A] mt-1">{menuItems.length} items across 8 categories</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setIsAddOpen(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:shadow-[0_0_30px_rgba(255,107,0,0.35)] transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          Add New Item
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7A7A]" />
        <input
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-10 rounded-xl bg-white/5 border border-white/[0.08] text-white text-sm placeholder-[#7A7A7A] focus:outline-none focus:border-[#FF6B00]/40 transition-all"
        />
      </div>

      <div className="rounded-2xl border border-white/[0.06] overflow-hidden bg-[#1A1A1A]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                <TableHead className="text-[#7A7A7A] font-medium text-xs uppercase tracking-wider">Item</TableHead>
                <TableHead className="text-[#7A7A7A] font-medium text-xs uppercase tracking-wider">Category</TableHead>
                <TableHead className="text-[#7A7A7A] font-medium text-xs uppercase tracking-wider">Price</TableHead>
                <TableHead className="text-[#7A7A7A] font-medium text-xs uppercase tracking-wider">Rating</TableHead>
                <TableHead className="text-[#7A7A7A] font-medium text-xs uppercase tracking-wider">Available</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-[#7A7A7A]">No items found</TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#111] flex items-center justify-center overflow-hidden border border-white/[0.06]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate text-sm">{item.name}</p>
                          <p className="text-xs text-[#7A7A7A] truncate">{item.description.slice(0, 40)}...</p>
                        </div>
                        {item.isPopular && (
                          <span className="shrink-0 text-[10px] font-semibold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded-md">Popular</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-medium text-[#B3B3B3] bg-white/5 px-2.5 py-1 rounded-lg">{item.category}</span>
                    </TableCell>
                    <TableCell className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] text-sm">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-[#B3B3B3]">⭐ {item.rating}</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.available}
                        onCheckedChange={() => handleToggleAvailability(item)}
                      />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="h-8 w-8 flex items-center justify-center rounded-lg text-[#7A7A7A] hover:text-white hover:bg-white/5 transition-all">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/[0.06] rounded-xl">
                          <DropdownMenuItem onClick={() => setEditItem(item)} className="gap-2 text-[#B3B3B3] focus:text-white focus:bg-white/5 rounded-lg">
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleAvailability(item)} className="gap-2 text-[#B3B3B3] focus:text-white focus:bg-white/5 rounded-lg">
                            {item.available ? <><EyeOff className="h-4 w-4" /> Mark Unavailable</> : <><Eye className="h-4 w-4" /> Mark Available</>}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeleteItem(item)} className="gap-2 text-red-400 focus:text-red-300 focus:bg-red-500/10 rounded-lg">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddEditItemDialog
        open={isAddOpen || !!editItem}
        item={editItem}
        onClose={() => { setIsAddOpen(false); setEditItem(null); }}
        onSave={handleItemSaved}
      />

      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent className="bg-[#1A1A1A] border border-white/[0.06] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Menu Item</AlertDialogTitle>
            <AlertDialogDescription className="text-[#7A7A7A]">
              Are you sure you want to delete &quot;{deleteItem?.name}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-[#B3B3B3] bg-white/5 border-white/[0.06] hover:text-white hover:bg-white/10 rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 text-white hover:bg-red-600 rounded-xl"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
