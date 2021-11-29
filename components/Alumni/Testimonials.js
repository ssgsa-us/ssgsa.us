import Carousel from 'react-elastic-carousel'
import Image from 'next/image'
import { testimonials } from '../../constants/testimonials'

const Testimonials = () => {
  return (
    <div id="Testimonials">
      <h1 className="my-8 mx-4 sm:mx-12 lg:mx-20 bg-blue-850 lg:text-3xl text-2xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Testimonials
      </h1>

      <div className="mx-2 sm:mx-6 lg:mx-10 my-8">
        <Carousel itemsToShow={1} enableAutoPlay={true} autoPlaySpeed={5000}>
          {testimonials.map((testimonial, index) => (
            <div
              className="flex flex-col md:flex-row items-center bg-red-850 rounded-tl-3xl rounded-br-3xl"
              key={index}
            >
              <div className="flex flex-col items-center justify-center text-center m-2 p-2 md:w-1/3 lg:w-1/4">
                <div className="relative rounded-full border-4 border-white overflow-hidden p-0 w-40 h-40">
                  <Image
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    layout="fill"
                  />
                </div>
                <p className="font-bold text-white sm:text-lg">
                  {testimonial.name}
                </p>
                <p className="text-white text-xs lg:text-sm">
                  {testimonial.position}
                </p>
              </div>
              <div className="flex items-center text-white text-xs sm:text-sm m-4 sm:m-8 md:w-2/3 lg:w-3/4">
                <p>{testimonial.words}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Testimonials
