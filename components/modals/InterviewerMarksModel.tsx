import { useEffect, useState } from 'react'
import { InterviewMarksType, InterviewerInstructionsType } from '../../types'
import { getInterviewerInstructions } from '../../pages/api/instructions'

type Props = {
  interviewMarks: InterviewMarksType[string]
}

export default function InterviewMarksModal({ interviewMarks }: Props) {
  const [instructions, setInstructions] = useState<InterviewerInstructionsType>(
    {},
  )

  useEffect(() => {
    getInterviewerInstructions()
      .then((data) => setInstructions(data))
      .catch(() => alert('Not able to fetch instructions, Try reloading!'))
  }, [])

  return (
    <div className="absolute top-0 left-0 z-50">
      <div className="hidden navgroup-box w-fit p-8">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white justify-center">
          {/*header*/}
          <div className="flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-2xl text-red-850 text-center rounded-3xl ">
              Interview Marks
            </h3>
          </div>
          {/*body*/}
          <div className="px-5">
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Motivation for Higher Studies (Out of{' '}
                {instructions.HIGHER_STUDIES_MOTIVATION})
              </p>
              <p className="sm:text-lg font-bold">
                {interviewMarks.higherStudiesMotivation}
              </p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Communication (Out of {instructions.COMMUNICATION})
              </p>
              <p className="sm:text-lg font-bold">
                {interviewMarks.communication}
              </p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Research Aptitude (Out of {instructions.RESEARCH_APTITUDE})
              </p>
              <p className="sm:text-lg font-bold">
                {interviewMarks.researchAptitude}
              </p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Motivation to Go Back (Out of{' '}
                {instructions.MOTIVATION_TO_GO_BACK})
              </p>
              <p className="sm:text-lg font-bold">
                {interviewMarks.motivationToGoBack}
              </p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Total Marks (Out of 100)
              </p>
              <p className="sm:text-lg font-bold">
                {interviewMarks.totalMarks}
              </p>
            </div>
            <div className="flex items-center justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Remark
              </p>
              <div className="w-3/4">
                <p className="sm:text-sm text-justify font-bold whitespace-normal">
                  {interviewMarks.remark}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
