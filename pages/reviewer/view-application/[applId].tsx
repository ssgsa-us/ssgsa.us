import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import Loading from '../../../components/Loading'
import requireAuth from '../../../components/requireAuth'
import ReviewerStep1 from '../../../components/Reviewer/ApplicationSteps/Step1'
import ReviewerStep2 from '../../../components/Reviewer/ApplicationSteps/Step2'
import ReviewerStep3 from '../../../components/Reviewer/ApplicationSteps/Step3'
import ReviewerStep4 from '../../../components/Reviewer/ApplicationSteps/Step4'
import ReviewerStep5 from '../../../components/Reviewer/ApplicationSteps/Step5'
import ReviewerStep6 from '../../../components/Reviewer/ApplicationSteps/Step6'
import ReviewerStep7 from '../../../components/Reviewer/ApplicationSteps/Step7'
import Roles from '../../../constants/roles'
import { useAuth } from '../../../context/AuthUserContext'
import ApplicationLayout from '../../../layouts/reviewer/ApplicationLayout'
import { getAdminPortalData } from '../../api/getAdminPortalData'
import { getApplicationData } from '../../api/getApplicationData'
import { ReviewerInstructionsType } from '../../../types'
import { getReviewerInstructions } from '../../api/instructions'

function ViewApplication() {
  const { authUser } = useAuth()
  const [adminPortalData, setAdminPortalData] = useState<AdminPortalData>(
    new AdminPortalData(),
  )
  const [applicationData, setApplicationData] = useState<ApplicationData>()
  const [formStatus, setFormStatus] = useState<number>(1)
  const [status, setStatus] = useState<number>(1)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const [instructions, setInstructions] = useState<ReviewerInstructionsType>({})
  const router = useRouter()
  const applId = String(router.query['applId'])

  useEffect(() => {
    getReviewerInstructions()
      .then((data) => setInstructions(data))
      .catch(() => alert('Not able to fetch instructions, Try reloading!'))
  }, [])

  useEffect(() => {
    if (applId) {
      getApplicationData(applId)
        .then((data) => {
          setApplicationData(data)
          getAdminPortalData(applId)
            .then((data: AdminPortalData) => {
              if (data) {
                setAdminPortalData(data)
                if (
                  data.review_marks &&
                  data.review_marks[authUser.id] &&
                  data.review_marks[authUser.id].formStatus
                ) {
                  setStatus(data.review_marks[authUser.id].formStatus)
                  setFormStatus(data.review_marks[authUser.id].formStatus)
                }
              }
            })
            .catch(() => alert('Try again, network error!'))
        })
        .catch(() => alert('Try again, network error!'))
        .finally(() => setPageReady(true))
    }
  }, [router.query])

  useEffect(() => {
    if (applId && applicationData && applicationData.email) {
      getAdminPortalData(applId)
        .then((data: AdminPortalData) => {
          if (data) {
            setAdminPortalData(data)
            if (
              data.review_marks &&
              data.review_marks[authUser.id] &&
              data.review_marks[authUser.id].formStatus
            )
              setFormStatus(data.review_marks[authUser.id].formStatus)
          }
        })
        .catch(() => alert('Try again, network error!'))
    }
  }, [status])

  return (
    <ApplicationLayout
      status={status}
      formStatus={formStatus}
      setStatus={setStatus}
    >
      {pageReady ? (
        status == 1 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <ReviewerStep1
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
              instructions={instructions}
            />
          </div>
        ) : status == 2 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <ReviewerStep2
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
              instructions={instructions}
            />
          </div>
        ) : status == 3 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <ReviewerStep3
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
              instructions={instructions}
            />
          </div>
        ) : status == 4 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <ReviewerStep4
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
              instructions={instructions}
            />
          </div>
        ) : status == 5 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <ReviewerStep5
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
              instructions={instructions}
            />
          </div>
        ) : status == 6 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <ReviewerStep6
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
              instructions={instructions}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <ReviewerStep7
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
              instructions={instructions}
            />
          </div>
        )
      ) : (
        <Loading message="Loading your application data!" />
      )}
    </ApplicationLayout>
  )
}

export default requireAuth(ViewApplication, Roles.REVIEWER)
