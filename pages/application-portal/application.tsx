import { useEffect, useState } from 'react'
import Link from 'next/link'
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
import ReviewApplication from '../../components/ApplicationSteps/ReviewApplication'

export default function Application() {
  const router = useRouter()
  const [applicationData, setApplicationData] = useState<ApplicationData>(
    new ApplicationData(1),
  )
  const [pageReady, setPageReady] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(1)
  const [printStatus, setPrintStatus] = useState<boolean>(false)

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
        ) : status == 5 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step5
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : !printStatus ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <div>
              <div className="bg-green-850 text-white text-center font-bold rounded-3xl py-10 px-10 sm:py-20 sm:px-20">
                <p className="text-xl sm:text-3xl mb-10">
                  Your application has been submitted!
                </p>
                <p className="sm:text-lg">Thank you for applying to SSGSA</p>
              </div>
              <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-between mt-10">
                <Link href="/">
                  <a className="text-white text-lg md:text-xl bg-blue-850 font-bold mb-4 sm:mb-0 py-2 px-5 rounded-lg flex flex-row items-center">
                    SSGSA Home Page
                  </a>
                </Link>
                <button
                  className="text-white text-lg md:text-xl bg-red-850 font-bold py-2 px-5 rounded-lg flex flex-row items-center"
                  onClick={() => setPrintStatus(true)}
                >
                  See completed application
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <div>
              <div id="application">
                <ReviewApplication applicationData={applicationData} />
              </div>
              <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-between mt-10">
                <Link href="/">
                  <a className="text-white text-lg md:text-xl bg-blue-850 font-bold mb-4 sm:mb-0 py-2 px-5 rounded-lg flex flex-row items-center">
                    SSGSA Home Page
                  </a>
                </Link>
                <button
                  className="text-white text-lg md:text-xl bg-red-850 font-bold py-2 px-5 rounded-lg flex flex-row items-center"
                  onClick={() => {
                    const application = document.getElementById('application')
                    const print = document.createElement('iframe')
                    print.style.position = 'absolute'
                    print.style.top = '-1000px'
                    print.style.left = '-1000px'
                    document.body.appendChild(print)
                    print.contentWindow.document.open()
                    let content = '<html><head><style>'
                    const styles = document.getElementsByTagName('style')
                    Object.keys(styles).map((key) => {
                      content += styles[key].innerHTML
                    })
                    content +=
                      '</style></head><body>' +
                      application.innerHTML +
                      '</body></html>'
                    print.contentWindow.document.write(content)
                    print.contentWindow.document.close()
                    print.contentWindow.focus()
                    print.contentWindow.print()
                  }}
                >
                  Print Application
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="mt-96" />
      )}
    </ApplicationLayout>
  )
}
