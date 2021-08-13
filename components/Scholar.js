import Image from "next/image";

const Scholar = () => {
  return (
    <div>
      <div className="  text-blue-850 font-bold lg:text-3xl mt-2">
        Our Scholars
      </div>
      <div className="container container max-w-full m-auto flex flex-wrap flex-col md:flex-row items-center justify-start">
        <div className="w-full pt-4">
          <div className="flex flex-col lg:flex-row overflow-hidden border-2 border-gray-300">
            <Image
              width={1650}
              height={1350}
              src="/scholar_one.jpg"
              alt="not found"
            />
            <div className="flex-col leading-normal bg-blue-850">
              <div className=" justify-self-stretch text-blue-850 bg-white font-bold lg:text-3xl mb-2 p-4">
                Wasikul <br /> Islam
              </div>
              <div className="justify-self-stretch text-white p-2">
                A former SSGSA Scholar, Dr. Islam now holds a Ph.D. in
                Experimental Particle Physics from Oklahoma State University,
                USA. He is also a former SSGSA Chairperson. He will be joining
                Department of Physics, University of Wisconsin-Madison, USA as a
                Research Associate and on behalf of his new university he will
                be continuing his works at the CERN Laboratory, Switzerland
                while pursuing research on physics of the Higgs Boson and Dark
                matter searches
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholar;
