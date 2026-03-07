import { supabase } from '../lib/supabase';
import { UserRole, Business, BusinessMedia, PackageType } from '../types';

export const supabaseService = {
  // --- Auth ---
  async signUp(email: string, password: string, fullName: string, role: UserRole, extraData: any = {}) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        }
      }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Signup failed');

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name: fullName,
        email: email,
        role: role,
        ...extraData
      });

    if (profileError) throw profileError;

    return authData.user;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  // --- Businesses ---
  async createBusiness(businessData: Partial<Business>) {
    const { data, error } = await supabase
      .from('businesses')
      .insert(businessData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getBusinesses(filters: { status?: string, category?: string, district?: string } = {}) {
    let query = supabase.from('businesses').select('*');
    
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.category) query = query.eq('category', filters.category);
    if (filters.district) query = query.eq('location_district', filters.district);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getBusinessById(id: string) {
    const { data, error } = await supabase
      .from('businesses')
      .select('*, business_media(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async updateBusiness(id: string, updates: Partial<Business>) {
    const { data, error } = await supabase
      .from('businesses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // --- Storage ---
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
      
    return publicUrl;
  },

  // --- Activity & Analytics ---
  async logActivity(activity: { business_id: string, activity_type: string, visitor_continent: string, visitor_country?: string }) {
    const { error } = await supabase
      .from('tourist_activity')
      .insert(activity);
    if (error) console.error('Failed to log activity:', error);
  },

  async getAdminAnalytics() {
    // This would ideally be a RPC or complex query
    // For now, we'll fetch raw data and process it
    const { data: activityData, error: activityError } = await supabase
      .from('tourist_activity')
      .select('visitor_continent');
    
    const { data: businessData, error: businessError } = await supabase
      .from('businesses')
      .select('location_district');

    if (activityError || businessError) throw new Error('Failed to fetch analytics');

    return {
      continents: activityData,
      districts: businessData
    };
  },

  // --- Reviews & Bookmarks ---
  async addReview(review: { business_id: string, user_id: string, rating: number, comment: string }) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async toggleBookmark(userId: string, businessId: string) {
    // Check if exists
    const { data: existing } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .eq('business_id', businessId)
      .single();

    if (existing) {
      await supabase.from('bookmarks').delete().eq('id', existing.id);
      return false;
    } else {
      await supabase.from('bookmarks').insert({ user_id: userId, business_id: businessId });
      return true;
    }
  }
};
