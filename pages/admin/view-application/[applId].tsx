import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { auth } from '../../../firebase'
import { getAdminPortalData } from '../../api/getAdminPortalData'
import { getApplicationData } from '../../api/getApplicationData'
import ReviewApplication from '../../../components/ApplicationSteps/ReviewApplication'
import { updateApplicationStatus } from '../../api/updateApplicationStatus'

export default function ViewApplication() {
  const [adminPortalData, setAdminPortalData] = useState<AdminPortalData>()
  const [applicationData, setApplicationData] = useState<ApplicationData>()
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()
  const applId = String(router.query['applId'])

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/admin/signin')
      else {
        if (auth.currentUser.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL)
          getApplicationData(applId)
            .then((data) => {
              setApplicationData(data)
              getAdminPortalData(applId)
                .then((data) => {
                  setAdminPortalData(data)
                  setPageReady(true)
                })
                .catch(() => alert('Try again, network error!'))
            })
            .catch(() => alert('Try again, network error!'))
        else router.push('/404')
      }
    })
  }, [])

  useEffect(() => {
    if (
      auth.currentUser &&
      auth.currentUser.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL
    )
      getApplicationData(applId)
        .then((data) => {
          setApplicationData(data)
          getAdminPortalData(applId)
            .then((data) => {
              setAdminPortalData(data)
              setPageReady(true)
            })
            .catch(() => alert('Try again, network error!'))
        })
        .catch(() => alert('Try again, network error!'))
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
                        {adminPortalData.application_status}
                      </p>
                    </div>
                    {adminPortalData.review_marks ? (
                      <div className="flex justify-around">
                        <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                          Review Marks
                        </p>
                        <p className="sm:text-lg font-bold">
                          {adminPortalData.review_marks}
                        </p>
                      </div>
                    ) : null}
                    {adminPortalData.interview_marks ? (
                      <div className="flex justify-around">
                        <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                          Interview Marks
                        </p>
                        <p className="sm:text-lg font-bold">
                          {adminPortalData.interview_marks}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between my-10">
                    {adminPortalData.application_status ==
                    'finalised for interview' ? null : (
                      <button
                        className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
                        onClick={() =>
                          adminPortalData.application_status == 'removed'
                            ? updateApplicationStatus(applId, '')
                                .then(() => setChangeOccured(!changeOccured))
                                .catch(() => alert('Try again, network error!'))
                            : updateApplicationStatus(applId, 'removed')
                                .then(() => setChangeOccured(!changeOccured))
                                .catch(() => alert('Try again, network error!'))
                        }
                      >
                        {adminPortalData.application_status == 'removed'
                          ? 'Unremove'
                          : 'Remove'}
                      </button>
                    )}
                    {adminPortalData.application_status ==
                      'finalised for interview' ||
                    adminPortalData.application_status ==
                      'finalised for review' ? null : (
                      <button
                        className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
                        onClick={() =>
                          updateApplicationStatus(
                            applId,
                            'finalised for review',
                          )
                            .then(() => setChangeOccured(!changeOccured))
                            .catch(() => alert('Try again, network error!'))
                        }
                      >
                        Finalise For Review
                      </button>
                    )}
                    {adminPortalData.application_status ==
                      'finalised for review' && adminPortalData.review_marks ? (
                      <button
                        className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
                        onClick={() =>
                          updateApplicationStatus(
                            applId,
                            'finalised for interview',
                          )
                            .then(() => setChangeOccured(!changeOccured))
                            .catch(() => alert('Try again, network error!'))
                        }
                      >
                        Finalise For Interview
                      </button>
                    ) : null}
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
