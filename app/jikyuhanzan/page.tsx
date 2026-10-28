"use client";

import { useState } from "react";
import { Clock, DollarSign, Users, Scale, Percent, ChevronDown, Send } from "lucide-react";
import Link from "next/link";

export default function JikyuHanzanPage() {
  const [hourlyWage, setHourlyWage] = useState<string>("1150");
  const [itemPrice, setItemPrice] = useState<string>("5000");

  const wageNum = parseFloat(hourlyWage) || 0;
  const priceNum = parseFloat(itemPrice) || 0;

  const totalHours = wageNum > 0 ? priceNum / wageNum : 0;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

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
      q: "入力したデータは保存されますか？",
      a: "本ツールに入力された金額等の情報は、お使いのブラウザ上でのみ計算に使用され、サーバーへ送信・保存されることはありません。",
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

        {/* よくある質問（Q&A） */}
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

        {/* プライバシーポリシー */}
        <section className="bg-card border rounded-2xl p-6 text-xs text-muted-foreground flex flex-col gap-4 shadow-sm">
          <h2 className="text-sm font-bold text-foreground">プライバシーポリシー</h2>
          
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-foreground">広告の配信について</h3>
            <p className="leading-relaxed">
              当サイトでは、第三者配信の広告サービス「Google アドセンス」を利用しています[cite: 6]。Google などの第三者配信事業者は、Cookie を使用して、ユーザーが当サイトや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信します[cite: 6]。
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-foreground">Cookie の無効化について</h3>
            <p className="leading-relaxed">
              Google が広告 Cookie を使用することにより、ユーザーが当サイトや他のサイトにアクセスした際の情報に基づいて、Google やそのパートナーが適切な広告を表示できます[cite: 6]。ユーザーは Google の広告設定（https://adssettings.google.com/）でパーソナライズ広告を無効にできます[cite: 6]。また、www.aboutads.info にアクセスすれば、第三者配信事業者の Cookie を無効にすることもできます[cite: 6]。
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-foreground">アクセス解析ツールについて</h3>
            <p className="leading-relaxed">
              当サイトでは、サービス向上のためにアクセス解析ツールを利用する場合があります[cite: 6]。これらのツールはトラフィックデータの収集のために Cookie を使用しますが、このデータは匿名で収集されており、個人を特定するものではありません[cite: 6]。
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-foreground">入力データの取り扱い</h3>
            <p className="leading-relaxed">
              本ツールに入力された金額や名前などの情報は、お使いのブラウザ上でのみ計算に使用され、サーバーへ送信・保存されることはありません[cite: 6]。
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-foreground">お問い合わせで取得する個人情報</h3>
            <p className="leading-relaxed">
              お問い合わせフォームでご入力いただいたお名前・メールアドレス等は、お問い合わせへの回答のためにのみ利用し、法令に基づく場合を除き第三者に提供することはありません[cite: 6]。
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-foreground">プライバシーポリシーの変更</h3>
            <p className="leading-relaxed">
              当サイトは、必要に応じて本ポリシーの内容を予告なく変更することがあります[cite: 6]。変更後のポリシーは本ページに掲載した時点から効力を生じるものとします[cite: 6]。
            </p>
          </div>
        </section>

        {/* お問い合わせフォーム */}
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-bold text-muted-foreground px-1">お問い合わせ</h2>
          <form className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground">お名前</label>
              <input
                type="text"
                className="w-full rounded-xl border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground">メールアドレス</label>
              <input
                type="email"
                className="w-full rounded-xl border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground">お問い合わせ内容</label>
              <textarea
                rows={4}
                className="w-full rounded-xl border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors mt-2"
            >
              <Send className="size-3.5" /> 送信する
            </button>
          </form>
        </section>

        {/* フッター＆スポンサーリンク */}
        <footer className="flex flex-col items-center gap-6 mt-2 mb-6">
          <p className="text-xs text-muted-foreground">© 時給換算ツール</p>
          <div className="w-full h-32 border border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-muted/20 text-xs text-muted-foreground">
            スポンサーリンク
          </div>
        </footer>

      </div>
    </div>
  );
}