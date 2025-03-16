export function notificationUnsupported(): boolean {
    let unsupported = false
    if (
        !('serviceWorker' in navigator) ||
        !('PushManager' in window) ||
        !('showNotification' in ServiceWorkerRegistration.prototype)
    ) {
        unsupported = true
    }
    return unsupported
}

export async function submitSubscription(email: string, subscription: PushSubscription): Promise<void> {
    const endpointUrl = '/api/push-subscription'
    const res = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subscription }),
    })
    await res.json()
}
