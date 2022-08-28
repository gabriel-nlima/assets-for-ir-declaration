import type { ActionFunction, LinksFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import * as AssetsModel from '~/models/Asset'
import { Form } from '@remix-run/react'
import assetFormUrl from '~/styles/asset-form.css'
import MainContent from '~/components/Layout/MainContent'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: assetFormUrl,
    },
  ]
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const ticker = form.get('ticker')
  const name = form.get('name')

  // TODO add fields type, units, buys and sells
  if (typeof ticker !== 'string' || typeof name !== 'string') {
    throw new Error(`Form not submitted correctly.`)
  }

  if (ticker.length === 0) throw new Error(`Form not submitted correctly (empty ticker).`)

  await AssetsModel.createAsset({ ticker, name })
  return redirect('/')
}

export default function NewAsset() {
  return (
    <MainContent title="Novo ativo" subtitle="Adicione uma nova ação ou FII a sua carteira">
      <Form method="post">
        <div>
          <label>
            TICKER: <input type="text" name="ticker" required />
          </label>
          <label>
            Nome: <input type="text" name="name" className="medium" />
          </label>
          <button type="submit">Salvar</button>
        </div>
      </Form>
    </MainContent>
  )
}
