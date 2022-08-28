import type { LinksFunction } from '@remix-run/node'
import type { ReactNode } from 'react'
import tableStyle from './Table.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: tableStyle,
    },
  ]
}

type Props<T extends any> = {
  data: T[]
  columns: ReactNode[]
  renderRow: (item: T, index: number) => ReactNode
}

const Table = <T extends any>({ data, columns, renderRow }: Props<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(renderRow)}</tbody>
    </table>
  )
}

export default Table
