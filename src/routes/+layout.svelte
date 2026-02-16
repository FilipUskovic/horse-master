<script>import '../app.css'; 
import favicon from '$lib/assets/favicon.svg'; 
import Navbar from '$lib/components/Navbar.svelte'; 
let { children } = $props();</script>

<svelte:head>
	<link rel="icon" href="{favicon}" />
	<title>Horse Master</title>
</svelte:head>

<div class="flex flex-col min-h-screen font-sans text-gray-900 antialiased">
	
	<Navbar></Navbar>

	<main class="flex-grow pt-16">
		{@render children()} 
	</main>

	<footer class="bg-gray-900 text-white py-8 mt-auto">
		<div class="max-w-7xl mx-auto px-4 text-center">
			<p class="text-sm">
				© {new Date().getFullYear()} Horse Master. Sva prava pridržana.
			</p>
			<div class="mt-4 flex justify-center space-x-4">
				<a href="/privacy" class="text-gray-400 hover:text-white transition">Privatnost</a>
				<a href="/terms" class="text-gray-400 hover:text-white transition">Uvjeti korištenja</a>
			</div>
		</div>
	</footer>

</div>
