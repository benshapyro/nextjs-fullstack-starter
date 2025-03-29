import { type NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// This route is called by Supabase Auth after email confirmation
// or password reset
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code);
  }
  
  // Redirect the user back to the homepage or dashboard
  return NextResponse.redirect(new URL('/dashboard', request.url));
} 