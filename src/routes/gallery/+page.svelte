<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { fade } from 'svelte/transition';

    // 1. Ovdje ručno definiramo slike koje imaš u folderu (da galerija ne bude prazna)
    let localImages = [
        { src: '/images/image00001.jpeg', title: 'Transport Konja' },
        { src: '/images/image00003.jpeg', title: 'Naš Tim' },
        { src: '/images/image00005.jpeg', title: 'Utovar' },
        { src: '/images/image00006.jpeg', title: 'Sigurna Prikolica' },
        { src: '/images/image00007.jpeg', title: 'Putovanje' },
        { src: '/images/image00008.jpeg', title: 'Zadovoljni Klijenti' }
    ];

    let supabasePhotos: any[] = [];

    // 2. Dohvaćamo dodatne slike iz baze (ako ih ima)
    onMount(async () => {
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            supabasePhotos = data;
        }
    });

    // Spajamo lokalne i baza slike u jednu listu za prikaz
    $: allImages = [...localImages, ...supabasePhotos];
</script>

<svelte:head>
    <title>Galerija | Horse Master</title>
</svelte:head>

<section class="bg-gray-50 py-24 min-h-screen">
    <div class="max-w-7xl mx-auto px-4">
        
        <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                NAŠA <span class="text-blue-600">GALERIJA</span>
            </h1>
            <p class="text-gray-500 max-w-2xl mx-auto">
                Pogledajte djelić atmosfere s naših putovanja. Svaka slika priča priču o sigurnosti i povjerenju.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {#each allImages as img, i}
                {@const imageSource = img.src || img.image_url}
                {@const imageTitle = img.title || 'Galerija'}

                <div 
                    class="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                    in:fade={{ delay: i * 100 }}
                >
                    
                    <img 
                        src={imageSource} 
                        alt={imageTitle}
                        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                        <span class="text-white text-lg font-bold tracking-wider border-b-2 border-blue-500 pb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {imageTitle}
                        </span>
                    </div>

                </div>
            {/each}
        </div>

        {#if allImages.length === 0}
            <div class="text-center py-20 text-gray-400">
                <p>Trenutno nema fotografija u galeriji.</p>
            </div>
        {/if}

    </div>
</section>