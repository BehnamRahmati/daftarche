// src/hooks/usePushSubscription.ts
import { submitSubscription } from '@/lib/push';
import { useEffect } from 'react';

export default function usePushSubscription(email: string) {
    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('/sw.js').then((swReg) => {
                swReg.pushManager.getSubscription().then((subscription) => {
                    if (!subscription) {
                        swReg.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
                        }).then((newSubscription) => {
                            submitSubscription(email, newSubscription);
                        });
                    }
                });
            });
        }
    }, [email]);
}

