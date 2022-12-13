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

  // Check if user provide some input, then do validation and show error if any
  // otherwise submit valid experiences and remove invalids
  const nextStep = () => {
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
          // Add valid experience
          experiences[Number(keys[i])] = experience
        } else {
          setError(
            'Please fill all field for Experience ' +
              String(i + 1) +
              ' or Remove that experience if not needed.',
          )
          return
        }
    }

    if (status === applicationData.form_status)
      updateApplicationData(authUser.id, experiences, 5)
        .then(() => {
          deleteDocuments(deletedDocuments)
          setStatus(5)
        })
        .catch(() => {
          setError('Try again, network error!')
        })
    else
      updateApplicationData(
        authUser.id,
        experiences,
        applicationData.form_status,
      )
        .then(() => {
          deleteDocuments(deletedDocuments)
          setStatus(5)
        })
        .catch(() => {
          setError('Try again, network error!')
        })
  }

  const previousStep = () => {
    setStatus(4)
  }

  const saveInformation = () => {
    setError('')
    return updateApplicationData(
      authUser.id,
      workExperiences,
      applicationData.form_status,
    ).then(() => {
      deleteDocuments(deletedDocuments)
      setDeletedDocuments([])
    })
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Work Experience
        </h1>
        <p className="text-xs sm:text-sm md:text-base pl-2 pt-2">
          If you have any job/work (non-research) experience in any company or
          industry, industry-based internships, etc., please include them
          starting with the most recent one.
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
                description="(e.g., Lecturer, Software Developer, Manager, Engineer, Accountant, Advocate, Journalist, etc.)"
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
                      name="Start Date"
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
                          ? 'End Date'
                          : 'Expected End Date'
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
                description="Please describe your role in this job/work."
                value={workExperiences[key].description}
                onChange={(e) =>
                  updateField(key, 'description', e.target.value)
                }
                required={experienceRequired(workExperiences[key])}
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
        className="text-base sm:text-lg md:text-xl font-extrabold w-max mt-5 pr-2 pl-2 text-blue-850 cursor-pointer"
        onClick={() => {
          setWorkExperiences((prevExps: WorkExperiencesType) => ({
            ...prevExps,
            [newExpKey]: defaultExperience,
          }))
          setNewExpKey((prev) => prev + 1)
        }}
      >
        Add an Experience +
      </p>
      <ProceedButtons
        status={status}
        formStatus={applicationData.form_status}
        previousStep={previousStep}
        nextStep={nextStep}
        saveInformation={saveInformation}
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default Step4
