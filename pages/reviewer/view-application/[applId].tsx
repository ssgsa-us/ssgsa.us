import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { auth } from '../../../firebase'
import { getAdminPortalData } from '../../api/getAdminPortalData'
import { getApplicationData } from '../../api/getApplicationData'
import { getReviewerDetails } from '../../api/getReviewerDetails'
import { Reviewer } from '../../../classes/reviewer'
import ReviewApplication from '../../../components/ApplicationSteps/ReviewApplication'
import ReviewerLayout from '../../../layouts/reviewer/reviewer-layout'
import { updateReviewMarks } from '../../api/updateReviewMarks'

export default function ViewApplication() {
  const [adminPortalData, setAdminPortalData] = useState<AdminPortalData>(
    new AdminPortalData(),
  )
  const [applicationData, setApplicationData] = useState<ApplicationData>(
    new ApplicationData(),
  )
  const [reviewer, setReviewer] = useState<Reviewer>()
  const [A, setA] = useState<number>(0)
  const [B, setB] = useState<number>(0)
  const [C, setC] = useState<number>(0)
  const [D, setD] = useState<number>(0)
  const [E, setE] = useState<number>(0)
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()
  const applId = String(router.query['applId'])

  const updateData = () => {
    getApplicationData(applId)
      .then((data) => {
        setApplicationData(data)
        getAdminPortalData(applId)
          .then((data: AdminPortalData) => {
            if (data) {
              setAdminPortalData(data)
              let review_marks = data.review_marks
              if (review_marks && review_marks[auth.currentUser.uid]) {
                setA(review_marks[auth.currentUser.uid].A)
                setB(review_marks[auth.currentUser.uid].B)
                setC(review_marks[auth.currentUser.uid].C)
                setD(review_marks[auth.currentUser.uid].D)
                setE(review_marks[auth.currentUser.uid].E)
              }
            }
            setPageReady(true)
          })
          .catch(() => alert('Try again, network error!'))
      })
      .catch(() => alert('Try again, network error!'))
  }

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/reviewer/signin')
      else {
        getReviewerDetails(auth.currentUser.email)
          .then((reviewerData: Reviewer) => {
            if (reviewerData) {
              setReviewer(reviewerData)
              updateData()
            } else router.push('/404')
          })
          .catch(() => alert('Try again, network error!'))
      }
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser && reviewer) updateData()
  }, [router.query, changeOccured])

  return (
    <ReviewerLayout>
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
                    <div className="flex justify-around my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        Review Marks Based on A
                      </p>
                      <p className="sm:text-lg font-bold">
                        <input
                          name="Name"
                          type="number"
                          value={A}
                          onChange={(e) => setA(Number(e.target.value))}
                          className="w-full rounded-xl p-2 mt-1"
                        />
                      </p>
                    </div>
                    <div className="flex justify-around my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        Review Marks Based on B
                      </p>
                      <p className="sm:text-lg font-bold">
                        <input
                          name="Name"
                          type="number"
                          value={B}
                          onChange={(e) => setB(Number(e.target.value))}
                          className="w-full rounded-xl p-2 mt-1"
                        />
                      </p>
                    </div>
                    <div className="flex justify-around my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        Review Marks Based on C
                      </p>
                      <p className="sm:text-lg font-bold">
                        <input
                          name="Name"
                          type="number"
                          value={C}
                          onChange={(e) => setC(Number(e.target.value))}
                          className="w-full rounded-xl p-2 mt-1"
                        />
                      </p>
                    </div>
                    <div className="flex justify-around my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        Review Marks Based on D
                      </p>
                      <p className="sm:text-lg font-bold">
                        <input
                          name="Name"
                          type="number"
                          value={D}
                          onChange={(e) => setD(Number(e.target.value))}
                          className="w-full rounded-xl p-2 mt-1"
                        />
                      </p>
                    </div>
                    <div className="flex justify-around my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        Review Marks Based on E
                      </p>
                      <p className="sm:text-lg font-bold">
                        <input
                          name="Name"
                          type="number"
                          value={E}
                          onChange={(e) => setE(Number(e.target.value))}
                          className="w-full rounded-xl p-2 mt-1"
                        />
                      </p>
                    </div>
                    <div className="flex justify-around my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        Total Review Marks
                      </p>
                      <p className="sm:text-lg font-bold">
                        {A + B + C + D + E}
                      </p>
                    </div>
                    <div className="flex justify-center my-5">
                      <button
                        className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
                          adminPortalData.application_status >= 5 ||
                          (!A && !B && !C && !D && !E)
                            ? 'bg-red-860 cursor-not-allowed'
                            : 'bg-red-850'
                        }`}
                        onClick={() =>
                          adminPortalData.application_status >= 5 ||
                          (!A && !B && !C && !D && !E)
                            ? null
                            : updateReviewMarks(
                                applId,
                                auth.currentUser.uid,
                                A,
                                B,
                                C,
                                D,
                                E,
                                3,
                              )
                                .then(() => {
                                  alert('Succesfully Updated!')
                                  setChangeOccured(!changeOccured)
                                })
                                .catch(() => alert('Try again, network error!'))
                        }
                      >
                        Update Marks
                      </button>
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
    </ReviewerLayout>
  )
}
