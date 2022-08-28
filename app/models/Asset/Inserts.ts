import { insertOne } from '~/utils/statements.server'
import type { Asset, AssetPurchase, AssetSale } from './Asset.types'
import { parseAssetToDB, parsePurchaseToDB, parseSaleToDB } from './parsers'

export const createAsset = async (asset: Partial<Asset>): Promise<void> => {
  const parsed = parseAssetToDB(asset)
  await insertOne('assets', Object.keys(parsed), Object.values(parsed))
}

export const createAssetPurchase = async (purchase: Partial<AssetPurchase>): Promise<void> => {
  const parsed = parsePurchaseToDB(purchase)
  await insertOne('assets_purchases', Object.keys(parsed), Object.values(parsed))
}

export const createAssetSale = async (sale: Partial<AssetSale>): Promise<void> => {
  const parsed = parseSaleToDB(sale)
  await insertOne('assets_sales', Object.keys(parsed), Object.values(parsed))
}
