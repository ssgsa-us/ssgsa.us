import Link from 'next/link'
import MainLayout from '../layouts/Main'
import { resources } from '../constants/resources'

export default function Home() {
  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex justify-center">
        <div>
          <h1 className="mb-8 bg-blue-850 text-xl sm:text-xl lg:text-xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
            Resources
          </h1>

          <div>
            {resources.map((group, ind) => (
              <div className="mx-8 my-8" key={ind}>
                <h3 className="text-red-850 font-extrabold text-center text-2xl lg:text-3xl">
                  {group.heading}
                </h3>
                <div className="flex justify-center flex-wrap">
                  {group.resources.map((resource, index) => (
                    <div
                      className="w-52 m-4 text-center"
                      key={ind * 100 + index}
                    >
                      <Link href={resource.link}>
                        <a
                          className={`flex justify-center items-center text-center bg-gray-200 text-white font-bold w-52 h-24 ${
                            index % 3 == 2
                              ? 'bg-red-850'
                              : index % 3 == 1
                              ? 'bg-blue-850'
                              : index % 6 == 0
                              ? 'text-red-850'
                              : 'text-blue-850'
                          }`}
                          target="_blank"
                        >
                          {resource.title}
                        </a>
                      </Link>
                      <p>{resource.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Link href="https://drive.google.com/drive/folders/0B7sWQEWGG8KVNzV4UUlnMTNxenc?usp=sharing">
                <a
                  className={
                    'flex justify-center items-center text-center text-white font-bold w-52 h-24 bg-red-850 rounded-full'
                  }
                  target="_blank"
                >
                  CONSOLIDATED PREP MATERIAL
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
