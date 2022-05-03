import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { Interviewer } from '../../../classes/interviewer'
import ReviewApplication from '../../../components/ApplicationSteps/ReviewApplication'
import { auth } from '../../../firebase'
import InterviewerLayout from '../../../layouts/interviewer/interviewer-layout'
import { getAdminPortalData } from '../../api/getAdminPortalData'
import { getApplicationData } from '../../api/getApplicationData'
import { getInterviewerDetails } from '../../api/getInterviewerDetails'
import { updateInterviewMarks } from '../../api/updateInterviewMarks'
import { updateInterviewRemark } from '../../api/updateInterviewRemark'

export default function ViewApplication() {
  const [adminPortalData, setAdminPortalData] = useState<AdminPortalData>(
    new AdminPortalData(),
  )
  const [applicationData, setApplicationData] = useState<ApplicationData>(
    new ApplicationData(),
  )
  const [interviewer, setInterviewer] = useState<Interviewer>()
  const [A, setA] = useState<number>(0)
  const [B, setB] = useState<number>(0)
  const [C, setC] = useState<number>(0)
  const [D, setD] = useState<number>(0)
  const [remark, setRemark] = useState<string>('')
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()
  const applId = String(router.query['applId'])

  const setInterviewerMarks = (data: AdminPortalData) => {
    let interview_marks = data.interview_marks
    if (interview_marks && interview_marks[auth.currentUser.uid]) {
      setA(interview_marks[auth.currentUser.uid].A || 0)
      setB(interview_marks[auth.currentUser.uid].B || 0)
      setC(interview_marks[auth.currentUser.uid].C || 0)
      setD(interview_marks[auth.currentUser.uid].D || 0)
      setRemark(interview_marks[auth.currentUser.uid].remark || '')
    }
  }

  const updateData = () => {
    if (applId) {
      getApplicationData(applId)
        .then((data) => {
          setApplicationData(data)
        })
        .catch(() => alert('Try again, network error!'))

      getAdminPortalData(applId)
        .then((data: AdminPortalData) => {
          if (data) {
            setAdminPortalData(data)
            setInterviewerMarks(data)
          }
          setPageReady(true)
        })
        .catch(() => alert('Try again, network error!'))
    }
  }

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/interviewer/signin')
      else {
        getInterviewerDetails(auth.currentUser.email)
          .then((interviewerData: Interviewer) => {
            if (interviewerData) {
              setInterviewer(interviewerData)
              updateData()
            } else router.push('/404')
          })
          .catch(() => alert('Try again, network error!'))
      }
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser && interviewer) updateData()
  }, [router.query, changeOccured, auth.currentUser])

  return (
    <InterviewerLayout>
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
                    <div className="flex justify-between my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        {process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_A} (Out
                        of {process.env.NEXT_PUBLIC_INTERVIEW_INDEX_A_MAX_MARKS}
                        )
                      </p>
                      <p className="sm:text-lg font-bold">
                        <input
                          name="Name"
                          type="number"
                          value={A}
                          min={0}
                          max={Number(
                            process.env.NEXT_PUBLIC_INTERVIEW_INDEX_A_MAX_MARKS,
                          )}
                          onChange={(e) =>
                            Number(e.target.value) >
                            Number(
                              process.env
                                .NEXT_PUBLIC_INTERVIEW_INDEX_A_MAX_MARKS,
                            )
                              ? null
                              : setA(Number(e.target.value))
                          }
                          className="w-full rounded-xl p-2 mt-1"
                        />
                      </p>
                    </div>
                    <div className="flex justify-between my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        {process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_B} (Out
                        of {process.env.NEXT_PUBLIC_INTERVIEW_INDEX_B_MAX_MARKS}
                        )
                      </p>
                      <p className="sm:text-lg font-bold">
                        <input
                          name="Name"
                          type="number"
                          value={B}
                          min={0}
                          max={Number(
                            process.env.NEXT_PUBLIC_INTERVIEW_INDEX_B_MAX_MARKS,
                          )}
                          onChange={(e) =>
                            Number(e.target.value) >
                            Number(
                              process.env
                                .NEXT_PUBLIC_INTERVIEW_INDEX_B_MAX_MARKS,
                            )
                              ? null
                              : setB(Number(e.target.value))
                          }
                          className="w-full rounded-xl p-2 mt-1"
                        />
                      </p>
                    </div>
                    <div className="flex justify-between my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        {process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_C} (Out
                        of {process.env.NEXT_PUBLIC_INTERVIEW_INDEX_C_MAX_MARKS}
                        )
                      </p>
                      <p className="sm:text-lg font-bold">
                        <input
                          name="Name"
                          type="number"
                          value={C}
                          min={0}
                          max={Number(
                            process.env.NEXT_PUBLIC_INTERVIEW_INDEX_C_MAX_MARKS,
                          )}
                          onChange={(e) =>
                            Number(e.target.value) >
                            Number(
                              process.env
                                .NEXT_PUBLIC_INTERVIEW_INDEX_C_MAX_MARKS,
                            )
                              ? null
                              : setC(Number(e.target.value))
                          }
                          className="w-full rounded-xl p-2 mt-1"
                        />
                      </p>
                    </div>
                    <div className="flex justify-between my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        {process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_D} (Out
                        of {process.env.NEXT_PUBLIC_INTERVIEW_INDEX_D_MAX_MARKS}
                        )
                      </p>
                      <p className="sm:text-lg font-bold">
                        <input
                          name="Name"
                          type="number"
                          value={D}
                          min={0}
                          max={Number(
                            process.env.NEXT_PUBLIC_INTERVIEW_INDEX_D_MAX_MARKS,
                          )}
                          onChange={(e) =>
                            Number(e.target.value) >
                            Number(
                              process.env
                                .NEXT_PUBLIC_INTERVIEW_INDEX_D_MAX_MARKS,
                            )
                              ? null
                              : setD(Number(e.target.value))
                          }
                          className="w-full rounded-xl p-2 mt-1"
                        />
                      </p>
                    </div>
                    <div className="flex justify-between my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        Total Review Marks (Out of{' '}
                        {Number(
                          process.env.NEXT_PUBLIC_INTERVIEW_INDEX_A_MAX_MARKS,
                        ) +
                          Number(
                            process.env.NEXT_PUBLIC_INTERVIEW_INDEX_B_MAX_MARKS,
                          ) +
                          Number(
                            process.env.NEXT_PUBLIC_INTERVIEW_INDEX_C_MAX_MARKS,
                          ) +
                          Number(
                            process.env.NEXT_PUBLIC_INTERVIEW_INDEX_D_MAX_MARKS,
                          ) +
                          Number(
                            process.env.NEXT_PUBLIC_INTERVIEW_INDEX_E_MAX_MARKS,
                          )}
                        )
                      </p>
                      <p className="sm:text-lg font-bold mr-10">
                        {A + B + C + D}
                      </p>
                    </div>
                    <div className="flex justify-center my-5">
                      <button
                        className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
                          adminPortalData.application_status >= 5 ||
                          (!A && !B && !C && !D)
                            ? 'bg-red-860 cursor-not-allowed'
                            : 'bg-red-850'
                        }`}
                        onClick={() =>
                          adminPortalData.application_status >= 5 ||
                          (!A && !B && !C && !D)
                            ? null
                            : updateInterviewMarks(
                                applId,
                                auth.currentUser.uid,
                                A,
                                B,
                                C,
                                D,
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
                  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10">
                    <div className="flex justify-between items-center my-5">
                      <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                        Remark
                      </p>
                      <div className="sm:text-lg font-bold ml-20">
                        <textarea
                          name="Remark"
                          rows={5}
                          cols={100}
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          className="w-full rounded-xl p-2 mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center my-5">
                      <button
                        className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
                          adminPortalData.application_status >= 5 || !remark
                            ? 'bg-red-860 cursor-not-allowed'
                            : 'bg-red-850'
                        }`}
                        onClick={() =>
                          adminPortalData.application_status >= 5 || !remark
                            ? null
                            : updateInterviewRemark(
                                applId,
                                auth.currentUser.uid,
                                remark,
                              )
                                .then(() => {
                                  alert('Succesfully Updated!')
                                  setChangeOccured(!changeOccured)
                                })
                                .catch(() => alert('Try again, network error!'))
                        }
                      >
                        Update
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
    </InterviewerLayout>
  )
}
