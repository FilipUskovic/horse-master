<script lang="ts">
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            <div class="space-y-4">
                <a href="/" class="flex items-center group mb-4" aria-label="Horse Master Početna">
                    <span class="text-xl font-black tracking-widest text-white uppercase">
                        HORSE<span class="text-blue-500">MASTER</span>
                    </span>
                </a>
                <p class="text-sm leading-relaxed text-gray-400 max-w-xs">
                    Profesionalni transport konja s naglaskom na sigurnost, udobnost i dobrobit vaših životinja. Vaš partner na svakom kilometru.
                </p>
                
                <div class="flex space-x-4 pt-2">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="hover:text-blue-500 transition-colors" aria-label="Facebook">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="hover:text-pink-500 transition-colors" aria-label="Instagram">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                </div>
            </div>

            <div>
                <h3 class="text-white font-bold uppercase tracking-wider mb-6 text-sm">Izbornik</h3>
                <ul class="space-y-3 text-sm">
                    <li><a href="/" class="hover:text-blue-400 transition-colors flex items-center"><span class="mr-2">›</span> Početna</a></li>
                    <li><a href="/about" class="hover:text-blue-400 transition-colors flex items-center"><span class="mr-2">›</span> O nama</a></li>
                    <li><a href="/gallery" class="hover:text-blue-400 transition-colors flex items-center"><span class="mr-2">›</span> Galerija</a></li>
                    <li><a href="/contact" class="hover:text-blue-400 transition-colors flex items-center"><span class="mr-2">›</span> Kontakt</a></li>
                    <li><a href="/login" class="hover:text-blue-400 transition-colors flex items-center opacity-50 hover:opacity-100"><span class="mr-2">›</span> Admin Login</a></li>
                </ul>
            </div>

            <div>
                <h3 class="text-white font-bold uppercase tracking-wider mb-6 text-sm">Kontakt Informacije</h3>
                <ul class="space-y-4 text-sm">
                    <li class="flex items-start">
                        <svg class="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        <span>
                            Ulica Konja 12<br>
                            10000 Zagreb, Hrvatska
                        </span>
                    </li>
                    <li class="flex items-center">
                        <svg class="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        <a href="tel:+385911234567" class="hover:text-white transition-colors">+385 91 123 4567</a>
                    </li>
                    <li class="flex items-center">
                        <svg class="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <a href="mailto:info@horsemaster.hr" class="hover:text-white transition-colors">info@horsemaster.hr</a>
                    </li>
                    <li class="flex items-center pt-2 text-gray-500 text-xs">
                        <span class="border border-gray-700 rounded px-2 py-1">OIB: 12345678901</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {currentYear} Horse Master. Sva prava pridržana.</p>
            
            <div class="flex items-center mt-4 md:mt-0 space-x-6">
                <a href="/privacy" class="hover:text-white transition-colors">Politika privatnosti</a>
                <a href="/terms" class="hover:text-white transition-colors">Uvjeti korištenja</a>
                
                <button 
                    onclick={scrollToTop} 
                    class="bg-gray-800 hover:bg-blue-600 text-white p-2 rounded-full transition-all group"
                    aria-label="Povratak na vrh"
                >
                    <svg class="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                </button>
            </div>
        </div>
    </div>
</footer>