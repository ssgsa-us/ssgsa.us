import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../../firebase'
import ApplicationLayout from '../../layouts/application-portal/application'

export default function Apply() {
  const router = useRouter()
  const [pageReady, setPageReady] = useState(false)
  const [formStatus, setFormStatus] = useState(1)
  const [status, setStatus] = useState(1)

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/application-portal/signin')
      else setPageReady(true)
    })
  }, [])

  return (
    <ApplicationLayout
      status={status}
      formStatus={formStatus}
      setStatus={setStatus}
    >
      {pageReady ? (
        status == 1 ? (
          <div className="flex flex-col items-center my-10">
            <p>You are at Step 1</p>
            <button
              className="text-white text-base md:text-lg bg-red-850 my-5 py-2 px-4 rounded-3xl"
              onClick={() => {
                if (status == formStatus) {
                  setStatus(2)
                  setFormStatus(2)
                } else {
                  setStatus(2)
                }
              }}
            >
              Go to Step 2
            </button>
          </div>
        ) : status == 2 ? (
          <div className="flex flex-col items-center my-10">
            <p>You are at Step 2</p>
            <button
              className="text-white text-base md:text-lg bg-red-850 my-5 py-2 px-4 rounded-3xl"
              onClick={() => {
                if (status == formStatus) {
                  setStatus(3)
                  setFormStatus(3)
                } else {
                  setStatus(3)
                }
              }}
            >
              Go to Step 3
            </button>
          </div>
        ) : status == 3 ? (
          <div className="flex flex-col items-center my-10">
            <p>You are at Step 3</p>
            <button
              className="text-white text-base md:text-lg bg-red-850 my-5 py-2 px-4 rounded-3xl"
              onClick={() => {
                if (status == formStatus) {
                  setStatus(4)
                  setFormStatus(4)
                } else {
                  setStatus(4)
                }
              }}
            >
              Go to Step 4
            </button>
          </div>
        ) : status == 4 ? (
          <div className="flex flex-col items-center my-10">
            <p>You are at Step 4</p>
            <button
              className="text-white text-base md:text-lg bg-red-850 my-5 py-2 px-4 rounded-3xl"
              onClick={() => {
                if (status == formStatus) {
                  setStatus(5)
                  setFormStatus(5)
                } else {
                  setStatus(5)
                }
              }}
            >
              Go to Step 5
            </button>
          </div>
        ) : status == 5 ? (
          <div className="flex flex-col items-center my-10">
            <p>You are at Step 5</p>
            <button
              className="text-white text-base md:text-lg bg-red-850 my-5 py-2 px-4 rounded-3xl"
              onClick={() => {
                if (status == formStatus) {
                  setStatus(6)
                  setFormStatus(6)
                } else {
                  setStatus(6)
                }
              }}
            >
              Go to Step 6
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center my-10">
            <p>You are at Step )</p>
            <button
              className="text-white text-base md:text-lg bg-red-850 my-5 py-2 px-4 rounded-3xl"
              onClick={() => {
                if (status == formStatus) {
                  setStatus(1)
                  setFormStatus(1)
                } else {
                  setStatus(1)
                }
              }}
            >
              Go to Step 1
            </button>
          </div>
        )
      ) : (
        <div />
      )}
    </ApplicationLayout>
  )
}
