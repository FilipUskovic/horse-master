import { supabase } from '$lib/supabase';

// exe before page is loaded
export async function load() {
    const { data, error } = await supabase
        .from('gallery')
        .select('image_url, title, title_en, display_order')
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Greška pri učitavanju iz baze:", error);
        return { supabasePhotos: [] }; 
    }

    return {
        supabasePhotos: data || []
    };
}