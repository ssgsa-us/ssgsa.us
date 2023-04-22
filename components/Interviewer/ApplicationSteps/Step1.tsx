import { Dispatch, SetStateAction, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { step1 } from '../../../pages/api/updateInterviewMarks'
import { InterviewerInstructionsType } from '../../../types'
import Step1 from '../../ReviewApplicationSteps/Step1'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  instructions: InterviewerInstructionsType
}

const InterviewerStep1 = ({
  applId,
  applicationData,
  adminPortalData,
  formStatus,
  status,
  setStatus,
  instructions,
}: Props) => {
  const { authUser } = useAuth()
  const [error, setError] = useState<string>('')

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Applicant&apos;s Tentative Plan And Personal Data
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold m-2">
          <p className="mb-5">{instructions.STEP1_INSTRUCTION}</p>
        </div>
      </div>

      <Step1 applicationData={applicationData} />

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={() => true}
        updateInterviewMarks={(newStatus: number) =>
          step1(applId, authUser.id, newStatus)
        }
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default InterviewerStep1
