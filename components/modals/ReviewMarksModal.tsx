import { ReviewMarksType } from '../../types'

type Props = {
  reviewMarks: ReviewMarksType[string]
}

export default function ReviewMarksModal({ reviewMarks }: Props) {
  return (
    <div className="absolute top-0 left-0 z-50">
      <div className="hidden navgroup-box w-fit p-8">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white justify-center">
          {/*header*/}
          <div className="flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-2xl text-red-850 text-center rounded-3xl ">
              Review Marks
            </h3>
          </div>
          {/*body*/}
          <div className="px-5">
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Educational Qualifications (Out of{' '}
                {process.env.NEXT_PUBLIC_REVIEW_ACADEMIC_MAX_MARKS})
              </p>
              <p className="sm:text-lg font-bold">
                {reviewMarks.totalAcademicMarks}
              </p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Academic / Curricular Activities (Out of{' '}
                {process.env.NEXT_PUBLIC_REVIEW_CURRICULAR_MAX_MARKS})
              </p>
              <p className="sm:text-lg font-bold">
                {reviewMarks.curricularMarks}
              </p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Extracurricular Activities (Out of{' '}
                {process.env.NEXT_PUBLIC_REVIEW_EXTRACURRICULAR_MAX_MARKS})
              </p>
              <p className="sm:text-lg font-bold">
                {reviewMarks.extracurricularMarks}
              </p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Essay-Type Questions (Out of{' '}
                {Number(process.env.NEXT_PUBLIC_REVIEW_SOP_MAX_MARKS) * 5})
              </p>
              <p className="sm:text-lg font-bold">
                {reviewMarks.totalSOPMarks}
              </p>
            </div>
            <div className="flex justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Total Marks (Out of 100)
              </p>
              <p className="sm:text-lg font-bold">{reviewMarks.totalMarks}</p>
            </div>
            <div className="flex items-center justify-between space-x-5 my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Remark
              </p>
              <div className="w-3/4">
                <p className="sm:text-sm text-justify font-bold whitespace-normal">
                  {reviewMarks.remark}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
