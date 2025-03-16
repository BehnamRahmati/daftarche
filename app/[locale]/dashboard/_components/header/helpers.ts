'use client'

const changeLocale = (path: string, locale: string) => {
    const pathArr = path.split('/').filter(x => x)
    pathArr[0] = locale
    return pathArr.join('/')
}

const goFullscreen = (): void => {
    const docElm = document.documentElement

    if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
    } else if ((docElm as any).webkitRequestFullscreen) {
        ;(docElm as any).webkitRequestFullscreen()
    } else if ((docElm as any).msRequestFullscreen) {
        ;(docElm as any).msRequestFullscreen()
    }
}

function safeNotification() {
    return {
        supported: typeof Notification !== 'undefined',
        permission: Notification?.permission || 'default',
    }
}

async function requestNotificationPermission() {
    if (safeNotification().supported && safeNotification().permission) {
        await Notification.requestPermission()
        // Add analytics tracking here
    }
}

export { changeLocale, goFullscreen, requestNotificationPermission }
