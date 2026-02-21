export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

class ToastStore {
    list = $state<Toast[]>([]);

    add(message: string, type: ToastType = 'info', duration = 3000) {
        // (anti-spam)
        const isAlreadyShowing = this.list.some(t => t.message === message);
        if (isAlreadyShowing) return;

        // generate  uniqe id
        const id = crypto.randomUUID();
        
        this.list.push({ id, message, type });

        setTimeout(() => {
            this.remove(id);
        }, duration);
    }

    remove(id: string) {
        this.list = this.list.filter((t) => t.id !== id);
    }

    clearAll() {
        this.list = [];
    }
}

export const toast = new ToastStore();