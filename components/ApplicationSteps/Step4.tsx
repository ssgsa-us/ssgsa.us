import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { useAuth } from '../../context/AuthUserContext'
import { updateApplicationData } from '../../pages/api/step4'
import { deleteDocuments } from '../../pages/api/uploadDocument'
import { WorkExperiencesType } from '../../types'
import CheckBoxInput from './Checkboxes'
import FileUploadComponent from './FileUpload'
import ProceedButtons from './ProceedButtons'
import Textarea from './Textarea'
import TextInput from './TextInput'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const defaultExperience: WorkExperiencesType[number] = {
  organization: '',
  title: '',
  currentlyWorking: null,
  startDate: '',
  endDate: '',
  description: '',
  document: '',
}

const Step4 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  // Required to set the new key while adding a degree
  // While removing a key, other keys remain same
  // so not able to keep continuous numbers in keys
  const [newExpKey, setNewExpKey] = useState<number>(2)
  const [workExperiences, setWorkExperiences] = useState<WorkExperiencesType>({
    1: defaultExperience,
  })
  const [deletedDocuments, setDeletedDocuments] = useState<Array<string>>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (
      applicationData.work_experience &&
      Object.keys(applicationData.work_experience).length != 0
    ) {
      setWorkExperiences(applicationData.work_experience)
      // Setting number which is larger than the maximum key value
      setNewExpKey(
        Number(
          Object.keys(applicationData.work_experience).sort(
            (a, b) => Number(b) - Number(a),
          )[0],
        ) + 1,
      )
    }
  }, [applicationData])

  const updateField = (
    key: number,
    name: string,
    value: string | number | boolean,
  ) => {
    setWorkExperiences((prevExps: WorkExperiencesType) => ({
      ...prevExps,
      [key]: {
        ...prevExps[key],
        [name]: value,
      },
    }))
  }

  const experienceRequired = (experience: WorkExperiencesType[number]) =>
    !(
      !experience.organization &&
      !experience.title &&
      !experience.description &&
      !experience.document
    )

  const validation = () => {
    setError('')

    // Save all valid experiences
    let experiences: WorkExperiencesType = {}
    const keys = Object.keys(workExperiences)
    for (let i = 0; i < keys.length; i++) {
      const experience = workExperiences[Number(keys[i])]
      // Check if user provide some input, then do validation and show error if any
      // then add valid experience to experiences
      if (experienceRequired(experience))
        if (
          experience.organization &&
          experience.title &&
          experience.currentlyWorking !== null &&
          experience.startDate &&
          experience.endDate &&
          experience.description
        ) {
          if (experience.description.split(' ').length <= 200) {
            // Add valid experience
            experiences[Number(keys[i])] = experience
          } else {
            setError(
              'Description limit is 200 words for Experience ' +
                String(i + 1) +
                ' or Remove that experience if not needed.',
            )
            return false
          }
        } else {
          setError(
            'Please fill all field for Experience ' +
              String(i + 1) +
              ' or Remove that experience if not needed.',
          )
          return false
        }
    }
    setWorkExperiences(experiences)
    return true
  }

  // Used in next step and save information
  // Call updateApplicationData with required fields and a dynamic status (newStatus)
  // newStatus will be provided depends upon the formStatus and the current status
  // if both are equal newStatus will be status+1 otherwise formStatus
  const updateData = (newStatus: number) => {
    return updateApplicationData(authUser.id, workExperiences, newStatus).then(
      () => {
        deleteDocuments(deletedDocuments)
        setDeletedDocuments([])
      },
    )
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Work Experience
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          If you have any job/work (non-research) experience in any company or
          industry, industry-based internships, etc., please include them
          starting with the most recent one.
        </p>
        <p className="text-xs sm:text-sm md:text-base pl-2 py-1">
          Please click on the REMOVE button if you don&apos;t have any entry to
          put here.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2 py-2">
          Note: Remember to save your information at frequent intervals.
        </p>
      </div>
      <div>
        {Object.keys(workExperiences).map((keyTemp, index) => {
          const key = Number(keyTemp)
          return (
            <div
              className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10"
              key={key}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg md:text-xl">
                  Experience {index + 1}
                </p>
                <p
                  className="text-red-850 cursor-pointer"
                  onClick={() => {
                    setWorkExperiences(
                      ({ [key]: value, ...prevExps }) => prevExps,
                    )
                    if (workExperiences[key].document)
                      setDeletedDocuments((prev) => [
                        ...prev,
                        workExperiences[key].document,
                      ])
                  }}
                >
                  Remove
                </p>
              </div>
              <TextInput
                name="Company/Organization Name"
                value={workExperiences[key].organization}
                type="text"
                onChange={(e) =>
                  updateField(key, 'organization', e.target.value)
                }
                required={experienceRequired(workExperiences[key])}
              />
              <TextInput
                name="Position Title"
                description="(e.g., Lecturer, Software Developer, Manager, 
                  Engineer, Accountant, Advocate, Journalist, etc.)"
                value={workExperiences[key].title}
                type="text"
                onChange={(e) => updateField(key, 'title', e.target.value)}
                required={experienceRequired(workExperiences[key])}
              />
              <CheckBoxInput
                name="Are you currently working here?"
                value={workExperiences[key].currentlyWorking}
                onChange={(e, optionValue) => {
                  updateField(
                    key,
                    'currentlyWorking',
                    !e.target.checked ? null : optionValue,
                  )
                }}
                required={experienceRequired(workExperiences[key])}
                options={[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ]}
              />
              <div className="pl-4 p-2">
                {workExperiences[key].currentlyWorking === null ? null : (
                  <div>
                    <TextInput
                      name="Start Date (mm/yyyy)"
                      value={workExperiences[key].startDate}
                      type="text"
                      onChange={(e) =>
                        updateField(key, 'startDate', e.target.value)
                      }
                      required={experienceRequired(workExperiences[key])}
                    />
                    <TextInput
                      name={
                        !workExperiences[key].currentlyWorking
                          ? 'End Date (mm/yyyy)'
                          : 'Expected End Date (mm/yyyy)'
                      }
                      value={workExperiences[key].endDate}
                      type="text"
                      onChange={(e) =>
                        updateField(key, 'endDate', e.target.value)
                      }
                      required={experienceRequired(workExperiences[key])}
                    />
                  </div>
                )}
              </div>
              <Textarea
                name="Description"
                description="Please describe your role in this job/work. 
                  Maximum Word Limit: 200"
                value={workExperiences[key].description}
                onChange={(e) => {
                  if (e.target.value.split(' ').length <= 200)
                    updateField(key, 'description', e.target.value)
                }}
                required={experienceRequired(workExperiences[key])}
                wordLimit={200}
              />
              <div className="p-2">
                <p className="md:text-lg">
                  Add corresponding document (if available)
                </p>
                <FileUploadComponent
                  fileName={`WorkExperience${key}`}
                  fileUrl={workExperiences[key].document}
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
          setWorkExperiences((prevExps: WorkExperiencesType) => ({
            ...prevExps,
            [newExpKey]: defaultExperience,
          }))
          setNewExpKey((prev) => prev + 1)
        }}
      >
        Add another Experience +
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

export default Step4
