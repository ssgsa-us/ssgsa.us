import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { Interviewer } from '../../../classes/interviewer'
import { Reviewer } from '../../../classes/reviewer'
import AdminStep1 from '../../../components/Admin/ApplicationSteps/Step1'
import AdminStep2 from '../../../components/Admin/ApplicationSteps/Step2'
import AdminStep3 from '../../../components/Admin/ApplicationSteps/Step3'
import AdminStep4 from '../../../components/Admin/ApplicationSteps/Step4'
import AdminStep5 from '../../../components/Admin/ApplicationSteps/Step5'
import AdminStep6 from '../../../components/Admin/ApplicationSteps/Step6'
import AdminStep7 from '../../../components/Admin/ApplicationSteps/Step7'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import ApplicationLayout from '../../../layouts/admin/ApplicationLayout'
import { getAdminPortalData } from '../../api/getAdminPortalData'
import { getApplicationData } from '../../api/getApplicationData'
import { getInterviewerDetailsById } from '../../api/getInterviewerDetails'
import { getReviewerDetailsById } from '../../api/getReviewerDetails'

function ViewApplication() {
  const [adminPortalData, setAdminPortalData] = useState<AdminPortalData>(
    new AdminPortalData(),
  )
  const [applicationData, setApplicationData] = useState<ApplicationData>()
  const [reviewers, setReviewers] = useState<{ [key: string]: Reviewer }>({})
  const [interviewers, setInterviewers] = useState<{ [key: string]: Reviewer }>(
    {},
  )
  const [status, setStatus] = useState<number>(1)
  const [formStatus, setFormStatus] = useState<number>(1)
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()
  const applId = String(router.query['applId'])

  const updateReviewerDetails = (data: AdminPortalData) => {
    Object.keys(data.review_marks).map((reviewerId: string) => {
      getReviewerDetailsById(reviewerId)
        .then((reviewer: Reviewer) =>
          setReviewers((prevReviewers) => {
            return { ...prevReviewers, [reviewerId]: reviewer }
          }),
        )
        .catch(() => {})
    })
  }

  const updateInterviewerDetails = (data: AdminPortalData) => {
    Object.keys(data.interview_marks).map((interviewerId: string) => {
      getInterviewerDetailsById(interviewerId)
        .then((interviewer: Interviewer) =>
          setInterviewers((prevInterviewers) => {
            return { ...prevInterviewers, [interviewerId]: interviewer }
          }),
        )
        .catch(() => {})
    })
  }

  useEffect(() => {
    if (applId)
      getApplicationData(applId)
        .then((data) => {
          setApplicationData(data)
          getAdminPortalData(applId)
            .then((data) => {
              if (data) {
                setAdminPortalData(data)
                if (data.review_marks) updateReviewerDetails(data)
                if (data.interview_marks) updateInterviewerDetails(data)

                if (data.application_status < 2) setFormStatus(6)
                else if (data.application_status < 4) {
                  setFormStatus(7)
                  setStatus(7)
                } else {
                  setFormStatus(8)
                  setStatus(8)
                }
              }
            })
            .catch(() => alert('Try again, network error!'))
        })
        .catch(() => alert('Try again, network error!'))
        .finally(() => setPageReady(true))
  }, [router.query])

  useEffect(() => {
    if (applId && applicationData && applicationData.email)
      getAdminPortalData(applId)
        .then((data) => {
          if (data) {
            setAdminPortalData(data)
            if (data.review_marks) updateReviewerDetails(data)
            if (data.interview_marks) updateInterviewerDetails(data)

            if (data.application_status < 2) setFormStatus(6)
            else if (data.application_status < 4) {
              setFormStatus(7)
            } else {
              setFormStatus(8)
            }
          }
        })
        .catch(() => alert('Try again, network error!'))
  }, [changeOccured])

  return (
    <ApplicationLayout
      status={status}
      formStatus={formStatus}
      setStatus={setStatus}
    >
      {pageReady ? (
        status === 1 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <AdminStep1
              applicationData={applicationData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status === 2 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <AdminStep2
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status === 3 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <AdminStep3
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status === 4 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <AdminStep4
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status === 5 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <AdminStep5
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status === 6 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <AdminStep6
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status === 7 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <AdminStep7
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : null
      ) : (
        <div className="mt-96" />
      )}
    </ApplicationLayout>
  )
}

export default requireAuth(ViewApplication, Roles.ADMIN)
