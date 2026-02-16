<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { fade, fly, scale, slide } from 'svelte/transition';

    let photos = $state<any[]>([]);
    let uploading = $state(false);
    let title = $state("");
    let file = $state<File | null>(null);
    let previewUrl = $state<string | null>(null);
    let statusMessage = $state({ text: "", type: "" });

    onMount(fetchPhotos);

    // clear preview when compontnts die
    onDestroy(() => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
    });

    async function fetchPhotos() {
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) photos = data || [];
    }

    function handleFileChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            // Brišemo stari preview ako postoji
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            
            file = target.files[0];
            previewUrl = URL.createObjectURL(file);
        }
    }

    async function uploadPhoto() {
        if (!file) return;
        uploading = true;
        statusMessage = { text: "Učitavanje slike...", type: "info" };

        try {
            const fileName = `${Date.now()}-${file.name}`;
            const { error: storageError } = await supabase.storage
                .from('photos')
                .upload(fileName, file);
            if (storageError) throw storageError;

            const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(fileName);

            const { error: dbError } = await supabase
                .from('gallery')
                .insert([{ image_url: publicUrl, title: title }]);
            if (dbError) throw dbError;

            statusMessage = { text: "Slika je uspješno objavljena!", type: "success" };
            resetForm();
            await fetchPhotos();
        } catch (err: any) {
            statusMessage = { text: "Greška: " + err.message, type: "error" };
        } finally {
            uploading = false;
        }
    }

    function resetForm() {
        title = "";
        file = null;
        if (previewUrl) URL.revokeObjectURL(previewUrl); // clearing 
        previewUrl = null;
        const input = document.getElementById('image-upload') as HTMLInputElement;
        if (input) input.value = '';
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        window.location.href = '/login';
    }

    async function deletePhoto(id: string, imageUrl: string) {
        if (!confirm('Obrisati sliku trajno?')) return;
        try {
            const fileName = imageUrl.split('/').pop();
            if (fileName) {
                await supabase.storage.from('photos').remove([fileName]);
            }
            await supabase.from('gallery').delete().eq('id', id);
            photos = photos.filter(p => p.id !== id);
        } catch (err) {
            statusMessage = { text: "Greška pri brisanju.", type: "error" };
        }
    }
</script>

<div class="min-h-screen bg-gray-100 pb-20 font-sans">
    <nav class="bg-white border-b border-gray-200 px-6 py-4 mb-8 shadow-sm">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <h1 class="text-xl font-black tracking-tighter text-gray-900 uppercase">
                HORSE<span class="text-blue-600">MASTER</span> <span class="text-gray-400 font-light ml-2">ADMIN</span>
            </h1>
            <div class="flex items-center gap-6">
                <a href="/" class="text-xs font-bold text-gray-400 hover:text-blue-600 transition uppercase tracking-widest">Web stranica</a>
                <button 
                    onclick={handleLogout}
                    class="text-xs font-bold text-red-500 hover:text-red-700 transition uppercase tracking-widest bg-red-50 px-4 py-2 rounded-lg"
                >
                    Odjava
                </button>
            </div>
        </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4">
        {#if statusMessage.text}
            <div transition:slide class="mb-6 p-4 rounded-2xl font-bold text-center text-sm shadow-sm
                {statusMessage.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 
                statusMessage.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 
                'bg-blue-50 text-blue-600 border border-blue-100'}">
                {statusMessage.text}
            </div>
        {/if}

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div class="lg:col-span-1">
                <div class="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-8">
                    <h2 class="text-2xl font-black text-gray-900 mb-6 tracking-tight uppercase">Nova Objava</h2>
                    <div class="space-y-6">
                        <div>
                            <label for="image-title" class="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Naslov Slike</label>
                            <input id="image-title" type="text" bind:value={title} class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 outline-none focus:border-blue-600 transition" placeholder="Opis transporta...">
                        </div>
                        <div>
                            <label for="image-upload" class="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Odaberi datoteku</label>
                            <div class="relative group">
                                <input id="image-upload" type="file" onchange={handleFileChange} accept="image/*" class="hidden" />
                                <label for="image-upload" class="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition overflow-hidden">
                                    {#if previewUrl}
                                        <img src={previewUrl} alt="Preview" class="w-full h-full object-cover" />
                                    {:else}
                                        <div class="text-center p-4">
                                            <svg class="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                                            <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Klikni za upload</span>
                                        </div>
                                    {/if}
                                </label>
                            </div>
                        </div>
                        <button onclick={uploadPhoto} disabled={uploading || !file} class="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition disabled:opacity-50 uppercase tracking-widest text-xs">
                            {uploading ? 'Učitavanje...' : 'Objavi u galeriji'}
                        </button>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-2">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl font-black text-gray-900 tracking-tight uppercase">Aktivna Galerija</h2>
                    <span class="bg-gray-200 text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest">{photos.length} SLIKA</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {#each photos as photo (photo.id)}
                        <div in:scale={{ duration: 400 }} class="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-50 group relative">
                            <div class="h-64 overflow-hidden relative">
                                <img src={photo.image_url} alt={photo.title} class="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <button onclick={() => deletePhoto(photo.id, photo.image_url)} class="bg-white text-red-600 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition shadow-2xl">
                                        Obriši
                                    </button>
                                </div>
                            </div>
                            <div class="p-6 bg-white">
                                <h4 class="font-black text-gray-900 truncate uppercase text-xs tracking-wider">{photo.title || 'Bez naslova'}</h4>
                                <p class="text-[9px] text-gray-400 mt-2 font-black uppercase tracking-widest italic">{new Date(photo.created_at).toLocaleDateString('hr-HR')}</p>
                            </div>
                        </div>
                    {/each}
                </div>

                {#if photos.length === 0 && !uploading}
                    <div in:fade class="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
                        <p class="text-gray-400 font-bold uppercase tracking-widest text-xs">Galerija je trenutno prazna.</p>
                    </div>
                {/if}
            </div>
        </div>
    </main>
</div>