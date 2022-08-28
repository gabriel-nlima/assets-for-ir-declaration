import type { LinksFunction } from '@remix-run/node'
import { useState } from 'react'
import type { DetailedAsset } from '~/models/Asset/Asset.types'
import { formatDate } from '~/utils/formaters'
import Table, { links as tableLinks } from '../Common/Table'
import tradingStyles from './Trading.css'

export const links: LinksFunction = () => {
  return [
    ...tableLinks(),
    {
      rel: 'stylesheet',
      href: tradingStyles,
    },
  ]
}

type Props = {
  asset: DetailedAsset
}

const Trading = ({ asset }: Props) => {
  const [currentTrading, setCurrentTrading] = useState<'purchases' | 'sales'>('purchases')
  return (
    <div className="glass-effect glass-primary trading-container">
      <h4>Movimentação</h4>
      <div className="trading-buttons-container">
        <button
          className={currentTrading === 'purchases' ? 'current' : ''}
          onClick={() => setCurrentTrading('purchases')}
        >
          Compras
        </button>
        <button className={currentTrading === 'sales' ? 'current' : ''} onClick={() => setCurrentTrading('sales')}>
          Vendas
        </button>
      </div>
      <div className="trading-list">
        {currentTrading === 'purchases' &&
          (!asset.purchases || !asset.purchases.length ? (
            <p>Sem movimentação de compras.</p>
          ) : (
            <Table
              data={asset.purchases}
              columns={['Data', 'Quantidade', 'Valor (R$)']}
              renderRow={purchase => (
                <tr key={purchase.id}>
                  <td>{purchase.purchaseDate ? formatDate(purchase.purchaseDate, 'dd/MM/yyyy', true) : '-'}</td>
                  <td>{purchase.units}</td>
                  <td>{purchase.purchaseValue}</td>
                </tr>
              )}
            />
          ))}

        {currentTrading === 'sales' &&
          (!asset.sales || !asset.sales.length ? (
            <p>Sem movimentação de vendas.</p>
          ) : (
            <Table
              data={asset.sales}
              columns={['Data', 'Quantidade', 'Valor (R$)']}
              renderRow={sale => (
                <tr key={sale.id}>
                  <td>{sale.sellDate ? formatDate(sale.sellDate, 'dd/MM/yyyy', true) : '-'}</td>
                  <td>{sale.units}</td>
                  <td>{sale.sellValue}</td>
                </tr>
              )}
            />
          ))}
      </div>
    </div>
  )
}

export default Trading
