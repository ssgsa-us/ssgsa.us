import Image from 'next/image'
import { useState } from 'react'
import logo from '../public/logo.png'
import Link from 'next/link'
import { useAuth } from '../context/AuthUserContext'

export default function ApplicationHeader({ status, formStatus, setStatus }) {
  const { signOut } = useAuth()
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(!active)
  }

  return (
    <nav className="sticky top-0 z-50 bg-red-850">
      <div className="w-full flex flex-row bg-white items-center flex">
        <div className="flex-1 text-xl sm:text-2xl md:text-3xl justify-center px-4 my-6 flex items-center font-black text-red-850 ">
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
          <div className="text-white m-1 text-xl font-bold">SSGSA</div>

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
          <div className="flex flex-col w-full md:flex-row md:justify-center">
            <div className="bg-white pt-0.5 md:pt-0 md:pl-0.5">
              <button
                className={`py-2 px-2 text-white flex md:flex-col md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer ${
                  formStatus >= 1
                    ? status == 1
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                    : 'bg-red-860 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (formStatus >= 1) setStatus(1)
                }}
              >
                <p className="text-sm md:text-lg lg:text-2xl">Step 1</p>
                <p className="text-sm md:text-xs lg:text-sm">
                  Personal Information
                </p>
              </button>
            </div>
            <div className="bg-white pt-0.5 md:pt-0 md:pl-0.5">
              <button
                className={`py-2 px-2 text-white flex md:flex-col md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer ${
                  formStatus >= 2
                    ? status == 2
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                    : 'bg-red-860 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (formStatus >= 2) setStatus(2)
                }}
              >
                <p className="text-sm md:text-lg lg:text-2xl">Step 2</p>
                <p className="text-sm md:text-xs lg:text-sm">Qualifications</p>
              </button>
            </div>
            <div className="bg-white pt-0.5 md:pt-0 md:pl-0.5">
              <button
                className={`py-2 px-2 text-white flex md:flex-col md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer ${
                  formStatus >= 3
                    ? status == 3
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                    : 'bg-red-860 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (formStatus >= 3) setStatus(3)
                }}
              >
                <p className="text-sm md:text-lg lg:text-2xl">Step 3</p>
                <p className="text-sm md:text-xs lg:text-sm">
                  Written Responses
                </p>
              </button>
            </div>
            <div className="bg-white pt-0.5 md:pt-0 md:pl-0.5">
              <button
                className={`py-2 px-2 text-white flex md:flex-col md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer ${
                  formStatus >= 4
                    ? status == 4
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                    : 'bg-red-860 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (formStatus >= 4) setStatus(4)
                }}
              >
                <p className="text-sm md:text-lg lg:text-2xl">Step 4</p>
                <p className="text-sm md:text-xs lg:text-sm">
                  Documents Upload
                </p>
              </button>
            </div>
            <div className="bg-white py-0.5 md:py-0 md:px-0.5">
              <button
                className={`py-2 px-2 text-white flex md:flex-col md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer ${
                  formStatus >= 5
                    ? status == 5 || status == 6
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                    : 'bg-red-860 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (formStatus >= 5) setStatus(5)
                }}
              >
                <p className="text-sm md:text-lg lg:text-2xl">Step 5</p>
                <p className="text-sm md:text-xs lg:text-sm">
                  Review and Submit
                </p>
              </button>
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
