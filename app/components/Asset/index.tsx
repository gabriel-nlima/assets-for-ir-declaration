import type { LinksFunction } from '@remix-run/node'
import Balance, { links as balanceLinks } from './Balance'
import Prices, { links as priceLinks } from './Prices'
import Trading, { links as tradingLinks } from './Trading'
import assetViewsStyles from './AssetView.css'
import type { DetailedAsset } from '~/models/Asset/Asset.types'
import type { TimeSeries } from '~/services/alpha-vantage/getStock.types'

export const links: LinksFunction = () => {
  return [
    ...balanceLinks(),
    ...priceLinks(),
    ...tradingLinks(),
    {
      rel: 'stylesheet',
      href: assetViewsStyles,
    },
  ]
}

type Props = { asset: DetailedAsset; timeSeries?: TimeSeries }

const AssetView = ({ asset, timeSeries }: Props) => {
  return (
    <section>
      <Balance asset={asset} />

      <Prices timeSeries={timeSeries} />

      <Trading asset={asset} />
    </section>
  )
}
export default AssetView
