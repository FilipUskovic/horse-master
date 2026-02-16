export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

class ToastStore {
    list = $state<Toast[]>([]);

    add(message: string, type: ToastType = 'info', duration = 3000) {
        const id = Math.random();
        this.list.push({ id, message, type });

        setTimeout(() => {
            this.list = this.list.filter((t) => t.id !== id);
        }, duration);
    }

    remove(id: number) {
        this.list = this.list.filter((t) => t.id !== id);
    }
}

export const toast = new ToastStore();