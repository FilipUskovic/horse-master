import { supabase } from '$lib/supabase';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    // Heuristički pristup: Ako nema aktivne sesije, šalji korisnika na login
    if (!session) {
        throw redirect(303, '/login');
    }

    return { session };
};