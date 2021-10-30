import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link"
import { useState } from "react"
import MainLayout from '../layouts/Main'

export default function Home() {
  const [index, setIndex] = useState(0)

  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex justify-center">
        <div>
          <h1
            className="mb-8 bg-blue-850 text-xl sm:text-2xl lg:text-3xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl"
          >
            Frequently Asked Questions
          </h1>

          <div className="flex flex-col">
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => index == 1 ? setIndex(0) : setIndex(1)}
              >
                <p className="font-bold text-sm sm:text-base">What is SSGSA?</p>
                { index == 1 ? (
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size='lg' className='ml-2 text-red-850' />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size='lg' className='ml-2 text-red-850' />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 1}
              >
                <p className="text-sm sm:text-base text-white">
                  SSGSA (Sir Syed Global Scholar Award, run by AMU alumni based
                  in USA) is an award given to successful applicants towards
                  their expenses for GRE, TOEFL and five university
                  applications fees along with the mentorship throughout the
                  application process.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => index == 2 ? setIndex(0) : setIndex(2)}
              >
                <p className="font-bold text-sm sm:text-base">
                  When are the applications due and how long does it take to
                  get the applications reviewed?
                </p>
                { index == 2 ? (
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size='lg' className='ml-2 text-red-850' />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size='lg' className='ml-2 text-red-850' />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 2}
              >
                <p className="text-sm sm:text-base text-white">
                  SSGSA application portal opens every Academic Year in the
                  month of February.
                  <br />
                  Generally, the application deadline is somewhere around
                  mid-March (but could vary every year) and the review process
                  gets finished by May.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => index == 3 ? setIndex(0) : setIndex(3)}
              >
                <p className="font-bold text-sm sm:text-base">
                  What is the eligibility criteria to apply for SSGSA award?
                </p>
                { index == 3 ? (
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size='lg' className='ml-2 text-red-850' />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size='lg' className='ml-2 text-red-850' />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 3}
              >
                <ul style={{ listStyle: "disc" }} className="text-sm sm:text-base text-white ml-5">
                  <li>You have to be a student or an alumnus of AMU.</li>
                  <li>
                    You will have to be enrolled in at least a 4+ years of
                    Undergraduate program (after 12th grade).
                  </li>
                  <li>
                    For applicants currently with a three years&apos; bachelor&apos;s
                    degree, you have to be already enrolled in a Master&apos;s
                    program inorder to be eligible for the award.
                  </li>
                  <li>
                    For more information, check the details
                    <Link href="/"><a className="text-blue-400"> here</a></Link>.
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => index == 4 ? setIndex(0) : setIndex(4)}
              >
                <p className="font-bold text-sm sm:text-base">
                  I already graduated from AMU and am currently a working
                  professional. I already have a GRE and TOEFL score. Can I get
                  my SOP reviewed by the SSGSA team?
                </p>
                { index == 4 ? (
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size='lg' className='ml-2 text-red-850' />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size='lg' className='ml-2 text-red-850' />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 4}
              >
                <p className="text-sm sm:text-base text-white">
                  Sure. You can forward your request to
                  <span className="text-blue-400 cursor-pointer">
                    &nbsp; contact@ssgsa.us
                  </span>
                  , or you can send a personalized message through SSGSA&apos;s
                  contact page.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => index == 5 ? setIndex(0) : setIndex(5)}
              >
                <p className="font-bold text-sm sm:text-base">
                  I am a final year student of a 3-year undergraduate degree
                  program, can I apply this year? If not, why?
                </p>
                { index == 5 ? (
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size='lg' className='ml-2 text-red-850' />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size='lg' className='ml-2 text-red-850' />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 5}
              >
                <p className="text-sm sm:text-base text-white">
                  No, you cannot apply this year because most of the
                  universities in the United States require a minimum of 4
                  years of university level education for their graduate
                  programs. Given that you are three years away from the
                  admission, availing this award in the final year of your
                  3-year undergraduate program would not benefit you immediately
                  for you would still have to wait to get your masters degree in
                  order to be eligible for admissions abroad. We encourage you
                  to apply for SSGSA next year when you are enrolled in the
                  first year of your masters degree.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => index == 6 ? setIndex(0) : setIndex(6)}
              >
                <p className="font-bold text-sm sm:text-base">
                  What are the documents I need to attach with the application?
                </p>
                { index == 6 ? (
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size='lg' className='ml-2 text-red-850' />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size='lg' className='ml-2 text-red-850' />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 6}
              >
                <ul style={{ listStyle: "disc" }} className="text-sm sm:text-base text-white ml-5">
                  <li>Your curriculum vitae.</li>
                  <li>
                    Attested copies of your marksheets from 10th standard
                    onwards. It should include Grade 12, Bachelor&apos;s and
                    Master&apos;s (NET, GATE scores if already taken)
                  </li>
                  <li>
                    Attested copies of certificates of any of your achievements
                  </li>
                  <li>
                    Some essay based questions asked in the application form.
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => index == 7 ? setIndex(0) : setIndex(7)}
              >
                <p className="font-bold text-sm sm:text-base">
                  I want to apply for the Summer Internship (ISRA). What are
                  the requirements for this program?
                </p>
                { index == 7 ? (
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size='lg' className='ml-2 text-red-850' />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size='lg' className='ml-2 text-red-850' />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 7}
              >
                <p className="text-sm sm:text-base text-white">
                  ISRA (International Summer Research Award) is completely a
                  different program than SSGSA.
                  <br />
                  Through ISRA, motivated and eligible candidates enrolled at
                  AMU are placed in Summer Research Internship Programs
                  globally. Though we are not currently taking applications for
                  ISRA, you can write to us at
                  <span className="text-blue-400 cursor-pointer">
                    &nbsp; contact@ssgsa.us &nbsp;
                  </span>
                  for more information and current status of the program.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => index == 8 ? setIndex(0) : setIndex(8)}
              >
                <p className="font-bold text-sm sm:text-base">
                  After I become a successful SSGSA awardee, how long will the
                  award remain valid?
                </p>
                { index == 8 ? (
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size='lg' className='ml-2 text-red-850' />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size='lg' className='ml-2 text-red-850' />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 8}
              >
                <p className="text-sm sm:text-base text-white">
                  Generally the award remains valid for Two years after you
                  have become an awardee.
                  <br />
                  For example, if you are a 2021 batch of SSGSA awardees, your
                  award will terminate in 2023, 2 years from the date of the
                  award.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-b-0 border-red-850 cursor-pointer"
                onClick={() => index == 9 ? setIndex(0) : setIndex(9)}
              >
                <p className="font-bold text-sm sm:text-base">Who can I consider a referee?</p>
                { index == 9 ? (
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size='lg' className='ml-2 text-red-850' />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size='lg' className='ml-2 text-red-850' />
                )}
              </div>
              <div
                id="answer"
                className="bg-red-850 pl-3 py-3 pr-12"
                hidden={index != 9}
              >
                <p className="text-sm sm:text-base text-white">
                  Anyone who has been involved in a professional relationship
                  with the scholar.
                  <br />
                  Examples are your manager (past or current) if you&apos;re working,
                  your teachers at the university level (professors or lecturers),
                  or any others including coaches and mentors etc. Please
                  refrain from using connections as your referees whom you do
                  not know (or have worked with) in any professional capacity.
                  <br />
                  Personal connections like friends and relatives do not
                  qualify as valid referees.
                </p>
              </div>
            </div>
            <div>
              <div
                className="flex justify-between px-3 py-3 border-2 border-red-850 cursor-pointer"
                onClick={() => index == 10 ? setIndex(0) : setIndex(10)}
              >
                <p className="font-bold text-sm sm:text-base">
                  Is there any limitations on how many times I can apply for
                  SSGSA?
                </p>
                { index == 10 ? (
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size='lg' className='ml-2 text-red-850' />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size='lg' className='ml-2 text-red-850' />
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
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
