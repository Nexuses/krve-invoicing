"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Interface for the navigation items
 */
interface NavItem {
  id: string;
  label: string;
  href: string;
  isButton?: boolean;
  children?: {
    id: string;
    label: string;
    description?: string;
    href: string;
    icon?: string;
  }[];
}
const NAV_ITEMS: NavItem[] = [{
  id: 'about',
  label: 'About Us',
  href: 'https://krvauditing.co/about-us/'
}, {
  id: 'blogs',
  label: 'Blog',
  href: 'https://krvauditing.co/blogs/'
}, {
  id: 'solutions',
  label: 'Solutions',
  href: '#',
  children: [{
    id: 'setup',
    label: 'Business Setup in UAE',
    description: 'Comprehensive guidance for setting up your business in the Emirates.',
    href: 'https://krvauditing.co/business-setup/',
    icon: 'https://i0.wp.com/krvauditing.co/wp-content/uploads/2024/06/Business-Setup-inUAE.png?fit=512%2C512&ssl=1'
  }, {
    id: 'tax',
    label: 'Corporate Tax & VAT',
    description: 'Expert advisory on UAE tax laws and compliance.',
    href: 'https://krvauditing.co/corporate-tax/',
    icon: 'https://i0.wp.com/krvauditing.co/wp-content/uploads/2024/06/Corporate-Tax-VAT.png?fit=512%2C512&ssl=1'
  }, {
    id: 'difc',
    label: 'DIFC Approved Auditors',
    description: 'Quality audit services approved by the DIFC authority.',
    href: 'https://krvauditing.co/difc/',
    icon: 'https://i0.wp.com/krvauditing.co/wp-content/uploads/2024/06/DIFC-ApprovedAuditors.png?fit=512%2C512&ssl=1'
  }, {
    id: 'registration',
    label: 'Corporate Tax Registration',
    description: 'Hassle-free registration services for corporate taxation.',
    href: 'https://krvauditing.co/ct-registration/',
    icon: 'https://i0.wp.com/krvauditing.co/wp-content/uploads/2024/06/Corporate-TaxRegistration.png?fit=256%2C256&ssl=1'
  }]
}, {
  id: 'contact',
  label: 'Contact Us',
  href: 'https://krvauditing.co/contact/'
}];

// @component: HeaderMenu
export const HeaderMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // @return
  return <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12', scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-5' : 'bg-transparent py-8')}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a href="#" className="flex items-center">
            <img src="https://i0.wp.com/krvauditing.co/wp-content/uploads/2024/06/krv-logo-color.png?fit=493%2C245&ssl=1" alt="KRV Auditing" className="h-12 md:h-14 w-auto transition-transform hover:scale-105" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {NAV_ITEMS.map(item => {
          if (item.isButton) {
            return <a key={item.id} href={item.href} className="ml-4 px-6 py-2.5 bg-[#01445E] text-white font-medium rounded-lg hover:bg-[#01354a] transition-colors shadow-lg shadow-[#01445E]/20">
                  {item.label}
                </a>;
          }
          if (item.children) {
            return <div key={item.id} className="relative group" onMouseEnter={() => setActiveSubmenu(item.id)} onMouseLeave={() => setActiveSubmenu(null)}>
                  <button className="flex items-center px-4 py-2 text-[17px] font-medium text-gray-600 hover:text-[#01445E] transition-colors group">
                    {item.label}
                    <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>

                  <AnimatePresence>
                    {activeSubmenu === item.id && <motion.div initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: 10
                }} transition={{
                  duration: 0.2
                }} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-2 gap-2 p-4">
                          {item.children.map(child => <a key={child.id} href={child.href} className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors group/item">
                              <div className="flex-shrink-0 w-12 h-12 bg-[#01445E]/5 rounded-lg flex items-center justify-center mr-4 group-hover/item:bg-[#01445E]/10 transition-colors">
                                <img src={child.icon} alt="" className="w-8 h-8 object-contain" />
                              </div>
                              <div>
                                <h4 className="text-[15px] font-semibold text-gray-900 group-hover/item:text-[#01445E]">
                                  {child.label}
                                </h4>
                                <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                                  {child.description}
                                </p>
                              </div>
                            </a>)}
                        </div>
                        <div className="bg-gray-50 p-4 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                          <span>Verified Professional Services</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </motion.div>}
                  </AnimatePresence>
                </div>;
          }
          return <a key={item.id} href={item.href} className="px-4 py-2 text-[17px] font-medium text-gray-600 hover:text-[#01445E] transition-colors relative group">
                {item.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#01445E] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>;
        })}
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="p-2 text-gray-600 hover:text-[#01445E] transition-colors" aria-label="Toggle navigation menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={toggleMobileMenu} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" />
            <motion.div initial={{
          x: '100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '100%'
        }} transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }} className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[400px] bg-white z-50 lg:hidden shadow-2xl flex flex-col">
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <img src="https://i0.wp.com/krvauditing.co/wp-content/uploads/2024/06/krv-logo-color.png?fit=493%2C245&ssl=1" alt="KRV Auditing" className="h-8 w-auto" />
                <button onClick={toggleMobileMenu} className="p-2 text-gray-400">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {NAV_ITEMS.map(item => <div key={item.id} className="space-y-4">
                    {item.children ? <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          {item.label}
                        </p>
                        <div className="grid gap-4 pl-2">
                          {item.children.map(child => <a key={child.id} href={child.href} className="flex items-center space-x-3 group">
                              <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                                <img src={child.icon} alt="" className="w-5 h-5 object-contain" />
                              </div>
                              <span className="text-gray-700 font-medium group-hover:text-[#01445E]">
                                {child.label}
                              </span>
                            </a>)}
                        </div>
                      </div> : item.isButton ? <a href={item.href} className="block w-full text-center px-6 py-4 bg-[#01445E] text-white font-semibold rounded-xl">
                        {item.label}
                      </a> : <a href={item.href} className="block text-xl font-semibold text-gray-800 hover:text-[#01445E]">
                        {item.label}
                      </a>}
                  </div>)}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <p className="text-center text-sm text-gray-500 font-medium">
                  © 2024 KRV Auditing. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </header>;
};
