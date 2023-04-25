import { Dispatch, SetStateAction, useState } from 'react'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { updateIntFormStatus } from '../../../pages/api/updateInterviewMarks'
import { InterviewerInstructionsType } from '../../../types'
import Step9 from '../../ReviewApplicationSteps/Step9'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  instructions: InterviewerInstructionsType
}

const InterviewerStep6 = ({
  applId,
  applicationData,
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
          Other Information
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold m-2">
          <p className="mb-5">{instructions.STEP6_INSTRUCTION}</p>
        </div>
      </div>

      <Step9 otherInfo={applicationData.other_information} />

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

export default InterviewerStep6
