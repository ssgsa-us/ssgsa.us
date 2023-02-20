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
          <p className="my-5 text-lg text-blue-850">
            Please go through the attached rubric thoroughly before reviewing
            the applications.
          </p>
          <p className="my-5 text-lg text-blue-850">
            Please verify the aggregate percentages from the student marksheets.
            If inconsistency is observed, consider the aggregate percentage from
            your own calculation.
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
            <Link href={process.env.NEXT_PUBLIC_REVIEWER_RUBRIC_URL || ''}>
              <a className="text-white text-lg py-2 px-4 my-10 rounded-3xl bg-red-850">
                Download the Rubric here
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 rounded-xl py-5 px-3 sm:py-5 sm:px-10 lg:px-32 my-8">
        <p className="mx-auto font-black text-md text-red-850 text-center mt-1">
          Sponsor a student
        </p>
        <div className="grid grid-cols-7 gap-1">
          <div className="col-start-3 col-span-2">
            <a
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MYCSXB9B4ENP6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-10 py-1 block mx-auto bg-red-850 text-sm font-black text-white text-center rounded-3xl mt-2">
                PayPal/Credit Card
              </button>
            </a>
          </div>
          <div className="col-start-5 col-span-1">
            <a
              href="https://account.venmo.com/u/SSGSA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-10 py-1 block mx-auto bg-red-850 text-sm font-black text-white text-center rounded-3xl mt-2">
                Venmo
              </button>
            </a>
          </div>
        </div>
        <p className="text-sm mt-3 text-center text-blue-850">
          By supporting students, you are becoming an active participant in
          building their careers. All donations and contributions directly
          sponsor the attempts of talented students to secure admission in an
          MS/PhD program at a university of international repute. You can easily
          cancel or upgrade your contribution at any time.
        </p>
      </div>
    </ReviewerLayout>
  )
}

export default requireAuth(ReviewerPortal, Roles.REVIEWER)
