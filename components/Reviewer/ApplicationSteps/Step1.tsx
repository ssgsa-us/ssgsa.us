import Step1 from '../../ReviewApplicationSteps/Step1'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { Dispatch, SetStateAction, useState } from 'react'
import ProceedButtons from './ProceedButtons'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const ReviewerStep1 = ({
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
          Applicant&apos;s Tentative Plan And Personal Data
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 1 - Instruction 1
        </p>
      </div>

      <Step1 applicationData={applicationData} />

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

export default ReviewerStep1
