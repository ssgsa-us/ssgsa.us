import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import ProceedButtons from './ProceedButtons'
import { updateApplicationData } from '../../pages/api/step1'
import { useAuth } from '../../context/AuthUserContext'
import FileUploadComponent from './FileUpload'
import TextInput from './TextInput'
import SelectInput from './SelectInput'

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
  const [email, setEmail] = useState<string>()
  const [contactNo, setContactNo] = useState<number>()
  const [currentPosition, setCurrentPosition] = useState<string>()
  const [targetProgram, setTargetProgram] = useState<string>()
  const [targetDate, setTargetDate] = useState<string>()
  const [targetCountry, setTargetCountry] = useState<string>()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setName(applicationData.name || '')
    setEnrollNo(applicationData.enrollment || '')
    setEnrollProofDoc(applicationData.enrollment_proof_doc)
    setEmail(applicationData.email || '')
    setContactNo(applicationData.contact || 0)
    setCurrentPosition(applicationData.current_position || '')
    setTargetProgram(applicationData.target_program || '')
    setTargetDate(applicationData.target_date || '')
    setTargetCountry(applicationData.target_country || '')
  }, [applicationData])

  const nextStep = () => {
    setError('')
    if (
      name &&
      enrollNo &&
      enrollProofDoc &&
      email &&
      contactNo &&
      currentPosition &&
      targetProgram &&
      targetDate &&
      targetCountry
    ) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(email).toLowerCase())) {
        if (applicationData.form_status == 1) {
          updateApplicationData(
            authUser.id,
            name,
            enrollNo,
            email,
            contactNo,
            currentPosition,
            targetProgram,
            targetDate,
            targetCountry,
            enrollProofDoc,
            2,
          )
            .then(() => {
              setStatus(2)
            })
            .catch(() => {
              setError('Try again, network error!')
            })
        } else {
          saveInformation()
            .then(() => {
              setStatus(2)
            })
            .catch(() => {
              setError('Try again, network error!')
            })
        }
      } else setError('Email is incorrect.')
    } else setError('All fields are required.')
  }

  const previousStep = () => setStatus(1)

  const saveInformation = () => {
    setError('')
    return updateApplicationData(
      authUser.id,
      name,
      enrollNo,
      email,
      contactNo,
      currentPosition,
      targetProgram,
      targetDate,
      targetCountry,
      enrollProofDoc,
      applicationData.form_status,
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
              Please provide a document as a proof of being AMU Student or
              Alumna/Alumnus (e.g., ID card, degree, marksheet, etc.)
            </span>
          </p>
          <FileUploadComponent
            fileName="EnrollmentProofDoc"
            fileUrl={enrollProofDoc}
            setFileUrl={(url: string) => setEnrollProofDoc(url)}
          />
        </div>
        <TextInput
          name="E-mail address"
          description="(this email ID will stay in the SSGSA records and be 
            used for future correspondence)"
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <TextInput
          name="Contact Number"
          value={contactNo}
          type="number"
          onChange={(e) => setContactNo(Number(e.target.value))}
          required={true}
        />
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
          name="When do you plan to apply for grad school?"
          value={targetDate}
          options={[
            { label: 'Select', value: '' },
            { label: 'In 0-1 year', value: 'In 0-1 year' },
            { label: 'In 1-2 years', value: 'In 1-2 years' },
            { label: 'more than 2 years', value: 'more than 2 years' },
            { label: 'not decided yet', value: 'not decided yet' },
          ]}
          onChange={(e) => setTargetDate(e.target.value)}
          required={true}
        />
        <TextInput
          name="Which country(s) will you be applying in?"
          description="You can list more than one here."
          value={targetCountry}
          type="text"
          onChange={(e) => setTargetCountry(e.target.value)}
          required={true}
        />
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

export default Step1
