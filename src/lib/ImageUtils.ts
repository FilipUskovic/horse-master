import { get } from 'svelte/store';
import { t } from 'svelte-i18n';

export async function compressImage(file: File, maxWidth = 1920, quality = 0.8): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // calculate porportion
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                // WebP/JPEG  in smaller file (compressed it)
                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error(get(t)('errors.compression_failed')));
                    },
                    'image/jpeg',
                    quality
                );
            };
        };
        reader.onerror = () => {
            reject(new Error(get(t)('errors.file_read_error')));
        };
    });
}