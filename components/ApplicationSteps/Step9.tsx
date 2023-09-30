import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { useAuth } from '../../context/AuthUserContext'
import { updateApplicationData } from '../../pages/api/applications/step9'
import ProceedButtons from './ProceedButtons'
import Textarea from './Textarea'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step9 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  const [otherInfo, setOtherInfo] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setOtherInfo(applicationData.other_information || '')
  }, [applicationData])

  const validation = () => {
    setError('')
    if (otherInfo.split(' ').length >= 200) {
      setError('Please provide response in 200 words')
      return false
    }
    return true
  }

  // Used in next step and save information
  // Call updateApplicationData with required fields and a dynamic status (newStatus)
  // newStatus will be provided depends upon the formStatus and the current status
  // if both are equal newStatus will be status+1 otherwise formStatus
  const updateData = (newStatus: number) => {
    return updateApplicationData(authUser.id, otherInfo, newStatus)
  }

  return (
    <div>
      <div>
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
          <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
            Other Information
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
            Is there any other information you would like to share with us that
            can help you stand out from other applicants?
          </p>
          <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2 py-2">
            Note: Remember to save your information at frequent intervals.
          </p>
          <Textarea
            name=""
            description="(Word Limit: Maximum 200 words)"
            value={otherInfo}
            onChange={(e) => {
              if (e.target.value.split(' ').length <= 200)
                setOtherInfo(e.target.value)
            }}
            required={false}
            wordLimit={200}
          />
        </div>
        <ProceedButtons
          formStatus={applicationData.form_status}
          status={status}
          setStatus={setStatus}
          validation={validation}
          updateApplicationData={updateData}
          error={error}
          setError={setError}
        />
      </div>
    </div>
  )
}

export default Step9
