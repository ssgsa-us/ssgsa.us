type InterviewMarks = {
  A: number
  B: number
  C: number
  D: number
  remark: string
}

type Props = {
  interviewMarks: InterviewMarks
}

export default function InterviewMarksModal({ interviewMarks }: Props) {
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
                {process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_A} (Out of{' '}
                {process.env.NEXT_PUBLIC_INTERVIEW_INDEX_A_MAX_MARKS})
              </p>
              <p className="sm:text-lg font-bold">{interviewMarks.A}</p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                {process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_B} (Out of{' '}
                {process.env.NEXT_PUBLIC_INTERVIEW_INDEX_B_MAX_MARKS})
              </p>
              <p className="sm:text-lg font-bold">{interviewMarks.B}</p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                {process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_C} (Out of{' '}
                {process.env.NEXT_PUBLIC_INTERVIEW_INDEX_C_MAX_MARKS})
              </p>
              <p className="sm:text-lg font-bold">{interviewMarks.C}</p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                {process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_D} (Out of{' '}
                {process.env.NEXT_PUBLIC_INTERVIEW_INDEX_D_MAX_MARKS})
              </p>
              <p className="sm:text-lg font-bold">{interviewMarks.D}</p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Total Marks (Out of{' '}
                {Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_A_MAX_MARKS) +
                  Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_B_MAX_MARKS) +
                  Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_C_MAX_MARKS) +
                  Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_D_MAX_MARKS)}
                )
              </p>
              <p className="sm:text-lg font-bold">
                {interviewMarks.A +
                  interviewMarks.B +
                  interviewMarks.C +
                  interviewMarks.D}
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
