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
            <h1 className="mb-8 bg-blue-850 lg:text-3xl text-2xl text-white font-extrabold py-2 pl-6 sm:pl-12 rounded-tl-3xl rounded-br-3xl">
              Who Can Apply?
            </h1>

            <div className="mx-4 sm:mx-8 md:mx-16">
              <p>
                Current students or alumni from all faculties of Aligarh Muslim
                University who satisfy the following conditions may apply:
              </p>
              <ul style={{ listStyle: 'disc' }} className="ml-2 p-2">
                <li>Hold a Bachelor’s degree,</li>
                <li>Have an outstanding academic record, and</li>
                <li>
                  Wish to apply for a Master’s or PhD degree at a university of
                  international repute outside India within the next 2 academic
                  years.
                </li>
              </ul>
              <p>
                The Sir Syed Global Scholar Award is an equal opportunity
                scholarship. We strongly encourage women, people with
                disabilities and those from economically and socially excluded
                communities that satisfy the above conditions to apply.
              </p>
            </div>
          </div>

          <div id="Timeline">
            <h1 className="my-8 bg-blue-850 lg:text-3xl text-2xl text-white font-extrabold py-2 pl-6 sm:pl-12 rounded-tl-3xl rounded-br-3xl">
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
              <Link href="">
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
