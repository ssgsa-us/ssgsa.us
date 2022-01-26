import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { useAuth } from '../../context/AuthUserContext'
import { updateFormStatus } from '../../pages/api/step5'
import ReviewApplication from './ReviewApplication'

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
    setError('')
    updateFormStatus(authUser.id, 6)
      .then(() => {
        setStatus(6)
      })
      .catch(() => {
        setError('Try again, network error!')
      })
  }

  const previousStep = () => setStatus(4)

  return (
    <div>
      {stepStatus == 'review' ? (
        <div>
          <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
            <p className="md:text-lg">
              I declare that all the information provided by me in this
              application is true to the best of my knowledge, and all the
              answers written by me are my original responses. I understand that
              if any part of my application is found to be false or plagiarized,
              I will be disqualified and barred from applying to the Sir Syed
              Global Scholar Award in the future.
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
      ) : (
        <div>
          <ReviewApplication applicationData={applicationData} />
          <div className="mt-10">
            <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-between mt-10">
              <button
                className="text-white text-lg md:text-xl bg-blue-850 font-bold mb-4 sm:mb-0 py-2 px-5 mr-2 rounded-lg flex flex-row items-center"
                onClick={() => setStatus(1)}
              >
                Edit Information
              </button>
              <button className="text-white text-lg md:text-xl bg-blue-850 font-bold mb-4 sm:mb-0 py-2 px-5 mr-2 rounded-lg flex flex-row items-center">
                Save for later
              </button>
              <div className="flex flex-col items-center w-60 sm:w-64 md:w-80">
                <button
                  className="text-white text-lg md:text-xl bg-red-850 font-bold py-2 px-5 mb-2 rounded-lg flex flex-row items-center"
                  onClick={submitApplication}
                >
                  Submit Application
                </button>
                <p className="text-center">
                  Note: Please click on &apos;Submit Application&apos; button
                  only if you are confident your application is complete in all
                  respects. Upon clicking the &apos;Submit Application&apos;
                  button, you will not be able to make any changes to your
                  application.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Step5
