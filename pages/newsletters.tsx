import Link from 'next/link'
import { useEffect, useState } from 'react'
import MainLayout from '../layouts/Main'
import { MonthStoriesType, NewslettersType } from '../types'
import { getMonthStories, getNewsletters } from './api/constants'

export default function Home() {
  const [monthStories, setMonthStories] = useState<MonthStoriesType>({})
  const [monthStoriesError, setMonthStoriesError] = useState<string>('')
  const [newsletters, setNewsletters] = useState<NewslettersType>({})
  const [newslettersError, setNewslettersError] = useState<string>('')

  useEffect(() => {
    getMonthStories()
      .then((data) => setMonthStories(data))
      .catch(() =>
        setMonthStoriesError('Not able to get month stories, Try again!'),
      )

    getNewsletters()
      .then((data) => setNewsletters(data))
      .catch(() =>
        setNewslettersError('Not able to get newsletters, Try again!'),
      )
  }, [])

  return (
    <MainLayout>
      <div>
        <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex flex-col justify-center">
          <h1 className="mb-8 bg-blue-850 text-xl sm:text-xl lg:text-2xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
            Newsletters
          </h1>
          <div className="bg-gray-350 text-red-850 text-center">
            <p>
              Want to receive the newsletters directly in your inbox? Please{' '}
              <a
                className="text-blue-850"
                href="https://forms.gle/NyFDHo66BbufZdyu6"
                target="_blank"
                rel="noreferrer"
              >
                <u>sign up</u>
              </a>
              .
            </p>
          </div>

          <div className="flex justify-center flex-wrap">
            {!newslettersError ? (
              Object.values(newsletters)
                .sort((a, b) => b.index - a.index)
                .map((doc, index) => (
                  <Link href={doc.link} key={index}>
                    <a
                      className={`flex justify-center items-center text-center bg-gray-400 text-white font-bold w-40 h-24 m-4 ${
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
                      {doc.title}
                    </a>
                  </Link>
                ))
            ) : (
              <div className="mt-5">
                <h3 className="text-red-850 text-center text-lg lg:text-xl">
                  <span className="font-bold">Error -</span> {newslettersError}
                </h3>
              </div>
            )}
          </div>
        </div>

        <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 mb-10 flex flex-col justify-center">
          <h1 className="mb-8 bg-blue-850 text-xl sm:text-xl lg:text-2xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
            Stories of the Month
          </h1>

          <div className="sm:mx-8 lg:mx-8">
            {!monthStoriesError ? (
              <table className="w-full bg-gray-850 text-sm sm:text-base">
                <tbody>
                  {Object.values(monthStories)
                    .sort((a, b) => b.index - a.index)
                    .map((doc, index) => (
                      <tr key={index}>
                        <td className="border-2 bg-red-850 text-white font-bold p-2 w-1/5">
                          {doc.issue}
                        </td>
                        <td className="border-2 bg-gray-300 text-blue-850 font-bold p-2 w-3/5">
                          <Link href={doc.link} key={index}>
                            {doc.title}
                          </Link>
                        </td>
                        <td className="border-2 bg-gray-300 text-red-850 p-2 w-1/5">
                          {doc.name}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div>
                <h3 className="text-red-850 text-center text-lg lg:text-xl">
                  <span className="font-bold">Error -</span> {monthStoriesError}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
