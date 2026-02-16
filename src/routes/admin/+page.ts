import { supabase } from '$lib/supabase';
import { redirect } from '@sveltejs/kit';

// for better supabase admin panel autg sessions
export const ssr = false;

export const load = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    //if there is not main session redirect
    if (!session) {
        throw redirect(303, '/login');
    }

    return { session };
};