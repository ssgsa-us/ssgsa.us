import { Dispatch, SetStateAction, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { step6 } from '../../../pages/api/updateReviewMarks'
import Step9 from '../../ReviewApplicationSteps/Step9'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const ReviewerStep6 = ({
  applId,
  applicationData,
  adminPortalData,
  formStatus,
  status,
  setStatus,
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
          <p className="mb-5">
            {process.env.NEXT_PUBLIC_REVIEW_STEP6_INSTRUCTION}
          </p>
        </div>
      </div>

      <Step9 otherInfo={applicationData.other_information} />

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={() => true}
        updateReviewMarks={(newStatus: number) =>
          step6(applId, authUser.id, newStatus)
        }
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default ReviewerStep6
