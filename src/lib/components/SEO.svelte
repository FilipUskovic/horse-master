<script lang="ts">
    /* src/lib/components/SEO.svelte */
    
   let { 
        title = "Horse Master", 
        description = "Vrhunska škola jahanja i briga o konjima. Pridružite nam se u avanturi.", 
        image = "/images/image00001.jpeg", 
        type = "website" 
    } = $props();

    const siteUrl = "https://horse-master.vercel.app";
    let fullImageUrl = $derived(`${siteUrl}${image}`);

    //  JSON-LD:
    let businessSchema = $derived({
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation", // 
        "name": "Horse Master",
        "image": fullImageUrl,
        "@id": siteUrl,
        "url": siteUrl,
        "telephone": "+385 91 135 5169",
        "email": "petar.uskovic@gmail.com",  
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Neka ADRESA", // 
            "addressLocality": "Samobor",
            "postalCode": "10000",
            "addressCountry": "HR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 45.8150, 
            "longitude": 15.9819 
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
    <title>{title} | Horse Master</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="konji, jahanje, škola jahanja, horse riding, štala, konjički klub, transport konja" />
    <meta name="author" content="Horse Master Team" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta property="og:type" content={type} />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:title" content="{title} | Horse Master" />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={fullImageUrl} />
    <meta property="og:site_name" content="Horse Master" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{title} | Horse Master" />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={fullImageUrl} />

    {@html jsonLdString}
</svelte:head>