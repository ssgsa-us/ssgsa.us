import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { updateApplicationStatus } from '../../../pages/api/applications/updateApplicationStatus'
import {
  InterviewMarksType,
  InterviewerInstructionsType,
  Users,
} from '../../../types'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  adminPortalData: AdminPortalData
  interviewers: Users
  intInstructions: InterviewerInstructionsType
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  formStatus: number
  changeOccured: boolean
  setChangeOccured: Dispatch<SetStateAction<boolean>>
}

const AdminStep8 = ({
  applId,
  adminPortalData,
  interviewers,
  intInstructions,
  status,
  setStatus,
  formStatus,
  changeOccured,
  setChangeOccured,
}: Props) => {
  const [interviewMarks, setInterviewMarks] = useState<InterviewMarksType>({})

  useEffect(() => {
    if (
      !adminPortalData ||
      !adminPortalData.interview_marks ||
      !Object.keys(interviewers).length
    )
      return

    Object.keys(adminPortalData.interview_marks).map((interviewerId) => {
      if (adminPortalData.interview_marks[interviewerId].formStatus === 9)
        setInterviewMarks((prev) => ({
          ...prev,
          [interviewerId]: adminPortalData.interview_marks[interviewerId],
        }))
    })
  }, [adminPortalData, interviewers])

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5 mb-10">
          Interviewer Marks
        </h1>

        {Object.keys(interviewMarks).map((interviewerId, index) => (
          <div className="my-10" key={index}>
            <p className="font-bold text-lg sm:text-xl font-extrabold">
              Marks given by Interviewer {interviewers[interviewerId].name}
            </p>
            <div className="ml-5 text-blue-850">
              <Field
                name={`Higher Studies Motivation (Out of ${intInstructions.HIGHER_STUDIES_MOTIVATION})`}
                value={interviewMarks[interviewerId].higherStudiesMotivation}
              />
              <Field
                name={`Communication (Out of ${intInstructions.COMMUNICATION})`}
                value={interviewMarks[interviewerId].communication}
              />
              <Field
                name={`Research Aptitude (Out of ${intInstructions.RESEARCH_APTITUDE})`}
                value={interviewMarks[interviewerId].researchAptitude}
              />
              <Field
                name={`Motivation To Go Back (Out of ${intInstructions.MOTIVATION_TO_GO_BACK})`}
                value={interviewMarks[interviewerId].motivationToGoBack}
              />
              <Field
                name="Total Marks (out of 100)"
                value={interviewMarks[interviewerId].totalMarks}
              />
              <Field
                name="Remark"
                value={
                  !interviewMarks[interviewerId].remark
                    ? 'No remark provided'
                    : interviewMarks[interviewerId].remark
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5 mb-10">
          Application Status
        </h1>

        <div className="flex flex-col items-center">
          <p className="text-red-850 text-2xl mb-5">
            {adminPortalData.application_status == 2
              ? 'Finalised For Review'
              : adminPortalData.application_status == 3
              ? 'Reviewed'
              : adminPortalData.application_status == 4
              ? 'Finalised For Interview'
              : 'Interviewed'}
          </p>
          {adminPortalData.application_status == 4 ? (
            <>
              <button
                className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850 mb-5"
                onClick={() =>
                  updateApplicationStatus(applId, 3)
                    .then(() => {
                      setChangeOccured(!changeOccured)
                      setStatus(7)
                    })
                    .catch(() => alert('Try again, network error!'))
                }
              >
                Remove From Interview Process
              </button>
              <button
                className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850 mb-5"
                onClick={() =>
                  updateApplicationStatus(applId, 5)
                    .then(() => setChangeOccured(!changeOccured))
                    .catch(() => alert('Try again, network error!'))
                }
              >
                Mark As Interviewed
              </button>
            </>
          ) : null}
        </div>
      </div>

      <ProceedButtons
        status={status}
        setStatus={setStatus}
        formStatus={formStatus}
        error=""
      />
    </div>
  )
}

export default AdminStep8
