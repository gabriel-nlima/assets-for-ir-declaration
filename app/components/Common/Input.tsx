import type { LinksFunction } from '@remix-run/node'
import React from 'react'

import inputStyles from './Input.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: inputStyles }]
}

type Props = React.ComponentPropsWithoutRef<'input'> & {
  label: string
  name: string
}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, name, ...rest } = props

  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} ref={ref} />
    </div>
  )
})

Input.displayName = 'Input'

export default Input
