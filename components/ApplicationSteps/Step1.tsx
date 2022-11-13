import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import ProceedButtons from './ProceedButtons'
import { updateApplicationData } from '../../pages/api/step1'
import { useAuth } from '../../context/AuthUserContext'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step1 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  const [name, setName] = useState<string>()
  const [enrollNo, setEnrollNo] = useState<string>()
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
    setEmail(applicationData.email || '')
    setContactNo(applicationData.contact || 0)
    setCurrentPosition(applicationData.current_position || '')
    setTargetProgram(applicationData.target_program || '')
    setTargetDate(applicationData.target_date || 'In 0-1 year')
    setTargetCountry(applicationData.target_country || '')
  }, [applicationData])

  const nextStep = () => {
    setError('')
    if (
      name &&
      enrollNo &&
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
            2,
          )
            .then(() => {
              setStatus(2)
            })
            .catch(() => {
              setError('Try again, network error!')
            })
        } else {
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
            applicationData.form_status,
          )
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
      applicationData.form_status,
    )
  }

  return (
    <div>
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2">
          Note: Remember to save your information at frequent intervals.
        </p>
        <br />
        <div className="p-2">
          <p className="md:text-lg">
            Name<span className="text-red-850 font-black">*</span>
          </p>
          <input
            name="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl p-2 mt-1"
          />
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            AMU Enrollment Number
            <span className="text-red-850 font-black">*</span>
          </p>
          <input
            name="EnrollNo"
            type="text"
            value={enrollNo}
            onChange={(e) => setEnrollNo(e.target.value)}
            className="w-full rounded-xl p-2 mt-1"
          />
        </div>
        <div className="p-2">
          <p className="md:text-lg leading-none">
            E-mail address<span className="text-red-850 font-black">*</span>{' '}
            <span className="text-xs md:text-sm">
              (this email ID will stay in the SSGSA records and be used for
              future correspondence)
            </span>
          </p>
          <input
            name="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl p-2 mt-1"
          />
        </div>
        <div className="p-2">
          <p className="md:text-lg leading-none">
            Contact Number<span className="text-red-850 font-black">*</span>
          </p>
          <input
            name="ContactNumber"
            type="number"
            value={contactNo}
            onChange={(e) => setContactNo(Number(e.target.value))}
            className="w-full rounded-xl p-2 mt-1"
          />
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            Current Position<span className="text-red-850 font-black">*</span>
            <span className="text-xs md:text-sm">
              <br />
              (e.g., Final year BTech student at AMU, Software Developer in
              Indian Railways, Taking a year gap, Preparing for entrance exams
              like GATE etc.)
            </span>
          </p>
          <input
            name="Current Position"
            type="text"
            value={currentPosition}
            onChange={(e) => setCurrentPosition(e.target.value)}
            className="w-full rounded-xl p-2 mt-1"
          />
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            Which program(s) and in what subject(s) are you interested in
            studying abroad?<span className="text-red-850 font-black">*</span>
            <span className="text-xs md:text-sm">
              <br />
              (e.g., MS in Machine Learning, MBA, PhD in Asian History, etc.)
            </span>
          </p>
          <input
            name="Target Program"
            type="text"
            value={targetProgram}
            onChange={(e) => setTargetProgram(e.target.value)}
            className="w-full rounded-xl p-2 mt-1"
          />
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            When do you plan to apply for grad school?
            <span className="text-red-850 font-black">*</span>
          </p>
          <select
            name="Target Date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full rounded-xl p-3"
          >
            <option label="In 0-1 year" value="In 0-1 year" />
            <option label="In 1-2 years" value="In 1-2 years" />
            <option label="more than 2 years" value="more than 2 years" />
            <option label="not decided yet" value="not decided yet" />
          </select>
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            Which country(s) will you be applying in?
            <span className="text-red-850 font-black">*</span>
            <span className="text-xs md:text-sm">
              <br />
              You can list more than one here.
            </span>
          </p>
          <input
            name="Target Country"
            type="text"
            value={targetCountry}
            onChange={(e) => setTargetCountry(e.target.value)}
            className="w-full rounded-xl p-2 mt-1"
          />
        </div>
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
