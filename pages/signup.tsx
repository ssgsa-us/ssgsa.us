import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthUserContext'
import MainLayout from '../layouts/Main'
import firebase, { auth, firestore } from '../firebase'
import path from 'path'

const SignIn = () => {
  const { authUser, createUserWithEmailAndPassword } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [passwordOne, setPasswordOne] = useState<string>('')
  const [passwordTwo, setPasswordTwo] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [stream, setStream] = useState<string>('')
  const [sex, setSex] = useState<string>('Male')
  const [dob, setDOB] = useState<string>('')
  const [mobile, setMobile] = useState<number>()
  const [pwd, setPWD] = useState<string>('False')
  const [error, setError] = useState('')
  const [pageReady, setPageReady] = useState(false)

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) router.push('/')
      else setPageReady(true)
    })
  }, [])

  const onSubmit = (event) => {
    setError(null)
    //check if passwords match. If they do, create user in Firebase
    // and redirect to home page.
    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
        .then(async (result: firebase.auth.UserCredential) => {
          // add user data to firestore database
          const user = {
            name,
            email,
            stream,
            sex,
            dob,
            mobile,
            pwd,
          }

          firestore.doc(path.join('users', result.user.uid)).set(user)

          router.push('/')
        })
        .catch((error) => {
          setError(error.message)
        })
    else setError('Password do not match')
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
                    Stream
                  </p>
                  <input
                    className="col-span-7 sm:col-span-4 p-1 rounded"
                    name="Stream"
                    type="text"
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                  <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
                    Sex
                  </p>
                  <select
                    className="col-span-7 sm:col-span-4 p-1 rounded"
                    name="Sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <option label="Male" />
                    <option label="Female" />
                  </select>
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                  <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
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
                  <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
                    Date Of Birth
                  </p>
                  <input
                    className="col-span-7 sm:col-span-4 p-1 rounded"
                    name="Date Of Birth"
                    type="text"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                  <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
                    PWD
                  </p>
                  <select
                    className="col-span-7 sm:col-span-4 p-1 rounded"
                    name="PWD"
                    value={pwd}
                    onChange={(e) => setPWD(e.target.value)}
                  >
                    <option label="False" />
                    <option label="True" />
                  </select>
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                  <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
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
                  <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
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
                  <p className="text-white text-base md:text-lg">
                    Already have an account,{''}
                    <Link href="/signin">
                      <a className="py-4 px-2 text-blue-850">Login Here</a>
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

export default SignIn
