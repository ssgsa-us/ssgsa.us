import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthUserContext'
import firebase, { auth } from '../firebase'
import MainLayout from '../layouts/Main'
import { createApplicationData } from './api/createApplicationData'
import { createUser } from './api/createUser'

const SignUp = () => {
  const { createUserWithEmailAndPassword } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [passwordOne, setPasswordOne] = useState<string>('')
  const [passwordTwo, setPasswordTwo] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [mobile, setMobile] = useState<number>()
  const [error, setError] = useState<string>('')
  const [pageReady, setPageReady] = useState<boolean>(false)

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) router.push('/')
      else setPageReady(true)
    })
  }, [])

  const onSubmit = (event) => {
    setError(null)
    if (name && email && mobile && passwordOne && passwordTwo) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(email).toLowerCase())) {
        //check if passwords match. If they do, create user in Firebase
        // and redirect to home page.
        if (passwordOne === passwordTwo) {
          createUserWithEmailAndPassword(email, passwordOne)
            .then(async (result: firebase.auth.UserCredential) => {
              // add user data to firestore database
              createUser(result.user.uid, name, email, mobile)
              createApplicationData(result.user.uid)

              router.push('/')
            })
            .catch((error) => {
              if (error.code === 'auth/weak-password') {
                setError('The password is too weak.')
              } else {
                setError(error.message.replace('Firebase', ''))
              }
            })
        } else setError('Password do not match.')
      } else setError('Email is incorrect.')
    } else setError('All fields are required.')
    event.preventDefault()
  }

  return (
    <MainLayout>
      {pageReady ? (
        <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex justify-center">
          <div>
            <h1 className="mb-4 bg-blue-850 text-xl sm:text-2xl lg:text-3xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
              Sign Up
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
                    Name
                  </p>
                  <input
                    className="col-span-7 sm:col-span-4 p-1 rounded"
                    name="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
                    Mobile
                  </p>
                  <input
                    className="col-span-7 sm:col-span-4 p-1 rounded"
                    name="Mobile"
                    type="number"
                    value={mobile}
                    onChange={(e) => setMobile(Number(e.target.value))}
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
                    value={passwordOne}
                    onChange={(e) => setPasswordOne(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                  <p className="col-span-2 sm:text-right text-blue-850 text-base md:text-lg">
                    Confirm Password
                  </p>
                  <input
                    className="col-span-7 sm:col-span-4 p-1 rounded"
                    name="Confirm Password"
                    type="password"
                    value={passwordTwo}
                    onChange={(e) => setPasswordTwo(e.target.value)}
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
                  <p className="text-blue-850 text-sm md:text-base">
                    Already have an account,{''}
                    <Link href="/signin">
                      <a className="py-4 px-2 text-red-850">Login Here</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </MainLayout>
  )
}

export default SignUp
