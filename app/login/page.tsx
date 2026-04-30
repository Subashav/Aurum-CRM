'use client';

import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    await new Promise(r => setTimeout(r, 1200));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="h-16 w-16 bg-amber-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-amber-500/20 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
            <Shield className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">AURUM CRM</h1>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Enterprise Revenue Operations</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Access Token</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 text-black h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-amber-400 shadow-xl shadow-amber-500/10 transition-all group"
            >
              {isLoading ? 'Authenticating...' : (
                <>
                  Enter Workspace
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Or continue with</p>
            <div className="flex gap-4 w-full">
              <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 flex items-center justify-center transition-colors">
                <Github className="h-4 w-4 text-white/60" />
              </button>
              <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 flex items-center justify-center transition-colors">
                <div className="h-4 w-4 rounded-full border-2 border-white/60 border-t-transparent" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">
          &copy; 2026 Aurum Technologies. All rights secured.
        </p>
      </div>
    </div>
  );
}
