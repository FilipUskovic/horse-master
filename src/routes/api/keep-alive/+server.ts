import { json, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
//import { CRON_SECRET } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
    //  (Authorization Bearer)
    const authHeader = request.headers.get('authorization');
    
    /*
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
        throw error(401, 'Unauthorized - Pristup zabranjen');
    }
        */


    //  RPC pinga
    const { data, dbError } = await (supabase.rpc('ping') as any);

    if (dbError) {
        console.error('Keep-alive rpc failed:', dbError.message);
        return json({ success: false, error: dbError.message }, { status: 500 });
    }

    return json({ 
        success: true, 
        response: data, 
        timestamp: new Date().toISOString() 
    });
};