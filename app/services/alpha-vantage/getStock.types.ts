type OutputSizeType = 'Compact' | 'Full'

export type RawSeriesMetaData = {
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': string
  '4. Output Size': OutputSizeType
  '5. Time Zone': string
}

export type TimeSeriesMetaData = {
  info: string
  symbol: string
  lastRefreshed: string
  outputSize: OutputSizeType
  timezone: string
}

export type RawSeries = {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. volume': string
}
export type Series = {
  open: string
  high: string
  low: string
  close: string
  volume: string
}

export type SeriesByDate = {
  [date: string]: Series
}

export enum TimeSeriesFunction {
  TIME_SERIES_DAILY = 'Time Series (Daily)',
  TIME_SERIES_WEEKLY = 'Weekly Time Series',
  TIME_SERIES_MONTHLY = 'Monthly Time Series',
}

export type RawTimeSeriesResponse = {
  [timeSeries in TimeSeriesFunction]: {
    [date: string]: RawSeries
  }
} & {
  'Meta Data': RawSeriesMetaData
  'Error Message'?: string
  Note?: string
}
export type TimeSeries = {
  series: SeriesByDate
  metadata: TimeSeriesMetaData
}
