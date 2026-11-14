const ID_YOUTUBE = /^[\w-]{11}$/

// Menerima tautan YouTube (watch, youtu.be, embed) dan mengembalikan id video. Selain itu: null.
export function ambilIdYoutube(url) {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    let id = null

    if (host === 'youtu.be') {
      id = u.pathname.slice(1)
    } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (u.pathname === '/watch') id = u.searchParams.get('v')
      else if (u.pathname.startsWith('/embed/')) id = u.pathname.split('/')[2]
    }

    return id && ID_YOUTUBE.test(id) ? id : null
  } catch {
    return null
  }
}

export const embedUrl = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
export const thumbnailUrl = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`