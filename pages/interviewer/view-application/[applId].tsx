import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import Loading from '../../../components/Loading'
import InterviewerStep1 from '../../../components/Interviewer/ApplicationSteps/Step1'
import InterviewerStep2 from '../../../components/Interviewer/ApplicationSteps/Step2'
import InterviewerStep3 from '../../../components/Interviewer/ApplicationSteps/Step3'
import InterviewerStep4 from '../../../components/Interviewer/ApplicationSteps/Step4'
import InterviewerStep5 from '../../../components/Interviewer/ApplicationSteps/Step5'
import InterviewerStep6 from '../../../components/Interviewer/ApplicationSteps/Step6'
import InterviewerStep7 from '../../../components/Interviewer/ApplicationSteps/Step7'
import InterviewerStep8 from '../../../components/Interviewer/ApplicationSteps/Step8'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import { useAuth } from '../../../context/AuthUserContext'
import ApplicationLayout from '../../../layouts/interviewer/ApplicationLayout'
import { InterviewerInstructionsType, Users } from '../../../types'
import { getAdminPortalData } from '../../api/getAdminPortalData'
import { getApplicationData } from '../../api/getApplicationData'
import { getUserDetailsByIds } from '../../api/getUserDetails'
import {
  getInterviewerInstructions,
  getReviewerInstructions,
} from '../../api/instructions'

function ViewApplication() {
  const { authUser } = useAuth()
  const [adminPortalData, setAdminPortalData] = useState<AdminPortalData>(
    new AdminPortalData(),
  )
  const [applicationData, setApplicationData] = useState<ApplicationData>()
  const [formStatus, setFormStatus] = useState<number>(1)
  const [status, setStatus] = useState<number>(1)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const [reviewers, setReviewers] = useState<Users>({})
  const [intInstructions, setIntInstructions] =
    useState<InterviewerInstructionsType>({})
  const [revInstructions, setRevInstructions] =
    useState<InterviewerInstructionsType>({})
  const router = useRouter()
  const applId = String(router.query['applId'])

  const updateReviewerDetails = (data: AdminPortalData) => {
    getUserDetailsByIds(Object.keys(data.review_marks))
      .then((data) => setReviewers(data))
      .catch(() => alert('Not able to fetch reviewer details'))
  }

  useEffect(() => {
    getInterviewerInstructions()
      .then((data) => setIntInstructions(data))
      .catch(() =>
        alert('Not able to fetch interview instructions, Try reloading!'),
      )

    getReviewerInstructions()
      .then((data) => setRevInstructions(data))
      .catch(() =>
        alert('Not able to fetch review instructions, Try reloading!'),
      )
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
                if (data.review_marks) updateReviewerDetails(data)

                if (
                  data.interview_marks &&
                  data.interview_marks[authUser.id] &&
                  data.interview_marks[authUser.id].formStatus
                ) {
                  setStatus(data.interview_marks[authUser.id].formStatus)
                  setFormStatus(data.interview_marks[authUser.id].formStatus)
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
            if (data.review_marks) updateReviewerDetails(data)

            if (
              data.interview_marks &&
              data.interview_marks[authUser.id] &&
              data.interview_marks[authUser.id].formStatus
            )
              setFormStatus(data.interview_marks[authUser.id].formStatus)
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
            <InterviewerStep1
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
              intInstructions={intInstructions}
            />
          </div>
        ) : status == 2 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <InterviewerStep2
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              reviewers={reviewers}
              revInstructions={revInstructions}
              intInstructions={intInstructions}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 3 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <InterviewerStep3
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              reviewers={reviewers}
              revInstructions={revInstructions}
              intInstructions={intInstructions}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 4 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <InterviewerStep4
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              reviewers={reviewers}
              revInstructions={revInstructions}
              intInstructions={intInstructions}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 5 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <InterviewerStep5
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              reviewers={reviewers}
              revInstructions={revInstructions}
              intInstructions={intInstructions}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 6 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <InterviewerStep6
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
              intInstructions={intInstructions}
            />
          </div>
        ) : status == 7 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <InterviewerStep7
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              reviewers={reviewers}
              revInstructions={revInstructions}
              intInstructions={intInstructions}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : status == 8 ? (
          <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
            <InterviewerStep8
              applId={applId}
              applicationData={applicationData}
              adminPortalData={adminPortalData}
              intInstructions={intInstructions}
              formStatus={formStatus}
              status={status}
              setStatus={setStatus}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center my-48">
            <p className="text-xl text-red-850">
              This application is already interviewed. You can still update the
              marks.
              <br />
              Make sure to click on complete button on step 8, after making any
              change.
            </p>
          </div>
        )
      ) : (
        <Loading message="Loading your application data!" />
      )}
    </ApplicationLayout>
  )
}

export default requireAuth(ViewApplication, Roles.INTERVIEWER)
