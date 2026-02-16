import { PUBLIC_WEB3FORMS_ACCESS_KEY } from '$env/static/public';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        
        const name = formData.get('name')?.toString().trim() || '';
        const email = formData.get('email')?.toString().trim() || '';
        const message = formData.get('message')?.toString().trim() || '';

        // validation
        let errors: Record<string, string> = {};
        if (name.length < 2) errors.name = "Ime mora imati barem 2 slova.";
        if (!email.includes('@')) errors.email = "Unesite ispravan email.";
        if (message.length < 10) errors.message = "Poruka mora imati barem 10 znakova.";

        // objects taht we return every fails methods
        const baseReturn = { name, email, userMessage: message, errors };

        if (Object.keys(errors).length > 0) {
            return fail(400, { success: false, statusMessage: "Ispravite greške.", ...baseReturn });
        }

        if (!PUBLIC_WEB3FORMS_ACCESS_KEY) {
            return fail(500, { success: false, statusMessage: "Greška: API ključ nije pronađen u .env datoteci.", ...baseReturn });
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: PUBLIC_WEB3FORMS_ACCESS_KEY,
                    name,
                    email,
                    message
                })
            });

            const result = await response.json();

            if (result.success) {
                return { success: true, statusMessage: "Poruka poslana!", ...baseReturn };
            } else {
                return fail(400, { success: false, statusMessage: result.message || "Slanje nije uspjelo.", ...baseReturn });
            }
        } catch (e) {
            return fail(500, { success: false, statusMessage: "Mrežna greška. Provjerite vezu.", ...baseReturn });
        }
    }
};