import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { Asset } from '~/models/Asset/Asset.types'
import * as AssetsModel from '~/models/Asset'
import { Link, useLoaderData } from '@remix-run/react'
import MainContent from '~/components/Layout/MainContent'
import assetListUrl from '~/styles/asset-list.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: assetListUrl,
    },
  ]
}

type LoaderData = { assets: Array<Asset> }
export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    assets: await AssetsModel.getAssets(['id', 'ticker', 'units']),
  }
  return json(data)
}

export default function Index() {
  const { assets } = useLoaderData<LoaderData>()

  return (
    <MainContent title="Meus ativos" subtitle="Procure e visualize seus ativos">
      <ul>
        {assets.map(asset => (
          <li key={asset.id}>
            <Link to={`/assets/${asset.ticker}`} prefetch="intent">
              {asset.ticker}
            </Link>
          </li>
        ))}
      </ul>
    </MainContent>
  )
}
