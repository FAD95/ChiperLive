import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Author = () => {
  const auth = useSelector((store) => store.auth)
  const logged = auth.status

  const router = useRouter()
  useEffect(() => {
    if (!logged) {
      router.push('/login')
    }
  })
  return logged && <h1>Autor</h1>
}

export default Author
