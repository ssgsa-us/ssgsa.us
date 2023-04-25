import { Dispatch, SetStateAction, useState } from 'react'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { updateIntFormStatus } from '../../../pages/api/updateInterviewMarks'
import { InterviewerInstructionsType } from '../../../types'
import Step8 from '../../ReviewApplicationSteps/Step8'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  instructions: InterviewerInstructionsType
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const InterviewerStep5 = ({
  applId,
  applicationData,
  instructions,
  formStatus,
  status,
  setStatus,
}: Props) => {
  const { authUser } = useAuth()
  const [error, setError] = useState<string>('')
  const sopAnswers = applicationData.sop_answers

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Essay-Type Questions
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold m-2">
          <p className="mb-5">{instructions.STEP5_INSTRUCTION}</p>
          <ul style={{ listStyle: 'disc' }} className="ml-2 p-2 pl-4">
            <li className="my-2">{instructions.STEP5_INSTRUCTION1}</li>
            <li className="my-2">{instructions.STEP5_INSTRUCTION2}</li>
            <li className="my-2">{instructions.STEP5_INSTRUCTION3}</li>
            <li className="my-2">{instructions.STEP5_INSTRUCTION4}</li>
            <li className="my-2">{instructions.STEP5_INSTRUCTION5}</li>
            <li className="my-2">{instructions.STEP5_INSTRUCTION6}</li>
          </ul>
        </div>
      </div>

      <Step8 sopAnswers={sopAnswers} />

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
