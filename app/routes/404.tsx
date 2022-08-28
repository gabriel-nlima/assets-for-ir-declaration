import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => ({
  title: 'Não encontrado | Declarador de ativos financeiros',
})

export default function NotFound() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Ops... Não encontrado.</h1>
      <h4>
        <Link to="/">Voltar para o início{' >'}</Link>
      </h4>
    </div>
  )
}
