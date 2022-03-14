import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { auth } from '../../../firebase'
import { getAdminPortalData } from '../../api/getAdminPortalData'
import { getApplicationData } from '../../api/getApplicationData'
import { getReviewerDetailsById } from '../../api/getReviewerDetails'
import { Reviewer } from '../../../classes/reviewer'
import ReviewApplication from '../../../components/ApplicationSteps/ReviewApplication'
import ReviewMarksModal from '../../../components/modals/ReviewMarksModal'
import { updateApplicationStatus } from '../../api/updateApplicationStatus'
import { updateReviewSet } from '../../api/updateReviewSet'

export default function ViewApplication() {
  const [adminPortalData, setAdminPortalData] = useState<AdminPortalData>()
  const [applicationData, setApplicationData] = useState<ApplicationData>()
  const [reviewers, setReviewers] = useState<{ [key: string]: Reviewer }>({})
  const [showModal, setShowModal] = useState<boolean>(false)
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()
  const applId = String(router.query['applId'])

  const updateData = () => {
    getApplicationData(applId)
      .then((data) => {
        setApplicationData(data)
        getAdminPortalData(applId)
          .then((data) => {
            setAdminPortalData(data)
            setPageReady(true)
            if (data && data.review_marks)
              Object.keys(data.review_marks).map((reviewerId: string) => {
                getReviewerDetailsById(reviewerId)
                  .then((reviewer: Reviewer) =>
                    setReviewers((prevReviewers) => {
                      return { ...prevReviewers, [reviewerId]: reviewer }
                    }),
                  )
                  .catch(() => {})
              })
          })
          .catch(() => alert('Try again, network error!'))
      })
      .catch(() => alert('Try again, network error!'))
  }

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/admin/signin')
      else {
        if (auth.currentUser.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL)
          updateData()
        else router.push('/404')
      }
    })
  }, [])

  useEffect(() => {
    if (
      auth.currentUser &&
      auth.currentUser.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL
    )
      updateData()
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
                        {adminPortalData.application_status == 1
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
                    {adminPortalData.review_marks ? (
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
                    {adminPortalData.interview_marks ? (
                      <div>
                        <div className="flex justify-around my-5">
                          <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                            Interview Marks Based on A
                          </p>
                          <p className="sm:text-lg font-bold">
                            {adminPortalData.interview_marks.A}
                          </p>
                        </div>
                        <div className="flex justify-around my-5">
                          <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                            Interview Marks Based on B
                          </p>
                          <p className="sm:text-lg font-bold">
                            {adminPortalData.interview_marks.B}
                          </p>
                        </div>
                        <div className="flex justify-around my-5">
                          <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                            Interview Marks Based on C
                          </p>
                          <p className="sm:text-lg font-bold">
                            {adminPortalData.interview_marks.C}
                          </p>
                        </div>
                        <div className="flex justify-around my-5">
                          <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                            Interview Marks Based on D
                          </p>
                          <p className="sm:text-lg font-bold">
                            {adminPortalData.interview_marks.D}
                          </p>
                        </div>
                        <div className="flex justify-around my-5">
                          <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                            Total Interview Marks
                          </p>
                          <p className="sm:text-lg font-bold">
                            {adminPortalData.interview_marks.A +
                              adminPortalData.interview_marks.B +
                              adminPortalData.interview_marks.C +
                              adminPortalData.interview_marks.D}
                          </p>
                        </div>
                      </div>
                    ) : null}
                    {adminPortalData.application_status != 2 ? null : (
                      <div className="flex flex-col sm:flex-row items-center sm:justify-around my-10">
                        <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                          Select Review Set
                        </p>
                        <select
                          className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-blue-850"
                          value={adminPortalData.review_set}
                          onChange={(e) =>
                            updateReviewSet(applId, e.target.value)
                              .then(() => setChangeOccured(!changeOccured))
                              .catch(() => alert('Try again, network error!'))
                          }
                        >
                          <option
                            label="Select"
                            value={undefined || null || ''}
                            className="bg-gray-400 hover:bg-blue-850"
                          />
                          {[
                            'A',
                            'B',
                            'C',
                            'D',
                            'E',
                            'F',
                            'G',
                            'H',
                            'I',
                            'J',
                            'K',
                            'L',
                            'M',
                            'N',
                            'O',
                            'P',
                            'Q',
                            'R',
                            'S',
                            'T',
                            'U',
                            'V',
                            'W',
                            'X',
                            'Y',
                            'Z',
                          ].map((char) => (
                            <option
                              label={char}
                              value={char}
                              className="bg-gray-400 hover:bg-blue-850"
                            />
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row items-center sm:justify-around my-10">
                      {adminPortalData.application_status >= 3 ? null : (
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
                          {adminPortalData.application_status == 1
                            ? 'Unremove'
                            : 'Remove'}
                        </button>
                      )}
                      {adminPortalData.application_status >= 2 ? null : (
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
                      {adminPortalData.application_status != 3 ? null : (
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
