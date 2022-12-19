import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import router from 'next/router'
import { useEffect, useState } from 'react'
import Roles from '../constants/roles'
import { useAuth } from '../context/AuthUserContext'
import { auth } from '../firebase'
import MainLayout from '../layouts/Main'

auth.useDeviceLanguage()

export default function ResetPassword() {
  const { authUser, loading, sendPasswordResetEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  // Listen for changes on authUser, redirect if needed
  // Also redirect after signin as authState will update from useFirebaseAuth
  useEffect(() => {
    if (!loading) return

    if (authUser && authUser.email) {
      if (authUser.role === Roles.ADMIN) router.push('/admin')
      else if (authUser.role === Roles.INTERVIEWER) router.push('/interviewer')
      else if (authUser.role === Roles.REVIEWER) router.push('/reviewer')
      else router.push('/application-portal')
    }
  }, [loading, authUser])

  const startPasswordReset = () => {
    setErrorMessage('')
    setEmailSent(false)
    if (!email) return

    sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true)
        setEmail('')
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorMessage(
              'No such email - please use the email you signed up with.',
            )
            break
          case 'auth/invalid-email':
            setErrorMessage("Email address isn't valid.")
            break
          default:
            setErrorMessage(
              'Something went wrong, please try again in a few hours.',
            )
            break
        }
      })
  }

  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex justify-center">
        <div>
          <h1 className="mb-4 bg-blue-850 text-xl sm:text-2xl lg:text-3xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
            Reset Password
          </h1>

          {errorMessage ? (
            <div className="flex justify-center bg-red-200 rounded-3xl text-sm p-2 pl-4 mb-2">
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <div className="bg-gray-200 rounded-3xl p-2">
            <div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-blue-850 text-base md:text-lg">
                  Email
                </p>
                <input
                  className="col-span-7 sm:col-span-4 rounded px-1.5 py-1 text-sm"
                  name="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Registered email address"
                />
              </div>

              <div className="flex justify-center">
                <button
                  className="text-white text-base md:text-lg bg-blue-850 py-2 px-4 rounded-3xl"
                  onClick={startPasswordReset}
                >
                  Verify
                </button>
              </div>

              {emailSent && (
                <div className="border rounded-lg p-2 my-6 mb-1 border-green-400 text-sm bg-green-300 text-green-900">
                  <b>Email sent!</b>
                  <br />
                  Please follow the instructions there to reset your password.
                </div>
              )}

              <br />
              <div className="p-2 flex">
                <p className="text-blue-850 md:text-base">
                  <Link href="/signin">
                    <a className="py-4 px-2 text-red-850 text-sm font-bold">
                      <FontAwesomeIcon icon={faArrowLeft} /> Back to signin
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
