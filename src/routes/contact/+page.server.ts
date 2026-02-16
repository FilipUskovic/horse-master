import { PUBLIC_WEB3FORMS_ACCESS_KEY } from '$env/static/public'; 
 import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, fetch }) => {
        // 1. Preuzimanje podataka iz forme
        const formData = await request.formData();
        
        // Debugging: Provjera je li ključ učitan iz .env datoteke
        console.log("Provjera okruženja - Ključ:", PUBLIC_WEB3FORMS_ACCESS_KEY ? "PRONAĐEN" : "NIJE PRONAĐEN");

        // 2. Dodavanje tajnog ključa (ostaje na backendu, sigurno od korisnika)
        formData.append('access_key', PUBLIC_WEB3FORMS_ACCESS_KEY);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            // 3. Slanje zahtjeva prema Web3Forms API-ju
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // User-Agent simulira stvarni Chrome preglednik kako bi se izbjegao Cloudflare "Just a moment"
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                body: json
            });

            // 4. Obrada odgovora kao teksta (sigurnije zbog Cloudflare HTML grešaka)
            const responseText = await response.text();
            
            // Ispisujemo prvih 200 znakova odgovora u terminal za lakši debug
            console.log("SIROVI ODGOVOR SERVERA:", responseText.slice(0, 200));

            // 5. Pokušaj pretvaranja u JSON
            const result = JSON.parse(responseText);

            if (result.success) {
                return { success: true };
            } else {
                // Vraćamo grešku koju je poslao sam API (npr. neispravan ključ)
                return fail(response.status, { 
                    success: false, 
                    message: result.message || 'Web3Forms je odbio zahtjev.' 
                });
            }

        } catch (error: any) {
            // Hvatanje grešaka poput SyntaxError (ako dobijemo HTML umjesto JSON-a)
            console.error("KRITIČNA GREŠKA NA SERVERU:", error.message);
            
            return fail(500, { 
                success: false, 
                message: 'Došlo je do greške u komunikaciji. Cloudflare možda i dalje blokira serverski pristup.' 
            });
        }
    }
};