import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import {
  ReviewMarksType,
  ReviewerInstructionsType,
  Users,
} from '../../../types'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  reviewers: Users
  revInstructions: ReviewerInstructionsType
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const AdminStep7 = ({
  applId,
  applicationData,
  adminPortalData,
  reviewers,
  revInstructions,
  status,
  setStatus,
}: Props) => {
  const [error, setError] = useState<string>('')
  const [reviewMarks, setReviewMarks] = useState<ReviewMarksType>({})

  useEffect(() => {
    console.log(reviewers)
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
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5 mb-10">
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
              <Field name="Remark" value={reviewMarks[reviewerId].remark} />
            </div>
          </div>
        ))}
      </div>

      <ProceedButtons status={status} setStatus={setStatus} error={error} />
    </div>
  )
}

export default AdminStep7
