import type { QueryConfig } from '~/utils/statements.server'
import { runQuery, selectMany, selectOne } from '~/utils/statements.server'
import type { Asset, DetailedAsset } from './Asset.types'
import { parseAssetFromDB } from './parsers'

type AssetKeys = (keyof Omit<Asset, 'createdAt' | 'updatedAt' | 'userId'> | 'created_at') | 'updated_at' | 'user_id'
const defaultColumns: AssetKeys[] = ['id', 'name', 'ticker', 'cnpj', 'created_at', 'updated_at', 'user_id']

export const getAssets = async (columns: AssetKeys[] = defaultColumns, limit?: number): Promise<Asset[]> => {
  const result = await selectMany('assets', { columns, limit })

  return result.map(parseAssetFromDB)
}

export const getAssetById = async (id: string, columns: AssetKeys[] = defaultColumns): Promise<Asset | undefined> => {
  const asset = await selectOne('assets', { columns, id })

  return parseAssetFromDB(asset)
}

export const getAssetByTicker = async (
  ticker: string,
  columns: AssetKeys[] = defaultColumns
): Promise<Asset | undefined> => {
  const where = `WHERE ticker = $1`
  const asset = await selectOne('assets', { columns, where, values: [ticker] })

  return parseAssetFromDB(asset)
}

export const getAssetPurchasesSalesDividends = async (
  id: string,
  columns: AssetKeys[] = defaultColumns
): Promise<DetailedAsset | undefined> => {
  const queryConfig: QueryConfig = {
    text: `SELECT ${columns.map(column => `asset.${column}`).join(',')}
            , COALESCE(json_agg(DISTINCT (to_jsonb(purchases) - 'asset_id')) FILTER (WHERE purchases.asset_id IS NOT NULL), '[]') AS purchases
            , COALESCE(json_agg(DISTINCT (to_jsonb(sales) - 'asset_id')) FILTER (WHERE sales.asset_id IS NOT NULL), '[]') AS sales
              FROM assets as asset
                LEFT JOIN assets_purchases as purchases ON purchases.asset_id = asset.id
                LEFT JOIN assets_sales as sales ON sales.asset_id = asset.id
                  WHERE asset.ticker = $1
                    GROUP BY asset.id, asset.ticker;`,
    values: [id],
  }

  const result = await runQuery(queryConfig)

  return parseAssetFromDB(result.rows[0])
}
