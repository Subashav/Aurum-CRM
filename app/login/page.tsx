"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Github, Chrome, Lock, Mail, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Immediate feedback and reliable redirection
    toast.success('Successfully logged in');
    router.replace('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col md:flex-row relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
      
      {/* Left Side: Brand & Visuals */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-muted/20 border-r border-border relative">
        <div className="absolute inset-0 aurum-gradient opacity-[0.02]" />
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="h-8 w-8 rounded-lg aurum-gradient flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-black text-xl italic">A</span>
          </div>
          <span className="font-bold tracking-tighter text-lg">AurumCRM</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
              Enterprise Trust
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-[1.1]">
              Secure entry to your <span className="aurum-text-gradient">Command Center.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Experience the power of advanced revenue operations with SOC2-grade security and modern authentication.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Security', value: '256-bit AES', icon: Lock },
              { label: 'Uptime', value: '99.99%', icon: Globe },
              { label: 'Latency', value: '< 100ms', icon: Zap },
              { label: 'Compliance', value: 'SOC2 Type II', icon: ShieldCheck },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
                <stat.icon size={16} className="text-primary mb-2" />
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
                <p className="text-sm font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">© 2026 Aurum Technologies</p>
          <div className="flex gap-4">
            <div className="h-4 w-4 bg-muted-foreground/20 rounded-full" />
            <div className="h-4 w-4 bg-muted-foreground/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight italic">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Sign in to manage your pipeline</p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full h-12 rounded-xl gap-3 border-border hover:bg-muted transition-all font-semibold">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl gap-3 border-border hover:bg-muted transition-all font-semibold">
              <Github size={18} className="text-foreground" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  type="email" 
                  placeholder="name@company.com" 
                  required 
                  className="h-12 pl-12 rounded-xl bg-muted/20 border-border/60 focus:bg-background transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  required 
                  className="h-12 pl-12 rounded-xl bg-muted/20 border-border/60 focus:bg-background transition-all"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 rounded-xl aurum-gradient text-white font-bold shadow-lg shadow-primary/20 group"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign in
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            By signing in, you agree to our <Link href="#" className="underline hover:text-primary">Terms of Service</Link> and <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </div>
      </div>
      
      {/* Visual background for mobile */}
      <div className="md:hidden absolute -bottom-20 -left-20 h-64 w-64 bg-primary/10 blur-[100px] rounded-full -z-10" />
    </div>
  );
}

// Re-using same icons from landing for consistency
function Globe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
