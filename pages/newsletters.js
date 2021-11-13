import Link from "next/link"
import MainLayout from "../layouts/Main"
import { newsletters } from "../constants/newsletters"

export default function Home() {
  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex justify-center">
        <div>
          <h1
            className="mb-8 bg-blue-850 text-xl sm:text-2xl lg:text-3xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl"
          >
            Newsletters
          </h1>

          <div className="flex justify-center flex-wrap">
            {newsletters.map((newsletter, index) => (
              <Link href={newsletter.link} key={index}>
                <a
                  className={`flex justify-center items-center text-center bg-gray-400 text-white font-bold w-40 h-24 m-4 ${index%3 == 2 ? "bg-red-850" : (index%3 == 1 ? "bg-blue-850" : (index%6 == 0 ? "text-red-850" : "text-blue-850"))}`}
                  target="_blank"
                >
                  {newsletter.title}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
