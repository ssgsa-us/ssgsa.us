import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Roles from '../constants/roles'
import { useAuth } from '../context/AuthUserContext'
import MainLayout from '../layouts/Main'
import Loading from './Loading'
import { auth } from '../firebase'
import { updateVerEmailEpoch } from '../pages/api/updateVerEmailEpoch'

// Used as HOC at each component which requires authentication and authorization
export default function requireAuth(ChildComponent, authRole) {
  const Component = (props) => {
    const { authUser, loading, signOut } = useAuth()
    const [pageReady, setPageReady] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [emailSent, setEmailSent] = useState<boolean>(true)
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
              if (authUser.verificationEmailEpoch)
                setEmailSent(
                  new Date().getTime() <
                    authUser.verificationEmailEpoch + 60 * 60 * 1000,
                )
              else setEmailSent(false)
              setError(
                'Please verify your email first, if verified try to reload/signing out.',
              )
            }
          } else setPageReady(true)
        }
      }
    }, [loading, authUser])

    return !pageReady ? (
      <MainLayout>
        {!error && !emailSent ? (
          <Loading message="Loading your page!" />
        ) : (
          <div className="flex flex-col justify-center items-center my-24">
            {!error ? null : (
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl flex justify-center items-center">
                <p className="text-red-850 font-black">Error: </p>
                <p className="text-red-850 ml-5">{error}</p>
              </div>
            )}
            {!emailSent ? (
              <div className="flex justify-center items-center mt-10">
                <button
                  className="text-white text-base md:text-lg bg-blue-850 py-2 px-4 rounded-3xl"
                  onClick={() => {
                    auth.currentUser.sendEmailVerification()
                    setError('')
                    setEmailSent(true)
                    updateVerEmailEpoch(authUser.id, new Date().getTime())
                  }}
                >
                  Send New Verification Email
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center mt-10">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-850 text-center">
                  A verification email is sent.
                  <br />
                  If not recieved, make sure to check your spam for verification
                  link or try again{' '}
                  {authUser && authUser.verificationEmailEpoch
                    ? `after ${Math.ceil(
                        (authUser.verificationEmailEpoch +
                          60 * 60 * 1000 -
                          new Date().getTime()) /
                          60000,
                      )} minutes`
                    : 'later!'}
                  <br /> If verified, try reloading!
                </p>
              </div>
            )}
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
