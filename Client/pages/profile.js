import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import Head from '../src/components/head'

export default function FirstPost() {
  const auth = useSelector((store) => store.auth)
  const logged = auth.status

  const router = useRouter()
  useEffect(() => {
    if (!logged) {
      router.push('/login')
    }
  })
  return (
    <div>
      <Head title='Chiper Live | Perfil' />
      <h1>Perfil</h1>
    </div>
  )
}
