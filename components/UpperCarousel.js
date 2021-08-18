import Image from "next/image";
import Carousel from "react-elastic-carousel";

const UpperCarousel = () => {
  const CarouselData = [
    {
      imgSrc: "/Convention_photo5.png",
      imgAlt: "Convention Photo",
      heading: " SSGSA success stories spread around globe",
      width: 475,
      height: 250,
      content:
        "120 SSGSA scholars joined 110 universities in 22 countries around globe, it was reported during SSGSA Convention 2020",
    },
    {
      imgSrc: "/Convention_Collage.png",
      imgAlt: "Convention Photo",
      heading: "SSGSA Convention 2020",
      width: 1000,
      height: 550,
      content:
        "SSGSA Convention 2020 concluded successfully with the participations of 2019 Nobel Prize winner, Prof. Abhijit Banerjee, award winning actress Ms. Swara Bhaskar, Hon’ble Vice Chancellor of AMU, Prof. Tariq Mansoor & Noted Philanthropist Dr. Frank Islam.",
    },
  ];

  return (
    <Carousel itemsToShow={1}>
      {CarouselData.map((data, index) => {
        return (
          <div
            className="bg-blue-850 text-white flex my-5 py-10 flex-col sm:flex-row"
            key={index}
          >
            <div className="mx-5 sm:ml-20">
              <Image
                className="rounded-tl-3xl rounded-br-3xl"
                src={data.imgSrc}
                alt={data.imgAlt}
                width={data.width}
                height={data.height}
              />
            </div>
            <div className="mx-5 flex flex-col justify-center sm:ml-20">
              <h2 className="text-2xl font-black">{data.heading}</h2>
              <p className="mt-3">{data.content}</p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default UpperCarousel;
