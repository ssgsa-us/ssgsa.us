import Apply from '../components/Apply'
import Datetable from '../components/Datetable'
import Link from 'next/link'
import MainLayout from '../layouts/Main'

export default function Home() {
  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 lg:flex justify-around text-black">
        <div>
          <div id="WhoCanApply">
            <h1 className="mb-8 bg-blue-850 lg:text-2xl text-xl text-white font-extrabold py-2 pl-6 sm:pl-12 rounded-tl-3xl rounded-br-3xl">
              Who Can Apply?
            </h1>

            <div className="mx-4 sm:mx-8 md:mx-12 text-sm md:text-base">
              <p>
                We welcome you to apply to the Sir Syed Global Scholar Award if
                you fulfill all of the following requirements:
              </p>
              <ul style={{ listStyle: 'disc' }} className="ml-2 p-2 pl-4">
                <li className="my-2">
                  You have completed or enrolled in at least one of the degrees
                  (High School/Senior Secondary/Diploma/Bachelor/Master) from
                  Aligarh Muslim University.
                </li>
                <li className="my-2">
                  You are currently registered for the final or penultimate year
                  of a four (or more) years&apos; bachelor&apos;s program.
                  <br />
                  <span className="flex justify-center">OR</span>
                  You have finished a three-year Bachelor&apos;s degree and
                  enrolled in the first year of a Master&apos;s program.
                </li>
                <li className="my-2">
                  You wish to apply for a Master&apos;s or PhD degree at a
                  university of international repute outside India within the
                  next 2 academic years.
                </li>
              </ul>
              <p>
                The Sir Syed Global Scholar Award is an equal-opportunity
                scholarship. We strongly encourage women, people with
                disabilities, and those from economically and socially excluded
                communities to apply.
              </p>
            </div>
          </div>

          <div id="Timeline">
            <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white font-extrabold py-2 pl-6 sm:pl-12 rounded-tl-3xl rounded-br-3xl">
              Application Timeline: 2022-2023
            </h1>

            <Datetable
              bgcolor="bg-gray-200"
              textcolor="text-blue-850"
              textbold="font-bold"
            />
          </div>

          <div className="mx-4 my-8 flex flex-col items-center">
            <p>
              See Frequently Asked Questions
              <Link href="/faq">
                <a className="text-blue-500">&nbsp;here</a>
              </Link>
            </p>
            <br />
            <p>To start your application, click Apply!</p>
            <br />
            <Link href="/application-portal">
              <button className="px-10 py-1 block mx-auto bg-red-850 font-black text-lg text-white text-center rounded-3xl">
                APPLY
              </button>
            </Link>
          </div>
        </div>

        <Apply />
      </div>
    </MainLayout>
  )
}
