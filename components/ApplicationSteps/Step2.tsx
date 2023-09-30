import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { faculties } from '../../constants/faculties'
import { useAuth } from '../../context/AuthUserContext'
import { updateApplicationData } from '../../pages/api/applications/step2'
import { deleteDocuments } from '../../pages/api/applications/uploadDocument'
import { AcademicRecordType } from '../../types'
import CheckBoxInput from './Checkboxes'
import FileUploadComponent from './FileUpload'
import ProceedButtons from './ProceedButtons'
import SelectInput from './SelectInput'
import TextInput from './TextInput'

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

// Adding a note for master's and doctoral degree
// If they haven't recieved marksheet, then they can write 1 in grades
// It needs to be changed to a question marksheet recieved or not
// If recieved then ask for grades otherwise not

const defaultRecord: AcademicRecordType[number] = {
  degreeLevel: '',
  degreeName: '',
  faculty: '',
  otherFaculty: '',
  department: '',
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
  const [deletedDocuments, setDeletedDocuments] = useState<Array<string>>([])
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

  const checkAllFields = (record: AcademicRecordType[number]) =>
    record.degreeLevel &&
    record.degreeName &&
    record.faculty &&
    (record.faculty === 'Other' ? !!record.otherFaculty : true) &&
    record.department &&
    record.university &&
    record.currentlyEnrolled !== null &&
    record.startedYear &&
    record.completionYear &&
    record.gradeCriteria &&
    record.grades &&
    record.document

  const validation = () => {
    setError('')
    // Bachelor variable to check if there ia bachelor degree or not
    let bachelor = false
    // Duration variable to check the eligibility of user
    let duration = 0

    // check all fields and show error if any field is not present or if extra
    // degree is added ask to remove that.
    const records = Object.values(academicData)
    for (let i = 0; i < records.length; i++) {
      if (checkAllFields(records[i])) {
        if (records[i].degreeLevel === 'Bachelor') bachelor = true
        duration += records[i].completionYear - records[i].startedYear
      } else {
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
        return false
      }
    }

    if (!bachelor) {
      setError('At least 1 Bachelor degree required')
      return false
    } else if (duration < 4) {
      setError(
        'Check Eligibility Criteria, at least 4 year bachelor program or 3 year bachelor program with master program is required.',
      )
      return false
    }
    return true
  }

  // Used in next step and save information
  // Call updateApplicationData with required fields and a dynamic status (newStatus)
  // newStatus will be provided depends upon the formStatus and the current status
  // if both are equal newStatus will be status+1 otherwise formStatus
  const updateData = (newStatus: number) => {
    return updateApplicationData(authUser.id, academicData, newStatus).then(
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
          Educational Qualifications
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Fill in the details of your educational history of the bachelor&apos;s
          and the master&apos;s degrees (if available) starting with the most
          recent.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2 py-2">
          Note: Remember to save your information at frequent intervals.
        </p>
      </div>
      <div>
        {Object.keys(academicData).map((keyTemp, index) => {
          const key = Number(keyTemp)
          return (
            <div
              className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10"
              key={key}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg md:text-xl">
                  Academic Record {index + 1}
                </p>
                <p
                  className="text-red-850 cursor-pointer"
                  onClick={() => {
                    if (Object.keys(academicData).length === 1)
                      alert('Education Qualifications are required.')
                    else {
                      setAcademicData(
                        ({ [key]: value, ...prevRecord }) => prevRecord,
                      )
                      if (academicData[key].document)
                        setDeletedDocuments((prev) => [
                          ...prev,
                          academicData[key].document,
                        ])
                    }
                  }}
                >
                  Remove
                </p>
              </div>
              <SelectInput
                name="Degree Level"
                value={academicData[key]['degreeLevel']}
                onChange={(e) =>
                  updateField(key, 'degreeLevel', e.target.value)
                }
                required={true}
                options={[
                  { label: 'Select Category', value: '' },
                  { label: 'Doctoral Degree', value: 'Doctoral' },
                  { label: "Master's Degree", value: 'Master' },
                  { label: "Bachelor's Degree", value: 'Bachelor' },
                ]}
              />
              <TextInput
                name="Degree Name"
                description="(e.g., BTech in Computer Science, MSc in Agricultural Science, BA in History, etc.)"
                value={academicData[key]['degreeName']}
                type="text"
                onChange={(e) => updateField(key, 'degreeName', e.target.value)}
                required={true}
              />
              <SelectInput
                name="Faculty (Most Relevant)"
                value={academicData[key]['faculty']}
                onChange={(e) => updateField(key, 'faculty', e.target.value)}
                required={true}
                options={[
                  { label: 'Select', value: '' },
                  ...faculties,
                  { label: 'Other', value: 'Other' },
                ]}
              />
              {academicData[key]['faculty'] === 'Other' ? (
                <TextInput
                  name="Other Faculty"
                  value={academicData[key]['otherFaculty']}
                  type="text"
                  onChange={(e) =>
                    updateField(key, 'otherFaculty', e.target.value)
                  }
                  required={true}
                />
              ) : null}
              <TextInput
                name="Department"
                value={academicData[key]['department']}
                type="text"
                onChange={(e) => updateField(key, 'department', e.target.value)}
                required={true}
              />
              <TextInput
                name="University"
                value={academicData[key]['university']}
                type="text"
                onChange={(e) => updateField(key, 'university', e.target.value)}
                required={true}
              />
              <CheckBoxInput
                name="Are you currently enrolled here?"
                value={academicData[key]['currentlyEnrolled']}
                onChange={(e, optionValue) => {
                  updateField(
                    key,
                    'currentlyEnrolled',
                    !e.target.checked ? null : optionValue,
                  )
                }}
                required={true}
                options={[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ]}
              />
              <div className="pl-4">
                {academicData[key].currentlyEnrolled === null ? null : (
                  <div className="p-2">
                    <p className="md:text-lg">Years Attended</p>
                    <SelectInput
                      name="From"
                      value={academicData[key]['startedYear']}
                      onChange={(e) =>
                        updateField(key, 'startedYear', e.target.value)
                      }
                      required={true}
                      options={yearOptions}
                    />
                    <SelectInput
                      name={
                        !academicData[key].currentlyEnrolled
                          ? 'To'
                          : 'Expected Year of Completion'
                      }
                      value={academicData[key]['completionYear']}
                      onChange={(e) =>
                        updateField(key, 'completionYear', e.target.value)
                      }
                      required={true}
                      options={yearOptions}
                    />
                  </div>
                )}
              </div>
              <CheckBoxInput
                name="Does this degree award grade in CGPA or Percentage?"
                value={academicData[key]['gradeCriteria']}
                onChange={(e, optionValue) => {
                  updateField(key, 'grades', 0)
                  updateField(
                    key,
                    'gradeCriteria',
                    !e.target.checked ? null : optionValue,
                  )
                }}
                required={true}
                options={[
                  { label: 'CGPA', value: 'CGPA' },
                  { label: 'Percentage', value: 'Percentage' },
                ]}
              />
              <div className="pl-4">
                {academicData[key].gradeCriteria === null ? null : (
                  <TextInput
                    name={
                      academicData[key].gradeCriteria === 'CGPA'
                        ? 'Enter your CGPA'
                        : 'Enter your Cumulative Percentage'
                    }
                    value={academicData[key]['grades']}
                    description={
                      academicData[key].degreeLevel === 'Master' ||
                      academicData[key].degreeLevel === 'Doctoral'
                        ? "If you haven't yet received any marksheet from your master's or doctoral program, please write 1 below"
                        : ''
                    }
                    type="number"
                    onChange={(e) => {
                      const maximum =
                        academicData[key].gradeCriteria === 'CGPA' ? 10 : 100
                      if (
                        Number(e.target.value) <= maximum &&
                        Number(e.target.value) >= 0
                      )
                        updateField(key, 'grades', Number(e.target.value))
                    }}
                    required={true}
                    step="0.01"
                    minimum={0}
                    maximum={
                      academicData[key].gradeCriteria === 'CGPA' ? 10 : 100
                    }
                  />
                )}
              </div>
              <div className="p-2">
                <p className="md:text-lg">
                  Upload your most recent marksheet/transcript showing the
                  above-mentioned grades
                  <span className="text-red-850 font-black">*</span>
                  {academicData[key].degreeLevel === 'Master' ||
                  academicData[key].degreeLevel === 'Doctoral' ? (
                    <span className="text-xs md:text-sm">
                      <br />
                      If you haven&apos;t yet received any marksheet from your
                      master&apos;s or doctoral program, please upload your
                      admission card
                    </span>
                  ) : null}
                </p>

                <FileUploadComponent
                  fileName={`AcademicRecord${key}`}
                  fileUrl={academicData[key].document}
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
          setAcademicData((prevRecord: AcademicRecordType) => ({
            ...prevRecord,
            [newDegreeKey]: defaultRecord,
          }))
          setNewDegreeKey((prev) => prev + 1)
        }}
      >
        Add a Degree +
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

export default Step2
