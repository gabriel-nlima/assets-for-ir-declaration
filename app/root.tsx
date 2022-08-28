import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import LayoutBase, { links as layoutLinks } from '~/components/Layout'
import resetUrl from '~/styles/reset.css'
import globalUrl from '~/styles/global.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: globalUrl,
    },
    {
      rel: 'stylesheet',
      href: resetUrl,
    },
    ...layoutLinks(),
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Declarador de ativos financeiros',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <LayoutBase>
      <Outlet />
    </LayoutBase>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <LayoutBase title="Uh-oh!">
      <div className="error-container">
        <h2>Ops!</h2>
        <pre>{error.message === 'database-error' ? 'Falha no servidor.' : error.message}</pre>
      </div>
    </LayoutBase>
  )
}
