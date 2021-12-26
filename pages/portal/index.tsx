import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../components/Footer'
import logo from '../../public/logo.png'

export default function Portal() {
  return (
    <div>
      <nav className="sticky top-0 z-50">
        <div className="w-full flex flex-row bg-white items-center flex">
          <div className="flex-1 text-xl sm:text-2xl md:text-3xl justify-center px-4 my-6 flex items-center font-black text-red-850 ">
            SIR SYED GLOBAL SCHOLAR AWARD
          </div>
          <div className="mr-3 flex-2">
            <Link href="/">
              <Image width={110} height={110} src={logo} alt="SSGSA Logo" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex w-full bg-red-850 py-16 px-5 items-center justify-center text-white text-3xl sm:text-4xl lg:text-5xl">
        <p className="text-center leading-tight">
          Welcome to the
          <br />
          <span className="font-black">Sir Syed Global Scholar Award</span>
          <br />
          Application Portal
        </p>
      </div>
      <div className="my-10 mx-10 sm:mx-20 lg:mx-28 xl:mx-40">
        <h1 className="text-2xl text-center text-blue-850 font-black">
          Instructions
        </h1>
        <p className="my-5 text-lg">
          The application form is divided into 6 parts.
          <br />
          <br />
          You can view a step only after you have successfully completed all the
          preceding steps. However, you can go back to any of the{' '}
          <span className="underline">completed</span> steps to make any changes
          before final submission.
          <br />
          <br />
          Note that once you submit the application in Step 6, you can still
          edit it before the deadline.
          <br />
          <br />
          Questions marked <span className="text-red-850 font-black">
            *
          </span>{' '}
          are mandatory.
          <br />
          <br />
          Your entered information will be saved after successful completion of
          each step. However, if you go back{' '}
          <span className="underline">without saving your information</span>,
          your entered data may be lost.
          <br />
          <br />
          You will be able to review the information entered by you before
          submission of the form.
          <br />
          <br />
          <span className="text-sm">
            Note: The SSGSA portal functions best with Google Chrome and Firefox
            browsers. Please read the{' '}
            <Link href="/portal">
              {/* Add link for faq portal */}
              <a className="text-blue-800 underline font-black">FAQs</a>
            </Link>{' '}
            before contacting the SSGSA team.
          </span>
        </p>

        <div className="flex justify-center">
          <button className="text-white text-base md:text-lg bg-red-850 py-2 px-4 rounded-3xl">
            Proceed to the Application Form
          </button>
        </div>
      </div>
      <p className="text-sm text-center mx-5 sm:mx-10 lg:mx-20">
        If you encounter any error during application process, please contact us
        at{' '}
        <a className="text-blue-800 underline font-black">contact@ssgsa.us</a>{' '}
        or{' '}
        <a className="text-blue-800 underline font-black">
          developers@ssgsa.us
        </a>
        , describing your problem{' '}
        <span className="underline">with a screenshot of the error</span>
      </p>
      <Footer />
    </div>
  )
}
