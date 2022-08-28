export const formatToCurrency = (raw?: number | string, showSign = false): string => {
  const value = Number(raw)
  if (typeof value !== 'number' || Number.isNaN(value)) return ''

  const config = showSign ? { style: 'currency', currency: 'BRL' } : { minimumFractionDigits: 2 }
  return value.toLocaleString('pt-br', config)
}
