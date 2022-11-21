import Link from 'next/link'
import { useEffect, useState } from 'react'
import MainLayout from '../layouts/Main'
import { ResourcesType } from '../types'
import { getResources } from './api/constants'

export default function Home() {
  const [resources, setResources] = useState<ResourcesType>({})
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getResources()
      .then((data) => setResources(data))
      .catch(() => setError('Not able to get resources, Try again!'))
  }, [])

  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex justify-center">
        <div>
          <h1 className="mb-8 bg-blue-850 text-xl sm:text-xl lg:text-xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
            Resources
          </h1>

          <div>
            {!error ? (
              Object.values(resources)
                .sort((a, b) => a.index - b.index)
                .map((doc, ind) => (
                  <div className="mx-8 my-8" key={ind}>
                    <h3 className="text-red-850 font-extrabold text-center text-2xl lg:text-3xl">
                      {doc.category}
                    </h3>
                    <div className="flex justify-center flex-wrap">
                      {doc.resources.map((resource, index) => (
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
                ))
            ) : (
              <div>
                <h3 className="text-red-850 text-center text-lg lg:text-xl">
                  <span className="font-bold">Error -</span> {error}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
