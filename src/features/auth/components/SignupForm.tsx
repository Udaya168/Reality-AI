import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';

export const SignupForm: React.FC<{
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
}> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div>
        <label className="block font-mono uppercase text-[#737970] mb-1">Full Legal Name *</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2.5 border border-[#E7E6DF] rounded-[1px] focus:outline-none focus:border-[#183D30]"
        />
      </div>
      <div>
        <label className="block font-mono uppercase text-[#737970] mb-1">Email Address *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2.5 border border-[#E7E6DF] rounded-[1px] focus:outline-none focus:border-[#183D30]"
        />
      </div>
      <div>
        <label className="block font-mono uppercase text-[#737970] mb-1">Phone Number *</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2.5 border border-[#E7E6DF] rounded-[1px] focus:outline-none focus:border-[#183D30]"
        />
      </div>
      <div>
        <label className="block font-mono uppercase text-[#737970] mb-1">Password *</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2.5 border border-[#E7E6DF] rounded-[1px] focus:outline-none focus:border-[#183D30]"
        />
      </div>
      <Button type="submit" variant="primary" className="w-full">
        Create Account
      </Button>
    </form>
  );
};
