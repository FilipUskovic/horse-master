<script>
	// Ovdje nema posebne logike, samo statički sadržaj
</script>

<svelte:head>
	<title>O nama | Horse Master</title>
</svelte:head>

<section class="py-16 bg-white overflow-hidden">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
			
			<div class="relative mb-8 lg:mb-0">
				<div class="relative rounded-2xl overflow-hidden shadow-xl">
					<img 
						class="w-full h-full object-cover" 
						src="https://images.unsplash.com/photo-1598556776374-4b5302f92415?q=80&w=1000&auto=format&fit=crop" 
						alt="Tim s konjima" 
					/>
					<div class="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-10"></div>
				</div>
			</div>

			<div>
				<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
					Više od običnog transporta
				</h2>
				<p class="text-lg text-gray-600 mb-6 leading-relaxed">
					Horse Master je nastao iz čiste ljubavi prema konjičkom sportu. Razumijemo da vaš konj nije samo životinja, već vrhunski sportaš i član obitelji.
				</p>
				<p class="text-lg text-gray-600 mb-8 leading-relaxed">
					Naša misija je osigurati bezbrižnost vlasnicima. Bilo da se radi o međunarodnom transportu, rehabilitaciji nakon ozljede ili kondicijskom treningu, naš stručni tim koristi najnovije metode i opremu.
				</p>
				
				<ul class="space-y-4">
					<li class="flex items-center">
						<svg class="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-gray-700">Licencirani vozači i treneri</span>
					</li>
					<li class="flex items-center">
						<svg class="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-gray-700">24/7 video nadzor tijekom transporta</span>
					</li>
					<li class="flex items-center">
						<svg class="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-gray-700">Individualni pristup svakom grlu</span>
					</li>
				</ul>
			</div>

		</div>
	</div>
</section>