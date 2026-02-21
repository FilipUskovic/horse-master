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
        // new selct for "2jezcini"
        .select("id, image_url, title, title_en, description, description_en, display_order, created_at")
        .order("created_at", { ascending: false });

    // fetch news 
    const { data: newsPosts, error: newsError } = await supabase
        .from("updates")
        .select("id, title, content, title_en, content_en, image_url, created_at")
        .order("created_at", { ascending: false });

        if (photosError || newsError) {
        console.error("Supabase Error:", photosError || newsError);
    }

    return {
        session,
        photos: photos || [],
        newsPosts: newsPosts || []
    };
};