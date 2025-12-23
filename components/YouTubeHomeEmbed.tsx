"use client";

import { useState } from "react";

interface YouTubeEmbedProps {
  videoId?: string;
  controls?: boolean;
  maxWidthClass?: string;
  thumbnailUrl?: string; 
}

export default function YouTubeEmbed({
  videoId = "KJ9Zaf6ncqE",
  controls = true,
  maxWidthClass = "max-w-full",
  thumbnailUrl = "/thumbnail.png",
}: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const cap = maxWidthClass === "none" ? "" : maxWidthClass;
  // once playing, we add autoplay=1
  const params = [
    "modestbranding=1",
    "rel=0",
    "iv_load_policy=3",
    `controls=${controls ? 1 : 0}`,
    playing ? "autoplay=1" : "",
  ]
    .filter(Boolean)
    .join("&");

  return (
    <div className={`w-full ${cap} mx-auto overflow-hidden rounded-lg shadow-lg aspect-video`}>
      {playing ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
          frameBorder="0"
          allow="autoplay;encrypted-media;picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div
          className="relative w-full h-full cursor-pointer bg-black"
          onClick={() => setPlaying(true)}
        >
          <img
            src={
              thumbnailUrl ||
              `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            }
            alt="Video thumbnail"
            className="object-cover w-full h-full"
          />
          {/* play-button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white opacity-75"
              viewBox="0 0 68 48"
            >
              <path
                d="M66.52 7.09a8 8 0 00-5.64-5.64C56.27 0 34 0 34 0s-22.27 0-26.88 1.45a8 8 0 00-5.64 5.64A83.38 83.38 0 000 24a83.38 83.38 0 001.48 16.91 8 8 0 005.64 5.64C11.73 48 34 48 34 48s22.27 0 26.88-1.45a8 8 0 005.64-5.64A83.38 83.38 0 0068 24a83.38 83.38 0 00-1.48-16.91z"
                fill="currentColor"
              />
              <path d="M45 24L27 14v20" fill="black" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
