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
  // Required to set the new key while adding a new activity
  // While removing a key, other keys remain same
  // so not able to keep continuous numbers in keys
  const [newActKey, setNewActKey] = useState<number>(2)
  const [extraCurr, setExtraCurr] = useState<ExtraCurricularsType>({
    1: {
      description: '',
      document: '',
    },
  })
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (
      applicationData.extra_curriculars &&
      Object.keys(applicationData.extra_curriculars).length != 0
    ) {
      setExtraCurr(applicationData.extra_curriculars)
      // Setting number which is larger than the maximum key value
      setNewActKey(
        Number(
          Object.keys(applicationData.extra_curriculars).sort(
            (a, b) => Number(b) - Number(a),
          )[0],
        ) + 1,
      )
    }
  }, [applicationData])

  const updateField = (key: number, name: string, value: string) => {
    setExtraCurr((prevActivities: ExtraCurricularsType) => ({
      ...prevActivities,
      [key]: {
        ...prevActivities[key],
        [name]: value,
      },
    }))
  }

  const validation = () => {
    setError('')

    // Save all valid activities
    let activities: ExtraCurricularsType = {}
    const keys = Object.keys(extraCurr)
    for (let i = 0; i < keys.length; i++) {
      const activity = extraCurr[Number(keys[i])]
      if (activity.description || activity.document)
        activities[Number(keys[i])] = activity
    }

    setExtraCurr(activities)
    return true
  }

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
      </div>
      <div>
        {Object.keys(extraCurr).map((keyTemp, index) => {
          const key = Number(keyTemp)
          return (
            <div
              className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10"
              key={key}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg md:text-xl">
                  Activity {index + 1}
                </p>
                <p
                  className="text-red-850 cursor-pointer"
                  onClick={() =>
                    setExtraCurr(
                      ({ [key]: value, ...prevActivities }) => prevActivities,
                    )
                  }
                >
                  Remove
                </p>
              </div>
              <Textarea
                name="Description"
                description="Starting with the most recent, please list any leadership experience, non-academic achievements & awards, literary and cultural involvement, sports, volunteering, social work etc."
                value={extraCurr[key].description}
                onChange={(e) =>
                  updateField(key, 'description', e.target.value)
                }
                required={false}
              />
              <div className="p-2">
                <p className="md:text-lg">
                  Add corresponding documents (if available) in one file.
                </p>
                <FileUploadComponent
                  fileName={`ExtraCurricularActivities`}
                  fileUrl={extraCurr[key].document}
                  setFileUrl={(url: string) =>
                    updateField(key, 'document', url)
                  }
                />
              </div>
            </div>
          )
        })}
      </div>
      <p
        className="text-base sm:text-lg md:text-xl font-extrabold w-max mt-5 
          pr-2 pl-2 text-blue-850 cursor-pointer"
        onClick={() => {
          setExtraCurr((prevActivities: ExtraCurricularsType) => ({
            ...prevActivities,
            [newActKey]: {
              description: '',
              document: '',
            },
          }))
          setNewActKey((prev) => prev + 1)
        }}
      >
        Add another Activity +
      </p>
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
  )
}

export default Step7
