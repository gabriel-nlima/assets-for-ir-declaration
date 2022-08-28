import type { LinksFunction } from '@remix-run/node'
import { Meta, Links, ScrollRestoration, Scripts, LiveReload } from '@remix-run/react'
import Menu from './Menu'
import layoutStyles from './styles.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: layoutStyles,
    },
  ]
}

type Props = {
  children: React.ReactNode
  title?: string
}

const LayoutBase = ({ title, children }: Props) => (
  <html lang="pt-br">
    <head>
      <Meta />
      {title && <title>{title}</title>}
      <Links />
    </head>
    <body>
      <div className="layout-container">
        <header>
          <h1>Declarador de ativos financeiros</h1>
          <Menu />
        </header>
        {children}
      </div>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
)

export default LayoutBase
