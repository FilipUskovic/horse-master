<script lang="ts">
    let { 
        title = "Horse Master", 
        description = "Vrhunska škola jahanja i briga o konjima. Pridružite nam se u avanturi.", 
        image = "/images/image00001.jepg" 
    } = $props();

    const siteUrl = "https://horse-master.vercel.app"; // real url Tvoj added this when deloyed
</script>

<svelte:head>
    <title>{title} | Horse Master</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="konji, jahanje, škola jahanja, horse riding, štala, konjički klub" />
    <meta name="author" content="Horse Master Team" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:title" content="{title} | Horse Master" />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="{siteUrl}{image}" />
    <meta property="og:site_name" content="Horse Master" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{title} | Horse Master" />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content="{siteUrl}{image}" />
</svelte:head>