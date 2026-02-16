import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';
// SEO optimization to get better visibility on google
export const load: PageLoad = async () => {
    // last 3 
    const { data: news, error } = await supabase
        .from('updates') 
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

    // if is erros show empty 
    if (error) {
        console.error("Greška pri dohvaćanju novosti:", error.message);
    }

    return {
        news: news || [],
        seo: {
            title: "Početna | Horse Master - Transport Konja",
            description: "Najsigurniji i najpouzdaniji transport konja u regiji. Udobnost i sigurnost vaših šampiona na prvom mjestu."
        }
    };
};