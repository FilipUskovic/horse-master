<script>
    // Svelte 5 nema poseban script potreban za ovo, samo HTML i Tailwind
</script>

<section class="relative h-screen w-full overflow-hidden">
    <div class="absolute inset-0">
        <img 
            src="/images/image00006.jpeg" 
            alt="Transport konja" 
            class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
    </div>

    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <span class="text-blue-400 font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
            Profesionalni Transport
        </span>
        
        <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            HORSE <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">MASTER</span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 font-light leading-relaxed">
            Siguran, pouzdan i udoban prijevoz za vaše šampione. 
            Jer oni nisu samo konji, oni su obitelj.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4">
            <a 
                href="/contact" 
                class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50"
            >
                Zatraži ponudu
            </a>
            <a 
                href="/about" 
                class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 font-bold rounded-full transition-all"
            >
                Saznaj više
            </a>
        </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
    </div>
</section>