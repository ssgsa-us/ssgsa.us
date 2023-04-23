import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
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
  updateInterviewMarks: (newStatus: number) => Promise<void>
  error: string
  setError: Dispatch<SetStateAction<string>>
}

const ProceedButtons = ({
  formStatus,
  status,
  setStatus,
  validation,
  updateInterviewMarks,
  error,
  setError,
}: Props) => {
  const router = useRouter()

  return (
    <div className="mt-10">
      {error ? (
        <div className="bg-red-200 rounded-3xl p-2 pl-6 mb-5">
          <p>
            <span className="font-bold">Error:</span> {error}
          </p>
        </div>
      ) : null}
      <div className="flex flex-col sm:flex-row sm:justify-between mt-10 items-center sm:items-stretch">
        <button
          className={`text-white text-base md:text-xl ${
            status == 1 ? 'bg-blue-860 cursor-not-allowed' : 'bg-blue-850'
          } mr-2 py-2 px-5 rounded-lg flex flex-row items-center`}
          onClick={() => (status !== 1 ? setStatus(status - 1) : null)}
        >
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            width={40}
            className="text-white"
          />
          <p className="ml-2">Previous Step</p>
        </button>
        <button
          className="text-white text-base md:text-xl bg-blue-850 mt-2 sm:mt-0 ml-2 py-2 px-5 rounded-lg flex flex-row items-center"
          onClick={() => {
            if (validation())
              if (status === 8)
                updateInterviewMarks(9)
                  .then(() => router.push('/interviewer/applications'))
                  .catch(() => setError('Try again, network error!'))
              else
                updateInterviewMarks(
                  status === formStatus ? status + 1 : formStatus,
                )
                  .then(() => setStatus(status + 1))
                  .catch(() => setError('Try again, network error!'))
          }}
        >
          <p className="mr-2">
            {status === 8
              ? 'Complete Interview and Proceed'
              : 'Save And Proceed'}
          </p>
          <FontAwesomeIcon
            icon={faArrowAltCircleRight}
            width={40}
            className="text-white"
          />
        </button>
      </div>
    </div>
  )
}

export default ProceedButtons
