import Link from 'next/link';
import { ArrowRight, KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <main className="min-h-screen px-4 py-6 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center">
        <div className="grid w-full gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-surface/80 p-8 shadow-atmosphere backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.26em] text-white/40">Secure access</p>
            <h1 className="mt-4 text-display text-5xl leading-none text-white">Welcome back.</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
              Enter the operational workspace with OTP-ready, security-first authentication screens.
            </p>

            <div className="mt-8 space-y-4 text-sm text-white/70">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-amber-200" />Session tracking and device awareness</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-amber-200" />OTP verification and reset flows</div>
              <div className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-amber-200" />Password hashing and role-based access</div>
            </div>
          </div>

          <Card className="p-8">
            <h2 className="text-display text-3xl text-white">Sign in</h2>
            <p className="mt-2 text-sm text-white/55">Premium auth screen placeholder for login, forgot password, OTP, and reset flows.</p>

            <form className="mt-8 space-y-4">
              <Input type="email" placeholder="Email address" />
              <Input type="password" placeholder="Password" />
              <Button className="w-full justify-between">
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-white/55">
              <Link href="/auth/forgot-password" className="hover:text-white">Forgot password?</Link>
              <Link href="/auth/otp" className="hover:text-white">Use OTP</Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}