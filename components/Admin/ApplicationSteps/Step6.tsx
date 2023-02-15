import { Dispatch, SetStateAction, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import Step9 from '../../ReviewApplicationSteps/Step9'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const AdminStep6 = ({
  applId,
  applicationData,
  adminPortalData,
  status,
  setStatus,
}: Props) => {
  const [error, setError] = useState<string>('')

  return (
    <div className="w-full">
      <Step9 otherInfo={applicationData.other_information} />

      <ProceedButtons status={status} setStatus={setStatus} error={error} />
    </div>
  )
}

export default AdminStep6
