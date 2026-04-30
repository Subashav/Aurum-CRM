import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen px-4 py-6 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center">
        <Card className="w-full p-8">
          <p className="text-[11px] uppercase tracking-[0.26em] text-white/40">Account recovery</p>
          <h1 className="mt-4 text-display text-4xl text-white">Forgot password</h1>
          <p className="mt-3 text-sm text-white/55">Recover access through a secure reset workflow.</p>
          <div className="mt-8 space-y-4">
            <Input type="email" placeholder="Email address" />
            <Button className="w-full justify-between">
              Send reset link
              <Mail className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-5 text-sm text-white/55">
            <Link href="/auth/login" className="hover:text-white">Back to login</Link>
          </div>
        </Card>
      </div>
    </main>
  );
}