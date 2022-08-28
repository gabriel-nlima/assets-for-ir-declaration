import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { DetailedAsset } from '~/models/Asset/Asset.types'
import * as AssetsModel from '~/models/Asset'
import { Link, useLoaderData } from '@remix-run/react'
import MainContent from '~/components/Layout/MainContent'
import getStockSeries from '~/services/alpha-vantage/getStock'
import type { TimeSeries } from '~/services/alpha-vantage/getStock.types'
import AssetView, { links as assetViewLinks } from '~/components/Asset'

export const links: LinksFunction = () => {
  return [...assetViewLinks()]
}

type LoaderData = { asset: DetailedAsset; timeSeries?: TimeSeries }

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.ticker) return redirect('/')

  const asset = await AssetsModel.getAssetPurchasesSalesDividends(params.ticker)
  if (!asset) return redirect('/404')

  const timeSeries = await getStockSeries(params.ticker).catch(() => {})
  return json({ asset, timeSeries })
}

export default function AssetDetails() {
  const { asset, timeSeries } = useLoaderData<LoaderData>()

  return (
    <MainContent
      title={
        <div>
          <span>
            Meus ativos {'> '} <span className="ticker-name">{asset.ticker}</span>
          </span>
          <div>
            <Link to={`/assets/${asset.ticker}/edit`}>Editar</Link>
            <Link className="disabled" aria-disabled to={`/assets/${asset.ticker}/add-extract`}>
              Add extrato
            </Link>
          </div>
        </div>
      }
      subtitle="Veja dos detalhes do seus ativo"
    >
      <AssetView asset={asset} timeSeries={timeSeries} />
    </MainContent>
  )
}
