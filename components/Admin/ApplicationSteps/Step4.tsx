import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import {
  ReviewMarksType,
  ReviewerInstructionsType,
  Users,
} from '../../../types'
import Field from '../../ReviewApplicationSteps/Field'
import Step7 from '../../ReviewApplicationSteps/Step7'
import ProceedButtons from './ProceedButtons'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  reviewers: Users
  revInstructions: ReviewerInstructionsType
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  formStatus: number
}

const AdminStep4 = ({
  applicationData,
  adminPortalData,
  reviewers,
  revInstructions,
  status,
  setStatus,
  formStatus,
}: Props) => {
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
      <Step7 extraCurrActivities={applicationData.extra_curriculars} />

      {Object.keys(reviewMarks).length ? (
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
          <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
            Extracurricular Activities Marks
          </h1>
          {Object.keys(reviewMarks).map((reviewerId, index) => (
            <div className="my-5" key={index}>
              <p className="font-bold sm:text-lg font-extrabold">
                Marks given by Reviewer {reviewers[reviewerId].name}
              </p>
              <div className="ml-5 text-blue-850">
                <Field
                  name={`Total Curricular Marks (out of ${revInstructions.EXTRACURRICULAR_MAX_MARKS})`}
                  value={reviewMarks[reviewerId].extracurricularMarks}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <ProceedButtons
        status={status}
        setStatus={setStatus}
        formStatus={formStatus}
        error=""
      />
    </div>
  )
}

export default AdminStep4
