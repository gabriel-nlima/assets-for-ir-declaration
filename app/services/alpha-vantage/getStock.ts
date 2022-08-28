import type { RawTimeSeriesResponse, SeriesByDate, TimeSeries, TimeSeriesMetaData } from './getStock.types'
import { TimeSeriesFunction } from './getStock.types'

type TimeSeriesFunctionKeys = keyof typeof TimeSeriesFunction
const convertRawTimeSeries = (
  data: RawTimeSeriesResponse,
  timeFunction: TimeSeriesFunctionKeys,
  seriesCount = 5
): TimeSeries => {
  console.log(data)
  const rawMetadata = data['Meta Data']
  const metadata: TimeSeriesMetaData = {
    info: rawMetadata['1. Information'],
    symbol: rawMetadata['2. Symbol'],
    lastRefreshed: rawMetadata['3. Last Refreshed'],
    outputSize: rawMetadata['4. Output Size'],
    timezone: rawMetadata['5. Time Zone'],
  }

  const rawSeries = data[TimeSeriesFunction[timeFunction]]
  const series: SeriesByDate = {}

  Object.entries(rawSeries)
    .slice(0, seriesCount)
    .forEach(([key, value]) => {
      series[key] = {
        open: value['1. open'],
        high: value['2. high'],
        low: value['3. low'],
        close: value['4. close'],
        volume: value['5. volume'],
      }
    })

  return { metadata, series }
}

const getStockSeries = async (
  ticker: string,
  timeFunction: TimeSeriesFunctionKeys = 'TIME_SERIES_DAILY',
  seriesCount = 5
): Promise<TimeSeries> => {
  try {
    const alphaVantageKey = process.env.AV_API_KEY
    if (!alphaVantageKey) throw new Error('MISSING_API_KEY')
    const url = `https://www.alphavantage.co/query?function=${timeFunction}&symbol=${ticker.toUpperCase()}.SA&apikey=${alphaVantageKey}`

    const response = await fetch(url)
    const jsonData: RawTimeSeriesResponse = await response.json()

    if (!response.ok || jsonData['Error Message'] || jsonData.Note) {
      throw new Error(jsonData['Error Message'] || jsonData.Note || 'ERROR_STOCK_API_CALL')
    }

    return convertRawTimeSeries(jsonData, timeFunction, seriesCount)
  } catch (error: any) {
    console.error(`Error fetching tickers: ${ticker}`, error)
    throw new Error(error.message)
  }
}

export default getStockSeries
