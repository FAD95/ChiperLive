import useAuth from '../src/hooks/useAuth'
import Head from '../src/components/head'

export default function FirstPost() {
  const [logged] = useAuth('/settings')

  return (
    logged && (
      <div>
        <Head title='Chiper Live | Configuración' />
        <h1>Configuración</h1>
      </div>
    )
  )
}
