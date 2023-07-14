import { useRef } from 'react'
import Image from 'next/image'
import Carousel from 'react-elastic-carousel'
import { CarouselData } from '../constants/upperCarouselData'

const UpperCarousel = () => {
  const carouselRef = useRef(null)
  let resetTimeout

  return (
    <Carousel
      ref={carouselRef}
      itemsToShow={1}
      enableAutoPlay={true}
      autoPlaySpeed={5000}
      showArrows={false}
      onNextEnd={({ index }) => {
        clearTimeout(resetTimeout)
        if (index === 1) {
          resetTimeout = setTimeout(() => {
            carouselRef.current.goTo(0)
          }, 5000)
        }
      }}
    >
      {CarouselData.map((data, index) => {
        return (
          <div
            className="bg-blue-850 text-white flex my-5 py-10 sm:py-0 flex-col sm:flex-row"
            key={index}
          >
            <div className="mx-5 mb-5 sm:my-5 sm:w-1/2 xl:w-1/3 table">
              <div className="table-cell align-middle">
                <div className="relative">
                  <Image
                    className="rounded-tl-3xl rounded-br-3xl"
                    layout="responsive"
                    src={data.imgSrc}
                    alt={data.imgAlt}
                    width={data.width}
                    height={data.height}
                    priority={true}
                  />
                </div>
              </div>
            </div>
            <div className="mx-5 flex flex-col justify-center sm:py-10 sm:w-1/2 xl:w-2/3">
              <h2 className="text-2xl font-black">{data.heading}</h2>
              <p className="mt-3 text-justify">{data.content}</p>
            </div>
          </div>
        )
      })}
    </Carousel>
  )
}

export default UpperCarousel
