import { Link } from '@remix-run/react'

type MenuItem = {
  href: string
  label: string
}

// TODO implement active link state based on route
const menuItems: MenuItem[] = [
  {
    href: '/',
    label: 'Meus ativos',
  },
  {
    href: '/assets/new',
    label: 'Novo ativo',
  },
]

const Menu = () => (
  <nav>
    <ul>
      {menuItems.map(item => (
        <li key={item.href}>
          <Link to={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default Menu
