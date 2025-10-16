import MainLayout from '../layouts/Main'
import { firestore } from '../firebase/index'
import { useEffect, useState } from 'react'

export default function Custom404() {
  const [news, setNews] = useState([])

  const fetchNews = async () => {
    const response = firestore
      .collection('news_events')
      .orderBy('date_published', 'desc')
    const data = await response.get()
    setNews((prevNews) => {
      const updatedNews = data.docs.map((item) => item.data())
      return [...prevNews, ...updatedNews]
    })
  }
  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex flex-col justify-center">
        <h1 className="mb-8 bg-blue-850 text-xl sm:text-xl lg:text-2xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
          News & Events
        </h1>
        {news &&
          news.slice(0, 10).map((newsItem, index) => {
            return (
              <div
                className=" bg-red-850 border-b-4 border-blue-850  text-white mb-2 text-left"
                key={index}
              >
                <div className="flex justify-start ml-4 -mb-2 mt-2 ">
                  <span className="bg-blue-850 text-gray-100  text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">
                    {newsItem.date_published.toDate().toDateString()}
                  </span>
                </div>
                <p className="mx-4 my-3 text-justify text-xs">
                  {newsItem.News}
                </p>
                <div className="flex justify-end mr-4 mb-1 text-xs gap-2 -mt-2">
                  {newsItem.event_date ? (
                    <span className="bg-gray-350 text-blue-850 text-xs font-medium mr-2 px-1.5 py-0.1 rounded ">
                      Event Date: {newsItem.event_date.toDate().toDateString()}
                    </span>
                  ) : (
                    ''
                  )}
                  {newsItem.link ? (
                    <a href={newsItem.link} target="blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </MainLayout>
  )
}
