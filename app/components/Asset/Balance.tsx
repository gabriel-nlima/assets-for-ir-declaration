import type { LinksFunction } from '@remix-run/node'
import type { DetailedAsset } from '~/models/Asset/Asset.types'
import balanceStyles from './Balance.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: balanceStyles,
    },
  ]
}

type Props = {
  asset: DetailedAsset
}
const Balance = ({ asset }: Props) => {
  return (
    <div className="glass-effect glass-primary balance-container">
      <h4>Balanço</h4>
      <div className="balance-infos">
        <span>Total de unidades: 10</span>
        <span>Custo médio: 10</span>
      </div>
    </div>
  )
}

export default Balance
