import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { step7 } from '../../../pages/api/updateReviewMarks'
import {
  InterviewerInstructionsType,
  ReviewMarksType,
  ReviewerInstructionsType,
  Users,
} from '../../../types'
import TextInput from '../../ApplicationSteps/TextInput'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'
import { updateIntFormStatus } from '../../../pages/api/updateInterviewMarks'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  reviewers: Users
  revInstructions: ReviewerInstructionsType
  intInstructions: InterviewerInstructionsType
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const InterviewerStep7 = ({
  applId,
  applicationData,
  adminPortalData,
  reviewers,
  revInstructions,
  intInstructions,
  formStatus,
  status,
  setStatus,
}: Props) => {
  const { authUser } = useAuth()
  const [error, setError] = useState<string>('')
  const [reviewMarks, setReviewMarks] = useState<ReviewMarksType>({})

  useEffect(() => {
    if (
      !adminPortalData ||
      !adminPortalData.review_marks ||
      !Object.keys(reviewers).length
    )
      return

    Object.keys(adminPortalData.review_marks).map((reviewerId) => {
      if (adminPortalData.review_marks[reviewerId].formStatus === 8)
        setReviewMarks((prev) => ({
          ...prev,
          [reviewerId]: adminPortalData.review_marks[reviewerId],
        }))
    })
  }, [adminPortalData, reviewers])

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Review Marks
        </h1>

        {Object.keys(reviewMarks).map((reviewerId, index) => (
          <div className="my-10" key={index}>
            <p className="font-bold text-lg sm:text-xl font-extrabold">
              Marks given by Reviewer {reviewers[reviewerId].name}
            </p>
            <div className="ml-5 text-blue-850">
              <Field
                name={`Educational Qualification (Out of ${revInstructions.ACADEMIC_MAX_MARKS})`}
                value={reviewMarks[reviewerId].totalAcademicMarks}
              />
              <Field
                name={`Academic / Curricular Activities (Out of ${revInstructions.CURRICULAR_MAX_MARKS})`}
                value={reviewMarks[reviewerId].curricularMarks}
              />
              <Field
                name={`Extracurricular Activities (Out of ${revInstructions.EXTRACURRICULAR_MAX_MARKS})`}
                value={reviewMarks[reviewerId].extracurricularMarks}
              />
              <Field
                name={`Essay-Type Questions (Out of ${
                  revInstructions.SOP_MAX_MARKS * 5
                })`}
                value={reviewMarks[reviewerId].totalSOPMarks}
              />
              <Field
                name="Total Marks (out of 100)"
                value={reviewMarks[reviewerId].totalMarks}
              />
              <Field
                name="Remark"
                value={
                  !reviewMarks[reviewerId].remark
                    ? 'No remark provided'
                    : reviewMarks[reviewerId].remark
                }
              />
            </div>
          </div>
        ))}
      </div>

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={() => true}
        updateInterviewMarks={(newStatus: number) =>
          updateIntFormStatus(applId, authUser.id, newStatus)
        }
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default InterviewerStep7
