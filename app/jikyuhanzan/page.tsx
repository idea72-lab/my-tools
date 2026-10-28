"use client";

import { useState } from "react";
import { Clock, DollarSign, ArrowRight, Calculator, Percent, Scale, Users } from "lucide-react";
import Link from "next/link";

export default function JikyuHanzanPage() {
  const [hourlyWage, setHourlyWage] = useState<string>("1150"); // デフォルトの時給（例: 1150円）
  const [itemPrice, setItemPrice] = useState<string>("5000"); // 商品の価格（例: 5000円）

  const wageNum = parseFloat(hourlyWage) || 0;
  const priceNum = parseFloat(itemPrice) || 0;

  // 必要な労働時間（時間）の計算
  const totalHours = wageNum > 0 ? priceNum / wageNum : 0;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

  return (
    <div className="min-h-dvh bg-muted/40 p-4 md:p-8">
      <div className="mx-auto max-w-md flex flex-col gap-6">

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
      </div>
    </div>
  );
}
 