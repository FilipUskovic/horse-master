<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';

    let photos: any[] = [];

    onMount(async () => {
        // Dohvati sve slike (eng. "Public View Gallery")
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) photos = data;
    });
</script>

<div class="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each photos as photo}
        <div class="overflow-hidden rounded-lg shadow-lg">
            <img src={photo.image_url} alt={photo.title} class="w-full h-64 object-cover">
            <div class="p-4 bg-white">
                <p class="font-bold">{photo.title || 'Galerija slika'}</p>
            </div>
        </div>
    {/each}
</div>

<svelte:head>
	<title>Galerija | Horse Master</title>
</svelte:head>

<section class="bg-gray-50 py-16">
	<div class="max-w-7xl mx-auto px-4">
		<h1 class="text-4xl font-bold text-center mb-12 text-gray-900">Naša Galerija</h1>

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{#each images as img}
				<div class="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 cursor-pointer">
					
					<img 
						src={img.src} 
						alt={img.title}
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					
					<div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
						<span class="text-white text-lg font-bold tracking-wider border border-white px-4 py-2">
							{img.title}
						</span>
					</div>

				</div>
			{/each}
		</div>
	</div>
</section>