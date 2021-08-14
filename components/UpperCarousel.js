import Image from "next/image";
import Carousel from "react-elastic-carousel";

const UpperCarousel = () => {
  return (
    <Carousel itemsToShow={1}>
      <div className="bg-blue-850 text-white flex my-5 py-10 flex-col sm:flex-row">
        <div className="ml-20">
          <Image
            className="rounded-tl-3xl rounded-br-3xl"
            src="/Convention_photo5.png"
            alt="Convention Photo"
            width={475}
            height={250}
          />
        </div>
        <div className="ml-20 flex flex-col justify-center">
          <h2 className="text-2xl font-black">
            SSGSA success stories spread around globe
          </h2>
          <p className="mt-3">
            120 SSGSA scholars joined 110 universities in 22 countries around
            globe, it was reported during SSGSA Convention 2020
          </p>
        </div>
      </div>

      <div className="bg-blue-850 text-white flex my-5 py-10 flex-col sm:flex-row">
        <div className="ml-20">
          <Image
            className="rounded-tl-3xl rounded-br-3xl"
            src="/Convention_Collage.png"
            alt="Convention Photo"
            width={1000}
            height={550}
          />
        </div>
        <div className="ml-20 flex flex-col justify-center">
          <h2 className="text-2xl font-black">SSGSA Convention 2020</h2>
          <p className="mt-5">
            SSGSA Convention 2020 concluded successfully with the participations
            of 2019 Nobel Prize winner, Prof. Abhijit Banerjee, award winning
            actress Ms. Swara Bhaskar, Hon’ble Vice Chancellor of AMU, Prof.
            Tariq Mansoor & Noted Philanthropist Dr. Frank Islam.
          </p>
        </div>
      </div>
    </Carousel>
  );
};

export default UpperCarousel;
