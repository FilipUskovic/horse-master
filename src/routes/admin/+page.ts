import { supabase } from '$lib/supabase';
import { redirect } from '@sveltejs/kit';

// no SSR jer je ovo admin panel (client site rendering)
export const ssr = false;

export const load = async () => {
    // chech session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        throw redirect(303, '/login');
    }

    // fetch pics from gallery
    const { data: photos, error: photosError } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

    // fetch news 
    const { data: newsPosts, error: newsError } = await supabase
        .from("updates")
        .select("*")
        .order("created_at", { ascending: false });

    return {
        session,
        photos: photos || [],
        newsPosts: newsPosts || []
    };
};