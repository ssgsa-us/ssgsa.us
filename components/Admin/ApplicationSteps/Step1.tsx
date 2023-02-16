import { Dispatch, SetStateAction } from 'react'
import { ApplicationData } from '../../../classes/application_data'
import Step1 from '../../ReviewApplicationSteps/Step1'
import ProceedButtons from './ProceedButtons'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  formStatus: number
}

const AdminStep1 = ({
  applicationData,
  status,
  setStatus,
  formStatus,
}: Props) => {
  return (
    <div className="w-full">
      <Step1 applicationData={applicationData} />

      <ProceedButtons
        status={status}
        setStatus={setStatus}
        formStatus={formStatus}
        error=""
      />
    </div>
  )
}

export default AdminStep1
