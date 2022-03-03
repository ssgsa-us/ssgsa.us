import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ApplicationData } from '../../../classes/application_data'
import ReviewApplication from '../../../components/ApplicationSteps/ReviewApplication'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { auth } from '../../../firebase'
import { getApplicationDataForAdmin } from '../../api/getApplicationDataForAdmin'
import { updateApplicationStatus } from '../../api/updateApplicationStatus'

export default function ViewApplication() {
  const [applicationData, setApplicationData] = useState<ApplicationData>()
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/admin/signin')
      else {
        if (auth.currentUser.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL)
          getApplicationDataForAdmin(String(router.query['applId']))
            .then((data) => {
              setApplicationData(data)
              setPageReady(true)
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
      getApplicationDataForAdmin(String(router.query['applId']))
        .then((data) => {
          setApplicationData(data)
          setPageReady(true)
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
              <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10">
                <div className="flex justify-around">
                  <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                    Application Status
                  </p>
                  <p className="sm:text-lg font-bold">
                    {applicationData.application_status}
                  </p>
                </div>
                {applicationData.review_marks ? (
                  <div className="flex justify-around">
                    <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                      Review Marks
                    </p>
                    <p className="sm:text-lg font-bold">
                      {applicationData.review_marks}
                    </p>
                  </div>
                ) : null}
                {applicationData.interview_marks ? (
                  <div className="flex justify-around">
                    <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                      Interview Marks
                    </p>
                    <p className="sm:text-lg font-bold">
                      {applicationData.interview_marks}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:justify-between my-10">
                {applicationData.application_status ==
                'finalised for interview' ? null : (
                  <button
                    className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
                    onClick={() =>
                      applicationData.application_status == 'removed'
                        ? updateApplicationStatus(
                            String(router.query['applId']),
                            '',
                          )
                            .then(() => setChangeOccured(!changeOccured))
                            .catch(() => alert('Try again, network error!'))
                        : updateApplicationStatus(
                            String(router.query['applId']),
                            'removed',
                          )
                            .then(() => setChangeOccured(!changeOccured))
                            .catch(() => alert('Try again, network error!'))
                    }
                  >
                    {applicationData.application_status == 'removed'
                      ? 'Unremove'
                      : 'Remove'}
                  </button>
                )}
                {applicationData.application_status ==
                  'finalised for interview' ||
                applicationData.application_status ==
                  'finalised for review' ? null : (
                  <button
                    className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
                    onClick={() =>
                      updateApplicationStatus(
                        String(router.query['applId']),
                        'finalised for review',
                      )
                        .then(() => setChangeOccured(!changeOccured))
                        .catch(() => alert('Try again, network error!'))
                    }
                  >
                    Finalise For Review
                  </button>
                )}
                {applicationData.application_status == 'finalised for review' &&
                applicationData.review_marks ? (
                  <button
                    className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
                    onClick={() =>
                      updateApplicationStatus(
                        String(router.query['applId']),
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
      ) : (
        <div className="mt-96" />
      )}
    </AdminLayout>
  )
}
