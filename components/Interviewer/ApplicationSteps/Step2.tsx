import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { updateIntFormStatus } from '../../../pages/api/updateInterviewMarks'
import {
  AcademicRecordType,
  InterviewerInstructionsType,
  ReviewMarksType,
  ReviewerInstructionsType,
  Users,
} from '../../../types'
import AcademicRecord from '../../ReviewApplicationSteps/AcademicRecord'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'

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

const InterviewerStep2 = ({
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
  const [reviewMarks, setReviewMarks] = useState<ReviewMarksType>({})
  const [error, setError] = useState<string>('')
  const academicRecord: AcademicRecordType = applicationData.academic_record

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
          Educational Qualifications
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold m-2">
          <p className="mb-5">{intInstructions.STEP2_INSTRUCTION}</p>
        </div>
      </div>

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Education Qualifications
        </h1>
        {!academicRecord || !Object.keys(academicRecord).length ? (
          <p className="font-bold mb-4">No Academic Record Added</p>
        ) : (
          Object.keys(academicRecord)
            .sort()
            .map((key, index) => (
              <>
                <AcademicRecord
                  academicRecord={academicRecord}
                  index={index}
                  id={Number(key)}
                  key={key}
                />

                <div className="mb-20 ml-10">
                  {Object.keys(reviewMarks).map((reviewerId, index) => (
                    <div className="mb-5" key={index}>
                      <p className="font-bold sm:text-lg font-extrabold">
                        Marks given by Reviewer {reviewers[reviewerId].name}
                      </p>
                      <div className="ml-5 text-blue-850">
                        <Field
                          name="Does the applicant’s reported CGPA/percentage match with their marksheet (rounded off to two decimal places)?"
                          value={
                            reviewMarks[reviewerId].academicGrades[Number(key)]
                              .isGradeCorrect
                              ? 'Yes'
                              : 'No'
                          }
                        />
                        <Field
                          name={
                            academicRecord[Number(key)].gradeCriteria === 'CGPA'
                              ? 'Correct CGPA'
                              : 'Correct Cumulative Percentage'
                          }
                          value={
                            reviewMarks[reviewerId].academicGrades[Number(key)]
                              .correctGrades
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ))
        )}
      </div>

      {Object.keys(reviewMarks).length ? (
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
          <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
            Education Qualifications Marks
          </h1>
          {Object.keys(reviewMarks).map((reviewerId, index) => (
            <div className="my-5" key={index}>
              <p className="font-bold sm:text-lg font-extrabold">
                Marks given by Reviewer {reviewers[reviewerId].name}
              </p>
              <div className="ml-5 text-blue-850">
                <Field
                  name={`Total Academic Marks (out of ${revInstructions.ACADEMIC_MAX_MARKS})`}
                  value={reviewMarks[reviewerId].totalAcademicMarks}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}

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

export default InterviewerStep2
