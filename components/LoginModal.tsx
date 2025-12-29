
import React, { useState } from 'react';
import { X, Lock, User } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (username: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1d1d1d] w-full max-w-md border border-[#2d2d2d] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-[#2d2d2d] flex items-center justify-between bg-[#212121]">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Lock className="text-[#6ac045]" size={20} />
            <span>Login to YTS</span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded text-sm text-blue-200">
            <p className="font-bold">Pro Tip:</p>
            <p>Type <strong>"admin"</strong> as username to access the Dashboard.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text"
                  required
                  className="w-full bg-[#121212] border border-[#2d2d2d] focus:border-[#6ac045] rounded-md pl-10 pr-4 py-3 outline-none transition"
                  placeholder="Username or Email"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password"
                  required
                  className="w-full bg-[#121212] border border-[#2d2d2d] focus:border-[#6ac045] rounded-md pl-10 pr-4 py-3 outline-none transition"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#6ac045] text-black font-bold py-3 rounded-md hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#6ac045]/10"
          >
            Sign In
          </button>
          
          <div className="text-center">
            <button type="button" className="text-sm text-gray-500 hover:text-[#6ac045] font-bold transition">
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
