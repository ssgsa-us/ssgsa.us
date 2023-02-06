import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { Dispatch, SetStateAction, useState } from 'react'
import Step2 from '../../ReviewApplicationSteps/Step2'
import ProceedButtons from './ProceedButtons'
import Step3 from '../../ReviewApplicationSteps/Step3'
import Step4 from '../../ReviewApplicationSteps/Step4'
import Step5 from '../../ReviewApplicationSteps/Step5'
import Step6 from '../../ReviewApplicationSteps/Step6'
import TextInput from '../../ApplicationSteps/TextInput'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const ReviewerStep3 = ({
  applicationData,
  adminPortalData,
  status,
  setStatus,
}: Props) => {
  const [error, setError] = useState<string>('')

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Academic/Curricular Activities
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 3 - Instruction 1
        </p>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 3 - Instruction 2
        </p>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 3 - Instruction 3
        </p>
      </div>

      <Step3 researchData={applicationData.research_experience} />
      <Step4 workExperiences={applicationData.work_experience} />
      <Step5 workshops={applicationData.poster_or_workshops} />
      <Step6 curricularActivities={applicationData.curricular_activities} />

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Academic/Curricular Activities Marks
        </h1>
        <div className="md:w-1/2">
          <TextInput
            name="Enter Total Marks"
            value={5}
            type="number"
            onChange={(e) => {
              const maximum = 100
              if (
                Number(e.target.value) <= maximum &&
                Number(e.target.value) >= 0
              )
                true
            }}
            required={true}
            step="0.01"
            minimum={0}
            maximum={100}
          />
        </div>
      </div>

      <ProceedButtons
        formStatus={applicationData.form_status}
        status={status}
        setStatus={setStatus}
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default ReviewerStep3
