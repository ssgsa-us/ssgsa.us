import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  status: number
  setStatus: Dispatch<SetStateAction<number>>
  formStatus: number
  error: string
}

const ProceedButtons = ({ status, setStatus, formStatus, error }: Props) => {
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
            status === 1 ? 'bg-blue-860 cursor-not-allowed' : 'bg-blue-850'
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
          className={`text-white text-base md:text-xl ${
            status < formStatus
              ? 'bg-blue-850'
              : 'bg-blue-860 cursor-not-allowed'
          } mt-2 sm:mt-0 ml-2 py-2 px-5 rounded-lg flex flex-row items-center`}
          onClick={() => (status < formStatus ? setStatus(status + 1) : null)}
        >
          <p className="mr-2">Next Step</p>
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
