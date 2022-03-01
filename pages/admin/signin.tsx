import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../../firebase'
import PortalLayout from '../../layouts/admin/'
import { useAuth } from '../../context/AuthUserContext'

export default function Admin() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()
  const { signInWithEmailAndPassword } = useAuth()

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (
        auth.currentUser &&
        auth.currentUser.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL
      )
        router.push('/admin')
      else setPageReady(true)
    })
  }, [])

  const onSubmit = (event) => {
    setError(null)
    if (email && password) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(email).toLowerCase())) {
        if (email == process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
          signInWithEmailAndPassword(email, password)
            .then(() => {
              router.push('/admin')
            })
            .catch((error) => {
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
        } else
          setError(
            'There is no user record corresponding to these credentials.',
          )
      } else setError('Email is incorrect.')
    } else setError('All fields are required.')
    event.preventDefault()
  }

  return (
    <PortalLayout>
      {pageReady ? (
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </PortalLayout>
  )
}
