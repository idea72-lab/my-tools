'use client';

import Script from 'next/script';

export default function AdBanner() {
  return (
    <div className="my-6 flex justify-center">
      {/* 忍者AdMaxの広告スクリプト */}
      <Script
        src="https://adm.shinobi.jp/s/7bf44053964a569b80e38e197b57a0af"
        strategy="afterInteractive"
      />
    </div>
  );
}