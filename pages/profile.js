import useAuth from '../src/hooks/useAuth'
import Head from '../src/components/head'

export default function FirstPost () {
  const [logged] = useAuth('/profile')
  return (
    logged && (
      <div>
        <Head title='Chiper Live | Perfil' />
        <h1>Perfil</h1>
      </div>
    )
  )
}
