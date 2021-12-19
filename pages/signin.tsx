import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthUserContext'
import MainLayout from '../layouts/Main'

const SignIn = () => {
  const { authUser, signInWithEmailAndPassword } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('')

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    if (authUser) router.push('/')
  }, [authUser, router])

  const onSubmit = (event) => {
    setError(null)
    signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        setError(error.message)
      })
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
            <div className="bg-red-200 rounded-3xl p-2 pl-6 mb-2">
              <p>
                <span className="font-bold">Error:</span> {error}
              </p>
            </div>
          ) : null}

          <div className="bg-red-850 rounded-3xl p-2">
            <div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
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
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
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

              <br />
              <div className="flex justify-center">
                <p className="text-white text-base md:text-lg">
                  Don&apos;t have account,{''}
                  <Link href="/signup">
                    <a className="py-4 px-2 text-blue-850">Register Here</a>
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
