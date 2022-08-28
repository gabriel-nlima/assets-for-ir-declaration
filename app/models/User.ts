import { insertOne, selectMany, selectOne } from '~/utils/statements.server'
import type { User } from '~/types/User'

export const createUser = async (user: User): Promise<void> => {
  await insertOne('user', ['name'], [user.name])
}

export const getUsers = async (
  columns = ['id', 'name', 'created_at', 'updated_at'],
  limit?: number
): Promise<User[]> => {
  const result = await selectMany('user', { columns, limit })

  return result.map((user: any) => {
    const { updated_at, created_at, ...rest } = user

    return { ...rest, createdAt: created_at, updatetAt: updated_at }
  })
}

export const getUserById = async (
  id: string,
  columns = ['id', 'name', 'created_at', 'updated_at']
): Promise<User | undefined> => {
  const user = await selectOne('user', { columns, id })

  const { updated_at, created_at, ...rest } = user
  return { ...rest, createdAt: created_at, updatetAt: updated_at }
}
