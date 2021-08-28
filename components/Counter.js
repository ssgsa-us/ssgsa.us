import CountUp from 'react-countup';

const Counter = () => {
    return (
      <div className="flex mx-2 my-5 lg:my-40 md:my-14 lg:mx-20 justify-around lg:text-4xl md:text-2xl text-blue-850 font-bold" style={{fontSize: "80px", display: "flex"}} >
        <div className="flex-shrink">
          <CountUp start={0} end={20} duration={1} />+ <span style={{fontSize: "40px"}}>Countries</span>
        </div>
        <div className="flex-shrink">
          <CountUp start={0} end={99} duration={1} />+ <span style={{fontSize: "40px"}}>Universities</span>
        </div>
        <div className="flex-shrink">
          <CountUp start={0} end={119} duration={1} />+ <span style={{fontSize: "40px"}}>Scholars</span>
        </div>
    </div>
    );
  };

export default Counter;