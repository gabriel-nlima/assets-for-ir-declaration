import type { Asset, AssetDividend, AssetPurchase, AssetSale, DetailedAsset } from './Asset.types'

export const parsePurchaseFromDB = (obj: any): AssetPurchase | undefined => {
  if (!obj || typeof obj !== 'object') return undefined

  const { purchase_date, purchase_value, asset_id, ...rest } = obj

  return { ...rest, purchaseDate: purchase_date, purchaseValue: purchase_value, assetId: asset_id }
}

export const parseSaleFromDB = (obj: any): AssetSale | undefined => {
  if (!obj || typeof obj !== 'object') return undefined

  const { sell_value, sell_date, asset_id, sell_units, ...rest } = obj

  return { ...rest, units: sell_units, sellValue: sell_value, sellDate: sell_date, assetId: asset_id }
}

export const parseDividendFromDB = (obj: any): AssetDividend | undefined => {
  if (!obj || typeof obj !== 'object') return undefined

  const { received_date, amount_received, asset_id, ...rest } = obj

  return { ...rest, receivedDate: received_date, amountReceived: amount_received, assetId: asset_id }
}

export const parsePurchaseToDB = (obj: Partial<AssetPurchase>): any | undefined => {
  if (!obj || typeof obj !== 'object') return undefined

  const { purchaseDate, purchaseValue, assetId, ...rest } = obj

  return { ...rest, purchase_date: purchaseDate, purchase_value: purchaseValue, asset_id: assetId }
}

export const parseSaleToDB = (obj: Partial<AssetSale>): any | undefined => {
  if (!obj || typeof obj !== 'object') return undefined

  const { sellValue, sellDate, assetId, units, ...rest } = obj

  return { ...rest, sell_units: units, sell_value: sellValue, sell_date: sellDate, asset_id: assetId }
}

export const parseDividendToDB = (obj: Partial<AssetDividend>): any | undefined => {
  if (!obj || typeof obj !== 'object') return undefined

  const { receivedDate, amountReceived, assetId, ...rest } = obj

  return { ...rest, received_date: receivedDate, amount_received: amountReceived, asset_id: assetId }
}

export const parseAssetFromDB = (dbObject: any): DetailedAsset | undefined => {
  if (!dbObject || typeof dbObject !== 'object') return undefined

  const { updated_at, created_at, user_id, ...rest } = dbObject

  const purchases = Array.isArray(rest.purchases) ? rest.purchases.map(parsePurchaseFromDB).filter(Boolean) : []
  const sales = Array.isArray(rest.sales) ? rest.sales.map(parseSaleFromDB).filter(Boolean) : []
  const dividends = Array.isArray(rest.dividends) ? rest.dividends.map(parseDividendFromDB).filter(Boolean) : []

  return { ...rest, createdAt: created_at, updatedAt: updated_at, userId: user_id, purchases, sales, dividends }
}

export const parseAssetToDB = (asset: Partial<Asset>): any | undefined => {
  if (!asset || typeof asset !== 'object') return undefined

  const { updatedAt, createdAt, userId, ...rest } = asset

  return { ...rest, created_at: createdAt, updated_at: updatedAt, user_id: userId }
}
