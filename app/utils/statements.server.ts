import type { QueryResult } from 'pg'
import DB from './db.server'

export type QueryConfig =
  | string
  | {
      text: string
      values?: any[]
      /** Prepared Statement name */
      name?: string
    }

// TODO implement COUNT, UPDATE and DELETE queries
export const runQuery = async (query: QueryConfig, values?: any[]): Promise<QueryResult> => {
  try {
    const result = await DB.query(query, values)
    return result
  } catch (error) {
    // TODO handle errors better with classes, extends Error and ErroBoundaries
    const message = `Error running query: ${typeof query === 'string' ? query : query.text}`
    console.error(message, error)
    throw new Error('database-error')
  }
}

export const insertOne = async (table: string, columns: string[], values: any): Promise<any> => {
  const queryConfig: QueryConfig = {
    text: `INSERT INTO ${table}(${columns.join(',')}) VALUES(${columns.map((c, index) => `$${index + 1}`).join(',')})`,
    values,
  }

  return runQuery(queryConfig)
}

export const updateOneById = async (table: string, entries: [string, string | number][], id: string): Promise<any> => {
  const cleanEntries = entries.filter(([, value]) => !!value)
  const queryConfig: QueryConfig = {
    text: `UPDATE ${table} SET ${cleanEntries.map(([column], index) => `${column} = $${index + 1}`)} WHERE id =  $${
      cleanEntries.length + 1
    }`,
    values: [...cleanEntries.map(([, value]) => value), id],
  }

  return runQuery(queryConfig)
}

export const updateOne = async (
  table: string,
  entries: [string, string | number][],
  condition: [string, string | number]
): Promise<any> => {
  const cleanEntries = entries.filter(([, value]) => !!value)
  const queryConfig: QueryConfig = {
    text: `UPDATE ${table} SET ${cleanEntries.map(([column], index) => `${column} = $${index + 1}`)} WHERE ${
      condition[0]
    } = $${cleanEntries.length + 1}`,
    values: [...cleanEntries, condition].map(([, value]) => value),
  }

  return runQuery(queryConfig)
}

export type SelectParams = {
  columns: string[]
  id?: string
  orderBy?: string
  limit?: number
  where?: string
  values?: any[]
}

const parseSelectParams = (table: string, params?: SelectParams): QueryConfig => {
  const { id } = params || {}
  const columns = params?.columns ? params.columns.join(',') : '*'
  const where = id ? `WHERE id = $1` : params?.where || ''
  const limit = params?.limit ? `LIMIT ${params.limit}` : ''

  return {
    text: `SELECT ${columns} FROM ${table} ${where} ${limit}`,
    values: id ? [id] : params?.values,
  }
}

export const selectMany = async (table: string, params?: SelectParams): Promise<any> => {
  const queryConfig = parseSelectParams(table, params)

  const result = await runQuery(queryConfig)

  return result.rows
}

export const selectOne = async (table: string, params?: SelectParams): Promise<any> => {
  const queryConfig = parseSelectParams(table, params)

  const result = await runQuery(queryConfig)

  return result.rows[0]
}
