import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Roles from '../constants/roles'
import { useAuth } from '../context/AuthUserContext'
import MainLayout from '../layouts/Main'
import Loading from './Loading'
import { auth } from '../firebase'

// Used as HOC at each component which requires authentication and authorization
export default function requireAuth(ChildComponent, authRole) {
  const Component = (props) => {
    const { authUser, loading, signOut } = useAuth()
    const [pageReady, setPageReady] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const router = useRouter()

    useEffect(() => {
      if (loading) return

      if (!authUser || !authUser.email) router.push('/signin')
      else {
        if (authUser.role !== authRole) router.push('/404')
        else {
          if (authRole === Roles.APPLICANT) {
            if (auth.currentUser.emailVerified) setPageReady(true)
            else {
              auth.currentUser.sendEmailVerification()
              setError(
                'Please verify your email first, if verified try to reload/signing out. A new email verification is sent.',
              )
            }
          } else setPageReady(true)
        }
      }
    }, [loading, authUser])

    return !pageReady ? (
      <MainLayout>
        {!error ? (
          <Loading message="Loading your page!" />
        ) : (
          <div className="flex flex-col justify-center items-center my-36">
            <div className="flex justify-center items-center">
              <p className="text-3xl text-red-850 font-black">Error: </p>
              <p className="text-3xl text-red-850 ml-5">{error}</p>
            </div>
            <div className="flex justify-center items-center mt-10">
              <button
                className="text-white text-base md:text-lg bg-red-850 py-2 px-4 rounded-3xl"
                onClick={() => {
                  signOut()
                }}
              >
                Signout
              </button>
            </div>
          </div>
        )}
      </MainLayout>
    ) : (
      <ChildComponent {...props} />
    )
  }

  return Component
}
