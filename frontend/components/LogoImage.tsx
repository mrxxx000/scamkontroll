import { useState, useEffect } from 'react';

export default function LogoImage() {
  // Only include the files you actually have
  const fallbacks = [
    '/logo/logo.png', // your main logo
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
        try {
          const ok = await checkImage(candidate);
          if (ok && mounted) {
            setSrc(candidate);
            break;
          }
        } catch {
          // ignore errors
        }
      }
      if (mounted) setChecking(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (checking) return <div className="mx-auto mb-2 w-[140px] h-[140px]" aria-hidden />;

  if (!src) {
    // fallback text if no image found
    return (
      <div className="mx-auto mb-2 text-center text-sm text-white/90">
        <span>Scamkontroll</span>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-2 rounded-lg shadow-lg">
      <img
        src={src}
        alt="Scamkontroll logotyp"
        width={140}
        height={140}
        decoding="async"
        className="mx-auto rounded-lg"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
