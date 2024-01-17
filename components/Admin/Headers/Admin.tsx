import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import logo from '../../../public/logo.png'

export default function AdminHeader() {
  const [active, setActive] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setActive(!active)
  }

  return (
    <nav className="sm:sticky top-0 z-50 bg-red-850">
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
      <div className="mx-2 md:mx-5 lg:mx-10 px-4">
        <div className="md:hidden flex justify-between">
          <div className="text-white m-1 text-xl font-bold">SSGSA Admin</div>

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
            active ? 'py-1 md:py-0' : 'hidden'
          } md:flex md:justify-between `}
        >
          <div className="flex w-full space-x-2">
            <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:space-x-1">
              <div
                className={`md:flex md:flex-col md:justify-center h-full hover:bg-blue-850 ${
                  router.pathname == '/admin' && 'bg-blue-850'
                }`}
              >
                <Link href="/admin">
                  <a className="py-4 px-2 text-white text-sm">HOME</a>
                </Link>
              </div>
              <div
                className={`group h-full hover:bg-blue-850 ${
                  router.pathname == '/admin/applications' && 'bg-blue-850'
                }`}
              >
                <div className="md:flex md:flex-col md:justify-center md:h-full">
                  <a className="py-4 px-2 text-white text-sm cursor-pointer">
                    APPLICATIONS
                  </a>
                </div>

                <div className="flex-col md:absolute md:top-full bg-red-850 md:bg-gray-200 hidden group-hover:flex w-auto">
                  <Link href="/admin/applications/partial">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Partial Applications
                    </a>
                  </Link>
                  <Link href="/admin/applications/completed">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Completed Applications
                    </a>
                  </Link>
                  <Link href="/admin/applications/finalised-for-review">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Applications Finalised for Review
                    </a>
                  </Link>
                  <Link href="/admin/applications/reviewed">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Reviewed Applications
                    </a>
                  </Link>
                  <Link href="/admin/applications/finalised-for-interview">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Applications Finalised for Interview
                    </a>
                  </Link>
                  <Link href="/admin/applications/interviewed">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Interviewed Applications
                    </a>
                  </Link>
                </div>
              </div>
              <div
                className={`group h-full hover:bg-blue-850 ${
                  router.pathname == '/admin/reviewers' && 'bg-blue-850'
                }`}
              >
                <div className="md:flex md:flex-col md:justify-center md:h-full">
                  <a className="py-4 px-2 text-white text-sm cursor-pointer">
                    REVIEWERS
                  </a>
                </div>

                <div className="flex-col md:absolute md:top-full bg-red-850 md:bg-gray-200 hidden group-hover:flex w-auto">
                  <Link href="/admin/reviewers">
                    <a className="px-4 md:pr-16 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      List
                    </a>
                  </Link>
                  <Link href="/admin/reviewers/invite">
                    <a className="px-4 md:pr-16 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Invite
                    </a>
                  </Link>
                </div>
              </div>
              <div
                className={`group h-full hover:bg-blue-850 ${
                  router.pathname == '/admin/interviewers' && 'bg-blue-850'
                }`}
              >
                <div className="md:flex md:flex-col md:justify-center md:h-full">
                  <a className="py-4 px-2 text-white text-sm cursor-pointer">
                    INTERVIEWERS
                  </a>
                </div>

                <div className="flex-col md:absolute md:top-full bg-red-850 md:bg-gray-200 hidden group-hover:flex w-auto">
                  <Link href="/admin/interviewers">
                    <a className="px-4 md:pr-20 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      List
                    </a>
                  </Link>
                  <Link href="/admin/interviewers/invite">
                    <a className="px-4 md:pr-20 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Invite
                    </a>
                  </Link>
                </div>
              </div>
              <div
                className={`group h-full hover:bg-blue-850 ${
                  router.pathname == '/admin/constants' && 'bg-blue-850'
                }`}
              >
                <div className="md:flex md:flex-col md:justify-center md:h-full">
                  <a className="py-4 px-2 text-white text-sm cursor-pointer">
                    CONSTANTS
                  </a>
                </div>

                <div className="flex-col md:absolute md:top-full bg-red-850 md:bg-gray-200 hidden group-hover:flex w-auto">
                  <Link href="/admin/constants/awardees">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Awardees
                    </a>
                  </Link>
                  <Link href="/admin/constants/members">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Members
                    </a>
                  </Link>
                  <Link href="/admin/constants/monthStories">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Month Stories
                    </a>
                  </Link>
                  <Link href="/admin/constants/newsletters">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Newsletters
                    </a>
                  </Link>
                  <Link href="/admin/constants/successful-scholars">
                    <a className="px-4 md:py-4 md:px-2 text-white md:text-blue-850 hover:bg-blue-850 hover:text-white text-sm">
                      Successful Scholars
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
