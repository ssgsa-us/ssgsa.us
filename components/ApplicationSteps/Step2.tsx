import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { faculties } from '../../constants/faculties'
import { useAuth } from '../../context/AuthUserContext'
import { updateApplicationData } from '../../pages/api/step2'
import { AcademicRecordType } from '../../types'
import ProceedButtons from './ProceedButtons'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const currentYear = new Date().getFullYear()

// Options for start and completion year from 2000 to 2 years after current year
const yearOptions = [
  ...Array.from({ length: currentYear + 3 - 2000 }, (_, i) => i + 2000).map(
    (value) => {
      return { label: String(value), value: value }
    },
  ),
  { label: 'Select', value: 0 },
]

const defaultRecord: AcademicRecordType[number] = {
  degreeLevel: '',
  degreeName: '',
  branch: '',
  faculty: '',
  college: '',
  university: '',
  currentlyEnrolled: null,
  startedYear: 0,
  completionYear: 0,
  gradeCriteria: null,
  grades: 0,
  document: '',
}

const Step2 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  // Required to set the new key while adding a degree
  // While removing a key, other keys remain same
  // so not able to keep continuous numbers in keys
  const [newDegreeKey, setNewDegreeKey] = useState<number>(2)
  const [academicData, setAcademicData] = useState<AcademicRecordType>({
    1: defaultRecord,
  })
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (applicationData.academic_record) {
      setAcademicData(applicationData.academic_record)
      // Setting number which is larger than the maximum key value
      setNewDegreeKey(
        Number(
          Object.keys(applicationData.academic_record).sort(
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
    setAcademicData((prevDegree: AcademicRecordType) => ({
      ...prevDegree,
      [key]: {
        ...prevDegree[key],
        [name]: value,
      },
    }))
  }

  const selectInput = (
    key: number,
    name: string,
    variableName: string,
    options: Array<{ label: string; value: string | number }>,
  ) => (
    <div className="p-2">
      <p className="md:text-lg">
        {name}
        <span className="text-red-850 font-black">*</span>
      </p>
      <select
        name={variableName}
        value={academicData[key][variableName]}
        onChange={(e) => updateField(key, variableName, e.target.value)}
        className="w-full rounded-xl p-2 mt-1"
      >
        {options.map((option, index) => (
          <option key={index} label={option.label} value={option.value} />
        ))}
      </select>
    </div>
  )

  // step used for number type to allow decimal places
  // minimum and maximum are used for number type
  const textInput = (
    key: number,
    name: string,
    variableName: string,
    type: 'text' | 'number',
    step: string = 'any',
    minimum: number = null,
    maximum: number = null,
  ) => (
    <div className="p-2">
      <p className="md:text-lg">
        {name}
        <span className="text-red-850 font-black">*</span>
      </p>
      <input
        name={variableName}
        type={type}
        step={step}
        min={minimum}
        max={maximum}
        value={academicData[key][variableName]}
        onChange={(e) =>
          type === 'text'
            ? updateField(key, variableName, e.target.value)
            : Number(e.target.value) > maximum
            ? null
            : updateField(key, variableName, Number(e.target.value))
        }
        className="w-full rounded-xl p-2 mt-1"
      />
    </div>
  )

  // Only accept 2 options
  const checkBoxInput = (
    key: number,
    name: string,
    variableName: string,
    options: Array<{ label: string; value: string | number | boolean }>,
  ) => (
    <div className="p-2">
      <p className="md:text-lg">
        {name}
        <span className="text-red-850 font-black">*</span>
      </p>
      <div className="flex justify-around items-center">
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center w-48 border-2 ${
              academicData[key][variableName] == option.value
                ? 'border-black'
                : 'border-green-800'
            } rounded-xl p-2 mt-1 mr-4`}
          >
            <input
              type="checkbox"
              checked={academicData[key][variableName] == option.value}
              onChange={(e) => {
                updateField(
                  key,
                  variableName,
                  !e.target.checked ? null : option.value,
                )
              }}
              className="w-4 cursor-pointer"
            />
            <label className="pl-2">{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  )

  const checkAllFields = (record: AcademicRecordType[number]) =>
    record.degreeLevel &&
    record.degreeName &&
    record.branch &&
    record.faculty &&
    record.college &&
    record.university &&
    record.currentlyEnrolled !== null &&
    record.startedYear &&
    record.completionYear &&
    record.gradeCriteria &&
    record.grades
  // record.document

  const nextStep = () => {
    setError('')
    let bachelor = 0
    let errorFlag = 0
    let duration = 0
    const records = Object.values(academicData)
    for (let i = 0; i < records.length; i++) {
      if (checkAllFields(records[i])) {
        if (records[i].degreeLevel === 'Bachelor') bachelor = 1
        duration += records[i].completionYear - records[i].startedYear
      } else {
        errorFlag = 1
        if (records[i].degreeLevel)
          if (records[i].degreeName)
            setError(
              'All fields are required for ' +
                records[i].degreeLevel +
                ' Degree named ' +
                records[i].degreeName,
            )
          else
            setError(
              'Provide input in all fields for ' +
                records[i].degreeLevel +
                ' Degree or Remove the extra degree you have added.',
            )
        else if (records[i].degreeName)
          setError(
            'Provide input in all fields for Degree named ' +
              records[i].degreeName +
              ' or Remove the extra degree you have added.',
          )
        else
          setError(
            'Degree Level and Name are not provided in some records. Either update it or Remove the extra degree you have added.',
          )
        break
      }
    }

    if (!errorFlag)
      if (!bachelor) setError('At least 1 Bachelor degree required')
      else if (duration < 4)
        setError(
          'Check Eligibility Criteria, at least 4 year bachelor program or 3 year bachelor program with master program is required.',
        )
      else if (status === applicationData.form_status)
        updateApplicationData(authUser.id, academicData, 3)
          .then(() => {
            setStatus(3)
          })
          .catch(() => {
            setError('Try again, network error!')
          })
      else
        saveInformation()
          .then(() => {
            setStatus(3)
          })
          .catch(() => {
            setError('Try again, network error!')
          })
  }

  const previousStep = () => {
    setStatus(1)
  }

  const saveInformation = () => {
    setError('')
    return updateApplicationData(
      authUser.id,
      academicData,
      applicationData.form_status,
    )
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Educational Qualifications
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2">
          Note: Remember to save your information at frequent intervals.
        </p>
        <div>
          {Object.keys(academicData).map((keyTemp, index) => {
            const key = Number(keyTemp)
            return (
              <div className="my-10" key={key}>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg md:text-xl">
                    Academic Record {index + 1}
                  </p>
                  <p
                    className="text-red-850 cursor-pointer"
                    onClick={() => {
                      if (Object.keys(academicData).length === 1)
                        alert('Education Qualifications are required.')
                      else
                        setAcademicData(
                          ({ [key]: value, ...prevRecord }) => prevRecord,
                        )
                    }}
                  >
                    Remove
                  </p>
                </div>
                {selectInput(key, 'Degree Level', 'degreeLevel', [
                  { label: 'Select Category', value: '' },
                  { label: 'Doctoral Degree', value: 'Doctoral' },
                  { label: "Master's Degree", value: 'Master' },
                  { label: "Bachelor's Degree", value: 'Bachelor' },
                ])}
                {textInput(key, 'Degree Name', 'degreeName', 'text')}
                {textInput(key, 'Field of Study', 'branch', 'text')}
                {selectInput(key, 'Faculty', 'faculty', [
                  { label: 'Select', value: '' },
                  ...faculties,
                ])}
                {textInput(key, 'Institute/College', 'college', 'text')}
                {textInput(key, 'University', 'university', 'text')}
                {checkBoxInput(
                  key,
                  'Are you currently enrolled here?',
                  'currentlyEnrolled',
                  [
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ],
                )}
                <div className="pl-4">
                  {academicData[key].currentlyEnrolled === null ? null : (
                    <div className="p-2">
                      <p className="md:text-lg">Years Attended</p>
                      {selectInput(key, 'From', 'startedYear', yearOptions)}
                      {selectInput(
                        key,
                        !academicData[key].currentlyEnrolled
                          ? 'To'
                          : 'Expected Year of Graduation',
                        'completionYear',
                        yearOptions,
                      )}
                    </div>
                  )}
                </div>
                {checkBoxInput(
                  key,
                  'Does this degree award grade in CGPA or Percentage?',
                  'gradeCriteria',
                  [
                    { label: 'CGPA', value: 'CGPA' },
                    { label: 'Percentage', value: 'Percentage' },
                  ],
                )}
                <div className="pl-4">
                  {academicData[key].gradeCriteria === null
                    ? null
                    : textInput(
                        key,
                        academicData[key].gradeCriteria === 'CGPA'
                          ? 'Enter your CGPA'
                          : 'Enter your Cumulative Percentage',
                        'grades',
                        'number',
                        '0.01',
                        0,
                        academicData[key].gradeCriteria === 'CGPA' ? 10 : 100,
                      )}
                </div>
              </div>
            )
          })}
        </div>
        <p
          className="text-xs sm:text-sm md:text-base font-extrabold w-max pr-2 pl-2 text-blue-850 cursor-pointer"
          onClick={() => {
            setAcademicData((prevRecord: AcademicRecordType) => ({
              ...prevRecord,
              [newDegreeKey]: defaultRecord,
            }))
            setNewDegreeKey((prev) => prev + 1)
          }}
        >
          Add a Degree +
        </p>
      </div>
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

export default Step2
