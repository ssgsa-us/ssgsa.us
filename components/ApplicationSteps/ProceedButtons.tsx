import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'

// updateApplicationData function: Used in next step and save information
// Call updateApplicationData with required fields and a dynamic status (newStatus)
// newStatus will be provided depends upon the formStatus and the current status
// if both are equal newStatus will be status+1 otherwise formStatus
type Props = {
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<number>>
  validation: () => boolean
  updateApplicationData: (newStatus: number) => Promise<void>
  error: string
  setError: Dispatch<SetStateAction<string>>
}

const ProceedButtons = ({
  formStatus,
  status,
  setStatus,
  validation,
  updateApplicationData,
  error,
  setError,
}: Props) => {
  return (
    <div className="mt-10">
      {error ? (
        <div className="bg-red-200 rounded-3xl p-2 pl-6 mb-5">
          <p>
            <span className="font-bold">Error:</span> {error}
          </p>
        </div>
      ) : null}
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-10">
        <div className="flex justify-between sm:justify-start w-full sm:w-max order-2 sm:order-1">
          <button
            className={`text-white text-base md:text-lg ${
              status == 1 ? 'bg-blue-860 cursor-not-allowed' : 'bg-blue-850'
            } mr-2 py-2 px-2 rounded-lg flex flex-row items-center`}
            onClick={() => (status !== 1 ? setStatus(status - 1) : null)}
          >
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              size="lg"
              className="text-white"
            />
            <p className="ml-2">Previous Step</p>
          </button>
          <button
            className="text-white text-base md:text-lg bg-blue-850 ml-2 py-2 px-2 rounded-lg flex flex-row items-center"
            onClick={() => {
              if (!validation()) return

              if (formStatus === status)
                updateApplicationData(status + 1)
                  .then(() => setStatus(status + 1))
                  .catch(() => setError('Try again, network error!'))
              else
                updateApplicationData(formStatus)
                  .then(() => setStatus(status + 1))
                  .catch(() => setError('Try again, network error!'))
            }}
          >
            <p className="mr-2">Save And Proceed</p>
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              size="lg"
              className="text-white"
            />
          </button>
        </div>
        <button
          className={
            'text-white text-base md:text-lg bg-red-850 mb-4 sm:ml-4 sm:mb-0 py-2 px-2 rounded-lg order-1 sm:order-2'
          }
          onClick={() => {
            setError('')
            if (status == formStatus || validation())
              updateApplicationData(formStatus)
                .then(() => alert('Your data is saved!'))
                .catch(() => setError('Try again, network error!'))
          }}
        >
          Save Information
        </button>
      </div>
    </div>
  )
}

export default ProceedButtons
