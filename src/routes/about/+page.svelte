<script>
    import { fade, fly } from 'svelte/transition';
</script>

<svelte:head>
    <title>O nama | Horse Master</title>
    <meta name="description" content="Upoznajte tim koji stoji iza najsigurnijeg transporta konja." />
</svelte:head>

<section class="relative py-20 bg-gray-900 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-20">
        <img src="/images/image00001.jpeg" alt="Background" class="w-full h-full object-cover grayscale" />
    </div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            NAŠA <span class="text-blue-500">MISIJA</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Pružiti vrhunsku uslugu slikanja i prijevoza konja, gdje je dobrobit konja na prvom mjestu.
        </p>
    </div>
</section>

<section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col lg:flex-row items-center gap-16">
            
            <div class="w-full lg:w-1/2 relative group" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
                <div class="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-3 scale-105 -z-10 transition group-hover:rotate-6"></div>
                
                <img 
                    src="/images/image00008.jpeg" 
                    alt="Horse Master Tim" 
                    class="rounded-3xl shadow-2xl w-full object-cover h-[500px] transform transition duration-500 group-hover:-translate-y-2"
                />
                
                <div class="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-l-4 border-blue-600 hidden md:block">
                    <p class="text-4xl font-bold text-gray-900">1+</p>
                    <p class="text-sm text-gray-500 uppercase tracking-wider">Godina iskustva</p>
                </div>
            </div>

            <div class="w-full lg:w-1/2 space-y-8" in:fly={{ y: 50, duration: 1000, delay: 400 }}>
                <div>
                    <h2 class="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">Tko smo mi</h2>
                    <h3 class="text-4xl font-bold text-gray-900 leading-tight">
                        Više od jahača. <br>Mi smo konjari.
                    </h3>
                </div>
                
                <p class="text-gray-600 text-lg leading-relaxed">
                    Razumijemo stres koji transport predstavlja za životinju. Zato naš pristup nije "utovari i vozi". 
                    Naši konji si poslušni i mirni. 
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div class="flex items-start">
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-1">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div class="ml-4">
                            <h4 class="text-lg font-bold text-gray-900">Licencirani tim</h4>
                            <p class="text-gray-500 text-sm">Certificirani za prijevoz živih životinja u EU.</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start">
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-1">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        </div>
                        <div class="ml-4">
                            <h4 class="text-lg font-bold text-gray-900">Moderna flota</h4>
                            <p class="text-gray-500 text-sm">Neam pojma al eto ... mašala.</p>
                        </div>
                    </div>
                </div>

                <div class="pt-6">
                    <a href="/contact" class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:text-lg transition shadow-lg shadow-blue-900/20">
                        Kontaktirajte nas
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>