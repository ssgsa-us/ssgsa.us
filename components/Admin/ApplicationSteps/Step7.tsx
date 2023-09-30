import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { updateApplicationStatus } from '../../../pages/api/applications/updateApplicationStatus'
import {
  ReviewMarksType,
  ReviewerInstructionsType,
  Users,
} from '../../../types'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  adminPortalData: AdminPortalData
  reviewers: Users
  revInstructions: ReviewerInstructionsType
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  formStatus: number
  changeOccured: boolean
  setChangeOccured: Dispatch<SetStateAction<boolean>>
}

const AdminStep7 = ({
  applId,
  adminPortalData,
  reviewers,
  revInstructions,
  status,
  setStatus,
  formStatus,
  changeOccured,
  setChangeOccured,
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
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5 mb-10">
          Reviewer Marks
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
          {adminPortalData.application_status >= 4 ? null : (
            <button
              className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850 mb-5"
              onClick={() =>
                updateApplicationStatus(
                  applId,
                  adminPortalData.application_status + 1,
                )
                  .then(() => setChangeOccured(!changeOccured))
                  .catch(() => alert('Try again, network error!'))
              }
            >
              {adminPortalData.application_status == 2
                ? 'Mark As Reviewed'
                : 'Finalise For Interview'}
            </button>
          )}
          {adminPortalData.application_status == 4 ? (
            <button
              className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850 mb-5"
              onClick={() =>
                updateApplicationStatus(applId, 3)
                  .then(() => setChangeOccured(!changeOccured))
                  .catch(() => alert('Try again, network error!'))
              }
            >
              Remove From Interview Process
            </button>
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

export default AdminStep7
