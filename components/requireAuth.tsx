import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthUserContext'
import MainLayout from '../layouts/Main'

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
        <div className="my-56 flex justify-center items-center">
          <p className="text-3xl text-red-850">Loading your page!</p>
        </div>
      </MainLayout>
    ) : (
      <ChildComponent {...props} />
    )
  }
}
