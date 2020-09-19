import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const useAuth = (from) => {
  const auth = useSelector((store) => store.auth)
  const logged = auth.status
  const router = useRouter()

  useEffect(() => {
    if (!logged) {
      switch (from) {
        case '/join':
          router.push('/join')
          break
        default:
          router.push('/login')
      }
    } else {
      if (from === '/login' || from === '/join') {
        router.push('/')
      }
    }
  }, [])
  return [logged]
}

export default useAuth
