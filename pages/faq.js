import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import MainLayout from '../layouts/Main'

export default function Home() {
  const [index, setIndex] = useState(0)

  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex justify-center">
        <div>
          <h1 className="mb-8 bg-blue-850 text-xl sm:text-xl lg:text-2xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
            Frequently Asked Questions
          </h1>

          <div className="flex flex-col">
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 1 ? setIndex(0) : setIndex(1))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  What is the eligibility criteria to apply for the SSGSA award?
                </p>
                {index == 1 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 1}
              >
                <ul
                  style={{ listStyle: 'disc' }}
                  className="text-sm sm:text-base text-white ml-5"
                >
                  <li className="my-2">
                    You have completed or enrolled in at least one of the
                    degrees (High School/Senior
                    Secondary/Diploma/Bachelor/Master) from Aligarh Muslim
                    University.
                  </li>
                  <li className="my-2">
                    You are currently registered for the final or penultimate
                    year of a four (or more) years&apos; bachelor&apos;s
                    program.
                    <br />
                    <span className="flex justify-center">OR</span>
                    You have finished a three-year Bachelor&apos;s degree and
                    enrolled in the first year of a Master&apos;s program.
                  </li>
                  <li className="my-2">
                    You wish to apply for a Master&apos;s or PhD degree at a
                    university of international repute outside India within the
                    next 2 academic years.
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 2 ? setIndex(0) : setIndex(2))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  I am a final year student of a 3-year undergraduate degree
                  program, can I apply this year? If not, why?
                </p>
                {index == 2 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 2}
              >
                <p className="text-sm sm:text-base text-white">
                  No, you cannot apply this year because most universities in
                  the United States require a minimum of 4 years of
                  university-level education for their graduate programs. You
                  can satisfy this requirement by continuing your education
                  after the final year of your 3-year undergraduate program by
                  enrolling in a master&apos;s program. We encourage you to
                  apply for SSGSA next year when you are enrolled in the first
                  year of your master&apos;s degree.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 3 ? setIndex(0) : setIndex(3))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  What are the documents I need to attach to the application?
                </p>
                {index == 3 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 3}
              >
                <ul
                  style={{ listStyle: 'disc' }}
                  className="text-sm sm:text-base text-white ml-5"
                >
                  <li className="my-2">
                    Marksheets of all your Bachelor&apos;s and Master&apos;s
                  </li>
                  <li className="my-2">
                    Certificates of any of your achievement
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 4 ? setIndex(0) : setIndex(4))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  Is there a minimum CGPA requirement to apply for SSGSA?
                </p>
                {index == 4 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 4}
              >
                <p className="text-sm sm:text-base text-white">
                  No, there is no minimum CGPA or percentage to apply.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 5 ? setIndex(0) : setIndex(5))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  Is it necessary to have an internship or research experience
                  to apply for SSGSA?
                </p>
                {index == 5 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 5}
              >
                <p className="text-sm sm:text-base text-white">
                  No, it is not necessary to have any prior experience but it is
                  encouraged to have one.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 6 ? setIndex(0) : setIndex(6))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  What achievements can be considered curricular achievements?
                </p>
                {index == 6 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 6}
              >
                <p className="text-sm sm:text-base text-white">
                  All academic achievements like internships, summer school,
                  poster presentations, scholarships, academic awards, etc are
                  curricular in nature.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 7 ? setIndex(0) : setIndex(7))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  What achievements can be considered extra-curricular
                  achievements?
                </p>
                {index == 7 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 7}
              >
                <p className="text-sm sm:text-base text-white">
                  All non-academic achievements such as student organizations
                  and competitions, projects, volunteering work, leadership
                  roles, sports, etc are supposed to be co-curricular.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 8 ? setIndex(0) : setIndex(8))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  How long does it take to get the applications reviewed?
                </p>
                {index == 8 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 8}
              >
                <p className="text-sm sm:text-base text-white">
                  It will usually take a month depending on the number of
                  applications we receive.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 9 ? setIndex(0) : setIndex(9))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  How does an application is reviewed by SSGSA?
                </p>
                {index == 9 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 9}
              >
                <p className="text-sm sm:text-base text-white">
                  A group of panelists thoroughly review each application and
                  then around 5-10 % of the applicants get shortlisted for an
                  interview.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 10 ? setIndex(0) : setIndex(10))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  Are there any limitations on how many times I can apply for
                  SSGSA?
                </p>
                {index == 10 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 10}
              >
                <p className="text-sm sm:text-base text-white">
                  No, currently there are no limitations on how many times you
                  can apply.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 11 ? setIndex(0) : setIndex(11))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  What criteria are used to select candidates in the interview
                  stage?
                </p>
                {index == 11 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 11}
              >
                <p className="text-sm sm:text-base text-white">
                  The interviewers look for three basic aspects: technical
                  knowledge, motivation to study abroad, and overall
                  personality.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => (index == 12 ? setIndex(0) : setIndex(12))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  Who will be on the interview panel?
                </p>
                {index == 12 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 12}
              >
                <p className="text-sm sm:text-base text-white">
                  Each panel usually includes Professors from different US
                  Universities, working individuals in US, and our past senior
                  scholars.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-red-850 cursor-pointer"
                onClick={() => (index == 13 ? setIndex(0) : setIndex(13))}
              >
                <p className="font-bold text-sm sm:text-base w-11/12">
                  How many total students have been selected every year?
                </p>
                {index == 13 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    width={25}
                    className="ml-2 text-red-850"
                  />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 13}
              >
                <p className="text-sm sm:text-base text-white">
                  We usually select 25-30 students every year depending on the
                  available funds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
