import Image from 'next/image'
import { useEffect, useState } from 'react'
import logo from '../public/logo.png'
import Link from 'next/link'
import { useAuth } from '../context/AuthUserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

// Only showing five step at a time in header
export default function ApplicationHeader({ status, formStatus, setStatus }) {
  const { signOut } = useAuth()
  const [active, setActive] = useState(false)
  // Variable for step number of first visible step
  const [visibleStepStart, setVisibleStepStart] = useState(1)
  const totalSteps = 10

  const handleClick = () => {
    setActive(!active)
  }

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
    >
      <button
        className={`py-2 px-2 text-white flex md:flex-col md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer ${
          formStatus >= step && formStatus !== totalSteps
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
    if (formStatus <= totalSteps - 4) setVisibleStepStart(formStatus)
    else setVisibleStepStart(totalSteps - 4)
  }, [formStatus])

  return (
    <nav className="sticky top-0 z-50 bg-red-850">
      <div className="w-full flex flex-row bg-white items-center flex">
        <div className="flex-1 text-xl sm:text-2xl md:text-3xl justify-center px-4 my-6 lg:ml-24 flex items-center font-black text-red-850 ">
          SIR SYED GLOBAL SCHOLAR AWARD
        </div>
        <div className="mr-3 flex-2">
          <Link href="/">
            <Image width={110} height={110} src={logo} alt="SSGSA Logo" />
          </Link>
        </div>
      </div>
      <div className="mx-auto md:mx-0 px-4 md:px-1">
        <div className="md:hidden flex justify-between">
          <div className="text-white m-1 text-xl font-bold">
            SSGSA APPLICATIONS
          </div>

          <div className="flex items-center">
            <button
              className="mobile-menu-button hover:bg-red-500 text-white"
              onClick={handleClick}
            >
              <div className="flex justify-end ...">
                <div>
                  <svg
                    className="w-7 h-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div
          className={`${
            active ? 'pt-1 pb-3 md:py-0' : 'hidden'
          } md:flex md:justify-between`}
        >
          <div className="flex flex-col w-full md:flex-row md:justify-center lg:ml-28">
            <div className="hidden md:flex justify-center w-4 mr-2">
              <FontAwesomeIcon
                className={
                  visibleStepStart === 1
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }
                color={visibleStepStart === 1 ? '#dadada' : 'white'}
                icon={faAngleLeft}
                onClick={() => {
                  if (visibleStepStart !== 1)
                    setVisibleStepStart(visibleStepStart - 1)
                }}
              />
            </div>
            {stepComponent(1, 'Personal Information')}
            {stepComponent(2, 'Qualifications')}
            {stepComponent(3, 'Research Experience')}
            {stepComponent(4, 'Work Experience')}
            {stepComponent(5, 'Presentations / Workshops')}
            {stepComponent(6, 'Achievements / Awards')}
            {stepComponent(7, 'Extra Curricular Activities')}
            {stepComponent(8, 'Written Responses')}
            {stepComponent(9, 'Other Information')}
            {stepComponent(10, 'Review and Submit')}
            <div className="hidden md:flex justify-center w-4 ml-2">
              <FontAwesomeIcon
                className={
                  visibleStepStart === totalSteps - 4
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }
                color={
                  visibleStepStart === totalSteps - 4 ? '#dadada' : 'white'
                }
                icon={faAngleRight}
                onClick={() => {
                  // (totalSteps-4) used to make sure 5 steps are visible every time
                  if (visibleStepStart !== totalSteps - 4)
                    setVisibleStepStart(visibleStepStart + 1)
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-3 md:mt-0 ml-2 mr-3">
            <div className="bg-white py-0.5 px-0.5 my-2">
              <button
                className="py-2 px-2 bg-red-850 hover:bg-blue-850 text-white text-sm md:text-lg lg:text-xl w-max"
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
