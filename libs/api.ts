

export async function fetchAllClipboards() {
    const response = await fetch("/api/clipboards")
    const clipboards = await response.json()
    return clipboards
}


