import Image from "next/image";

const Apply = () => {
  return (
    <div className="mt-8 lg:mt-0 lg:ml-4 lg:w-1/3 flex justify-center">
      <div className="w-4/5 sm:w-3/4 md:w-3/5 lg:w-full bg-gray-100">
        <div className="mx-8 pt-3">
          <button className="px-10 py-1 block mx-auto bg-red-850 font-black text-lg text-white text-center">
            APPLY
          </button>
          <p className="mx-auto font-black text-sm text-red-850 text-center mt-8">
            Sponsor a student
          </p>
          <div className="mt-3 text-center">
            <Image src="/donate1.png" alt="Donate" width={280} height={30} />
          </div>
          <a href="#"></a>
          <p className="mx-auto font-black text-sm text-red-850 text-center mt-8">
            Become a regular Patron
          </p>
          <div className="mt-3 text-center">
            <Image src="/donate2.png" alt="Donate" width={250} height={30} />
          </div>
          <p className="text-sm mt-8">
            By supporting students, you&apos;re becoming an active participant in
            building their careers. You can easily cancel or upgrade your
            contribution at any time.
          </p>
        </div>
        <button className="px-2 py-2 mt-8 w-full bg-red-850 text-sm text-white text-center">
          SSGSA results (2021-2022) announce
        </button>
        <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
          Pledge your support to SSGSA
        </button>
        <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
          Federation of Aligarh Alumni Associations(FAAA)
        </button>
        <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
          The Aligarh Muslim University
        </button>
        <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
          Join our Facebook Group
        </button>
        <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
          Press Release Statement of SSGSA Convention 2020
        </button>

        <div className="mx-4">
          <button className="px-2 py-2 mt-8 w-full bg-blue-850 text-sm text-white text-center rounded-tl-md rounded-br-md">
            Subscribe to our Newsletter
          </button>
          <div className="flex space-x-2 mt-2">
            <input
              className="border-2 border-gray-300 pl-1 w-2/3 placeholder-text-gray-400 text-sm"
              placeholder="Your email"
            ></input>
            <button className="px-1 py-2 w-1/3 bg-red-850 font-black text-xs text-white text-center">
              Sign me up
            </button>
          </div>
          <button className="px-2 py-2 mt-8 mb-8 w-full bg-red-850 text-sm text-white text-center rounded-tl-md rounded-br-md">
            Ask a Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Apply;
