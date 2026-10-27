export type DiscountInput = {
  price: string
  rate: string
  extraRate: string
}

export type DiscountSuccess = {
  ok: true
  originalPrice: number
  rate: number
  extraRate: number
  afterFirst: number
  finalPrice: number
  savedAmount: number
  effectiveRate: number
}

export type DiscountFailure = { ok: false; errors: string[] }

export type DiscountResult = DiscountSuccess | DiscountFailure

function toNumber(value: string) {
  const normalized = value.replace(/[,，\s]/g, '').replace(/[０-９．]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0xfee0),
  )
  if (normalized === '') return NaN
  return Number(normalized)
}

export function calculateDiscount(input: DiscountInput): DiscountResult {
  const errors: string[] = []
  const price = toNumber(input.price)
  const rate = input.rate.trim() === '' ? 0 : toNumber(input.rate)
  const extraRate = input.extraRate.trim() === '' ? 0 : toNumber(input.extraRate)

  if (!Number.isFinite(price) || price <= 0) errors.push('元の価格を正しく入力してください。')
  if (!Number.isFinite(rate) || rate < 0 || rate > 100) errors.push('割引率は0〜100％の範囲で入力してください。')
  if (!Number.isFinite(extraRate) || extraRate < 0 || extraRate > 100)
    errors.push('追加割引率は0〜100％の範囲で入力してください。')
  if (errors.length === 0 && rate === 0 && extraRate === 0) errors.push('割引率を入力してください。')
  if (errors.length > 0) return { ok: false, errors }

  const afterFirst = Math.floor((price * (100 - rate)) / 100)
  const finalPrice = Math.floor((afterFirst * (100 - extraRate)) / 100)
  const savedAmount = price - finalPrice
  const effectiveRate = Math.round((savedAmount / price) * 1000) / 10

  return {
    ok: true,
    originalPrice: price,
    rate,
    extraRate,
    afterFirst,
    finalPrice,
    savedAmount,
    effectiveRate,
  }
}

export function formatYen(value: number) {
  return value.toLocaleString('ja-JP', { maximumFractionDigits: 0 })
}
