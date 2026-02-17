<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { fade, scale, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    interface GalleryImage {
        image_url: string;
        title: string;
    }

    let localImages: GalleryImage[] = [
        { image_url: '/images/image00001.jpeg', title: 'Snimanje 1' },
        { image_url: '/images/image00003.jpeg', title: 'Nas tim' },
        { image_url: '/images/image00005.jpeg', title: 'konj' },
        { image_url: '/images/image00006.jpeg', title: 'konj 2 ' },
        { image_url: '/images/image00007.jpeg', title: 'Putovanje' },
        { image_url: '/images/image00008.jpeg', title: 'Zadovoljni Klijenti' }
    ];

    let supabasePhotos = $state<GalleryImage[]>([]);
    let selectedImage = $state<string | null>(null);
    let isLoading = $state(true);

    // jebeni tp moram sve but i galerij da bi mogoa ucitati prvo
    let allImages = $derived([...localImages, ...supabasePhotos]);

    onMount(async () => {
        const { data, error } = await supabase
            .from('gallery')
            .select('image_url, title')
            .order('created_at', { ascending: false });

        if (!error && data) {
            supabasePhotos = data as GalleryImage[];
        }
        isLoading = false;
    });

    const openImage = (url: string) => (selectedImage = url);
    const closeImage = () => (selectedImage = null);

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') closeImage();
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<section class="bg-white py-24 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 text-center">
        <div class="mb-20">
            <h1 class="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase">
                FOTO <span class="text-blue-600 italic">REPORTAŽA</span>
            </h1>
        </div>

        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each allImages as img (img.image_url)}
                <button 
                    type="button"
                    onclick={() => openImage(img.image_url)}
                    class="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-xl transition-all duration-500"
                    aria-label="Povećaj sliku: {img.title}"
                >
                    <img 
                        src={img.image_url} 
                        alt={img.title}
                        loading="lazy"
                        decoding="async"
                        class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 text-left">
                        <h3 class="text-white text-xl font-bold">{img.title}</h3>
                    </div>
                </button>
            {/each}
        </div>
    </div>
</section>

{#if selectedImage}
    <div 
        class="fixed inset-0 z-[100] bg-gray-950/95 backdrop-blur-md flex items-center justify-center p-4"
        transition:fade={{ duration: 300 }}
        role="dialog"
        aria-modal="true"
    >
        <button 
            type="button"
            class="absolute inset-0 w-full h-full cursor-zoom-out border-none bg-transparent"
            onclick={closeImage}
            aria-label="Zatvori sliku"
        ></button>

        <div class="relative max-w-5xl w-full h-full flex items-center justify-center pointer-events-none">
            <img 
                src={selectedImage} 
                alt="Puna veličina" 
                class="max-w-full max-h-full object-contain rounded-2xl shadow-2xl pointer-events-auto"
                in:scale={{ duration: 400, start: 0.9, easing: quintOut }}
            />
            
            <button 
                type="button"
                onclick={closeImage}
                class="absolute top-4 right-4 text-white/50 hover:text-white transition pointer-events-auto p-2"
                aria-label="Zatvori"
            >
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    </div>
{/if}

