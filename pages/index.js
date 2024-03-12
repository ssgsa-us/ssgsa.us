import Link from 'next/link'
import Apply from '../components/Apply'
import Counter from '../components/Counter'
import Datetable from '../components/Datetable'
import MainLayout from '../layouts/Main'
import Scholar from '../components/Scholar'
import UpperCarousel from '../components/UpperCarousel'

export default function Home() {
  return (
    <MainLayout>
      <div className="bg-gray-350 text-red-850 font-black w-screen -ml-2 sm:-ml-5 md:-ml-10 lg:-ml-20 xl:-ml-40 mt-8 lg:mr-2 lg:p-3 p-2">
        <marquee className="flex items-center">
          <Link href="/application-portal">
            <a>Deadline for application has been EXTENDED to March 12, 2024 (11:59 pm IST). Click here to apply.</a>
          </Link>
        </marquee>
      </div>
      <Counter />
      <UpperCarousel />
      <div className="bg-blue-850 rounded-xl text-white mx-2 my-10 p-5 sm:px-10">
        <h1 className="text-2xl font-black">What is SSGSA?</h1>
        <p className="text-lg mt-3">
          An Aligarh Muslim University (AMU) alumni initiative for mentoring and
          financially supporting meritorious AMU students for grad school
          applications.
        </p>
        <p className="text-sm mt-2">
          Read more about SSGSA{' '}
          <Link href="/about">
            <a className="text-red-500">here</a>
          </Link>
          .
        </p>
      </div>
      <div className="mx-2 mt-10 lg:flex justify-around">
        <div className="w-full lg:mr-4">
          <h1 className="text-blue-850 text-xl lg:text-2xl mx-2 mb-4 font-extrabold">
            Dates of Full Term{' '}
            <span className="font-lora font-medium">2024-2025</span>
          </h1>
          <Datetable
            bgcolor="bg-blue-850"
            textcolor="text-white"
            textbold="font-normal"
          />

          <Scholar />
        </div>
        <Apply />
      </div>
    </MainLayout>
  )
}
