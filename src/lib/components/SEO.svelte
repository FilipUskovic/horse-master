<script lang="ts">
import { t, locale } from 'svelte-i18n';
    
   let { 
        title = undefined, 
        description = undefined, 
        image = "/images/image00001.jpeg", 
        type = "website" 
    } = $props();


    let seoTitle = $derived(title ?? $t('seo.default_title'));
    let seoDesc = $derived(description ?? $t('seo.default_description'));
    const siteUrl = "https://horsemaster.hr";
    let fullImageUrl = $derived(`${siteUrl}${image}`);

    let locationName = $derived($locale === 'en' ? 'Croatia' : 'Hrvatska');

    //  JSON-LD:
    let businessSchema = $derived({
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation", // 
        "name": "Horse Master",
        "description": seoDesc,
        "image": fullImageUrl,
        "@id": siteUrl,
        "url": siteUrl,
        "telephone": "+385 91 135 5169",
        "email": "petar.uskovic@gmail.com",  
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Gregurić breg 48a", 
            "addressLocality": "Samobor",
            "postalCode": "10430",
            "addressCountry": "HR",
            "description": locationName
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "sameAs": [
            "https://instagram.com/tvoj_instagram", 
            "https://facebook.com/tvoj_facebook"
        ]
    });

let jsonLdString = $derived(`<script type="application/ld+json">${JSON.stringify(businessSchema)}<\/script>`);
</script>

<svelte:head>
    <title>{seoTitle} | Horse Master</title>    <meta name="description" content={seoDesc} />
    <meta name="keywords" content={$t('seo.keywords')} />
    <meta name="author" content="Horse Master Team" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta property="og:type" content={type} />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:title" content="{seoTitle} | Horse Master" />
    <meta property="og:description" content={seoDesc} />
    <meta property="og:image" content={fullImageUrl} />
    <meta property="og:site_name" content="Horse Master" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{seoTitle} | Horse Master" />
    <meta name="twitter:description" content={seoDesc} />
    <meta name="twitter:image" content={fullImageUrl} />

    {@html jsonLdString}
</svelte:head>