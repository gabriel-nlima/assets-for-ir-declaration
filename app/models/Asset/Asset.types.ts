import type { Base } from '../../types/Base'

export interface Asset extends Base {
  ticker: string
  units: number
  userId?: number
  name?: string
  cnpj?: string
}

export interface DetailedAsset extends Asset {
  purchases: AssetPurchase[]
  sales: AssetSale[]
  dividends: AssetDividend[]
}

export interface AssetPurchase {
  id: string
  units: string
  assetId?: number
  purchaseDate?: string
  purchaseValue?: number
}

export interface AssetSale {
  id: string
  units: string
  assetId?: number
  sellDate?: string
  sellValue?: number
}

export interface AssetDividend {
  id: string
  assetId?: number
  amountReceived?: string
  receivedDate?: number
}
