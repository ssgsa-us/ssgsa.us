import Link from 'next/link'
import { useState, useEffect } from 'react'
import requireAuth from '../../components/requireAuth'
import Roles from '../../constants/roles'
import InterviewerLayout from '../../layouts/interviewer/interviewer-layout'
import { InterviewerInstructionsType } from '../../types'
import { getInterviewerInstructions } from '../api/instructions'

function InterviewerPortal() {
  const [instructions, setInstructions] = useState<InterviewerInstructionsType>(
    {},
  )

  useEffect(() => {
    getInterviewerInstructions()
      .then((data) => setInstructions(data))
      .catch(() => alert('Not able to fetch instructions, Try reloading!'))
  }, [])
  return (
    <InterviewerLayout>
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
            Motivation for higher studies (
            {instructions.HIGHER_STUDIES_MOTIVATION} Points)
          </p>
          <p className="my-5 text-lg font-bold italic">
            Communication Skills ({instructions.COMMUNICATION} Points)
          </p>
          <p className="my-5 text-lg font-bold italic">
            Academic or Research Aptitude ({instructions.RESEARCH_APTITUDE}{' '}
            Points)
          </p>
          <p className="my-5 text-lg font-bold italic">
            Motivation to Give Back ({instructions.MOTIVATION_TO_GO_BACK}{' '}
            Points)
          </p>
          <p className="mt-10 text-lg text-blue-850">
            For detailed instructions, please go through the following slides:
          </p>
          <div className="flex justify-center">
            <Link href={instructions.INTERVIEW_RUBRIC_URL || ''}>
              <a
                className="text-white text-lg py-2 px-4 my-2 rounded-3xl bg-red-850"
                target="_blank"
              >
                Click here for Slides
              </a>
            </Link>
          </div>
          <h2 className="mt-10 mb-5 text-2xl font-bold">Recording Points</h2>
          <p className="my-5 text-lg text-blue-850">
            After interviewing each candidate, each panelist is expected to
            record the points based on their own impartial and rational judgment
            of the candidate&apos;s aforementioned abilities. To this end, use
            our web-portal where you can easily enter and record the points. We
            recommend you to record the points on an excel sheet or a piece of
            paper, as a backup.
          </p>
        </div>
      </div>
    </InterviewerLayout>
  )
}

export default requireAuth(InterviewerPortal, Roles.INTERVIEWER)
