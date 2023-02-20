import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import {
  AcademicRecordType,
  ReviewMarksType,
  ReviewerInstructionsType,
  Users,
} from '../../../types'
import AcademicRecord from '../../ReviewApplicationSteps/AcademicRecord'
import ProceedButtons from './ProceedButtons'
import Field from '../../ReviewApplicationSteps/Field'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  reviewers: Users
  revInstructions: ReviewerInstructionsType
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  formStatus: number
}

const AdminStep2 = ({
  applicationData,
  adminPortalData,
  reviewers,
  revInstructions,
  status,
  setStatus,
  formStatus,
}: Props) => {
  const academicRecord: AcademicRecordType = applicationData.academic_record
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
              <div key={index}>
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
              </div>
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
        status={status}
        setStatus={setStatus}
        formStatus={formStatus}
        error=""
      />
    </div>
  )
}

export default AdminStep2
