import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
  status: number
  formStatus: number
  setStatus: Dispatch<SetStateAction<number>>
  stepsData: Array<string> // Steps Name
}

export default function StepNavigator({
  status,
  formStatus,
  setStatus,
  stepsData,
}: Props) {
  // Variable for step number of first visible step
  const [visibleStepStart, setVisibleStepStart] = useState(1)
  const totalSteps = stepsData.length

  // Component to show one step
  const stepComponent = (step: number, name: string) => (
    <div
      className={`bg-white ${
        step === visibleStepStart + 4
          ? 'py-0.5 md:py-0 md:px-0.5'
          : 'pt-0.5 md:pt-0 md:pl-0.5'
      } ${
        step < visibleStepStart || step > visibleStepStart + 4
          ? 'md:hidden' // to hide step
          : ''
      }`}
      key={step}
    >
      <button
        className={`py-2 px-2 text-white flex md:flex-col md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer ${
          formStatus >= step && formStatus !== totalSteps + 1
            ? status == step
              ? 'bg-blue-850'
              : 'bg-red-850 hover:bg-blue-850'
            : 'bg-red-860 cursor-not-allowed'
        }`}
        onClick={() => {
          if (formStatus >= step && formStatus !== totalSteps + 1)
            setStatus(step)
        }}
      >
        <p className="text-sm md:text-lg lg:text-2xl">Step {step}</p>
        <p className="text-sm md:text-xs lg:text-sm">{name}</p>
      </button>
    </div>
  )

  // Use form status to select visible steps
  // make sure that staart variable is less than total steps to show 5 steps
  useEffect(() => {
    if (status <= totalSteps - 4) setVisibleStepStart(status)
    else setVisibleStepStart(totalSteps - 4)
  }, [status])

  return (
    <div className="flex flex-col w-full md:flex-row md:justify-center">
      <div className="hidden md:flex items-center w-4 mr-2">
        <FontAwesomeIcon
          className={
            visibleStepStart === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
          }
          color={visibleStepStart === 1 ? '#dadada' : 'white'}
          icon={faAngleLeft}
          size="2x"
          onClick={() => {
            if (visibleStepStart !== 1)
              setVisibleStepStart(visibleStepStart - 1)
          }}
        />
      </div>
      {stepsData.map((stepName, index) => stepComponent(index + 1, stepName))}
      <div className="hidden md:flex items-center w-4 ml-2">
        <FontAwesomeIcon
          className={
            visibleStepStart === totalSteps - 4
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          }
          color={visibleStepStart === totalSteps - 4 ? '#dadada' : 'white'}
          icon={faAngleRight}
          size="2x"
          onClick={() => {
            // (totalSteps-4) used to make sure 5 steps are visible every time
            if (visibleStepStart !== totalSteps - 4)
              setVisibleStepStart(visibleStepStart + 1)
          }}
        />
      </div>
    </div>
  )
}
