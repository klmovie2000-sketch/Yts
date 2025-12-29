
import React from 'react';
import { Page, User } from '../types';
import { Search, User as UserIcon, LogOut, Settings, X } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  currentPage: Page;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onNavigate: (page: Page) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  currentPage, 
  onLoginClick, 
  onLogoutClick, 
  onNavigate,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="bg-[#1d1d1d] border-b border-[#2d2d2d] sticky top-0 z-40 backdrop-blur-md bg-[#1d1d1d]/90">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div 
            className="cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <img 
              src="https://yts.mx/assets/images/website/logo-YTS.svg" 
              alt="YTS" 
              className="h-8 md:h-9 hover:opacity-80 transition active:scale-95"
            />
          </div>
          
          <div className="hidden lg:flex items-center space-x-2 text-[11px] text-gray-500 font-bold uppercase tracking-[0.1em] italic">
            <span>HD movies at the smallest size.</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 flex-grow max-w-xl mx-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className={`${searchQuery ? 'text-[#6ac045]' : 'text-gray-500'} transition-colors`} />
            </div>
            <input 
              type="text" 
              placeholder="Quick search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-[#171717] border border-[#2d2d2d] rounded-full pl-10 pr-10 py-1.5 w-full text-sm focus:outline-none focus:border-[#6ac045] focus:ring-1 focus:ring-[#6ac045]/30 transition-all font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-bold">
            <button 
              onClick={() => onNavigate('home')}
              className={`${currentPage === 'home' ? 'text-[#6ac045]' : 'text-gray-400'} hover:text-white transition tracking-wide uppercase text-[12px]`}
            >
              Home
            </button>
            <button 
              className="text-gray-400 hover:text-[#6ac045] transition tracking-wide uppercase text-[12px]"
              onClick={() => onNavigate('browse')}
            >
              4K
            </button>
            <button 
              className="text-gray-400 hover:text-[#6ac045] transition tracking-wide uppercase text-[12px]"
              onClick={() => onNavigate('trending')}
            >
              Trending
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              {user.role === 'admin' && (
                <button 
                  onClick={() => onNavigate('admin')}
                  className={`flex items-center space-x-1 transition p-1.5 rounded-lg ${currentPage === 'admin' ? 'bg-[#6ac045] text-black' : 'text-gray-400 hover:text-[#6ac045] hover:bg-white/5'}`}
                  title="Dashboard"
                >
                  <Settings size={20} />
                </button>
              )}
              <div className="flex items-center space-x-2 bg-white/5 pr-3 pl-1.5 py-1 rounded-full border border-white/5">
                <div className="bg-[#6ac045] p-1 rounded-full text-black shadow-lg shadow-[#6ac045]/20">
                  <UserIcon size={14} strokeWidth={3} />
                </div>
                <span className="hidden sm:inline text-xs font-bold truncate max-w-[80px]">
                  {user.username}
                </span>
              </div>
              <button 
                onClick={onLogoutClick}
                className="text-gray-500 hover:text-red-500 transition p-1.5 hover:bg-red-500/5 rounded-lg"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center text-xs font-bold uppercase tracking-widest">
              <button 
                onClick={onLoginClick}
                className="text-gray-400 hover:text-white transition px-3 py-1.5"
              >
                Login
              </button>
              <span className="text-gray-700 select-none">/</span>
              <button 
                onClick={onLoginClick}
                className="text-gray-400 hover:text-white transition px-3 py-1.5"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
