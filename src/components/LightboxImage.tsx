'use client';

import { useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import mediumZoom from 'medium-zoom';

export default function LightboxImage(props: ImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = containerRef.current?.querySelector('img');
    if (img) {
      const zoom = mediumZoom(img, {
        margin: 24,
        background: 'rgba(0, 0, 0, 0.85)',
        scrollOffset: 0,
      });

      return () => {
        zoom.detach();
      };
    }
  }, []);

  return (
    <div ref={containerRef}>
      <Image {...props} />
    </div>
  );
}
