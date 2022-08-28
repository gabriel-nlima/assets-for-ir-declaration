import type { LinksFunction } from '@remix-run/node'
import assetFormStyles from './AssetForm.css'
import type { DetailedAsset } from '~/models/Asset/Asset.types'
import { Form } from '@remix-run/react'
import Input, { links as inputLinks } from '../Common/Input'
import { useState } from 'react'

export const links: LinksFunction = () => {
  return [
    ...inputLinks(),
    {
      rel: 'stylesheet',
      href: assetFormStyles,
    },
  ]
}

type Props = { asset?: DetailedAsset; action: string; actionMethod: 'post' | 'put' }

const AssetForm = ({ asset, actionMethod }: Props) => {
  const [purchases, setPurchases] = useState(asset?.purchases || [])
  const [sales, setSales] = useState(asset?.sales || [])
  const addNewPurchase = () => {
    setPurchases(prev => [{ units: '1', purchaseDate: new Date().toISOString(), purchaseValue: 0, id: 'new' }, ...prev])
  }

  const addNewSale = () => {
    setSales(prev => [{ units: '1', sellDate: new Date().toISOString(), sellValue: 0, id: 'new' }, ...prev])
  }
  return (
    <section className="glass-effect glass-primary">
      <Form method={actionMethod}>
        <fieldset>
          <legend>
            <h4>Dados básicos</h4>
          </legend>
          <div className="asset-data-inputs">
            <Input label="TICKER" name="ticker" defaultValue={asset?.ticker} />
            <Input label="Nome" name="name" defaultValue={asset?.name} />
            <Input label="CNPJ" name="cnpj" defaultValue={asset?.cnpj} />
          </div>
        </fieldset>

        <fieldset>
          {/** TODO form de compras, vendas e dividendos */}
          <legend>
            <h4>Movimentações e dividendos</h4>
          </legend>
          <h5>Compras</h5>
          <div className="button-container">
            <button type="button" onClick={addNewPurchase}>
              Nova compra +
            </button>
          </div>
          {purchases.map((purchase, index) => (
            <div key={index} className="asset-data-inputs">
              <input type="hidden" name="purchases.id" value={purchase.id} />
              <Input label="Data" name="purchases.date" type="date" defaultValue={purchase.purchaseDate} />
              <Input label="Valor" name="purchases.value" type="tel" defaultValue={purchase.purchaseValue} />
              <Input label="Unidades" name="purchases.units" type="tel" defaultValue={purchase.units} />
            </div>
          ))}

          <h5>Vendas</h5>
          <div className="button-container">
            <button type="button" onClick={addNewSale}>
              Nova venda +
            </button>
          </div>
          {sales.map((sale, index) => (
            <div key={index} className="asset-data-inputs">
              <input type="hidden" name="sales.id" value={sale.id} />
              <Input label="Data" name="sales.date" type="date" defaultValue={sale.sellDate} />
              <Input label="Valor" name="sales.value" type="tel" defaultValue={sale.sellValue} />
              <Input label="Unidades" name="sales.units" type="tel" defaultValue={sale.units} />
            </div>
          ))}
        </fieldset>
        {asset?.id && <input type="hidden" value={asset.id} name="id" />}
        <div className="button-container right">
          <button className="secondary">Salvar</button>
        </div>
      </Form>
    </section>
  )
}
export default AssetForm
