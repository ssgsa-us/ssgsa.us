import { Dispatch, SetStateAction } from 'react'
import { ApplicationData } from '../../../classes/application_data'
import Step1 from '../../ReviewApplicationSteps/Step1'
import ProceedButtons from './ProceedButtons'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const AdminStep1 = ({ applicationData, status, setStatus }: Props) => {
  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Applicant&apos;s Tentative Plan And Personal Data
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          {process.env.NEXT_PUBLIC_REVIEW_STEP1_INSTRUCTION1}
        </p>
      </div>

      <Step1 applicationData={applicationData} />

      <ProceedButtons status={status} setStatus={setStatus} error="" />
    </div>
  )
}

export default AdminStep1
