import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../../firebase'
import ApplicationLayout from '../../layouts/application-portal/application'
import Step1 from '../../components/ApplicationSteps/Step1'
import Step2 from '../../components/ApplicationSteps/Step2'

export default function Application() {
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
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step1
              status={status}
              formStatus={formStatus}
              setFormStatus={setFormStatus}
              setStatus={setStatus}
            />
          </div>
        ) : status == 2 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step2
              status={status}
              formStatus={formStatus}
              setFormStatus={setFormStatus}
              setStatus={setStatus}
            />
          </div>
        ) : status == 3 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
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
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
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
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <p>You are at Step 5</p>
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
        ) : (
          <div className="mt-96" />
        )
      ) : (
        <div className="mt-96" />
      )}
    </ApplicationLayout>
  )
}
