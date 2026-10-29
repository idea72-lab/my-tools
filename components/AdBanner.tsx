'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    bannerRef.current.innerHTML = '';

    const script = document.createElement('script');
    // ↓ ここを新しく発行されたURLに変更
    script.src = 'https://adm.shinobi.jp/s/bfaae45a01ed35ae7afaa98553ddca14';
    script.async = true;

    bannerRef.current.appendChild(script);
  }, []);

  return (
    <div className="my-6 flex justify-center" ref={bannerRef} />
  );
}