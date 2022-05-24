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
            <h2 className="my-5 text-2xl font-bold">Points Rubric</h2>
            <p className="my-5 text-lg text-blue-850">
              Each panelist is required to award points to the candidate being
              interviewed based on the following rubric:
            </p>
            <p className="my-5 text-lg font-bold italic">
              Technical questions (30 points)
            </p>
            <p className="my-5 text-lg text-blue-850">
              Candidate&apos;s knowledge about their field of study.
              Specifically, please try to assess fundamental concepts of their
              subject which would be critical for them in their higher studies.
            </p>
            <p className="my-5 text-lg font-bold italic">
              Language and clarity of thought (20 points)
            </p>
            <p className="my-5 text-lg text-blue-850">
              Basic English language proficiency/fluency. Specifically, please
              try to assess if they are equipped to prepare their application
              package and appear for an interview with their prospective
              supervisor without major flaws in language. However, it does not
              mean that any special literary/oratory skills have to be rewarded.
            </p>
            <p className="my-5 text-lg font-bold italic">
              Motivation for higher studies (40 points)
            </p>
            <p className="my-5 text-lg text-blue-850">
              Candidate&apos;s motivation for higher studies abroad. We
              encourage you to probe the students in detail about their plans.
              Specifically, please try to figure out where higher education
              abroad stands in their priority list as opposed to taking up
              alternate career options upon completion of their current degree.
              Motivation also gauges their genuine love for the subject instead
              of a wish to travel abroad or getting this scholarship just for
              improving their CVs. Please do your best to assess if they will be
              able to persevere in the arduous process of the applications, and
              later the grad school.
            </p>
            <p className="my-5 text-lg font-bold italic">
              Overall personality (10 points)
            </p>
            <p className="my-5 text-lg text-blue-850">
              This is a bit of an open-ended section to reward any unique
              quality that you may observe in the candidate. As the name of this
              category implies, please gauge the personality of the candidate on
              an all-round basis.
            </p>
            <h2 className="mt-10 mb-5 text-2xl font-bold">Recording Points</h2>
            <p className="my-5 text-lg text-blue-850">
              After interviewing each candidate, each panelist is expected to
              record the points based on their own impartial and rational
              judgment of the candidate's aforementioned abilities. To this end,
              use our web-portal where you can easily enter and record the
              points. This has been already discussed in item-2: Candidate
              Background. We recommend you to record the points on an excel
              sheet or a piece of paper, as a backup.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-96" />
      )}
    </InterviewerLayout>
  )
}
