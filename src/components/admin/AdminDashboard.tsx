'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  ClipboardList,
  CalendarDays,
  Search,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react';
import MenuItemManager from './MenuItemManager';

const NAV_ITEMS = [
  { key: 'menu' as const, label: 'Menu Items', icon: UtensilsCrossed },
  { key: 'orders' as const, label: 'Orders', icon: ClipboardList },
  { key: 'reservations' as const, label: 'Reservations', icon: CalendarDays },
  { key: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
  { key: 'settings' as const, label: 'Settings', icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'reservations' | 'analytics' | 'settings'>('menu');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/[0.06] bg-[#0A0A0A] pt-16 transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo area */}
        <div className="px-5 py-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8A3D] flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.2)]">
              <svg viewBox="0 0 200 200" className="h-4 w-4" fill="none">
                <rect x="72" y="48" width="5" height="65" rx="2.5" fill="white"/>
                <rect x="60" y="28" width="4" height="28" rx="2" fill="white"/>
                <rect x="72" y="28" width="4" height="28" rx="2" fill="white"/>
                <rect x="84" y="28" width="4" height="28" rx="2" fill="white"/>
                <path d="M64 56 Q74 68 84 56" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <path d="M112 30 L112 85 Q112 95 120 95 Q128 95 128 85 L128 30 Q120 24 112 30Z" fill="white" opacity="0.9"/>
                <rect x="115" y="95" width="10" height="25" rx="3" fill="white" opacity="0.7"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white">DineFlow</p>
              <p className="text-[10px] text-[#7A7A7A] uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeTab === item.key
                  ? 'bg-gradient-to-r from-[#FF6B00]/15 to-[#FF8A3D]/5 text-[#FF6B00] border border-[#FF6B00]/20'
                  : 'text-[#7A7A7A] hover:bg-white/[0.03] hover:text-[#B3B3B3]'
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
              {activeTab === item.key && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_6px_rgba(255,107,0,0.5)]" />
              )}
            </button>
          ))}
        </nav>

        {/* AI Feature card */}
        <div className="mx-3 mt-4 p-4 rounded-xl bg-gradient-to-br from-[#FF6B00]/10 to-[#FF8A3D]/5 border border-[#FF6B00]/15">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-[#FF6B00]" />
            <p className="text-xs font-semibold text-[#FF6B00]">AI Description Writer</p>
          </div>
          <p className="text-[10px] text-[#7A7A7A] leading-relaxed">
            Click &quot;Improve with AI&quot; on any menu item to generate mouth-watering descriptions.
          </p>
        </div>

        {/* Bottom logout */}
        <div className="absolute bottom-4 left-3 right-3">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#7A7A7A] hover:bg-white/[0.03] hover:text-[#B3B3B3] transition-all">
            <LogOut className="h-[18px] w-[18px]" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 bg-[#0F0F0F] p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-[#B3B3B3] bg-white/5 border border-white/[0.06] hover:text-white transition-all"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          Menu
        </button>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'menu' && <MenuItemManager />}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Orders</h2>
                <p className="text-sm text-[#7A7A7A] mt-1">Manage incoming and past orders</p>
              </div>
              <div className="rounded-2xl bg-[#1A1A1A] border border-white/[0.06] p-10 text-center">
                <ClipboardList className="mx-auto mb-3 h-10 w-10 text-[#7A7A7A]/30" />
                <p className="text-[#7A7A7A]">No orders yet</p>
                <p className="mt-1 text-xs text-[#7A7A7A]/50">Orders will appear here when customers place them</p>
              </div>
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Reservations</h2>
                <p className="text-sm text-[#7A7A7A] mt-1">View and manage table reservations</p>
              </div>
              <div className="rounded-2xl bg-[#1A1A1A] border border-white/[0.06] p-10 text-center">
                <CalendarDays className="mx-auto mb-3 h-10 w-10 text-[#7A7A7A]/30" />
                <p className="text-[#7A7A7A]">No reservations yet</p>
                <p className="mt-1 text-xs text-[#7A7A7A]/50">Reservations will appear here when customers book tables</p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Analytics</h2>
                <p className="text-sm text-[#7A7A7A] mt-1">Track your restaurant performance</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Total Orders', value: '0', icon: '📦' },
                  { label: 'Revenue', value: '$0', icon: '💰' },
                  { label: 'Avg Rating', value: '4.8', icon: '⭐' },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl p-5 border-gradient">
                    <span className="text-2xl">{stat.icon}</span>
                    <p className="text-2xl font-bold text-white mt-3">{stat.value}</p>
                    <p className="text-xs text-[#7A7A7A] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <p className="text-sm text-[#7A7A7A] mt-1">Configure your restaurant</p>
              </div>
              <div className="glass rounded-2xl p-6 border-gradient">
                <p className="text-sm text-[#B3B3B3]">Settings panel coming soon...</p>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
