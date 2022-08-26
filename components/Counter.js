import CountUp from 'react-countup'
import Image from 'next/image'
import worldMap from '../public/worldMap.png'

const Counter = () => {
  return (
    <div
      className="flex mx-2 my-20 sm:my-28 md:my-36 lg:my-40 xl:my-52 lg:mx-20 justify-around items-center lg:text-5xl md:text-3xl sm:text-2xl text-blue-850 font-black text-center"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <div className="absolute overflow-hidden z-n10 w-5/6 lg:w-3/4 xl:w-2/3">
        <Image
          layout="responsive"
          src={worldMap}
          alt="World Map"
          priority={true}
        />
      </div>
      <div>
        <CountUp start={0} end={22} duration={1} />
        <span className="lg:text-5xl md:text-4xl sm:text-3xl">+</span>
        <br />{' '}
        <span className="lg:text-3xl md:text-2xl sm:text-xl">countries</span>
      </div>
      <div>
        <CountUp start={0} end={110} duration={1} />
        <span className="lg:text-5xl md:text-4xl sm:text-3xl">+</span>
        <br />{' '}
        <span className="lg:text-3xl md:text-2xl sm:text-xl">universities</span>
      </div>
      <div>
        <CountUp start={0} end={120} duration={1} />
        <span className="lg:text-5xl md:text-4xl sm:text-3xl">+</span>
        <br />
        <span className="lg:text-3xl md:text-2xl sm:text-xl">scholars</span>
      </div>
    </div>
  )
}

export default Counter
