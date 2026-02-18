<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { fade, scale, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import SEO from '$lib/components/SEO.svelte';

    interface GalleryImage {
        image_url: string;
        title: string;
        size?: 'large' | 'tall' | 'normal';
    }

    let localImages: GalleryImage[] = [
        { image_url: '/images/image00001.jpeg', title: 'Snimanje 1', size: 'large' },
        { image_url: '/images/image00003.jpeg', title: 'Naš tim', size: 'normal' },
        { image_url: '/images/image00005.jpeg', title: 'Veličanstveni konj', size: 'tall' },
        { image_url: '/images/image00006.jpeg', title: 'Trenutak u galopu', size: 'normal' },
        { image_url: '/images/image00007.jpeg', title: 'Transport Prestige', size: 'normal' },
        { image_url: '/images/image00008.jpeg', title: 'Zadovoljni Klijenti', size: 'tall' }
    ];

    let supabasePhotos = $state<GalleryImage[]>([]);
    let selectedImage = $state<string | null>(null);
    let isLoading = $state(true);
    let scrollY = $state(0);
    let innerWidth = $state(0);

    // svelte 5 image connect
    let allImages = $derived([...localImages, ...supabasePhotos]);

    onMount(async () => {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .select('image_url, title')
                .order('created_at', { ascending: false });

            if (!error && data) {
                supabasePhotos = data as GalleryImage[];
            }
        } catch (err) {
            console.error("Greška pri učitavanju:", err);
        } finally {
            isLoading = false;
        }
    });

    const openImage = (url: string) => (selectedImage = url);
    const closeImage = () => (selectedImage = null);

    function reveal(node: HTMLElement, delay = 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => node.classList.add('visible'), delay);
                    observer.unobserve(node);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(node);
        return { destroy: () => observer.disconnect() };
    }
</script>

<svelte:window bind:scrollY bind:innerWidth />

<SEO 
    title="Galerija - Foto Reportaža | HorseMaster Prestige" 
    description="Pogledajte ekskluzivne trenutke s naših snimanja, evenata i transporta." 
/>

<div class="fixed inset-0 pointer-events-none z-0">
    <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brandBlue/5 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brandDeep/20 blur-[120px] rounded-full"></div>
</div>

<div class="fixed inset-0 pointer-events-none z-[900] opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

<section class="relative z-10 bg-brandDark py-24 md:py-32 min-h-screen text-brandLight selection:bg-brandBlue/30">
    <div class="max-w-[1600px] mx-auto px-6">
        
        <div class="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <div class="reveal-init" use:reveal>
                <div class="overflow-hidden">
                    <h1 in:fly={{ y: 100, duration: 1200, easing: quintOut }} class="text-[12vw] md:text-[7vw] leading-[0.85] font-black tracking-tighter uppercase mb-4">
                        Foto <br> <span class="text-brandBlue blue-glow italic lowercase tracking-tight">Reportaža</span>
                    </h1>
                </div>
                <p class="text-brandLight/30 font-mono text-[10px] uppercase tracking-[0.4em]">Arhiva radova i trenutaka</p>
            </div>
            
            <div class="max-w-xs text-right hidden md:block reveal-init" use:reveal={200}>
                <p class="text-brandLight/40 text-sm italic font-light leading-relaxed border-r border-brandBlue/30 pr-6">
                    "Bilježimo snagu, eleganciju i neizbrisive uspomene kroz objektiv naših suradnika."
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[300px]">
            {#if isLoading}
                {#each Array(8) as _}
                    <div class="bg-brandDeep/20 rounded-[2rem] border border-white/5 animate-shimmer h-[300px]"></div>
                {/each}
            {:else}
                {#each allImages as img, i (img.image_url)}
                    <button 
                        type="button"
                        onclick={() => openImage(img.image_url)}
                        use:reveal={i * 50}
                        class="reveal-init group relative overflow-hidden rounded-[2rem] bg-brandDeep/10 border border-white/5 transition-all duration-700 active:scale-95
                        {img.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                        {img.size === 'tall' ? 'md:row-span-2' : ''}"
                        aria-label="Povećaj sliku: {img.title}"
                    >
                        <div class="h-full w-full scale-110 transition-transform duration-[1.5s] ease-out group-hover:scale-100">
                            <img 
                                src={img.image_url} 
                                alt={img.title}
                                loading="lazy"
                                class="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                                style="transform: translateY({innerWidth > 1024 ? (scrollY - 1000) * 0.02 : 0}px)"
                            />
                        </div>

                        <div class="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8 text-left">
                            <span class="text-brandBlue font-mono text-[10px] mb-2 tracking-widest">/ 0{i + 1}</span>
                            <h3 class="text-brandLight text-xl font-black uppercase tracking-tight italic">{img.title}</h3>
                        </div>
                    </button>
                {/each}
            {/if}
        </div>
    </div>
</section>

{#if selectedImage}
    <div 
        class="fixed inset-0 z-[1000] bg-brandDark/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
        transition:fade={{ duration: 400 }}
        role="dialog"
        aria-modal="true"
        aria-label="Pregled slike"
    >
        <button 
            type="button"
            class="absolute inset-0 w-full h-full cursor-zoom-out border-none bg-transparent"
            onclick={closeImage}
            aria-label="Zatvori pregled"
        ></button>

        <div class="relative max-w-6xl max-h-[85vh] flex items-center justify-center pointer-events-none">
            <img 
                src={selectedImage} 
                alt="Puna veličina fotografije" 
                class="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_100px_rgba(37,99,235,0.15)] pointer-events-auto"
                in:scale={{ duration: 600, start: 0.9, easing: quintOut }}
            />
            
            <button 
                type="button"
                onclick={closeImage}
                class="absolute -top-6 -right-6 md:-top-16 md:-right-16 text-brandLight/40 hover:text-brandBlue transition-all pointer-events-auto p-4"
                aria-label="Zatvori"
            >
                <svg class="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    </div>
{/if}

<style>
    .blue-glow {
        text-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
    }

    .reveal-init {
        opacity: 0;
        transform: translateY(40px);
        transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
    }
    
    :global(.reveal-init.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    :global(body) {
        scrollbar-width: none;
        -ms-overflow-style: none;
        background-color: #050505;
    }
    :global(body::-webkit-scrollbar) {
        display: none;
    }

    @keyframes pulseCustom {
        0%, 100% { opacity: 0.05; }
        50% { opacity: 0.15; }
    }
    .animate-pulse {
        animation: pulseCustom 2s ease-in-out infinite;
    }

    /* remove focs on mobile */
    button { -webkit-tap-highlight-color: transparent; }
</style>