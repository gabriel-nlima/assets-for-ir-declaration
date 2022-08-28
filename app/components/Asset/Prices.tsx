import type { LinksFunction } from '@remix-run/node'
import type { TimeSeries } from '~/services/alpha-vantage/getStock.types'
import { formatDate, formatToCurrency } from '~/utils/formaters'
import pricesStyles from './Prices.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: pricesStyles,
    },
  ]
}

type Props = {
  timeSeries?: TimeSeries
}

const Prices = ({ timeSeries }: Props) => {
  const lastRefreshed = timeSeries ? timeSeries.metadata.lastRefreshed : ''
  const lastTimeSeries = timeSeries?.series[lastRefreshed]

  return (
    <details className="glass-effect glass-primary">
      <summary title="Clique para expandir">Cotação atual</summary>
      <div className="prices-container">
        {!timeSeries ? (
          <p>Não foi possível obter a cotação desse ativo.</p>
        ) : (
          <div className="prices-infos">
            <h5>Ultima atualização: {formatDate(lastRefreshed, undefined, true)}</h5>
            <div>
              <span>Alta: {formatToCurrency(lastTimeSeries?.high, true)}</span>
              <span>Baixa: {formatToCurrency(lastTimeSeries?.low, true)}</span>
              <span>Abertura: {formatToCurrency(lastTimeSeries?.open, true)}</span>
              <span>Fechamento: {formatToCurrency(lastTimeSeries?.close, true)}</span>
            </div>
          </div>
        )}
      </div>
    </details>
  )
}

export default Prices
