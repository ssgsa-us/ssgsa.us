import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Interviewer } from '../../classes/interviewer'
import { auth } from '../../firebase'
import InterviewerLayout from '../../layouts/interviewer/interviewer-layout'
import { getInterviewerDetails } from '../api/getInterviewerDetails'

export default function InterviewerPortal() {
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/interviewer/signin')
      else {
        getInterviewerDetails(auth.currentUser.email)
          .then((interviewerData: Interviewer) => {
            if (interviewerData) setPageReady(true)
            else router.push('/404')
          })
          .catch(() => alert('Try again, network error!'))
      }
    })
  }, [])

  return (
    <InterviewerLayout>
      {pageReady ? (
        <div>
          <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
            Instructions
          </h1>
          <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 lg:px-32 my-10">
            <p className="my-5 text-lg text-blue-850">
              Please go through the attached rubric thoroughly before reviewing
              the applications.
            </p>
            <p className="my-5 text-lg text-blue-850">
              Please verify the aggregate percentages from the student
              marksheets. If inconsistency is observed, consider the aggregate
              percentage from your own calculation.
            </p>
            <p className="my-5 text-lg text-blue-850">
              The rubric has built-in formulas for various categories and a
              guideline on probable grades.{' '}
              <span className="text-red-850">
                Please try to follow the guidelines to ensure the equitable and
                unbiased evaluation of the applications.
              </span>
            </p>
            <div className="flex justify-center">
              <Link href={process.env.NEXT_PUBLIC_REVIEWER_RUBRIC_URL}>
                <a className="text-white text-lg py-2 px-4 my-10 rounded-3xl bg-red-850">
                  Download the Rubric here
                </a>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-96" />
      )}
    </InterviewerLayout>
  )
}
