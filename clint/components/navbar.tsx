'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Activity, 
  Newspaper, 
  BarChart3, 
  TrendingUp, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  Home,
  DollarSign,
  Users,
  HelpCircle,
  LogOut,
  User,
  Sun,
  Moon
} from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/home', icon: Home },
    { name: 'Market Watch', href: '/market-watch', icon: Activity },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Charts', href: '/charts', icon: BarChart3 },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl' 
          : 'bg-gradient-to-r from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-md border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <Activity className="h-8 w-8 text-purple-400 relative z-10" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                    StockMarket
                  </h1>
                  <p className="text-xs text-purple-400/70">Live Trading Platform</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      active
                        ? 'text-purple-400 bg-purple-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${active ? 'text-purple-400' : 'text-slate-400 group-hover:text-purple-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {active && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="hidden lg:flex items-center bg-white/5 rounded-lg px-3 py-1.5 border border-white/10 focus-within:border-purple-500/50 focus-within:bg-purple-500/5 transition-all">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-400 w-40 ml-2"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-purple-500/30"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 text-yellow-400" />
                ) : (
                  <Moon className="h-4 w-4 text-purple-400" />
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-purple-500/30">
                <Bell className="h-4 w-4 text-slate-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              </button>

              {/* User Profile */}
              <div className="hidden md:flex items-center gap-3 ml-2">
                <div className="w-px h-6 bg-white/10"></div>
                <button className="flex items-center gap-2 p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all border border-purple-500/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs text-white font-medium">John Doe</p>
                    <p className="text-xs text-purple-400">Premium</p>
                  </div>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-white" />
                ) : (
                  <Menu className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-purple-500/20">
            <div className="px-4 py-3 space-y-2">
              {/* Search Bar for Mobile */}
              <div className="flex items-center bg-white/5 rounded-lg px-3 py-2 border border-white/10 mb-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-400 flex-1 ml-2"
                />
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      active
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    )}
                  </Link>
                );
              })}

              <div className="pt-3 mt-3 border-t border-white/10">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">John Doe</p>
                    <p className="text-xs text-purple-400">john.doe@example.com</p>
                  </div>
                  <LogOut className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding under navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;