import { ChevronDown } from 'lucide-react'

const STEPS = [
  { title: '合計金額を入力', body: '飲み会や旅行などでかかった費用の総額を入力します。' },
  { title: '参加人数を設定', body: '「＋」「−」ボタンか直接入力で人数を設定すると、メンバー欄が自動で増減します。' },
  { title: '丸め方を選択', body: '1人あたりの金額を「1円単位」「10円単位で切り下げ」「100円単位で切り下げ」から選べます。' },
  { title: '立替金額を入力', body: '各メンバーが実際に支払った（立て替えた）金額を入力します。立て替えていない人は空欄のままでOKです。' },
  { title: '「計算する」をタップ', body: '1人あたりの負担額と、誰が誰にいくら支払えば精算が完了するかが表示されます。' },
]

const FAQS = [
  {
    q: '端数はどうなりますか？',
    a: '丸め方で切り下げた結果生じる端数は、メンバー1（幹事）がまとめて負担する計算になります。幹事以外に負担してもらいたい場合は、その人をメンバー1に入力してください。',
  },
  {
    q: '「立替金額の合計が一致しません」と表示されます。',
    a: '各メンバーの立替金額を合計した値が、合計金額と同じになる必要があります。エラー表示内のリンクから、合計金額を立替合計に合わせることもできます。',
  },
  {
    q: '1人が全額支払った場合はどうすればいいですか？',
    a: '合計金額を入力したあと、立替金額欄の右上にある「幹事が全額立替」をタップすると、メンバー1が全額を立て替えた状態に自動入力されます。',
  },
  {
    q: '送金回数はなるべく少なくなりますか？',
    a: 'はい。多く払いすぎた人と不足している人を金額の大きい順に組み合わせることで、できるだけ少ない回数で精算できるように計算しています。',
  },
  {
    q: '入力したデータは保存されますか？',
    a: '入力内容はお使いの端末の画面上だけで計算され、サーバーに送信・保存されることはありません。ページを閉じるとリセットされます。',
  },
]

export function GuideSections() {
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
          計算例
        </h2>
        <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4 text-sm leading-relaxed">
          <div>
            <h3 className="mb-1 font-bold">例：3人で旅行、合計 10,000円</h3>
            <p className="text-muted-foreground">
              Aさん（幹事）が宿代 7,000円、Bさんが食事代 3,000円を立て替え、Cさんは支払いなし。丸め方は「100円単位で切り下げ」。
            </p>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 rounded-xl bg-muted p-3">
            <dt className="text-muted-foreground">1人あたり</dt>
            <dd className="text-right font-semibold tabular-nums">3,300円</dd>
            <dt className="text-muted-foreground">端数</dt>
            <dd className="text-right font-semibold tabular-nums">100円（Aさん負担）</dd>
            <dt className="text-muted-foreground">Aさんの負担</dt>
            <dd className="text-right font-semibold tabular-nums">3,400円</dd>
          </dl>
          <div>
            <h3 className="mb-2 font-bold">精算結果</h3>
            <ul className="flex flex-col gap-1.5">
              <li className="flex justify-between rounded-lg bg-accent px-3 py-2">
                <span>Cさん → Aさん</span>
                <span className="font-semibold tabular-nums">3,300円</span>
              </li>
              <li className="flex justify-between rounded-lg bg-accent px-3 py-2">
                <span>Bさん → Aさん</span>
                <span className="font-semibold tabular-nums">300円</span>
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              Aさんは 7,000円 − 3,400円 = 3,600円を受け取り、Bさんは 3,300円 − 3,000円 = 300円、Cさんは 3,300円を支払います。
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
        <h2 id="faq-heading" className="text-lg font-bold">
          よくある質問（Q&amp;A）
        </h2>
        <div className="flex flex-col gap-2">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border bg-card px-4 py-3 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-start gap-2 text-sm font-bold [&::-webkit-details-marker]:hidden">
                <span className="text-primary" aria-hidden="true">
                  Q.
                </span>
                <span className="flex-1">{faq.q}</span>
                <ChevronDown
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2 flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <span className="font-bold text-foreground" aria-hidden="true">
                  A.
                </span>
                <span>{faq.a}</span>
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
