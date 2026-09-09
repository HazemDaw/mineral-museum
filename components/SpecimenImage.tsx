"use client";

import { useState } from "react";

interface SpecimenImageProps {
  /** Real photo path, e.g. "/specimens/astrofillit.jpg" — doesn't need to
   * exist yet. Drop the museum's actual photo of the physical specimen into
   * `public/specimens/` under this exact filename and it appears here with
   * no code changes. */
  src: string;
  /** Illustrative placeholder shown until the real photo above exists. */
  placeholderSrc: string;
  alt: string;
  className?: string;
}

/**
 * Photos of the physical specimens can't be generated or safely sourced from
 * the web for this prototype (unclear copyright/licensing on stock and
 * third-party mineral photos), so this component tries the real photo path
 * first and falls back to a generated placeholder illustration on error —
 * the whole site automatically upgrades the moment real photos are added.
 */
export default function SpecimenImage({ src, placeholderSrc, alt, className }: SpecimenImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? placeholderSrc : src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
