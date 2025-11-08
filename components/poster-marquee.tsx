"use client"

type ImageItem = { src: string; alt?: string }
type PosterInput = string | ImageItem

type PosterMarqueeProps = {
  images: PosterInput[]
  // Optional CSS class for outer container
  className?: string
  // Base URL to prefix poster paths (TMDB default)
  imageBaseUrl?: string
  // Container height (e.g., "100vh", 600). Defaults to "100vh".
  height?: string | number
}

export default function PosterMarqueeStandalone({
  images,
  className,
  imageBaseUrl = "https://image.tmdb.org/t/p/w500",
  height = "100vh",
}: PosterMarqueeProps) {
  if (!images?.length) return null

  // Normalize input to ImageItem[], accepting string[] or objects
  const normalized: ImageItem[] = images.map((item) => (typeof item === "string" ? { src: item } : item))

  const columns = 6
  // Split images across 4 columns by index
  const columnImages: ImageItem[][] = Array.from({ length: columns }, (_, col) =>
    normalized.filter((_, idx) => idx % columns === col),
  )
  // Duplicate each column's images for seamless looping
  const duplicatedColumns = columnImages.map((col) => [...col, ...col])

  // Per-column durations and alternating directions
  const durations = [20, 24, 22, 26 , 23 , 25] // seconds

  return (
    // Expose height via CSS variable (default 100vh)
    <section
      className={`pm-container${className ? ` ${className}` : ""}`}
      aria-label="Scrolling poster marquee"
      style={{
        ["--pm-height" as any]: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <div className="pm-grid">
        {duplicatedColumns.map((items, colIdx) => {
          const duration = durations[colIdx % durations.length]
          const reverse = colIdx % 2 === 1
          return (
            <div key={colIdx} className="pm-column">
              <div
                className={`pm-scroller${reverse ? " reverse" : ""}`}
                style={{ ["--pm-duration" as any]: `${duration}s` }}
              >
                {items.map((img, i) => {
                  // Resolve src against base URL when a path is provided
                  const resolveSrc = (src: string) => {
                    if (!src) return "/placeholder.svg"
                    const s = src.trim()
                    if (s.startsWith("http") || s.startsWith("data:")) return s
                    // TMDB-style path "/abc123.jpg"
                    if (s.startsWith("/")) return `${imageBaseUrl}${s}`
                    // Fallback: try joining base + "/" + src
                    return `${imageBaseUrl}/${s}`
                  }
                  const alt = img.alt ?? `Poster ${i + 1}`
                  return (
                    <figure key={`${img.src}-${i}`} className="pm-figure">
                      <div className="pm-poster">
                        <img
                          src={resolveSrc(img.src) || "/placeholder.svg"}
                          alt={alt}
                          loading="lazy"
                          decoding="async"
                          className="pm-img"
                        />
                      </div>
                      <figcaption className="sr-only">{alt}</figcaption>
                    </figure>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .pm-container {
          height: var(--pm-height, 100vh); /* Configurable height */
          overflow: hidden;
          padding: 16px;
          box-sizing: border-box;
        }

        .pm-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          height: 100%;
        }

        .pm-column {
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .pm-scroller {
          display: flex;
          flex-direction: column;
          will-change: transform;
          animation-name: pm-scroll;
          animation-duration: var(--pm-duration, 22s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: normal;
        }

        .pm-scroller.reverse {
          animation-direction: reverse;
        }

        .pm-figure {
          margin: 0 0 16px 0;
        }

        .pm-figure:last-child {
          margin-bottom: 0;
        }

        .pm-poster {
          width: 100%;
          aspect-ratio: 2 / 3; /* Poster 2:3 ratio */
          border-radius: 0.125rem;
          overflow: hidden;
          background: #f1f1f1;
        }

        .pm-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Seamless vertical loop: move double-content by exactly 50% */
        @keyframes pm-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        /* Accessibility: respect user motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .pm-scroller {
            animation: none;
          }
        }

        /* Basic responsiveness: keep 4 columns, posters scale with width */
        @media (max-width: 640px) {
          .pm-container {
            padding: 12px;
          }
          .pm-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          .pm-figure {
            margin-bottom: 12px;
          }
        }

         .pmh-blur {
          position: fixed;
          left: 0;
          width: 100%;
          pointer-events: none;
          z-index: 50;
          backdrop-filter: blur(var(--edge-blur, 14px));
          -webkit-backdrop-filter: blur(var(--edge-blur, 14px));
        }
        .pmh-blur-top {
          top: 0;
          height: var(--edge-height, 12vh);
          /* Feather the blur so it fades into the content smoothly */
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
        }
        .pmh-blur-bottom {
          bottom: 0;
          height: var(--edge-height, 12vh);
          mask-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
          -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
        }

        /* Fallback if backdrop-filter isn't supported: use subtle gradient fade */
        @supports not ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))) {
          .pmh-blur-top {
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0));
          }
          .pmh-blur-bottom {
            background: linear-gradient(to top, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0));
          }
        }
      `}</style>
    </section>
  )
}
