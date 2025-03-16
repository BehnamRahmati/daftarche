'use client'

import { markMessagesReceived } from '@/lib/conversation-helpers'
import { submitSubscription } from '@/lib/push'
import { TUser } from '@/lib/types'
import React from 'react'

export default function SWClient({ user }: { user: TUser }) {
    React.useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('/sw.js')
            navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
                const options = {
                    userVisibleOnly: true,
                    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
                }
                serviceWorkerRegistration.pushManager.subscribe(options).then(
                    pushSubscription => {
                        submitSubscription(user.email, pushSubscription)
                    },
                    error => {
                        console.error(error)
                    },
                )
            })
        }

        const receivedInterval = setInterval(async () => {
            await markMessagesReceived({ email: user.email })
        }, 10000)

        return () => {
            clearInterval(receivedInterval)
        }
    }, [user.email])
    return null // This component doesn't render anything visible
}
