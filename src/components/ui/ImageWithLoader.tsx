"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageWithLoader({ src, alt, className = "" }: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 rounded-lg animate-pulse">
          <span className="text-2xl">🖼️</span>
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 rounded-lg">
          <span className="text-2xl">❌</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          unoptimized
        />
      )}
    </div>
  );
}
