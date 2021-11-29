import CountUp from 'react-countup'

const Counter = () => {
  return (
    <div
      className="flex mx-2 my-5 lg:my-10 md:my-14 lg:mx-20 justify-around lg:text-5xl md:text-3xl sm:text-2xl text-blue-850 font-black text-center"
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      <div>
        <CountUp start={0} end={22} duration={1} />
        <br />{' '}
        <span className="lg:text-3xl md:text-2xl sm:text-xl ">countries</span>
      </div>
      <div>
        <CountUp start={0} end={110} duration={1} />
        <br />{' '}
        <span className="lg:text-3xl md:text-2xl sm:text-xl">universities</span>
      </div>
      <div>
        <CountUp start={0} end={120} duration={1} />
        <br />
        <span className="lg:text-3xl md:text-2xl sm:text-xl">scholars</span>
      </div>
    </div>
  )
}

export default Counter
