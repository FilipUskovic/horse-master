<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';

    // State varijable
    let file: File | null = null;
    let title = '';
    let uploading = false;
    let photos: any[] = [];

    // 1. Dohvaćanje slika pri učitavanju stranice
    onMount(fetchPhotos);

    async function fetchPhotos() {
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) photos = data || [];
    }

    // 2. Siguran odabir datoteke (Rješava e.target grešku)
    function handleFileChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            file = target.files[0];
        }
    }

    // 3. Proces uploada (Storage -> SQL)
    async function uploadPhoto() {
        if (!file) return alert('Molim te, prvo odaberi sliku!');
        uploading = true;

        try {
            // Putanja do datoteke u 'photos' bucketu
            const fileName = `${Date.now()}-${file.name}`;
            
            // Upload u Storage (Pravilo: Admin Insert Storage)
            const { error: storageError } = await supabase.storage
                .from('photos')
                .upload(fileName, file);

            if (storageError) throw storageError;

            // Dohvaćanje javnog linka
            const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(fileName);

            // Upis u bazu (Pravilo: Admin Insert Gallery)
            const { error: dbError } = await supabase
                .from('gallery')
                .insert([{ image_url: publicUrl, title: title }]);

            if (dbError) throw dbError;

            // Resetiranje forme i osvježavanje liste
            alert('Slika uspješno dodana!');
            title = '';
            file = null;
            (document.getElementById('image-upload') as HTMLInputElement).value = '';
            await fetchPhotos();
        } catch (err: any) {
            alert('Greška: ' + (err.message || 'Nepoznata greška'));
        } finally {
            uploading = false;
        }
    }

    // 4. Brisanje slike
    async function deletePhoto(id: string, imageUrl: string) {
        if (!confirm('Jesi li siguran da želiš obrisati ovu sliku?')) return;

        try {
            // Izvlačenje imena datoteke iz URL-a za Storage brisanje
            const fileName = imageUrl.split('/').pop();
            if (fileName) {
                await supabase.storage.from('photos').remove([fileName]);
            }

            // Brisanje iz SQL tablice (Pravilo: Admin Delete Gallery)
            const { error } = await supabase.from('gallery').delete().eq('id', id);
            if (error) throw error;

            photos = photos.filter(p => p.id !== id);
        } catch (err) {
            alert('Greška pri brisanju.');
        }
    }
</script>

<section class="max-w-4xl mx-auto p-6 md:p-10 bg-gray-50 min-h-screen">
    <header class="mb-10">
        <h1 class="text-3xl font-extrabold text-gray-900">Admin Panel - Horse Master</h1>
        <p class="text-gray-500">Upravljaj galerijom slika za transport konja.</p>
    </header>

    <div class="bg-white shadow-xl rounded-2xl p-8 mb-12 border border-gray-100">
        <h2 class="text-xl font-semibold mb-6 text-gray-800">Dodaj novu sliku</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
                <label for="image-title" class="block text-sm font-medium text-gray-700">Naziv slike (Naslov)</label>
                <input 
                    id="image-title" 
                    type="text" 
                    bind:value={title} 
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
                    placeholder="npr. Utovar u Splitu"
                >
            </div>
            
            <div class="space-y-2">
                <label for="image-upload" class="block text-sm font-medium text-gray-700">Odaberi datoteku</label>
                <input 
                    id="image-upload" 
                    type="file" 
                    on:change={handleFileChange} 
                    accept="image/*" 
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                >
            </div>
        </div>
        
        <button 
            on:click={uploadPhoto} 
            disabled={uploading || !file} 
            class="mt-8 w-full md:w-auto px-10 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {uploading ? 'Učitavanje...' : 'Objavi u galeriji'}
        </button>
    </div>

    <div class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-800">Trenutne slike u galeriji</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each photos as photo}
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                    <div class="relative h-48 overflow-hidden">
                        <img src={photo.image_url} alt={photo.title} class="w-full h-full object-cover transition duration-300 group-hover:scale-105">
                        <button 
                            on:click={() => deletePhoto(photo.id, photo.image_url)}
                            class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
                            title="Obriši sliku"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div class="p-4">
                        <p class="font-medium text-gray-900 truncate">{photo.title || 'Bez naslova'}</p>
                        <p class="text-xs text-gray-400 mt-1 italic uppercase tracking-wider">ID: {photo.id.slice(0,8)}</p>
                    </div>
                </div>
            {/each}
        </div>
        
        {#if photos.length === 0}
            <div class="text-center py-20 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
                <p class="text-gray-500 italic">Galerija je prazna. Dodaj prvu sliku!</p>
            </div>
        {/if}
    </div>
</section>