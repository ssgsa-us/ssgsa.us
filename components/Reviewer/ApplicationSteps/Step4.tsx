import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { step4 } from '../../../pages/api/updateReviewMarks'
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
}

const ReviewerStep4 = ({
  applId,
  applicationData,
  adminPortalData,
  formStatus,
  status,
  setStatus,
}: Props) => {
  const { authUser } = useAuth()
  const [extracurricularMarks, setExtracurricularMarks] = useState<number>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (
      adminPortalData.review_marks &&
      adminPortalData.review_marks[authUser.id] &&
      adminPortalData.review_marks[authUser.id].extracurricularMarks
    )
      setExtracurricularMarks(
        adminPortalData.review_marks[authUser.id].extracurricularMarks,
      )
  }, [adminPortalData])

  const validation = () => {
    if (extracurricularMarks === null) {
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
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 4 - Instruction 1
        </p>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 4 - Instruction 2
        </p>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 4 - Instruction 3
        </p>
      </div>

      <Step7 extraCurrActivities={applicationData.extra_curriculars} />

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Extracurricular Activities Marks
        </h1>
        <div className="md:w-1/2">
          <TextInput
            name="Enter Total Marks"
            value={extracurricularMarks}
            type="number"
            onChange={(e) => {
              const maximum = 100
              if (
                Number(e.target.value) <= maximum &&
                Number(e.target.value) >= 0
              )
                setExtracurricularMarks(Number(e.target.value))
            }}
            required={true}
            step="0.01"
            minimum={0}
            maximum={100}
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
