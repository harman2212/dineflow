'use client';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="DineFlow"
                className="h-9 w-9 rounded-[10px] shadow-[0_0_15px_rgba(255,107,0,0.2)]"
              />
              <span className="text-lg font-bold tracking-wide">
                Dine<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]">Flow</span>
              </span>
            </div>
            <p className="text-sm text-[#7A7A7A] leading-relaxed">
              AI-powered dining experience. Smart menu descriptions, seamless ordering, and unforgettable flavors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {['About Us', 'Our Menu', 'Reservations', 'Careers'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-[#7A7A7A] transition-colors hover:text-[#FF6B00]">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">Contact</h3>
            <ul className="space-y-2.5 text-sm text-[#7A7A7A]">
              <li>123 Culinary Avenue</li>
              <li>New York, NY 10001</li>
              <li className="text-[#FF6B00]">contact@dineflow.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">Hours</h3>
            <ul className="space-y-2.5 text-sm text-[#7A7A7A]">
              <li className="flex justify-between"><span>Mon - Fri</span><span className="text-[#B3B3B3]">11am - 10pm</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="text-[#B3B3B3]">10am - 11pm</span></li>
              <li className="flex justify-between"><span>Sunday</span><span className="text-[#B3B3B3]">10am - 9pm</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-[#7A7A7A]">© {new Date().getFullYear()} DineFlow. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-xs text-[#7A7A7A] transition-colors hover:text-[#FF6B00]">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
