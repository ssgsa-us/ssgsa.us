import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { useAuth } from '../../context/AuthUserContext'
import { updateApplicationData } from '../../pages/api/applications/step6'
import { CurricularActivitiesType } from '../../types'
import FileUploadComponent from './FileUpload'
import ProceedButtons from './ProceedButtons'
import Textarea from './Textarea'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step6 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  const [currActivities, setCurrActivities] =
    useState<CurricularActivitiesType>({
      description: '',
      document: '',
      others: '',
      others_document: '',
    })
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (applicationData.curricular_activities) {
      setCurrActivities(applicationData.curricular_activities)
    }
  }, [applicationData])

  // Used in next step and save information
  // Call updateApplicationData with required fields and a dynamic status (newStatus)
  // newStatus will be provided depends upon the formStatus and the current status
  // if both are equal newStatus will be status+1 otherwise formStatus
  const updateData = (newStatus: number) => {
    return updateApplicationData(authUser.id, currActivities, newStatus)
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Curricular Activites
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2 py-2">
          Note: Remember to save your information at frequent intervals.
        </p>
      </div>
      <div>
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10">
          <h2 className="text-2xl text-blue-850 text-center font-bold pb-5">
            Academic Achievements/Awards/Recognition/Article or Book Published
          </h2>
          <Textarea
            name="Description"
            description="List all of them here with dates, if any, starting with the most recent."
            value={currActivities.description}
            onChange={(e) =>
              setCurrActivities((prev) => ({
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
              fileName={`CurricularActivities`}
              fileUrl={currActivities.document}
              setFileUrl={(url: string) =>
                setCurrActivities((prev) => ({ ...prev, document: url }))
              }
            />
          </div>
        </div>
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10">
          <h2 className="text-2xl text-blue-850 text-center font-bold pb-5">
            Others
          </h2>
          <Textarea
            name="Description"
            description="If you have participated in any other academic activity like attended online courses, qualified standardized exams (NET-JRF, GATE, JAM, TOEFL, GRE etc.), participated in hackathons, or any other academic activity, please mention all of them here with dates, starting with the most recent."
            value={currActivities.others}
            onChange={(e) =>
              setCurrActivities((prev) => ({
                ...prev,
                others: e.target.value,
              }))
            }
            required={false}
          />
          <div className="p-2">
            <p className="md:text-lg">
              Add corresponding documents (if available) in one file.
            </p>
            <FileUploadComponent
              fileName={`OtherCurricularActivities`}
              fileUrl={currActivities.others_document}
              setFileUrl={(url: string) =>
                setCurrActivities((prev) => ({ ...prev, others_document: url }))
              }
            />
          </div>
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

export default Step6
