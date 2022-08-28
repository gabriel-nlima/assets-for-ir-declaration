import type { ActionFunction, LinksFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { AssetPurchase, AssetSale, DetailedAsset } from '~/models/Asset/Asset.types'
import * as AssetsModel from '~/models/Asset'
import { Link, useLoaderData } from '@remix-run/react'
import MainContent from '~/components/Layout/MainContent'
import AssetForm, { links as assetFormLinks } from '~/components/AssetForm'

export const links: LinksFunction = () => {
  return [...assetFormLinks()]
}

type LoaderData = { asset: DetailedAsset }

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.ticker) return redirect('/')

  const asset = await AssetsModel.getAssetPurchasesSalesDividends(params.ticker)
  if (!asset) return redirect('/404')

  return json({ asset })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const assetId = form.get('id')
  const ticker = form.get('ticker')
  const name = form.get('name')
  const cnpj = form.get('cnpj')
  const purchasesIds = form.getAll('purchases.id')
  const purchasesDate = form.getAll('purchases.date')
  const purchasesValue = form.getAll('purchases.value')
  const purchasesUnits = form.getAll('purchases.units')

  const salesIds = form.getAll('sales.id')
  const salesDate = form.getAll('sales.date')
  const salesValue = form.getAll('sales.value')
  const salesUnits = form.getAll('sales.units')

  // TODO add fields type, units, buys and sells
  if (
    typeof assetId !== 'string' ||
    typeof ticker !== 'string' ||
    typeof name !== 'string' ||
    typeof cnpj !== 'string'
  ) {
    throw new Error(`Form not submitted correctly.`)
  }

  if (!ticker.length) throw new Error(`Form not submitted correctly (empty ticker).`)

  const newPurchases: Partial<AssetPurchase>[] = []
  const purchases: AssetPurchase[] = []

  for (let idIndex = 0; idIndex < purchasesIds.length; idIndex++) {
    const id = purchasesIds[idIndex] as string
    const purchaseDate = purchasesDate[idIndex] as string
    const purchaseValue = Number(purchasesValue[idIndex].toString().replace(',', '.'))
    const units = purchasesUnits[idIndex] as string
    const purchase = { purchaseDate, purchaseValue, units, assetId: Number(assetId) }

    if (id === 'new') {
      newPurchases.push(purchase)
      continue
    }

    purchases.push({ id, ...purchase })
  }

  const newSales: Partial<AssetSale>[] = []
  const sales: AssetSale[] = []

  for (let idIndex = 0; idIndex < salesIds.length; idIndex++) {
    const id = salesIds[idIndex] as string
    const sellDate = salesDate[idIndex] as string
    const sellValue = Number(salesValue[idIndex].toString().replace(',', '.'))
    const units = salesUnits[idIndex] as string
    const sale = { sellValue, sellDate, units, assetId: Number(assetId) }

    if (id === 'new') {
      newSales.push(sale)
      continue
    }

    sales.push({ id, ...sale })
  }

  await AssetsModel.updateAssetByTicker({ ticker, name, cnpj })

  if (newPurchases.length) {
    await Promise.all(
      newPurchases.map(async purchase => {
        return AssetsModel.createAssetPurchase(purchase)
      })
    )
  }

  if (purchases.length) {
    await Promise.all(
      purchases.map(async purchase => {
        return AssetsModel.updateAssetPurchase(purchase)
      })
    )
  }

  if (newSales.length) {
    await Promise.all(
      newSales.map(async sale => {
        return AssetsModel.createAssetSale(sale)
      })
    )
  }

  if (sales.length) {
    await Promise.all(
      sales.map(async sale => {
        return AssetsModel.updateAssetSale(sale)
      })
    )
  }

  return json({ ok: true })
}

export default function AssetDetails() {
  const { asset } = useLoaderData<LoaderData>()

  return (
    <MainContent
      title={
        <div>
          <span>
            <Link to={`/assets/${asset.ticker}`}>Voltar</Link> {' | '}
            Editando
            <span className="ticker-name">{asset.ticker}</span>
          </span>
          <div>
            <Link className="disabled" aria-disabled to={`/assets/${asset.ticker}/add-extract`}>
              Add extrato
            </Link>
          </div>
        </div>
      }
    >
      <AssetForm asset={asset} action="" actionMethod="put" />
    </MainContent>
  )
}
