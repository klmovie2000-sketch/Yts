
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1d1d1d] border-t border-[#2d2d2d] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="space-y-4">
            <img 
              src="https://yts.mx/assets/images/website/logo-YTS.svg" 
              alt="YTS" 
              className="h-8 opacity-60"
            />
            <p className="text-gray-500 text-sm leading-relaxed">
              YTS Clone is a movie torrent platform built for educational purposes. 
              Small file sizes, high quality.
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-2">Links</h4>
            <button onClick={() => onNavigate('home')} className="text-left text-gray-500 hover:text-white transition text-sm">Home</button>
            <button className="text-left text-gray-500 hover:text-white transition text-sm">Browse Movies</button>
            <button className="text-left text-gray-500 hover:text-white transition text-sm">Trending</button>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-2">Legal</h4>
            <span className="text-gray-500 text-sm">Terms of Service</span>
            <span className="text-gray-500 text-sm">Privacy Policy</span>
            <span className="text-gray-500 text-sm">DMCA</span>
          </div>
        </div>
        
        <div className="border-t border-[#2d2d2d] pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs font-bold space-y-4 md:space-y-0">
          <p>© 2011 - 2025 YTS - Official Torrent Site</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">RSS</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
