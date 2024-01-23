import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { useAuth } from '../../context/AuthUserContext'
import { updateApplicationData } from '../../pages/api/applications/step5'
import { deleteDocuments } from '../../pages/api/applications/uploadDocument'
import { PosterOrWorkshopsType } from '../../types'
import FileUploadComponent from './FileUpload'
import ProceedButtons from './ProceedButtons'
import SelectInput from './SelectInput'
import Textarea from './Textarea'
import TextInput from './TextInput'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const defaultWorkshop: PosterOrWorkshopsType[number] = {
  category: '',
  otherCategory: '',
  title: '',
  duration: '',
  description: '',
  document: '',
}

const Step5 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  // Required to set the new key while adding a degree
  // While removing a key, other keys remain same
  // so not able to keep continuous numbers in keys
  const [newKey, setNewKey] = useState<number>(2)
  const [workshops, setWorkshops] = useState<PosterOrWorkshopsType>({
    1: defaultWorkshop,
  })
  const [deletedDocuments, setDeletedDocuments] = useState<Array<string>>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (
      applicationData.poster_or_workshops &&
      Object.keys(applicationData.poster_or_workshops).length != 0
    ) {
      setWorkshops(applicationData.poster_or_workshops)
      // Setting number which is larger than the maximum key value
      setNewKey(
        Number(
          Object.keys(applicationData.poster_or_workshops).sort(
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
    setWorkshops((prevWorkshops: PosterOrWorkshopsType) => ({
      ...prevWorkshops,
      [key]: {
        ...prevWorkshops[key],
        [name]: value,
      },
    }))
  }

  const workshopRequired = (workshop: PosterOrWorkshopsType[number]) =>
    !(!workshop.title && !workshop.description && !workshop.document)

  const validation = () => {
    setError('')

    const keys = Object.keys(workshops)
    for (let i = 0; i < keys.length; i++) {
      const workshop = workshops[Number(keys[i])]
      // Check if user provide some input, then do validation and show error if any
      if (workshopRequired(workshop)) {
        if (
          workshop.category != '' &&
          (workshop.category === 'Other' ? !!workshop.otherCategory : true) &&
          workshop.title &&
          (workshop.category === 'Poster' || workshop.duration) &&
          workshop.description
        ) {
          if (workshop.description.split(' ').length > 50) {
            setError(
              'Description limit is 50 words for Poster/Workshop/Summer School ' +
                String(i + 1) +
                ' or Remove that Poster/Workshop/Summer School if not needed.',
            )
            return false
          }
        } else {
          setError(
            'Please fill all field for Poster/Workshop/Summer School ' +
              String(i + 1) +
              ' or Remove that Poster/Workshop/Summer School if not needed.',
          )
          return false
        }
      } else {
        setError('Please remove empty Poster/Workshop ' + String(i + 1))
        return false
      }
    }
    return true
  }

  // Used in next step and save information
  // Call updateApplicationData with required fields and a dynamic status (newStatus)
  // newStatus will be provided depends upon the formStatus and the current status
  // if both are equal newStatus will be status+1 otherwise formStatus
  const updateData = (newStatus: number) => {
    return updateApplicationData(authUser.id, workshops, newStatus).then(() => {
      deleteDocuments(deletedDocuments)
      setDeletedDocuments([])
    })
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Poster Presentation/ Workshops/ Summer School
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          List all your most recent Poster Presentations, Workshops, or Summer
          Schools. If you have mentioned anything in preceding sections, please
          do not repeat that here. For example, if you have already included
          summer internship in the Research experience section, please do not
          mention it in this section again.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2 py-2">
          Note: Remember to save your information at frequent intervals.
        </p>
      </div>
      <div>
        {Object.keys(workshops).map((keyTemp, index) => {
          const key = Number(keyTemp)
          return (
            <div
              className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10"
              key={key}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg md:text-xl">
                  Poster/Workshop/Summer School {index + 1}
                </p>
                <p
                  className="text-red-850 cursor-pointer"
                  onClick={() => {
                    setWorkshops(
                      ({ [key]: value, ...prevWorkshops }) => prevWorkshops,
                    )
                    if (workshops[key].document)
                      setDeletedDocuments((prev) => [
                        ...prev,
                        workshops[key].document,
                      ])
                  }}
                >
                  Remove
                </p>
              </div>
              <SelectInput
                name="Category"
                value={workshops[key].category}
                onChange={(e) => updateField(key, 'category', e.target.value)}
                options={[
                  { label: 'Select Category', value: '' },
                  { label: 'Poster Presentation', value: 'Poster' },
                  { label: 'Workshop', value: 'Workshop' },
                  { label: 'Summer School', value: 'Summer School' },
                  { label: 'Other', value: 'Other' },
                ]}
                required={workshopRequired(workshops[key])}
              />
              {workshops[key].category === 'Other' ? (
                <TextInput
                  name="Other Category Name"
                  value={workshops[key].otherCategory}
                  type="text"
                  onChange={(e) =>
                    updateField(key, 'otherCategory', e.target.value)
                  }
                  required={workshopRequired(workshops[key])}
                />
              ) : null}
              <TextInput
                name="Title"
                value={workshops[key].title}
                type="text"
                onChange={(e) => updateField(key, 'title', e.target.value)}
                required={workshopRequired(workshops[key])}
              />
              <TextInput
                name="Year(s) Attended and Duration"
                description="(Note: You don't have to mention the duration for Poster Presentation)"
                value={workshops[key].duration}
                type="text"
                onChange={(e) => updateField(key, 'duration', e.target.value)}
                required={
                  workshopRequired(workshops[key]) &&
                  workshops[key].category !== 'Poster'
                }
              />
              <Textarea
                name="Description"
                description="Please mention a few lines about your 
                  participation in this activity. Maximum Word Limit: 50"
                value={workshops[key].description}
                onChange={(e) => {
                  if (e.target.value.split(' ').length <= 50)
                    updateField(key, 'description', e.target.value)
                }}
                required={workshopRequired(workshops[key])}
                wordLimit={50}
              />
              <div className="p-2">
                <p className="md:text-lg">
                  Add corresponding document (if available)
                </p>
                <FileUploadComponent
                  fileName={`PosterOrWorkshop${key}`}
                  fileUrl={workshops[key].document}
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
          setWorkshops((prevWorkshops: PosterOrWorkshopsType) => ({
            ...prevWorkshops,
            [newKey]: defaultWorkshop,
          }))
          setNewKey((prev) => prev + 1)
        }}
      >
        Add an Experience +
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

export default Step5
