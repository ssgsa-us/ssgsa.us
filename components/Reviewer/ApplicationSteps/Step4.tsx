import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { step4 } from '../../../pages/api/updateReviewMarks'
import { ReviewerInstructionsType } from '../../../types'
import TextInput from '../../ApplicationSteps/TextInput'
import Step7 from '../../ReviewApplicationSteps/Step7'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  instructions: ReviewerInstructionsType
}

const ReviewerStep4 = ({
  applId,
  applicationData,
  adminPortalData,
  formStatus,
  status,
  setStatus,
  instructions,
}: Props) => {
  const { authUser } = useAuth()
  const [extracurricularMarks, setExtracurricularMarks] = useState<number>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (
      adminPortalData.review_marks &&
      adminPortalData.review_marks[authUser.id] &&
      adminPortalData.review_marks[authUser.id].extracurricularMarks !== null
    )
      setExtracurricularMarks(
        adminPortalData.review_marks[authUser.id].extracurricularMarks,
      )
  }, [adminPortalData])

  const validation = () => {
    if (extracurricularMarks == null) {
      setError('Please provide extra curricular marks.')
      return false
    }
    return true
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Extracurricular Activities
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold m-2">
          <p className="mb-5">{instructions.STEP4_INSTRUCTION}</p>
          <ul style={{ listStyle: 'disc' }} className="ml-2 p-2 pl-4">
            <li className="my-2">{instructions.STEP4_INSTRUCTION1}</li>
          </ul>
          <p className="my-5">
            <span className="text-base md:text-lg text-blue-850 font-black">
              Note:
            </span>{' '}
            For updating total marks, Go to last step and click on complete
            button
          </p>
        </div>
      </div>

      <Step7 extraCurrActivities={applicationData.extra_curriculars} />

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Extracurricular Activities Marks
        </h1>
        <div className="md:w-1/2 text-blue-850 font-black">
          <TextInput
            name={`Enter Total Marks (out of ${instructions.EXTRACURRICULAR_MAX_MARKS})`}
            value={extracurricularMarks}
            type="number"
            onChange={(e) => {
              if (
                Number(e.target.value) <=
                  instructions.EXTRACURRICULAR_MAX_MARKS &&
                Number(e.target.value) >= 0
              )
                setExtracurricularMarks(Number(e.target.value))
            }}
            required={true}
            step="0.01"
            minimum={0}
            maximum={instructions.EXTRACURRICULAR_MAX_MARKS}
          />
        </div>
      </div>

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={validation}
        updateReviewMarks={(newStatus: number) =>
          step4(applId, authUser.id, extracurricularMarks, newStatus)
        }
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default ReviewerStep4
