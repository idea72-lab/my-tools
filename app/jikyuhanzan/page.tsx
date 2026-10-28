"use client";

import { useState } from "react";
import { Clock, DollarSign, Users, Scale, Percent, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function JikyuHanzanPage() {
  const [hourlyWage, setHourlyWage] = useState<string>("1150"); // デフォルトの時給
  const [itemPrice, setItemPrice] = useState<string>("5000"); // 商品の価格

  const wageNum = parseFloat(hourlyWage) || 0;
  const priceNum = parseFloat(itemPrice) || 0;

  // 必要な労働時間（時間）の計算
  const totalHours = wageNum > 0 ? priceNum / wageNum : 0;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

  // Q&Aの開閉状態を管理するアコーディオン用のstate
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "時給換算の計算式はどうなっていますか？",
      a: "「欲しいものの価格 ÷ あなたの時給」で必要な労働時間の総小数を算出し、それを時間と分に換算しています。",
    },
    {
      q: "端数の分数はどのように処理されますか？",
      a: "計算された分数は、四捨五入して最も近い分単位で分かりやすく表示されます。",
    },
    {
      q: "入力した時給や価格のデータは保存されますか？",
      a: "データはすべてお使いのブラウザ内（メモリ上）だけで処理されており、外部のサーバー等に保存されることはありません。",
    },
  ];

  return (
    <div className="min-h-dvh bg-muted/40 p-4 md:p-8 flex flex-col justify-between">
      <div className="mx-auto max-w-md flex flex-col gap-6 w-full">

        {/* ツール切替タブナビゲーション */}
        <div className="flex bg-muted p-1 rounded-xl gap-1 border shadow-sm">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg text-muted-foreground hover:bg-background/50 transition-all"
          >
            <Users className="size-4" /> 割り勘
          </Link>
          <Link
            href="/tanka"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg text-muted-foreground hover:bg-background/50 transition-all"
          >
            <Scale className="size-4" /> 単価比較
          </Link>
          <Link
            href="/waribiki"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg text-muted-foreground hover:bg-background/50 transition-all"
          >
            <Percent className="size-4" /> 割引計算
          </Link>
          <Link
            href="/jikyuhanzan"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg bg-background text-foreground shadow-sm transition-all"
          >
            <Clock className="size-4" /> 時給換算
          </Link>
        </div>

        {/* ヘッダー部分 */}
        <header className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Clock className="size-6" />
          </span>
          <div>
            <h1 className="text-xl font-bold leading-tight">時給換算ツール</h1>
            <p className="text-xs text-muted-foreground">「この買い物、何時間働けば買える？」を計算</p>
          </div>
        </header>

        {/* メインの計算カード */}
        <main className="flex flex-col gap-6 bg-card rounded-2xl p-6 shadow-sm border">
          
          {/* 時給の入力 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium flex items-center gap-1.5 text-muted-foreground">
              <DollarSign className="size-4" /> あなたの時給（円）
            </label>
            <input
              type="number"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(e.target.value)}
              className="w-full rounded-xl border bg-background px-4 py-3 text-lg font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="例: 1150"
            />
          </div>

          {/* 商品価格の入力 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium flex items-center gap-1.5 text-muted-foreground">
              欲しいものの価格（円）
            </label>
            <input
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              className="w-full rounded-xl border bg-background px-4 py-3 text-lg font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="例: 5000"
            />
          </div>

          <hr className="border-border my-2" />

          {/* 計算結果表示エリア */}
          <div className="flex flex-col items-center justify-center bg-primary/5 rounded-xl p-6 text-center gap-2 border border-primary/20">
            <span className="text-xs font-bold tracking-wider text-primary uppercase">必要な労働時間</span>
            <div className="text-3xl md:text-4xl font-extrabold text-foreground">
              {hours} <span className="text-lg font-normal">時間</span> {minutes} <span className="text-lg font-normal">分</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              時給 <span className="font-bold">{wageNum.toLocaleString()}円</span> で換算した場合
            </p>
          </div>

        </main>

        {/* よくある質問（Q&A）セクション */}
        <section className="flex flex-col gap-3 mt-4">
          <h2 className="text-sm font-bold text-muted-foreground px-1">よくある質問（Q&A）</h2>
          <div className="flex flex-col gap-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left text-xs font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-primary font-bold">Q.</span> {faq.q}
                  </span>
                  <ChevronDown className={`size-4 text-muted-foreground transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t pt-2 bg-muted/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* プライバシーポリシーセクション */}
        <section className="bg-card border rounded-xl p-4 text-xs text-muted-foreground flex flex-col gap-2 shadow-sm mb-6">
          <h2 className="font-bold text-foreground">プライバシーポリシー</h2>
          <p>
            当サイトでは、第三者配信の広告サービス「Google アドセンス」を利用しています[cite: 9]。
            広告配信事業者は、ユーザーが当サイトや他のウェブサイトに過去にアクセスした際の情報に基づいてパーソナライズ広告を配信するため、Cookieを使用することがあります[cite: 9]。
          </p>
        </section>

      </div>
    </div>
  );
}