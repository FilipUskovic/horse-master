import type { PageLoad } from './$types';
// SEO optimization to get better visibility on google
export const load: PageLoad = () => {
    return {
        seo: {
            title: "Početna | Horse Master - Transport Konja",
            description: "Najsigurniji i najpouzdaniji transport konja u regiji. Udobnost i sigurnost vaših šampiona na prvom mjestu."
        }
    };
};