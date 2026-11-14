import { useState } from 'react'
import { Play } from 'lucide-react'
import { embedUrl, thumbnailUrl } from '../../utils/video'

export default function VideoPlayer({ videoId, title }) {
  const [playing, setPlaying] = useState(false)
  const [thumbOk, setThumbOk] = useState(true)

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-slate-600">
      {playing ? (
        <iframe
          src={embedUrl(videoId)}
          title={title}
          className="absolute inset-0 size-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Putar video: ${title}`}
          className="group absolute inset-0 grid place-items-center bg-linear-to-br from-slate-500 to-slate-700"
        >
          {thumbOk && (
            <img
              src={thumbnailUrl(videoId)}
              alt=""
              loading="lazy"
              onError={() => setThumbOk(false)}
              className="absolute inset-0 size-full object-cover"
            />
          )}
          <span className="relative grid size-16 place-items-center rounded-full bg-white/95 text-brand-600 shadow-lg transition group-hover:scale-105">
            <Play size={28} className="ml-1 fill-current" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  )
}