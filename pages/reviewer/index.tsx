import Link from 'next/link'
import requireAuth from '../../components/requireAuth'
import Roles from '../../constants/roles'
import ReviewerLayout from '../../layouts/reviewer/reviewer-layout'

function ReviewerPortal() {
  return (
    <ReviewerLayout>
      <div>
        <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Instructions
        </h1>
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 lg:px-32 my-10">
          <p className="mt-5 mb-2 text-lg">
            The Application will be reviewed on the following basis:
          </p>
          <div className="ml-5 my-2">
            <p className="text-lg font-bold">
              Academic Grades (
              {process.env.NEXT_PUBLIC_REVIEW_ACADEMIC_MAX_MARKS} points)
            </p>
          </div>
          <div className="ml-5 my-2">
            <p className="text-lg font-bold">
              Curricular Activities (
              {process.env.NEXT_PUBLIC_REVIEW_CURRICULAR_MAX_MARKS} points)
            </p>
            <p className="text-lg">
              Projects, work experience, publications, internships, academic
              awards & recognition, etc.
            </p>
          </div>
          <div className="ml-5 my-2">
            <p className="text-lg font-bold">
              Extra-Curricular Activities (
              {process.env.NEXT_PUBLIC_REVIEW_EXTRACURRICULAR_MAX_MARKS} points)
            </p>
            <p className="text-lg">
              Leadership experience, literary and cultural involvement, sports,
              volunteering, social work etc.
            </p>
          </div>
          <div className="ml-5 my-2">
            <p className="text-lg font-bold">
              Essay-Type Question (
              {process.env.NEXT_PUBLIC_REVIEW_SOP_MAX_MARKS} points)
            </p>
            <p className="text-lg">
              Motivation for higher education as gauged from essays.
            </p>
          </div>
          <p className="my-5 text-lg">
            You will find detailed information in each application to help you
            in grading.
          </p>
          <p className="my-5 text-lg">
            <span className="font-bold">Note:</span> If you find any kind of
            plagiarism or misinformation in any of the applications, please
            report to us.
          </p>
          <div className="flex justify-center">
            <Link href={process.env.NEXT_PUBLIC_REVIEWER_RUBRIC_URL || ''}>
              <a className="text-white text-lg py-2 px-4 my-10 rounded-3xl bg-red-850">
                Download the Rubric here
              </a>
            </Link>
          </div>
        </div>
      </div>
    </ReviewerLayout>
  )
}

export default requireAuth(ReviewerPortal, Roles.REVIEWER)
