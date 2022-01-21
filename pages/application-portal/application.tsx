import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ApplicationData } from '../../classes/application_data'
import ApplicationLayout from '../../layouts/application-portal/application'
import { auth } from '../../firebase'
import { getApplicationData } from '../api/getApplicationData'
import Step1 from '../../components/ApplicationSteps/Step1'
import Step2 from '../../components/ApplicationSteps/Step2'
import Step3 from '../../components/ApplicationSteps/Step3'
import Step4 from '../../components/ApplicationSteps/Step4'
import Step5 from '../../components/ApplicationSteps/Step5'

export default function Application() {
  const router = useRouter()
  const [applicationData, setApplicationData] = useState<ApplicationData>(
    new ApplicationData(1),
  )
  const [pageReady, setPageReady] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(1)

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/application-portal/signin')
      else {
        setPageReady(true)
        getApplicationData(auth.currentUser.uid).then((data) => {
          setStatus(data.form_status)
          setApplicationData(data)
        })
      }
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser)
      getApplicationData(auth.currentUser.uid).then((data) => {
        setApplicationData(data)
      })
  }, [status])

  return (
    <ApplicationLayout
      status={status}
      formStatus={applicationData.form_status}
      setStatus={setStatus}
    >
      {pageReady ? (
        status == 1 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step1
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 2 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step2
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 3 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step3
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 4 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step4
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 5 || status == 6 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step5
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
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
