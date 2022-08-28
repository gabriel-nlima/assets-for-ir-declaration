import { updateOne, updateOneById } from '~/utils/statements.server'
import type { Asset, AssetPurchase, AssetSale } from './Asset.types'
import { parseAssetToDB, parsePurchaseToDB, parseSaleToDB } from './parsers'

export const updateAsset = async (asset: Partial<Asset>): Promise<void> => {
  const parsed = parseAssetToDB(asset)
  const { id, ...rest } = parsed
  if (!id || typeof Number(id) !== 'number' || Number.isNaN(Number(id))) return

  await updateOneById('assets', Object.entries(rest), id)
}

export const updateAssetByTicker = async (asset: Partial<Asset>): Promise<void> => {
  const parsed = parseAssetToDB(asset)
  const { ticker, ...rest } = parsed
  if (!ticker) return

  await updateOne('assets', Object.entries({ ...rest, ticker }), ['ticker', ticker])
}

export const updateAssetPurchase = async (purchase: Partial<AssetPurchase>): Promise<void> => {
  const parsed = parsePurchaseToDB(purchase)
  const { id, ...rest } = parsed
  if (!id || typeof Number(id) !== 'number' || Number.isNaN(Number(id))) return

  await updateOneById('assets_purchases', Object.entries(rest), id)
}

export const updateAssetSale = async (sale: Partial<AssetSale>): Promise<void> => {
  const parsed = parseSaleToDB(sale)
  const { id, ...rest } = parsed
  if (!id || typeof Number(id) !== 'number' || Number.isNaN(Number(id))) return

  await updateOneById('assets_sales', Object.entries(rest), id)
}
