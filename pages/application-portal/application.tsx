import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import ReviewApplication from '../../components/ApplicationSteps/ReviewApplication'
import Step1 from '../../components/ApplicationSteps/Step1'
import Step10 from '../../components/ApplicationSteps/Step10'
import Step2 from '../../components/ApplicationSteps/Step2'
import Step3 from '../../components/ApplicationSteps/Step3'
import Step4 from '../../components/ApplicationSteps/Step4'
import Step5 from '../../components/ApplicationSteps/Step5'
import Step6 from '../../components/ApplicationSteps/Step6'
import Step7 from '../../components/ApplicationSteps/Step7'
import Step8 from '../../components/ApplicationSteps/Step8'
import Step9 from '../../components/ApplicationSteps/Step9'
import requireAuth from '../../components/requireAuth'
import Roles from '../../constants/roles'
import { useAuth } from '../../context/AuthUserContext'
import ApplicationLayout from '../../layouts/application-portal/application'
import { getApplicationData } from '../api/getApplicationData'

function Application() {
  const { authUser } = useAuth()
  const [applicationData, setApplicationData] = useState<ApplicationData>(
    new ApplicationData(1, authUser.email, 0),
  )
  const [pageReady, setPageReady] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(1)
  const [printStatus, setPrintStatus] = useState<boolean>(false)

  useEffect(() => {
    getApplicationData(authUser.id)
      .then((data) => {
        setStatus(data.form_status)
        setApplicationData(data)
        setPageReady(true)
      })
      .catch(() => alert('Try again, network error!'))
  }, [])

  useEffect(() => {
    setPageReady(false)
    getApplicationData(authUser.id)
      .then((data) => {
        setApplicationData(data)
        setPageReady(true)
      })
      .catch(() => alert('Try again, network error!'))
  }, [status])

  const printApplication = () => {
    const application = document.getElementById('application').innerHTML
    const head = document.getElementsByTagName('head')[0].innerHTML
    const bodyScript = document
      .getElementsByTagName('body')[0]
      .innerHTML.split('</div>')
      .slice(-1)[0]
    const content =
      '<html>' +
      head +
      '<body>' +
      application +
      bodyScript +
      '<iframe style="position: absolute; top: -1000px; left: -1000px;"></iframe></body></html>'

    const print: HTMLIFrameElement = document.createElement('iframe')
    print.style.position = 'absolute'
    print.style.top = '-1000px'
    print.style.left = '-1000px'
    document.body.appendChild(print)
    print.contentWindow.document.open()
    print.contentWindow.document.write(content)
    print.contentWindow.document.close()
    print.onload = () => {
      print.contentWindow.focus()
      print.contentWindow.print()
    }
  }

  return (
    <ApplicationLayout
      status={status}
      formStatus={applicationData.form_status}
      setStatus={setStatus}
    >
      {pageReady ? (
        new Date() <
        new Date(process.env.NEXT_PUBLIC_APPLICATION_START_DATE) ? (
          <div className="mt-10 bg-red-200 text-2xl text-red-850 text-center font-bold rounded-3xl p-2 pl-6 mb-5">
            Application has not started yet. Please check eligibility criteria
            and be ready with your documents.
          </div>
        ) : new Date() >
          new Date(process.env.NEXT_PUBLIC_APPLICATION_END_DATE) ? (
          <div className="mt-10 bg-red-200 text-2xl text-red-850 text-center font-bold rounded-3xl p-2 pl-6 mb-5">
            Application Portal is closed. We are not accepting more responses!
          </div>
        ) : status == 1 ? (
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
        ) : status == 6 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step6
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 7 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step7
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 8 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step8
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 9 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step9
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 10 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <Step10
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
                  onClick={printApplication}
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

export default requireAuth(Application, Roles.APPLICANT)
