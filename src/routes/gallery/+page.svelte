<script>
	// Niz slika (kasnije može ići iz baze)
	let images = [
		{ src: "https://images.unsplash.com/photo-1534008753122-a837cf4652a6?q=80&w=800", title: "Jutarnji trening" },
		{ src: "https://images.unsplash.com/photo-1551884831-bbf3ddd77535?q=80&w=800", title: "Natjecanje" },
		{ src: "https://images.unsplash.com/photo-1612140656185-3511f44c6888?q=80&w=800", title: "Portret" },
		{ src: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800", title: "Štala" },
		{ src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=800", title: "Priprema" },
		{ src: "https://images.unsplash.com/photo-1528646673329-6126953046bc?q=80&w=800", title: "Njega" }
	];
</script>

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