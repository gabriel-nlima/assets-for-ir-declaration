import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import parseISO from 'date-fns/parseISO'

export const isValidDate = (date: any) => {
  return date instanceof Date && !Number.isNaN(date)
}

export const formatDate = (
  rawDate: number | string | Date,
  formatStr: string = 'dd/MM/yyyy',
  localized = false
): string => {
  const date = toISOString(rawDate, localized)
  if (!date.length) return ''

  return format(parseISO(date), formatStr, { locale: ptBR })
}

export const toISOString = (rawDate: number | string | Date, localized = false): string => {
  const date = new Date(rawDate)
  if (!isValidDate(date)) return ''

  const isoDateStr = date.toISOString()
  return localized ? isoDateStr.slice(0, -1) : isoDateStr
}
