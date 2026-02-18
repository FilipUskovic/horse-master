<script lang="ts">
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const currentYear = new Date().getFullYear();
</script>

<footer class="relative bg-brandDark text-brandLight/40 py-16 border-t border-white/5 pb-32 sm:pb-16 overflow-hidden">
    
    <div class="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brandBlue/5 blur-[100px] rounded-full -z-10"></div>

    <div class="max-w-7xl mx-auto px-6">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            
            <div class="space-y-6">
                <a href="/" class="flex items-center group" aria-label="HorseMaster Početna">
                    <span class="text-xl font-black tracking-[0.3em] text-brandLight uppercase italic">
                        HORSE<span class="text-brandBlue blue-glow">MASTER</span>
                    </span>
                </a>
                <p class="text-xs leading-relaxed max-w-xs font-light uppercase tracking-widest text-brandLight/30">
                    Profesionalna briga i transport konja. Više od desetljeća tradicije u filmskoj produkciji, eventima i sigurnom transportu.
                </p>
                
                <div class="flex space-x-6 pt-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="hover:text-brandBlue transition-all transform hover:-translate-y-1" aria-label="Facebook">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="hover:text-brandBlue transition-all transform hover:-translate-y-1" aria-label="Instagram">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                </div>
            </div>

            <div>
                <h3 class="text-brandLight font-black uppercase tracking-[0.4em] mb-8 text-[10px] italic">Navigacija</h3>
                <ul class="space-y-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    <li><a href="/" class="hover:text-brandBlue transition-colors flex items-center group"><span class="mr-3 text-brandBlue/20 group-hover:text-brandBlue transition-colors">/</span> Početna</a></li>
                    <li><a href="/about" class="hover:text-brandBlue transition-colors flex items-center group"><span class="mr-3 text-brandBlue/20 group-hover:text-brandBlue transition-colors">/</span> O nama</a></li>
                    <li><a href="/gallery" class="hover:text-brandBlue transition-colors flex items-center group"><span class="mr-3 text-brandBlue/20 group-hover:text-brandBlue transition-colors">/</span> Galerija</a></li>
                    <li><a href="/contact" class="hover:text-brandBlue transition-colors flex items-center group"><span class="mr-3 text-brandBlue/20 group-hover:text-brandBlue transition-colors">/</span> Kontakt</a></li>
                </ul>
            </div>

            <div>
                <h3 class="text-brandLight font-black uppercase tracking-[0.4em] mb-8 text-[10px] italic">Kontakt</h3>
                <ul class="space-y-5 text-[10px] font-black uppercase tracking-[0.2em]">
                    <li class="flex items-start group">
                        <div class="bg-white/5 p-2 rounded-xl group-hover:bg-brandBlue/10 transition-colors mr-4 border border-white/5">
                            <svg class="w-4 h-4 text-brandBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        </div>
                        <span class="mt-2 text-brandLight/40 group-hover:text-brandLight transition-colors">
                            Zagreb, Hrvatska
                        </span>
                    </li>
                    <li class="flex items-center group">
                        <div class="bg-white/5 p-2 rounded-xl group-hover:bg-brandBlue/10 transition-colors mr-4 border border-white/5">
                            <svg class="w-4 h-4 text-brandBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        </div>
                        <a href="tel:+385911355169" class="mt-0.5 text-brandLight/40 group-hover:text-brandLight transition-colors">+385 91 135 5169</a>
                    </li>
                    <li class="flex items-center group">
                        <div class="bg-white/5 p-2 rounded-xl group-hover:bg-brandBlue/10 transition-colors mr-4 border border-white/5">
                            <svg class="w-4 h-4 text-brandBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </div>
                        <a href="mailto:petar.uskovic@gmail.com" class="mt-0.5 text-brandLight/40 group-hover:text-brandLight transition-colors">petar.uskovic@gmail.com</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] text-brandLight/20">
            <p class="italic">&copy; {currentYear} HorseMaster Prestige. All Rights Reserved.</p>
            
            <div class="flex items-center mt-8 md:mt-0 space-x-8">
                <a href="/login" class="hover:text-brandBlue transition-colors flex items-center">
                    <span class="mr-2 text-brandBlue">/</span> Admin Access
                </a>
                
                <button 
                    onclick={scrollToTop} 
                    class="bg-brandBlue text-white p-3 rounded-full transition-all group shadow-2xl hover:scale-110 active:scale-90"
                    aria-label="Povratak na vrh"
                >
                    <svg class="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                </button>
            </div>
        </div>
    </div>
</footer>

<style>
    .blue-glow {
        text-shadow: 0 0 15px rgba(37, 99, 235, 0.4);
    }
    
    button, a { -webkit-tap-highlight-color: transparent; }
</style>