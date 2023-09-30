import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { useAuth } from '../../context/AuthUserContext'
import { updateApplicationData } from '../../pages/api/applications/step7'
import { ExtraCurricularsType } from '../../types'
import FileUploadComponent from './FileUpload'
import ProceedButtons from './ProceedButtons'
import Textarea from './Textarea'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step7 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  const [extraCurr, setExtraCurr] = useState<ExtraCurricularsType>({
    description: '',
    document: '',
  })
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (applicationData.extra_curriculars) {
      setExtraCurr(applicationData.extra_curriculars)
    }
  }, [applicationData])

  // Used in next step and save information
  // Call updateApplicationData with required fields and a dynamic status (newStatus)
  // newStatus will be provided depends upon the formStatus and the current status
  // if both are equal newStatus will be status+1 otherwise formStatus
  const updateData = (newStatus: number) => {
    return updateApplicationData(authUser.id, extraCurr, newStatus)
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Extracurricular Activites
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2 py-2">
          Note: Remember to save your information at frequent intervals.
        </p>
        <br />
        <Textarea
          name="Description"
          description="Starting with the most recent, please list any leadership experience, non-academic achievements & awards, literary and cultural involvement, sports, volunteering, social work etc."
          value={extraCurr.description}
          onChange={(e) =>
            setExtraCurr((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          required={false}
        />
        <div className="p-2">
          <p className="md:text-lg">
            Add corresponding documents (if available) in one file.
          </p>
          <FileUploadComponent
            fileName={`ExtraCurricularActivities`}
            fileUrl={extraCurr.document}
            setFileUrl={(url: string) =>
              setExtraCurr((prev) => ({ ...prev, document: url }))
            }
          />
        </div>
      </div>
      <ProceedButtons
        formStatus={applicationData.form_status}
        status={status}
        setStatus={setStatus}
        validation={() => true}
        updateApplicationData={updateData}
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default Step7
