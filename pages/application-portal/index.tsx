import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Roles from '../../constants/roles'
import { useAuth } from '../../context/AuthUserContext'
import PortalLayout from '../../layouts/application-portal'

export default function Portal() {
  const { authUser, loading } = useAuth()
  const router = useRouter()
  const [firstCheck, setFirstCheck] = useState<boolean>(false)
  const [secondCheck, setSecondCheck] = useState<boolean>(false)
  const [thirdCheck, setThirdCheck] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    if (!loading && authUser && authUser.email) {
      // If authUser is applicant, then he/she should have read the rules
      if (authUser.role === Roles.APPLICANT) {
        setFirstCheck(true)
        setSecondCheck(true)
        setThirdCheck(true)
      } else {
        router.push('/404')
      }
    }
  }, [loading, authUser])

  const proceed = () => {
    setError('')
    if (firstCheck && secondCheck && thirdCheck) {
      router.push('/application-portal/application')
    } else setError('Please check eligibility criteria first.')
  }

  return (
    <PortalLayout>
      <div className="my-10 mx-10 sm:mx-20 lg:mx-28 xl:mx-40">
        <div className="mb-10">
          {new Date() <
          new Date(process.env.NEXT_PUBLIC_APPLICATION_START_DATE) ? (
            <div className="bg-red-200 text-2xl text-red-850 text-center font-bold rounded-3xl p-2 pl-6 mb-5">
              Application has not started yet. Please check eligibility criteria
              and be ready with your documents.
            </div>
          ) : new Date() >
            new Date(process.env.NEXT_PUBLIC_APPLICATION_END_DATE) ? (
            <div className="bg-red-200 text-2xl text-red-850 text-center font-bold rounded-3xl p-2 pl-6 mb-5">
              We are no longer accepting applications for the session 2022-23.
              The deadline was{' '}
              {new Date(process.env.NEXT_PUBLIC_APPLICATION_END_DATE)
                .toString()
                .slice(0, 25)}{' '}
              (IST).
            </div>
          ) : null}
        </div>
        <div className="mb-10">
          <h1 className="text-2xl text-center text-blue-850 font-black">
            Eligibility Criteria
          </h1>

          <h3 className="my-2">
            Check your eligibility criteria, and proceed to application form if
            you are completing below mentioned points:
          </h3>
          <div className="pl-5 my-2 font-semibold">
            <div
              className={`flex items-center border-4 p-2 ${
                firstCheck ? 'border-green-800' : 'border-red-850'
              } rounded-2xl`}
            >
              <input
                checked={firstCheck}
                onClick={() => setFirstCheck(!firstCheck)}
                type="checkbox"
                className="my-5 text-lg"
              />
              <label className="pl-5 text-blue-850">
                I am currently enrolled at Aligarh Muslim University or an
                Alumna/Alumnus{' '}
                <span className="text-xs">
                  (Students who have completed Senior Secondary School,
                  Certificate OR Diploma from AMU are also eligible)
                </span>
              </label>
            </div>
            <br />
            <div
              className={`flex items-center border-4 p-2 ${
                secondCheck ? 'border-green-800' : 'border-red-850'
              } rounded-2xl`}
            >
              <input
                checked={secondCheck}
                onClick={() => setSecondCheck(!secondCheck)}
                type="checkbox"
                className="my-5 text-lg"
              />
              <label className="pl-5 text-blue-850">
                I am registered for the final or penultimate year of a four (or
                more) year Bachelor&apos;s program or have completed the program
                <br />
                <span className="flex justify-center">OR</span>I have completed
                a three year Bachelor&apos;s program and am currently enrolled
                in a Master&apos;s program or have completed the Master&apos;s
                program.
              </label>
            </div>
            <br />
            <div
              className={`flex items-center border-4 p-2 ${
                thirdCheck ? 'border-green-800' : 'border-red-850'
              } rounded-2xl`}
            >
              <input
                checked={thirdCheck}
                onClick={() => setThirdCheck(!thirdCheck)}
                type="checkbox"
                className="my-5 text-lg"
              />
              <label className="pl-5 text-blue-850">
                I understand SSGSA takes plagiarism/forgery seriously and it
                will be severely dealt with. This may lead to disqualification
                of my application
              </label>
            </div>
          </div>

          <p className="mt-5 ">
            Note:{' '}
            <span className="text-sm">
              Be ready with scanned images of original documents supporting your
              academic credentials or your achievements.{' '}
              <span className="text-red-850">
                If you have not scanned your documents, first scan them and
                return later.
              </span>
            </span>
          </p>
        </div>

        <div>
          <h1 className="text-2xl text-center text-blue-850 font-black">
            Instructions
          </h1>
          <ul style={{ listStyleType: 'disc' }} className="pl-5 text-lg">
            <li className="mt-8">
              The application form is divided into 10 parts.
            </li>
            <li className="mt-2">
              You can view a step only after you have successfully completed all
              the preceding steps. However, you can go back to any of the{' '}
              <span className="font-bold text-red-850">completed</span> steps to
              make any changes before final submission.
            </li>
            <li className="text-xl mt-2">
              Questions marked{' '}
              <span className="text-red-850 font-black">*</span> are mandatory.
            </li>
            <li className="mt-2">
              You will be able to save your information at each step. However,
              if you press the back button{' '}
              <span className="font-bold text-red-850">
                without saving your information
              </span>
              , your entered data will be lost.
            </li>
            <li className="mt-2">
              You will be able to review the information entered by you before
              submission of the form.
            </li>
          </ul>
          <p className="mt-10 pl-5 text-lg">
            Your application will be reviewed on the following basis:
          </p>
          <ol style={{ listStyleType: 'number' }} className="pl-10 font-bold">
            <li className="pl-5">Academic Grades</li>
            <li className="pl-5">
              Curricular Activities
              <br />
              <span className="text-sm font-normal">
                Projects, work experience, publications, internships, academic
                awards & recognition, etc.
              </span>
            </li>
            <li className="pl-5">
              Extra-Curricular Activities
              <br />
              <span className="text-sm font-normal">
                Leadership experience, literary and cultural involvement,
                sports, volunteering, social work etc.
              </span>
            </li>
            <li className="pl-5">
              Motivation to study abroad, gauged from Essay-Type Questions.
            </li>
          </ol>
          <p className="pl-5 pt-5 text-sm">
            Note: The SSGSA portal functions best with Google Chrome and Firefox
            browsers. Please watch our{' '}
            <Link href="https://www.youtube.com/watch?v=aNTXrDwlMZE">
              <a className="text-blue-800 underline font-black" target="_blank">
                SSGSA application video tutorial
              </a>
            </Link>{' '}
            in case of any doubt.
          </p>
        </div>

        <div className="flex flex-col items-center">
          {error ? (
            <div className="bg-red-200 rounded-3xl p-2 pl-6 mb-5">
              <p>
                <span className="font-bold">Error:</span> {error}
              </p>
            </div>
          ) : null}
          <button
            className={`text-white text-base md:text-lg py-2 px-4 mt-5 rounded-3xl ${
              new Date() <
                new Date(process.env.NEXT_PUBLIC_APPLICATION_START_DATE) ||
              new Date() >
                new Date(process.env.NEXT_PUBLIC_APPLICATION_END_DATE)
                ? 'bg-red-860 cursor-not-allowed'
                : 'bg-red-850'
            }`}
            onClick={
              new Date() <
                new Date(process.env.NEXT_PUBLIC_APPLICATION_START_DATE) ||
              new Date() >
                new Date(process.env.NEXT_PUBLIC_APPLICATION_END_DATE)
                ? null
                : proceed
            }
          >
            Proceed to the Application Form
          </button>
        </div>
      </div>
      <p className="text-sm text-center mx-5 sm:mx-10 lg:mx-20">
        If you encounter any error during application process, please contact us
        at <a className="text-blue-800 font-black">contact@ssgsa.us</a> or{' '}
        <a className="text-blue-800 font-black">developers@ssgsa.us</a>,
        describing your problem{' '}
        <span className="text-red-850">with a screenshot of the error</span>
      </p>
    </PortalLayout>
  )
}
