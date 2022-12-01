import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthUserContext'
import MainLayout from '../layouts/Main'
import Loading from './Loading'

export default function requireAuth(ChildComponent, authRole) {
  return (props) => {
    const { authUser, loading } = useAuth()
    const [pageReady, setPageReady] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
      if (loading) return

      if (!authUser || !authUser.email) router.push('/signin')
      else {
        if (authUser.role !== authRole) router.push('/404')
        else setPageReady(true)
      }
    }, [loading, authUser])

    return !pageReady ? (
      <MainLayout>
        <Loading message="Loading your page!" />
      </MainLayout>
    ) : (
      <ChildComponent {...props} />
    )
  }
}
