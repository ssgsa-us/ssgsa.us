import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import ReviewApplication from './ReviewApplication'
import ApplyFacultyModal from '../../components/modals/AddFacultyModal'
import TextInput from './TextInput'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step10 = ({ applicationData, status, setStatus }: Props) => {
  const [stepStatus, setStepStatus] = useState<string>('review')
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [showModal, setShowModal] = useState(false)

  const reviewApplication = () => {
    setError('')
    if (name === applicationData.name) {
      setStepStatus('submit')
    } else
      setError(
        'Name given should be similar to the name provided in application.',
      )
  }

  const previousStep = () => setStatus(9)

  return (
    <div>
      {stepStatus == 'review' ? (
        <div>
          <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
            <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
              Declaration
            </h1>
            <p className="text-xs sm:text-sm md:text-base pl-2 pt-2">
              All the information provided by me in this application are true to
              the best of my knowledge, and all the answers written by me are my
              original responses. I understand that if any part of my
              application is found to be false or plagiarized, I will be
              disqualified and barred from applying to the Sir Syed Global
              Scholar Award in the future.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2 py-2">
              Note: Remember to save your information at frequent intervals.
            </p>
            <br />
            <TextInput
              name="Signature"
              description="Please write your full name in lieu of your 
              signature as confirmation of the above."
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              required={true}
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
                  onClick={() => {
                    setError('')
                    setShowModal(true)
                  }}
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
          <ApplyFacultyModal
            showModal={showModal}
            setShowModal={setShowModal}
            setStatus={setStatus}
            setError={setError}
          />
        </div>
      )}
    </div>
  )
}

export default Step10
