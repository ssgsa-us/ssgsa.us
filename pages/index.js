import Apply from '../components/Apply'
import Counter from '../components/Counter'
import Datetable from '../components/Datetable'
import MainLayout from '../layouts/Main'
import Scholar from '../components/Scholar'
import UpperCarousel from '../components/UpperCarousel'

export default function Home() {
  return (
    <MainLayout>
      <div className="bg-gray-350 text-lg text-gray-850 font-black w-screen -ml-2 sm:-ml-5 md:-ml-10 lg:-ml-20 xl:-ml-40 mt-8 lg:mr-2 lg:p-3 p-2">
        <marquee className="flex items-center">
          <p> SSGSA results (2021-2022) announced </p>
        </marquee>
      </div>
      <Counter />
      <UpperCarousel />
      <div className="mx-2 mt-10 lg:flex justify-around">
        <div className="w-full lg:mr-4">
          <h1 className="text-blue-850 lg:text-3xl mx-2 mb-4 font-extrabold">
            Dates of Full Term 2021-2022
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
