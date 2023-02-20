import Link from 'next/link'
import Image from 'next/image'
import { useState, SetStateAction, Dispatch } from 'react'
import logo from '../../public/logo.png'
import { useAuth } from '../../context/AuthUserContext'
import StepNavigator from '../StepNavigator'

type Props = {
  status: number
  formStatus: number
  setStatus: Dispatch<SetStateAction<number>>
}

// Making header as dynamic for showing steps coming in stepsData
// Used in application header on application and reviewer portal
// Only showing five step at a time in header
export default function ReviewerApplHeader({
  status,
  formStatus,
  setStatus,
}: Props) {
  const { signOut } = useAuth()
  // Burger button variable to show mobile navigation.
  const [mobNavActive, setMobNavActive] = useState(false)
  // Burger button variable to show instructions and all applications.
  const [webNavActive, setWebNavActive] = useState(false)

  const mobNavClick = () => {
    setMobNavActive(!mobNavActive)
  }
  const webNavClick = () => {
    setWebNavActive(!webNavActive)
  }

  return (
    <nav className="sticky top-0 z-50 bg-red-850">
      <div className="w-full flex flex-row bg-white items-center flex">
        <div className="flex-1 text-lg sm:text-xl md:text-2xl justify-center px-4 my-4 lg:ml-32 flex items-center font-black text-red-850 ">
          SIR SYED GLOBAL SCHOLAR AWARD
        </div>
        <div className="mr-3 md:mr-10 flex-2">
          <Link href="/">
            <Image width={60} height={60} src={logo} alt="SSGSA Logo" />
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
              onClick={mobNavClick}
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
            mobNavActive ? 'pt-1 pb-3 md:py-0' : 'hidden'
          } md:flex md:justify-between relative px-2 lg:px-5`}
        >
          <div className="flex items-center mr-2">
            <button
              className="mobile-menu-button hover:bg-red-500 text-white"
              onClick={webNavClick}
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

          <div
            className={`hidden ${
              webNavActive
                ? 'md:flex md:flex-col absolute top-0 left-1 bg-blue-850 rounded p-5 pl-4'
                : ''
            }`}
          >
            <div className="flex items-center mr-2 mb-full">
              <button
                className="mobile-menu-button hover:bg-red-500 text-white"
                onClick={webNavClick}
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
            <div className="pt-5 text-white pl-2 flex flex-col ">
              <Link href="/reviewer">
                <a> Instructions </a>
              </Link>
              <Link href="/reviewer/applications">
                <a> All Applications </a>
              </Link>
            </div>
          </div>

          <StepNavigator
            status={status}
            formStatus={formStatus}
            setStatus={setStatus}
            stepsData={[
              'Personal Information',
              'Educational Qualifications',
              'Curricular Activities',
              'Extracurricular Activities',
              'Essay-Type Questions',
              'Other Information',
              'Review Marks',
              'Completed',
            ]}
          />
          <div className="flex items-center justify-center mt-3 md:mt-0 ml-2">
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
