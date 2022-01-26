import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import ProceedButtons from './ProceedButtons'
import { updateApplicationData } from '../../pages/api/step1'
import { useAuth } from '../../context/AuthUserContext'

type Props = {
  applicationData: ApplicationData
  status: Number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step1 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [contactNo, setContactNo] = useState<number>()
  const [gender, setGender] = useState<string>()
  const [enrollNo, setEnrollNo] = useState<string>()
  const [nationality, setNationality] = useState<string>()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setName(applicationData.name || '')
    setEmail(applicationData.email || '')
    setContactNo(applicationData.contact || 0)
    setGender(applicationData.gender || 'Male')
    setEnrollNo(applicationData.enrollment || '')
    setNationality(applicationData.nationality || '')
  }, [applicationData])

  const nextStep = () => {
    setError('')
    if (name && email && contactNo && gender && enrollNo && nationality) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(email).toLowerCase())) {
        if (applicationData.form_status == 1) {
          updateApplicationData(
            authUser.id,
            name,
            email,
            contactNo,
            gender,
            enrollNo,
            nationality,
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
            email,
            contactNo,
            gender,
            enrollNo,
            nationality,
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

  const saveInformation = () =>
    updateApplicationData(
      authUser.id,
      name,
      email,
      contactNo,
      gender,
      enrollNo,
      nationality,
      applicationData.form_status,
    )

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
            Gender<span className="text-red-850 font-black">*</span>
          </p>
          <select
            name="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-xl p-3"
          >
            <option label="Male" value="Male" />
            <option label="Female" value="Female" />
            <option label="Transgender" value="Transgender" />
            <option
              label="Prefer Not To Disclose"
              value="Prefer Not To Disclose"
            />
          </select>
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
          <p className="md:text-lg">
            Nationality<span className="text-red-850 font-black">*</span>
          </p>
          <input
            name="Nationality"
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
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
