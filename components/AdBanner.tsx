'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    // 2重読み込みを防ぐため、中身をクリアしてからスクリプトを追加
    bannerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://adm.shinobi.jp/s/7bf44053964a569b80e38e197b57a0af';
    script.async = true;

    bannerRef.current.appendChild(script);
  }, []);

  return (
    <div className="my-6 flex justify-center" ref={bannerRef} />
  );
}