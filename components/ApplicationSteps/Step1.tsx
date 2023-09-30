import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { faculties } from '../../constants/faculties'
import { useAuth } from '../../context/AuthUserContext'
import { updateApplicationData } from '../../pages/api/applications/step1'
import FileUploadComponent from './FileUpload'
import ProceedButtons from './ProceedButtons'
import SelectInput from './SelectInput'
import TextInput from './TextInput'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step1 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  const [name, setName] = useState<string>()
  const [enrollNo, setEnrollNo] = useState<string>()
  const [enrollProofDoc, setEnrollProofDoc] = useState<string>()
  const [currentPosition, setCurrentPosition] = useState<string>()
  const [targetProgram, setTargetProgram] = useState<string>()
  const [faculty, setFaculty] = useState<string>()
  const [otherFaculty, setOtherFaculty] = useState<string>()
  const [targetDate, setTargetDate] = useState<string>()
  const [targetCountry, setTargetCountry] = useState<string>()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setName(applicationData.name || '')
    setEnrollNo(applicationData.enrollment || '')
    setEnrollProofDoc(applicationData.enrollment_proof_doc)
    setCurrentPosition(applicationData.current_position || '')
    setTargetProgram(applicationData.target_program || '')
    setFaculty(applicationData.faculty || '')
    setOtherFaculty(applicationData.other_faculty || '')
    setTargetDate(applicationData.target_date || '')
    setTargetCountry(applicationData.target_country || '')
  }, [applicationData])

  const validation = () => {
    setError('')
    if (
      name &&
      enrollNo &&
      enrollProofDoc &&
      currentPosition &&
      targetProgram &&
      faculty &&
      (faculty === 'Other' ? !!otherFaculty : true) &&
      targetDate &&
      targetCountry
    ) {
      return true
    }
    setError('All fields are required.')
    return false
  }

  // Used in next step and save information
  // Call updateApplicationData with required fields and a dynamic status (newStatus)
  // newStatus will be provided depends upon the formStatus and the current status
  // if both are equal newStatus will be status+1 otherwise formStatus
  const updateData = (newStatus: number) => {
    return updateApplicationData(
      authUser.id,
      name,
      enrollNo,
      currentPosition,
      targetProgram,
      faculty,
      otherFaculty,
      targetDate,
      targetCountry,
      enrollProofDoc,
      newStatus,
    )
  }

  return (
    <div>
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Personal Information
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2">
          Note: Remember to save your information at frequent intervals.
        </p>
        <br />
        <TextInput
          name="Name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        <TextInput
          name="AMU Enrollment Number"
          value={enrollNo}
          type="text"
          onChange={(e) => setEnrollNo(e.target.value)}
          required={true}
        />
        <div className="p-2">
          <p className="md:text-lg">
            AMU Enrollment Proof Document
            <span className="text-red-850 font-black">*</span>
            <span className="text-xs md:text-sm">
              <br />
              Please provide a document as a proof of being a current AMU
              Student or Alumna/Alumnus (e.g., ID card, degree, marksheet, etc.)
            </span>
          </p>
          <FileUploadComponent
            fileName="EnrollmentProofDoc"
            fileUrl={enrollProofDoc}
            setFileUrl={(url: string) => setEnrollProofDoc(url)}
          />
        </div>
        <TextInput
          name="Current Position"
          description="(e.g., Final year BTech student at AMU, Software 
            Developer in Indian Railways, Taking a year gap, Preparing for 
            entrance exams like GATE etc.)"
          value={currentPosition}
          type="text"
          onChange={(e) => setCurrentPosition(e.target.value)}
          required={true}
        />
        <TextInput
          name="Which program(s) and in what subject(s) are you interested in
            studying abroad?"
          description="(e.g., MS in Machine Learning, MBA, PhD in Asian 
            History, etc.)"
          value={targetProgram}
          type="text"
          onChange={(e) => setTargetProgram(e.target.value)}
          required={true}
        />
        <SelectInput
          name="In which of the following faculty (most relevant) does your target program fall?"
          value={faculty}
          options={[
            { label: 'Select', value: '' },
            ...faculties,
            { label: 'Other', value: 'Other' },
          ]}
          onChange={(e) => setFaculty(e.target.value)}
          required={true}
        />
        {faculty === 'Other' ? (
          <TextInput
            name="Other Faculty"
            value={otherFaculty}
            type="text"
            onChange={(e) => setOtherFaculty(e.target.value)}
            required={true}
          />
        ) : null}
        <SelectInput
          name="When do you plan to apply for grad school?"
          value={targetDate}
          options={[
            { label: 'Select', value: '' },
            { label: 'Within 0-1 year', value: 'Within 0-1 year' },
            { label: 'Within 1-2 years', value: 'Within 1-2 years' },
            { label: 'After 2 years', value: 'After 2 years' },
            { label: 'Not decided', value: 'Not decided' },
          ]}
          onChange={(e) => setTargetDate(e.target.value)}
          required={true}
        />
        <TextInput
          name="Which country(ies) will you be applying in?"
          description="You can list more than one here."
          value={targetCountry}
          type="text"
          onChange={(e) => setTargetCountry(e.target.value)}
          required={true}
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
  )
}

export default Step1
