import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const { data, error } = await supabase
        .from('updates')
        .select('id, title, title_en, content, content_en, image_url, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        return { 
            news: [], 
            seo: { title: "Novosti", description: "Naše najnovije vijesti" } 
        }; 
    }

    return {
        news: data ?? [],
        seo: { title: "Novosti", description: "Naše najnovije vijesti" }
    };
};