import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { useAuth } from '../../context/AuthUserContext'
import { updateApplicationData } from '../../pages/api/step3'
import { ResearchExperiencesType } from '../../types'
import CheckBoxInput from './Checkboxes'
import ProceedButtons from './ProceedButtons'
import Textarea from './Textarea'
import TextInput from './TextInput'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const defaultPublication: ResearchExperiencesType[number]['publications'][number] =
  {
    titleAndDate: '',
    conferenceName: '',
    link: '',
  }

const defaultExperience: ResearchExperiencesType[number] = {
  university: '',
  title: '',
  mentor: '',
  currentlyWorking: null,
  startDate: '',
  endDate: '',
  description: '',
  publications: {
    1: defaultPublication,
  },
  newPublicationKey: 2,
}

const Step3 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  // Required to set the new key while adding a degree
  // While removing a key, other keys remain same
  // so not able to keep continuous numbers in keys
  const [newExpKey, setNewExpKey] = useState<number>(2)
  const [researchData, setResearchData] = useState<ResearchExperiencesType>({
    1: defaultExperience,
  })
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (
      applicationData.research_experience &&
      Object.keys(applicationData.research_experience).length != 0
    ) {
      setResearchData(applicationData.research_experience)
      // Setting number which is larger than the maximum key value
      setNewExpKey(
        Number(
          Object.keys(applicationData.research_experience).sort(
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
    setResearchData((prevExps: ResearchExperiencesType) => ({
      ...prevExps,
      [key]: {
        ...prevExps[key],
        [name]: value,
      },
    }))
  }

  const updatePublicationField = (
    key: number,
    pubKey: number,
    name: string,
    value: string | number | boolean,
  ) => {
    setResearchData((prevExps: ResearchExperiencesType) => ({
      ...prevExps,
      [key]: {
        ...prevExps[key],
        publications: {
          ...prevExps[key].publications,
          [pubKey]: {
            ...prevExps[key].publications[pubKey],
            [name]: value,
          },
        },
      },
    }))
  }

  const publicationRequired = (
    publication: ResearchExperiencesType[number]['publications'][number],
  ) =>
    !(
      !publication.titleAndDate &&
      !publication.conferenceName &&
      !publication.link
    )

  const experienceRequired = (experience: ResearchExperiencesType[number]) =>
    !(
      !experience.university &&
      !experience.title &&
      !experience.mentor &&
      !experience.description
    )

  // Check if user provide some input, then do validation and show error if any
  // otherwise submit valid experiences and remove invalids
  const nextStep = () => {
    setError('')
    // Save all valid experiences
    let experiences: ResearchExperiencesType = {}

    const keys = Object.keys(researchData)
    for (let i = 0; i < keys.length; i++) {
      const experience = researchData[Number(keys[i])]
      // Check if user provide some input, then do validation and show error if any
      // then add valid experience to experiences
      if (experienceRequired(experience))
        if (
          experience.university &&
          experience.title &&
          experience.mentor &&
          experience.currentlyWorking !== null &&
          experience.startDate &&
          experience.endDate &&
          experience.description
        ) {
          if (experience.description.split(' ').length <= 200) {
            // Save all valid publications
            let publications: ResearchExperiencesType[number]['publications'] =
              {}
            const pubKeys = Object.keys(experience.publications)
            for (let j = 0; j < pubKeys.length; j++) {
              // Check if user provide some input, then do validation and show error if any
              // then add valid publication to publications
              const publication = experience.publications[Number(pubKeys[j])]

              if (publicationRequired(publication)) {
                if (
                  publication.titleAndDate &&
                  publication.conferenceName &&
                  publication.link
                ) {
                  publications[Number(pubKeys[j])] = publication
                } else {
                  setError(
                    'Please fill all fields of Publication ' +
                      String(j + 1) +
                      ' in Experience ' +
                      String(i + 1) +
                      ' or Remove that publication if not needed.',
                  )
                  return
                }
              }
            }

            // Add valid experience with valid publications
            experiences[Number(keys[i])] = {
              ...experience,
              publications,
            }
          } else {
            setError(
              'Description limit is 200 words for Experience ' +
                String(i + 1) +
                ' or Remove that experience if not needed.',
            )
            return
          }
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
      updateApplicationData(authUser.id, experiences, 4)
        .then(() => {
          setStatus(4)
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
          setStatus(4)
        })
        .catch(() => {
          setError('Try again, network error!')
        })
  }

  const previousStep = () => {
    setStatus(2)
  }

  const saveInformation = () => {
    setError('')
    return updateApplicationData(
      authUser.id,
      researchData,
      applicationData.form_status,
    )
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Research Experience
        </h1>
        <p className="text-xs sm:text-sm md:text-base pl-2 pt-2">
          If you have done any research projects, research internships, or other
          research related work please include them here starting with the most
          recent one.
        </p>
        <p className="text-xs sm:text-sm md:text-base pl-2 py-1">
          Note: Do not include work experience or industry-based experience in
          this section. There is a separate section reserved for it.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2 py-2">
          Note: Remember to save your information at frequent intervals.
        </p>
      </div>
      <div>
        {Object.keys(researchData).map((keyTemp, index) => {
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
                  onClick={() =>
                    setResearchData(({ [key]: value, ...prevExps }) => prevExps)
                  }
                >
                  Remove
                </p>
              </div>
              <TextInput
                name="University/College/Institute Name"
                value={researchData[key].university}
                type="text"
                onChange={(e) => updateField(key, 'university', e.target.value)}
                required={experienceRequired(researchData[key])}
              />
              <TextInput
                name="Position Title"
                description="(e.g., Master thesis, summer internship, research 
                  assistant, project assistant, research associate, etc.)"
                value={researchData[key].title}
                type="text"
                onChange={(e) => updateField(key, 'title', e.target.value)}
                required={experienceRequired(researchData[key])}
              />
              <TextInput
                name="Advisor/Supervisor/Mentor"
                description="(with his/her designation)"
                value={researchData[key].mentor}
                type="text"
                onChange={(e) => updateField(key, 'mentor', e.target.value)}
                required={experienceRequired(researchData[key])}
              />
              <CheckBoxInput
                name="Are you currently working here?"
                value={researchData[key].currentlyWorking}
                onChange={(e, optionValue) => {
                  updateField(
                    key,
                    'currentlyWorking',
                    !e.target.checked ? null : optionValue,
                  )
                }}
                required={experienceRequired(researchData[key])}
                options={[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ]}
              />
              <div className="pl-4 p-2">
                {researchData[key].currentlyWorking === null ? null : (
                  <div>
                    <TextInput
                      name="Start Date"
                      value={researchData[key].startDate}
                      type="text"
                      onChange={(e) =>
                        updateField(key, 'startDate', e.target.value)
                      }
                      required={experienceRequired(researchData[key])}
                    />
                    <TextInput
                      name={
                        !researchData[key].currentlyWorking
                          ? 'End Date'
                          : 'Expected End Date'
                      }
                      value={researchData[key].endDate}
                      type="text"
                      onChange={(e) =>
                        updateField(key, 'endDate', e.target.value)
                      }
                      required={experienceRequired(researchData[key])}
                    />
                  </div>
                )}
              </div>
              <Textarea
                name="Description"
                description="Please describe the research you have contributed 
                  to while working in this position. Maximum Word Limit: 200"
                value={researchData[key].description}
                onChange={(e) =>
                  updateField(key, 'description', e.target.value)
                }
                required={experienceRequired(researchData[key])}
                wordLimit={200}
              />
              <div className="p-2">
                <p className="text-xs sm:text-sm md:text-base pl-2">
                  Did this project result in any publication(s)? If yes, list
                  all of them. You can also mention your work published on arXiv
                  or any online repository.
                </p>
                <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2">
                  Note: Publications without links will not be considered.
                </p>
                <div className="p-2 px-4">
                  {Object.keys(researchData[key].publications).map(
                    (pubKey, pubIndex) => (
                      <div key={pubKey} className="py-2">
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-lg md:text-xl">
                            Publication {pubIndex + 1}
                          </p>
                          <p
                            className="text-red-850 cursor-pointer"
                            onClick={() => {
                              setResearchData(
                                ({
                                  [key]: {
                                    publications: {
                                      [Number(pubKey)]: value,
                                      ...currPub
                                    },
                                    ...currExp
                                  },
                                  ...prevExps
                                }) => ({
                                  ...prevExps,
                                  [key]: {
                                    ...currExp,
                                    publications: currPub,
                                    newPublicationKey:
                                      currExp.newPublicationKey - 1,
                                  },
                                }),
                              )
                            }}
                          >
                            Remove
                          </p>
                        </div>
                        <TextInput
                          name="Title and Date of the Publication"
                          value={
                            researchData[key].publications[Number(pubKey)]
                              .titleAndDate
                          }
                          type="text"
                          onChange={(e) =>
                            updatePublicationField(
                              key,
                              Number(pubKey),
                              'titleAndDate',
                              e.target.value,
                            )
                          }
                          required={publicationRequired(
                            researchData[key].publications[pubKey],
                          )}
                        />
                        <TextInput
                          name="Journal/Conference Name"
                          value={
                            researchData[key].publications[Number(pubKey)]
                              .conferenceName
                          }
                          type="text"
                          onChange={(e) =>
                            updatePublicationField(
                              key,
                              Number(pubKey),
                              'conferenceName',
                              e.target.value,
                            )
                          }
                          required={publicationRequired(
                            researchData[key].publications[pubKey],
                          )}
                        />
                        <TextInput
                          name="Link"
                          value={
                            researchData[key].publications[Number(pubKey)].link
                          }
                          type="text"
                          onChange={(e) =>
                            updatePublicationField(
                              key,
                              Number(pubKey),
                              'link',
                              e.target.value,
                            )
                          }
                          required={publicationRequired(
                            researchData[key].publications[pubKey],
                          )}
                        />
                      </div>
                    ),
                  )}
                  <p
                    className="text-base sm:text-lg md:text-xl font-extrabold 
                      w-max mt-5 pr-2 pl-2 text-blue-850 cursor-pointer"
                    onClick={() => {
                      setResearchData((prevExps: ResearchExperiencesType) => ({
                        ...prevExps,
                        [key]: {
                          ...prevExps[key],
                          publications: {
                            ...prevExps[key].publications,
                            [prevExps[key].newPublicationKey]:
                              defaultPublication,
                          },
                          newPublicationKey:
                            prevExps[key].newPublicationKey + 1,
                        },
                      }))
                    }}
                  >
                    Add another Publication +
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <p
        className="text-base sm:text-lg md:text-xl font-extrabold w-max mt-5 
          pr-2 pl-2 text-blue-850 cursor-pointer"
        onClick={() => {
          setResearchData((prevExps: ResearchExperiencesType) => ({
            ...prevExps,
            [newExpKey]: defaultExperience,
          }))
          setNewExpKey((prev) => prev + 1)
        }}
      >
        Add another Experience +
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

export default Step3
