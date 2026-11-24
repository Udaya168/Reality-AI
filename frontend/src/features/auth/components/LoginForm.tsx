import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const LoginForm: React.FC<{
  onSubmit: (email: string) => void;
}> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div>
        <label className="block font-mono uppercase text-[#354B60] mb-1">Email *</label>
        <div className="relative">
          <Mail className="w-4 h-4 text-[#354B60] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rohan@realityai.estate"
            className="w-full pl-9 pr-3 py-2.5 border border-[#D9E0E6] rounded-2xl focus:outline-none focus:border-[#183653]"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono uppercase text-[#354B60] mb-1">Password *</label>
        <div className="relative">
          <Lock className="w-4 h-4 text-[#354B60] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 border border-[#D9E0E6] rounded-2xl focus:outline-none focus:border-[#183653]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#354B60] hover:text-[#102B46]"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Sign In
      </Button>
    </form>
  );
};
