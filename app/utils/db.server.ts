import { Pool } from 'pg'

let db: Pool

declare global {
  var __db: Pool | undefined
}

const PoolClient = () => {
  return new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_USER_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    host: process.env.DB_HOST,
  })
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  db = PoolClient()
} else {
  if (!global.__db) {
    global.__db = PoolClient()
  }
  db = global.__db
}

export default db
