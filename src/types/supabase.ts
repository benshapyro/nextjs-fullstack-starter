export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          user_id?: string;
        };
      };
      
      tasks: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string | null;
          title: string;
          description: string | null;
          is_complete: boolean;
          user_id: string;
          due_date: string | null;
          priority: 'low' | 'medium' | 'high' | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          title: string;
          description?: string | null;
          is_complete?: boolean;
          user_id: string;
          due_date?: string | null;
          priority?: 'low' | 'medium' | 'high' | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          title?: string;
          description?: string | null;
          is_complete?: boolean;
          user_id?: string;
          due_date?: string | null;
          priority?: 'low' | 'medium' | 'high' | null;
        };
      };
    };
    
    Views: {
      [_ in never]: never;
    };
    
    Functions: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row'];
  
export type InsertTables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert'];
  
export type UpdateTables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Update'];

// Auth types
export type UserMetadata = {
  name?: string;
  avatar_url?: string;
};

export interface UserProfile extends Tables<'profiles'> {
  auth_user?: {
    email: string;
  };
} 