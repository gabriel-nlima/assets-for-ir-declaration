type Props = {
  children: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
}
export default function MainContent({ children, title, subtitle }: Props) {
  return (
    <main className="content">
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </main>
  )
}
