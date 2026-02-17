<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';

    // Svelte 5 Props - primamo vrijednost (bindable)
    let { value = $bindable('') } = $props();

    let element = $state<HTMLElement>();
    let editor = $state<Editor>();

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [StarterKit],
            content: value,
            editorProps: {
                // Tailwind klase za sam tekst unutra
                attributes: {
                    class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] text-white'
                }
            },
            onUpdate: ({ editor }) => {
                // Kad korisnik piše, šaljemo HTML natrag roditelju
                value = editor.getHTML();
            }
        });
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });
    
    // Pomoćna funkcija za aktivne gumbe
    const isActive = (type: string, opts?: any) => editor?.isActive(type, opts) ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-gray-400';
</script>

<div class="border-2 border-white/10 rounded-2xl bg-white/5 overflow-hidden focus-within:border-blue-500 transition-colors">
    {#if editor}
    <div class="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-black/20">
        <button onclick={() => editor?.chain().focus().toggleBold().run()} class="p-2 rounded-lg transition {isActive('bold')}">
            <strong>B</strong>
        </button>
        <button onclick={() => editor?.chain().focus().toggleItalic().run()} class="p-2 rounded-lg transition {isActive('italic')}">
            <em>I</em>
        </button>
        <button onclick={() => editor?.chain().focus().toggleStrike().run()} class="p-2 rounded-lg transition {isActive('strike')}">
            <span class="line-through">S</span>
        </button>
        <div class="w-px h-6 bg-white/10 mx-1 self-center"></div>
        <button onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} class="p-2 rounded-lg transition {isActive('heading', { level: 2 })}">
            H2
        </button>
        <button onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} class="p-2 rounded-lg transition {isActive('heading', { level: 3 })}">
            H3
        </button>
        <div class="w-px h-6 bg-white/10 mx-1 self-center"></div>
        <button onclick={() => editor?.chain().focus().toggleBulletList().run()} class="p-2 rounded-lg transition {isActive('bulletList')}">
            • Lista
        </button>
        <button onclick={() => editor?.chain().focus().toggleOrderedList().run()} class="p-2 rounded-lg transition {isActive('orderedList')}">
            1. Lista
        </button>
    </div>
    {/if}

    <div bind:this={element} class="p-4"></div>
</div>

<style>
    /* Ovdje stiliziramo placeholder ako želiš */
    :global(.ProseMirror p.is-editor-empty:first-child::before) {
        content: attr(data-placeholder);
        float: left;
        color: #adb5bd;
        pointer-events: none;
        height: 0;
    }
</style>