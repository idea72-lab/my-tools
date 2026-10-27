import { ChevronDown } from 'lucide-react'

const STEPS = [
  { title: '商品Aの価格と容量を入力', body: '値札に書かれた価格（円）と、内容量・数量を入力し、単位（g・ml・個など）を選びます。' },
  { title: '商品Bも同じように入力', body: '比較したいもう一方の商品を入力します。g と kg、ml と L のように単位が違っても自動で換算されます。' },
  { title: '「計算する」をタップ', body: '1単位あたりの単価と、どちらが何％お得かが表示されます。お得な方は緑色で強調されます。' },
  { title: '「クリア」で次の比較へ', body: '入力値をすべてリセットして、次の商品の比較をすぐに始められます。' },
]

const EXAMPLES = [
  {
    category: '食品',
    title: 'お米 5kg と 10kg',
    a: '5kg 2,380円',
    b: '10kg 4,580円',
    result: '100gあたり A 47.6円 / B 45.8円 → Bが約3.8％お得',
  },
  {
    category: '飲料',
    title: 'お茶 2L と 500ml×6本',
    a: '2L 158円',
    b: '3,000ml（500ml×6）598円',
    result: '100mlあたり A 7.9円 / B 19.93円 → Aが約60.4％お得',
  },
  {
    category: '日用品',
    title: 'トイレットペーパー 12ロール と 18ロール',
    a: '12ロール 498円',
    b: '18ロール 698円',
    result: '1ロールあたり A 41.5円 / B 38.78円 → Bが約6.6％お得',
  },
]

const FAQS = [
  {
    q: '単位が違う商品も比較できますか？',
    a: '「g と kg」「ml と L」のように同じ種類の単位であれば自動で換算して比較できます。「g と ml」や「個 と 枚」など種類の異なる単位どうしは比較できません。',
  },
  {
    q: '「〇％お得」はどのように計算していますか？',
    a: '高い方の単価を基準に、安い方の単価がどれだけ安いかを割合で表しています。計算式は「（高い単価 − 安い単価）÷ 高い単価 × 100」です。',
  },
  {
    q: '6本パックなどのセット商品はどう入力しますか？',
    a: '合計の容量を入力してください。例えば 500ml × 6本 なら「3000 ml」、または本数で比べたい場合は「6 本」と入力します。',
  },
  {
    q: '税込・税抜どちらで入力すればいいですか？',
    a: '比較する2つの商品で揃っていればどちらでも構いません。実際に支払う金額で比べたい場合は税込価格の入力をおすすめします。',
  },
  {
    q: '入力したデータは保存されますか？',
    a: '入力内容はお使いの端末の画面上だけで計算され、サーバーに送信・保存されることはありません。',
  },
]

export function TankaGuideSections() {
  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="howto-heading" className="flex flex-col gap-4">
        <h2 id="howto-heading" className="text-lg font-bold">
          使い方
        </h2>
        <ol className="flex flex-col gap-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="example-heading" className="flex flex-col gap-4">
        <h2 id="example-heading" className="text-lg font-bold">
          活用例（食品・日用品など）
        </h2>
        <ul className="flex flex-col gap-3">
          {EXAMPLES.map((ex) => (
            <li key={ex.title} className="flex flex-col gap-2 rounded-2xl border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                  {ex.category}
                </span>
                <h3 className="text-sm font-bold">{ex.title}</h3>
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="font-semibold text-muted-foreground">A</dt>
                <dd>{ex.a}</dd>
                <dt className="font-semibold text-muted-foreground">B</dt>
                <dd>{ex.b}</dd>
              </dl>
              <p className="rounded-lg bg-muted px-3 py-2 text-xs font-semibold leading-relaxed">{ex.result}</p>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-muted-foreground">
          大容量の方が必ず安いとは限りません。特売品やまとめ買いの前に、単価で比べるのがおすすめです。
        </p>
      </section>

      <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
        <h2 id="faq-heading" className="text-lg font-bold">
          よくある質問（Q&amp;A）
        </h2>
        <div className="flex flex-col gap-2">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group rounded-2xl border bg-card shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="mr-1 text-primary">Q.</span>
                  {faq.q}
                </span>
                <ChevronDown className="size-4 shrink-0 transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                <span className="mr-1 font-bold text-foreground">A.</span>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
