"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe, BarChart3, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-background/60 backdrop-blur-xl border-b border-border z-[100] flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg aurum-gradient flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-black text-2xl italic">A</span>
          </div>
          <span className="font-bold tracking-tighter text-xl">AurumCRM</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#solutions" className="hover:text-foreground transition-colors">Solutions</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold hover:text-primary transition-colors">Sign in</Link>
          <Button className="aurum-gradient rounded-full px-6 text-white font-bold h-10 shadow-lg shadow-primary/20">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: Pipeline Intelligence v2.0
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8"
          >
            The Operating System for <span className="aurum-text-gradient italic">Revenue Teams.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12 leading-relaxed"
          >
            Manage your entire sales cycle from lead to close with an enterprise-grade platform built for modern, high-growth revenue operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="h-14 px-10 rounded-full aurum-gradient text-white text-lg font-bold shadow-xl shadow-primary/30 group" asChild>
              <Link href="/login">
                Start for free
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 rounded-full border-border bg-muted/20 hover:bg-muted text-lg font-semibold transition-all">
              Book a demo
            </Button>
          </motion.div>
        </div>

        {/* Dashboard Preview Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 max-w-[1400px] mx-auto relative group"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative rounded-2xl border border-border shadow-2xl overflow-hidden bg-background">
            <div className="h-8 w-full border-b border-border bg-muted/40 flex items-center gap-2 px-4">
              <div className="h-2 w-2 rounded-full bg-rose-500/40" />
              <div className="h-2 w-2 rounded-full bg-amber-500/40" />
              <div className="h-2 w-2 rounded-full bg-emerald-500/40" />
            </div>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
              alt="Dashboard Preview"
              className="w-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            />
          </div>
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-border bg-muted/10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-12">Trusted by the next generation of giants</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-40 grayscale transition-all hover:grayscale-0">
             {/* Simulating company logos */}
             {['Stripe', 'Linear', 'Vercel', 'Notion', 'Hubspot', 'Monday'].map(name => (
               <span key={name} className="text-xl font-black italic tracking-tighter text-center">{name}</span>
             ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Enterprise features. <span className="text-muted-foreground">Startup speed.</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to orchestrate complex sales operations without the technical overhead.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Pipeline Intelligence', desc: 'Predictive lead scoring and deal health monitoring powered by advanced analytics.', icon: Zap },
              { title: 'Global Operations', desc: 'Manage distributed teams with role-based access and regional data compliance.', icon: Globe },
              { title: 'Revenue Forecasting', desc: 'Accurate data-driven forecasting to help your team hit targets with confidence.', icon: BarChart3 },
              { title: 'Relationship Audit', desc: 'Full interaction history with automatic activity logging across all channels.', icon: Clock },
              { title: 'Collaboration Hub', desc: 'Built-in team communication, meeting scheduling, and shared lead context.', icon: Users },
              { title: 'Secure Compliance', desc: 'Enterprise-grade security with SOC2 type II readiness and encrypted data stores.', icon: ShieldCheck },
            ].map((feature, i) => (
              <Card key={i} className="p-8 border-border/40 hover:border-primary/20 transition-all group">
                <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 aurum-gradient opacity-[0.03]" />
        <div className="max-w-[1000px] mx-auto bg-card border border-border p-12 md:p-24 rounded-3xl text-center relative z-10 shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">Ready to transform your <span className="aurum-text-gradient">Revenue Ops?</span></h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-12 rounded-full aurum-gradient text-white text-lg font-bold shadow-xl shadow-primary/30" asChild>
              <Link href="/login">Get Started for Free</Link>
            </Button>
            <Button variant="ghost" size="lg" className="h-14 px-8 rounded-full text-lg font-semibold hover:bg-muted">
              Talk to Sales
            </Button>
          </div>
          <p className="mt-8 text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border px-6 lg:px-12 bg-muted/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg aurum-gradient flex items-center justify-center">
                  <span className="text-white font-black text-xl italic">A</span>
                </div>
                <span className="font-bold tracking-tighter text-lg">AurumCRM</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                The next-generation CRM for modern revenue teams. Built with love in San Francisco.
              </p>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Security'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link}><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">© 2026 Aurum Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-muted-foreground">
             <span className="text-[10px] font-bold hover:text-foreground cursor-pointer transition-colors uppercase tracking-widest">Twitter</span>
             <span className="text-[10px] font-bold hover:text-foreground cursor-pointer transition-colors uppercase tracking-widest">GitHub</span>
             <span className="text-[10px] font-bold hover:text-foreground cursor-pointer transition-colors uppercase tracking-widest">LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}