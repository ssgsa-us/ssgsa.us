import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { updateIntFormStatus } from '../../../pages/api/updateInterviewMarks'
import {
  InterviewerInstructionsType,
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
  intInstructions: InterviewerInstructionsType
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const InterviewerStep5 = ({
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
  const sopAnswers = applicationData.sop_answers
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
          Essay-Type Questions
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold m-2">
          <p className="mb-5">{intInstructions.STEP5_INSTRUCTION}</p>
          <ul style={{ listStyle: 'disc' }} className="ml-2 p-2 pl-4">
            <li className="my-2">{intInstructions.STEP5_INSTRUCTION1}</li>
            <li className="my-2">{intInstructions.STEP5_INSTRUCTION2}</li>
            <li className="my-2">{intInstructions.STEP5_INSTRUCTION3}</li>
            <li className="my-2">{intInstructions.STEP5_INSTRUCTION4}</li>
            <li className="my-2">{intInstructions.STEP5_INSTRUCTION5}</li>
            <li className="my-2">{intInstructions.STEP5_INSTRUCTION6}</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Essay-Type Questions
        </h1>
        {!sopAnswers || !Object.keys(sopAnswers).length ? (
          <p className="font-bold mb-4">No Answers Provided</p>
        ) : (
          <>
            <div className="mb-20">
              <Field
                name={`a) ${process.env.NEXT_PUBLIC_QUESTION_1}`}
                value={sopAnswers['SOP1']}
              />
              <div className="mb-20 ml-10">
                {Object.keys(reviewMarks).map((reviewerId, index) => (
                  <div className="mb-5" key={index}>
                    <p className="font-bold sm:text-lg font-extrabold">
                      Marks given by Reviewer {reviewers[reviewerId].name}
                    </p>
                    <div className="ml-5 text-blue-850">
                      <Field
                        name={`Points for Essay (a) (out of ${revInstructions.SOP_MAX_MARKS})`}
                        value={reviewMarks[reviewerId].sopMarks['SOP1']}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-20">
              <Field
                name={`b) ${process.env.NEXT_PUBLIC_QUESTION_2}`}
                value={sopAnswers['SOP2']}
              />
              <div className="mb-20 ml-10">
                {Object.keys(reviewMarks).map((reviewerId, index) => (
                  <div className="mb-5" key={index}>
                    <p className="font-bold sm:text-lg font-extrabold">
                      Marks given by Reviewer {reviewers[reviewerId].name}
                    </p>
                    <div className="ml-5 text-blue-850">
                      <Field
                        name={`Points for Essay (b) (out of ${revInstructions.SOP_MAX_MARKS})`}
                        value={reviewMarks[reviewerId].sopMarks['SOP2']}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-20">
              <Field
                name={`c) ${process.env.NEXT_PUBLIC_QUESTION_3}`}
                value={sopAnswers['SOP3']}
              />
              <div className="mb-20 ml-10">
                {Object.keys(reviewMarks).map((reviewerId, index) => (
                  <div className="mb-5" key={index}>
                    <p className="font-bold sm:text-lg font-extrabold">
                      Marks given by Reviewer {reviewers[reviewerId].name}
                    </p>
                    <div className="ml-5 text-blue-850">
                      <Field
                        name={`Points for Essay (c) (out of ${revInstructions.SOP_MAX_MARKS})`}
                        value={reviewMarks[reviewerId].sopMarks['SOP3']}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-20">
              <Field
                name={`d) ${process.env.NEXT_PUBLIC_QUESTION_4}`}
                value={sopAnswers['SOP4']}
              />
              <div className="mb-20 ml-10">
                {Object.keys(reviewMarks).map((reviewerId, index) => (
                  <div className="mb-5" key={index}>
                    <p className="font-bold sm:text-lg font-extrabold">
                      Marks given by Reviewer {reviewers[reviewerId].name}
                    </p>
                    <div className="ml-5 text-blue-850">
                      <Field
                        name={`Points for Essay (d) (out of ${revInstructions.SOP_MAX_MARKS})`}
                        value={reviewMarks[reviewerId].sopMarks['SOP4']}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <Field
                name={`e) ${process.env.NEXT_PUBLIC_QUESTION_5}`}
                value={sopAnswers['SOP5']}
              />
              <div className="mb-20 ml-10">
                {Object.keys(reviewMarks).map((reviewerId, index) => (
                  <div className="mb-5" key={index}>
                    <p className="font-bold sm:text-lg font-extrabold">
                      Marks given by Reviewer {reviewers[reviewerId].name}
                    </p>
                    <div className="ml-5 text-blue-850">
                      <Field
                        name={`Points for Essay (e) (out of ${revInstructions.SOP_MAX_MARKS})`}
                        value={reviewMarks[reviewerId].sopMarks['SOP5']}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {Object.keys(reviewMarks).length ? (
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
          <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
            Essay-Type Question Marks
          </h1>
          {Object.keys(reviewMarks).map((reviewerId, index) => (
            <div className="my-5" key={index}>
              <p className="font-bold sm:text-lg font-extrabold">
                Marks given by Reviewer {reviewers[reviewerId].name}
              </p>
              <div className="ml-5 text-blue-850">
                <Field
                  name={`Total Essay-Type Marks (out of ${
                    revInstructions.SOP_MAX_MARKS * 5
                  })`}
                  value={reviewMarks[reviewerId].totalSOPMarks}
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

export default InterviewerStep5
