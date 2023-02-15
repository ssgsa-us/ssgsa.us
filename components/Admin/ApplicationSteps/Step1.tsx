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
      <Step1 applicationData={applicationData} />

      <ProceedButtons status={status} setStatus={setStatus} error="" />
    </div>
  )
}

export default AdminStep1
