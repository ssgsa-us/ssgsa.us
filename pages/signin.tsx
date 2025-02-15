import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Roles from '../constants/roles'
import { useAuth } from '../context/AuthUserContext'
import MainLayout from '../layouts/Main'

const SignIn = () => {
  const { authUser, loading, signInWithEmailAndPassword } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  // Listen for changes on authUser, redirect if needed
  // Also redirect after signin as authState will update from useFirebaseAuth
  useEffect(() => {
    if (!loading) return

    if (authUser && authUser.email) {
      if (authUser.roles.includes(Roles.ADMIN)) router.push('/admin')
      else if (authUser.roles.includes(Roles.INTERVIEWER))
        router.push('/interviewer')
      else if (authUser.roles.includes(Roles.REVIEWER)) router.push('/reviewer')
      else if (authUser.roles.includes(Roles.APPLICANT))
        router.push('/application-portal')
      else router.push('/')
    }
  }, [loading, authUser])

  const onSubmit = (event) => {
    setError(null)
    if (email && password) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(email).toLowerCase())) {
        signInWithEmailAndPassword(email, password).catch((error) => {
          if (error.code === 'auth/wrong-password') {
            setError('Wrong password.')
          } else if (error.code === 'auth/user-not-found') {
            setError(
              'There is no user record corresponding to these credentials.',
            )
          } else {
            setError(error.message.replace('Firebase', ''))
          }
        })
      } else setError('Email is incorrect.')
    } else setError('All fields are required.')
    event.preventDefault()
  }

  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex justify-center">
        <div>
          <h1 className="mb-4 bg-blue-850 text-xl sm:text-2xl lg:text-3xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
            Sign In
          </h1>

          {error ? (
            <div className="bg-red-200 rounded-3xl text-sm p-2 pl-6 mb-2">
              <p>
                <span className="font-bold">Error:</span> {error}
              </p>
            </div>
          ) : null}

          <div className="bg-gray-200 rounded-3xl p-2">
            <div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-blue-850 text-base md:text-lg">
                  Email
                </p>
                <input
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-blue-850 text-base md:text-lg">
                  Password
                </p>
                <input
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-center">
                <button
                  className="text-white text-base md:text-lg bg-blue-850 py-2 px-4 rounded-3xl"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>

              <div className="flex justify-end">
                <p className="text-blue-850 text-sm md:text-base">
                  <Link href="/reset_password">
                    <a className="py-4 px-2 text-red-850 text-sm">
                      Forgot password?
                    </a>
                  </Link>
                </p>
              </div>

              <br />
              <div className="flex justify-center">
                <p className="text-blue-850 text-xs md:text-base">
                  Don&apos;t have an account?
                  <Link href="/signup">
                    <a className="py-4 px-1 text-red-850 font-bold">
                      Register here.
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

export default SignIn
