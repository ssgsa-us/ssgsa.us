import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { Interviewer } from '../../../classes/interviewer'
import { Reviewer } from '../../../classes/reviewer'
import SetDropdown from '../../../components/Admin/SetDropdown'
import ReviewApplication from '../../../components/ApplicationSteps/ReviewApplication'
import InterviewMarksModal from '../../../components/modals/InterviewerMarksModel'
import ReviewMarksModal from '../../../components/modals/ReviewMarksModal'
import requireAuth from '../../../components/requireAuth'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { getAdminPortalData } from '../../api/getAdminPortalData'
import { getApplicationData } from '../../api/getApplicationData'
import { getInterviewerDetailsById } from '../../api/getInterviewerDetails'
import { getReviewerDetailsById } from '../../api/getReviewerDetails'
import { updateApplicationStatus } from '../../api/updateApplicationStatus'
import { updateInterviewSet } from '../../api/updateInterviewSet'
import { updateReviewSet } from '../../api/updateReviewSet'

function ViewApplication() {
  const [adminPortalData, setAdminPortalData] = useState<AdminPortalData>()
  const [applicationData, setApplicationData] = useState<ApplicationData>()
  const [reviewers, setReviewers] = useState<{ [key: string]: Reviewer }>({})
  const [interviewers, setInterviewers] = useState<{ [key: string]: Reviewer }>(
    {},
  )
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
    if (applId) {
      getApplicationData(applId)
        .then((data) => {
          setApplicationData(data)
        })
        .catch(() => alert('Try again, network error!'))

      getAdminPortalData(applId)
        .then((data) => {
          setAdminPortalData(data)
          setPageReady(true)
          if (data && data.review_marks) updateReviewerDetails(data)
          if (data && data.interview_marks) updateInterviewerDetails(data)
        })
        .catch(() => alert('Try again, network error!'))
    }
  }, [router.query, changeOccured])

  return (
    <AdminLayout>
      {pageReady ? (
        <div>
          <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
            View User Application
          </h1>
          {applicationData ? (
            <div>
              <ReviewApplication applicationData={applicationData} />
              {applicationData.form_status == 6 ? (
                <div>
                  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10">
                    <div className="flex justify-around">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        Application Status
                      </p>
                      <p className="sm:text-lg font-bold">
                        {!adminPortalData
                          ? 'Not Checked'
                          : adminPortalData.application_status == 1
                          ? 'Removed'
                          : adminPortalData.application_status == 2
                          ? 'Finalised For Review'
                          : adminPortalData.application_status == 3
                          ? 'Reviewed'
                          : adminPortalData.application_status == 4
                          ? 'Finalised For Interview'
                          : adminPortalData.application_status == 5
                          ? 'Inteviewed'
                          : 'Not Checked'}
                      </p>
                    </div>
                    {adminPortalData && adminPortalData.review_marks ? (
                      <div>
                        <h3 className="text-center text-2xl text-red-850 my-5">
                          Total Review Marks
                        </h3>
                        {Object.keys(reviewers).map((reviewerId: string) => (
                          <div
                            className="flex justify-around my-5"
                            key={reviewerId}
                          >
                            <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                              Given by {reviewers[reviewerId].name}
                            </p>
                            <div className="sm:text-lg font-bold navgroup relative cursor-pointer">
                              <p className="navbar-text px-2 rounded-lg">
                                {adminPortalData.review_marks[reviewerId].A +
                                  adminPortalData.review_marks[reviewerId].B +
                                  adminPortalData.review_marks[reviewerId].C +
                                  adminPortalData.review_marks[reviewerId].D +
                                  adminPortalData.review_marks[reviewerId].E}
                              </p>
                              <ReviewMarksModal
                                reviewMarks={
                                  adminPortalData.review_marks[reviewerId]
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {!adminPortalData ||
                    adminPortalData.application_status != 2 ? null : (
                      <div className="flex flex-col sm:flex-row items-center sm:justify-around my-10">
                        <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                          Select Review Set
                        </p>
                        <SetDropdown
                          set={adminPortalData.review_set}
                          onChange={(e) =>
                            updateReviewSet(applId, e.target.value)
                              .then(() => setChangeOccured(!changeOccured))
                              .catch(() => alert('Try again, network error!'))
                          }
                          disabled={false}
                        />
                      </div>
                    )}
                    {adminPortalData && adminPortalData.interview_marks ? (
                      <div>
                        <h3 className="text-center text-2xl text-red-850 my-5">
                          Total Interview Marks
                        </h3>
                        {Object.keys(interviewers).map(
                          (interviewerId: string) => (
                            <div
                              className="flex justify-around my-5"
                              key={interviewerId}
                            >
                              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                                Given by {interviewers[interviewerId].name}
                              </p>
                              <div className="sm:text-lg font-bold navgroup relative cursor-pointer">
                                <p className="navbar-text px-2 rounded-lg">
                                  {adminPortalData.interview_marks[
                                    interviewerId
                                  ].A +
                                    adminPortalData.interview_marks[
                                      interviewerId
                                    ].B +
                                    adminPortalData.interview_marks[
                                      interviewerId
                                    ].C +
                                    adminPortalData.interview_marks[
                                      interviewerId
                                    ].D}
                                </p>
                                <InterviewMarksModal
                                  interviewMarks={
                                    adminPortalData.interview_marks[
                                      interviewerId
                                    ]
                                  }
                                />
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    ) : null}
                    {!adminPortalData ||
                    adminPortalData.application_status != 2 ? null : (
                      <div className="flex flex-col sm:flex-row items-center sm:justify-around my-10">
                        <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                          Select Interview Set
                        </p>
                        <SetDropdown
                          set={adminPortalData.interview_set}
                          onChange={(e) =>
                            updateInterviewSet(applId, e.target.value)
                              .then(() => setChangeOccured(!changeOccured))
                              .catch(() => alert('Try again, network error!'))
                          }
                          disabled={false}
                        />
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row items-center sm:justify-around my-10">
                      {adminPortalData &&
                      adminPortalData.application_status >= 3 ? null : (
                        <button
                          className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
                          onClick={() =>
                            adminPortalData.application_status == 1
                              ? updateApplicationStatus(applId, 0)
                                  .then(() => setChangeOccured(!changeOccured))
                                  .catch(() =>
                                    alert('Try again, network error!'),
                                  )
                              : updateApplicationStatus(applId, 1)
                                  .then(() => setChangeOccured(!changeOccured))
                                  .catch(() =>
                                    alert('Try again, network error!'),
                                  )
                          }
                        >
                          {adminPortalData &&
                          adminPortalData.application_status == 1
                            ? 'Unremove'
                            : 'Remove'}
                        </button>
                      )}
                      {adminPortalData &&
                      adminPortalData.application_status >= 2 ? null : (
                        <button
                          className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
                          onClick={() =>
                            updateApplicationStatus(applId, 2)
                              .then(() => setChangeOccured(!changeOccured))
                              .catch(() => alert('Try again, network error!'))
                          }
                        >
                          Finalise For Review
                        </button>
                      )}
                      {!adminPortalData ||
                      adminPortalData.application_status != 3 ? null : (
                        <button
                          className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
                          onClick={() =>
                            updateApplicationStatus(applId, 4)
                              .then(() => setChangeOccured(!changeOccured))
                              .catch(() => alert('Try again, network error!'))
                          }
                        >
                          Finalise For Interview
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-96" />
      )}
    </AdminLayout>
  )
}

export default requireAuth(ViewApplication, 'admin')
