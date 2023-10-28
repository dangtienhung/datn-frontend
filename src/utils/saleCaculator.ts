import { formatPriceCompact } from './formatCurrency'

export const saleCaculator = (sale: number) => {
  // const percent = sale.isPercent ? sale.value : Math.round((sale.value / price) * 100)
  // const percent = sale.isPercent ? sale.value + '%' : formatPriceCompact(sale.value)
  return sale ? sale + '%' : formatPriceCompact(sale)
}
