import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { getScholars } from '../pages/api/constants'
import { ScholarType } from '../types'

const Scholar = () => {
  const carouselRef = useRef(null)
  const [scholars, setScholars] = useState<Array<ScholarType>>([])
  const [error, setError] = useState<string>('')
  let resetTimeout

  useEffect(() => {
    getScholars()
      .then((data) => setScholars(Object.values(data)))
      .catch(() => setError('Not able to get scholars, Try again!'))
  }, [])

  return (
    <div>
      <div className="text-blue-850 font-bold text-xl lg:text-2xl mt-10 mb-5">
        Our Scholars
      </div>
      {!error ? (
        <Carousel
          ref={carouselRef}
          itemsToShow={1}
          enableAutoPlay={true}
          autoPlaySpeed={5000}
          showArrows={false}
          onNextEnd={({ index }) => {
            clearTimeout(resetTimeout)
            if (index === Object.keys(scholars).length - 1) {
              resetTimeout = setTimeout(() => {
                carouselRef.current.goTo(0)
              }, 5000)
            }
          }}
          isRTL={false}
        >
          {scholars.map((scholar, index) => {
            return (
              <div
                className="flex flex-col sm:flex-row items-center bg-blue-850 rounded-tl-3xl rounded-br-3xl p-1"
                key={index}
              >
                <div className="flex flex-col items-center justify-center m-2 p-2 sm:w-2/5">
                  <div className="relative rounded-full border-4 border-white overflow-hidden p-0 w-40 h-40">
                    <Image
                      src={scholar.imageUrl}
                      alt={scholar.name}
                      layout="fill"
                      priority={true}
                    />
                  </div>
                </div>
                <div className="flex flex-col h-full text-white sm:w-4/5">
                  <div className="bg-white text-center w-full py-2">
                    <p className="font-bold text-blue-850 text-lg">
                      {scholar.name}
                    </p>
                  </div>
                  <p className="text-xs m-2 mb-4 sm:ml-0">{scholar.words}</p>
                </div>
              </div>
            )
          })}
        </Carousel>
      ) : (
        <div>
          <h3 className="text-red-850 text-lg lg:text-xl">
            <span className="font-bold">Error -</span> {error}
          </h3>
        </div>
      )}
    </div>
  )
}

export default Scholar
