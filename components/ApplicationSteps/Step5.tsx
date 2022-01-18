import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Link from 'next/link'
import { ApplicationData } from '../../classes/application_data'
import { useAuth } from '../../context/AuthUserContext'
import { updateFormStatus } from '../../pages/api/step5'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step5 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  const [stepStatus, setStepStatus] = useState<string>('review')
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (applicationData.form_status == 6) setStepStatus('submitted')
  })

  const reviewApplication = () => {
    setError('')
    if (name === applicationData.name) {
      setStepStatus('submit')
    } else
      setError(
        'Name given should be similar to the name provided in application.',
      )
  }

  const submitApplication = () => {
    updateFormStatus(authUser.id, 6)
    setStepStatus('submitted')
  }

  const previousStep = () => setStatus(status - 1)

  return (
    <div>
      {stepStatus == 'review' ? (
        <div>
          <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
            <p className="md:text-lg">
              All the information provided by me in this application are true to
              the best of my knowledge, and all the answers written by me are my
              original responses. I understand that if any part of my
              application is found to be false or plagiarized, I will be
              disqualified and barred from applying to the Sir Syed Global
              Scholar Award in the future.
            </p>
            <br />
            <p className="md:text-lg">
              Please write your full name in lieu of your signature as
              confirmation of the above.
            </p>
            <input
              name="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl p-2 mt-1"
            />
          </div>
          <div className="mt-10">
            {error ? (
              <div className="bg-red-200 rounded-3xl p-2 pl-6 mb-5">
                <p>
                  <span className="font-bold">Error:</span> {error}
                </p>
              </div>
            ) : null}
            <div className="flex justify-between mt-10">
              <button
                className="text-white text-base md:text-lg bg-blue-850 mr-2 p-2 rounded-lg flex flex-row items-center"
                onClick={previousStep}
              >
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                  size="lg"
                  className="text-white"
                />
                <p className="ml-2">Previous Step</p>
              </button>
              <button
                className="text-white text-lg md:text-xl bg-red-850 font-bold py-2 px-5 rounded-lg flex flex-row items-center"
                onClick={reviewApplication}
              >
                Review Application
              </button>
            </div>
          </div>
        </div>
      ) : stepStatus == 'submit' ? (
        <div>
          <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
            <div className="mb-10">
              <div className="flex justify-start">
                <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                  Name
                </p>
                <p className="text-lg">{applicationData.name}</p>
              </div>
              <div className="flex justify-start mt-4">
                <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                  E-mail Address
                </p>
                <p className="text-lg">{applicationData.email}</p>
              </div>
              <div className="flex justify-start mt-4">
                <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                  Contact Number
                </p>
                <p className="text-lg">{applicationData.contact}</p>
              </div>
              <div className="flex justify-start mt-4">
                <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                  Gender
                </p>
                <p className="text-lg">{applicationData.gender}</p>
              </div>
              <div className="flex justify-start mt-4">
                <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                  AMU Enrollment Number
                </p>
                <p className="text-lg">{applicationData.enrollment}</p>
              </div>
              <div className="flex justify-start mt-4">
                <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                  Nationality
                </p>
                <p className="text-lg">{applicationData.nationality}</p>
              </div>
            </div>
            <div className="mb-10">
              {Object.keys(applicationData.academic_record).map((key) => (
                <div className="mb-10">
                  <p className="text-black text-xl font-extrabold w-48 mr-5 mb-4">
                    Academic Record
                  </p>
                  <p className="text-black text-xl font-extrabold w-48 mr-5">
                    {key}
                  </p>
                  <div className="flex justify-start mt-4">
                    <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                      Major/Branch
                    </p>
                    <p className="text-lg">
                      {applicationData.academic_record[key].branch}
                    </p>
                  </div>
                  <div className="flex justify-start mt-4">
                    <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                      Name Of College/University
                    </p>
                    <p className="text-lg">
                      {applicationData.academic_record[key].collegeName}
                    </p>
                  </div>
                  <div className="flex justify-start mt-4">
                    <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                      Course Duration
                    </p>
                    <p className="text-lg">
                      {applicationData.academic_record[key].duration}
                    </p>
                  </div>
                  <div className="flex justify-start mt-4">
                    <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                      Year/Expected Year Of Completion
                    </p>
                    <p className="text-lg">
                      {applicationData.academic_record[key].completionYear}
                    </p>
                  </div>
                  <div className="flex justify-start mt-4">
                    <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                      Percentage/CGPA
                    </p>
                    <p className="text-lg">
                      {applicationData.academic_record[key].percentage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <p className="text-black text-xl font-extrabold mb-4">
                Declaration
              </p>
              <p className="text-black text-xl font-extrabold mb-4">
                All the information provided by me in this application are true
                to the best of my knowledge, and all the answers written by me
                are my original responses. I understand that if any part of my
                application is found to be false or plagiarized, I will be
                disqualified and barred from applying to the Sir Syed Global
                Scholar Award in the future.
              </p>
              <div className="flex justify-start mt-4">
                <p className="text-red-850 text-xl font-extrabold w-48 mr-5">
                  Signature
                </p>
                <p className="text-lg text-black font-extrabold">
                  {applicationData.name}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-between mt-10">
              <button
                className="text-white text-lg md:text-xl bg-blue-850 font-bold mb-4 sm:mb-0 py-2 px-5 rounded-lg flex flex-row items-center"
                onClick={() => setStatus(1)}
              >
                Edit Information
              </button>
              <div className="flex flex-col items-center w-60 sm:w-64 md:w-80">
                <button
                  className="text-white text-lg md:text-xl bg-red-850 font-bold py-2 px-5 mb-2 rounded-lg flex flex-row items-center"
                  onClick={submitApplication}
                >
                  Submit Application
                </button>
                <p className="text-center">
                  Note: You will still be able to make changes to your
                  application until the deadline.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-green-850 text-white text-center font-bold rounded-3xl py-10 px-10 sm:py-20 sm:px-20">
            <p className="text-xl sm:text-3xl mb-10">
              Your application has been submitted.
            </p>
            <p className="sm:text-lg">Thank you for applying to SSGSA.</p>
          </div>
          <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-between mt-10">
            <Link href="/">
              <a className="text-white text-lg md:text-xl bg-blue-850 font-bold mb-4 sm:mb-0 py-2 px-5 rounded-lg flex flex-row items-center">
                SSGSA HOME PAGE
              </a>
            </Link>
            <button
              className="text-white text-lg md:text-xl bg-red-850 font-bold py-2 px-5 rounded-lg flex flex-row items-center"
              onClick={() => {}}
            >
              Print Application
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Step5
