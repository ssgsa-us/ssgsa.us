import { useState } from 'react'
import ProceedButtons from './ProceedButtons'

const Step1 = ({ status, formStatus, setStatus, setFormStatus }) => {
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [contactNo, setContactNo] = useState<number>()
  const [gender, setGender] = useState<string>('Male')
  const [enrollNo, setEnrollNo] = useState<string>()
  const [nationality, setNationality] = useState<string>()
  const [error, setError] = useState<string>('')

  const nextStep = () => {
    if (name && email && contactNo && gender && enrollNo && nationality) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(email).toLowerCase())) {
        if (formStatus == 1) {
          setStatus(2)
          setFormStatus(2)
        } else {
          setStatus(2)
        }
      } else setError('Email is incorrect.')
    } else setError('All fields are required.')
  }

  const previousStep = () => setStatus(1)

  const saveInformation = () => {}

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
              (this email will stay in the SSGSA record and used for future
              correspondence)
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
            Contact Number<span className="text-red-850 font-black">*</span>{' '}
            <span className="text-xs md:text-sm">
              (only 10 digit mobile number)
            </span>
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
            <option label="Male" />
            <option label="Female" />
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
        previousStep={previousStep}
        nextStep={nextStep}
        saveInformation={saveInformation}
        error={error}
      />
    </div>
  )
}

export default Step1
