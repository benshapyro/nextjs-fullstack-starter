'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LucideHome, LucideSettings, LucideUser, LucideLogOut } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          throw error || new Error('No session');
        }
        
        setUser(session.user);
      } catch (error) {
        console.error('Error getting user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    
    getUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - hidden on mobile, visible on md screens and up */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-white shadow-md dark:bg-gray-800 md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b px-6">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            <a href="#" className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              <LucideHome className="mr-3 h-5 w-5" />
              Home
            </a>
            <a href="#" className="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
              <LucideUser className="mr-3 h-5 w-5" />
              Profile
            </a>
            <a href="#" className="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
              <LucideSettings className="mr-3 h-5 w-5" />
              Settings
            </a>
          </nav>
          <div className="border-t p-4">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <LucideLogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header - visible on mobile, hidden on md screens and up */}
      <header className="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-between bg-white shadow-md dark:bg-gray-800 md:hidden">
        <div className="px-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <div className="px-4">
          <button
            onClick={handleSignOut}
            className="text-gray-500 dark:text-gray-400"
          >
            <LucideLogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main content - adjusted for mobile and desktop */}
      <main className="flex-1 overflow-y-auto p-4 md:ml-64">
        <div className="container mx-auto mt-16 md:mt-0">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h1 className="mb-4 text-2xl font-bold">Welcome to your Dashboard</h1>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Hello, {user?.email}! This is a responsive dashboard layout that adapts to different screen sizes.
            </p>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Dashboard cards - responsive grid */}
              <div className="rounded-lg bg-blue-50 p-6 shadow-sm dark:bg-blue-900/20">
                <h3 className="mb-2 font-semibold">Total Users</h3>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div className="rounded-lg bg-green-50 p-6 shadow-sm dark:bg-green-900/20">
                <h3 className="mb-2 font-semibold">Revenue</h3>
                <p className="text-2xl font-bold">$45,678</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-6 shadow-sm dark:bg-purple-900/20">
                <h3 className="mb-2 font-semibold">Orders</h3>
                <p className="text-2xl font-bold">567</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-6 shadow-sm dark:bg-amber-900/20">
                <h3 className="mb-2 font-semibold">Conversion</h3>
                <p className="text-2xl font-bold">2.3%</p>
              </div>
            </div>
            
            <div className="mt-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold">Recent Activity</h2>
              <ul className="divide-y dark:divide-gray-700">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li key={item} className="py-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">
                          Activity item {item}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 