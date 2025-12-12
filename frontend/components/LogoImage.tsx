import { useState, useEffect } from 'react';

export default function LogoImage() {
  // List of images to try
  const fallbacks = [
    '/logo.png', // main logo
    '/favicon_io/android-chrome-512x512.png',
    '/favicon_io/android-chrome-192x192.png',
  ];

  const [src, setSrc] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkImage = (url: string) =>
      new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });

    (async () => {
      for (const candidate of fallbacks) {
        const ok = await checkImage(candidate);
        if (ok && mounted) {
          setSrc(candidate);
          break;
        }
      }
      if (mounted) setChecking(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // While checking, show a visible placeholder
  if (checking) {
    return (
      <div className="mx-auto mb-2 w-[140px] h-[140px] bg-gray-200 flex items-center justify-center rounded-lg shadow">
        <span className="text-gray-600">Loading...</span>
      </div>
    );
  }

  // If no image found, show a visible fallback
  if (!src) {
    return (
      <div className="mx-auto mb-2 w-[140px] h-[140px] bg-yellow-200 flex items-center justify-center rounded-lg shadow-lg">
        <span className="text-black font-bold">Scamkontroll</span>
      </div>
    );
  }

  // Render the image if found
  return (
    <div className="mx-auto mb-2 w-[140px] h-[140px] rounded-lg shadow-lg bg-white flex items-center justify-center">
      <img
        src={src}
        alt="Scamkontroll logotyp"
        width={140}
        height={140}
        decoding="async"
        className="rounded-lg object-contain"
      />
    </div>
  );
}
