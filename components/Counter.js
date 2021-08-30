import CountUp from 'react-countup';

const Counter = () => {
    return (
      <div className="flex mx-2 my-5 lg:my-40 md:my-14 lg:mx-20 justify-around lg:text-5xl md:text-3xl sm:text-2xl text-blue-850 font-bold"
      style={{ display: "flex", flexWrap: "wrap" }} >
        <div>
          <CountUp start={0} end={20} duration={1} />+<br /> <span className="lg:text-3xl md:text-2xl sm:text-xl">Countries</span>
        </div>
        <div>
          <CountUp start={0} end={99} duration={1} />+<br /> <span className="lg:text-3xl md:text-2xl sm:text-xl" >Universities</span>
        </div>
        <div>
          <CountUp start={0} end={119} duration={1} />+<br /><span className="lg:text-3xl md:text-2xl sm:text-xl" >Scholars</span>
        </div>
    </div>
    );
  };

export default Counter;
