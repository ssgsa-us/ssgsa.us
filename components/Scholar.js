import Image from 'next/image'
import scholar_one from '../public/scholar_one.jpg'

const Scholar = () => {
  return (
    <div>
      <div className="text-blue-850 font-bold text-xl lg:text-2xl mt-10">
        Our Scholars
      </div>
      <div className="container max-w-full m-auto flex flex-wrap flex-col sm:flex-row items-center justify-start">
        <div className="w-full pt-4">
          <div className="flex flex-col sm:flex-row overflow-hidden border-2 border-gray-300">
            <div className="sm:w-1/2 h-full">
              <Image
                layout="responsive"
                src={scholar_one}
                alt="Scholar image"
              />
            </div>
            <div className="flex-col leading-normal bg-blue-850 sm:w-1/2 sm:border-l-2 sm:border-gray-300">
              <div className="justify-self-stretch text-blue-850 bg-white font-bold text-lg lg:text-xl p-4">
                Wasikul Islam
              </div>
              <div className="justify-self-stretch text-sm lg:text-xs text-white mt-2 mb-2 p-2">
                A former SSGSA Scholar, Dr. Islam now holds a Ph.D. in
                Experimental Particle Physics from Oklahoma State University,
                USA. He is also a former SSGSA Chairperson.
                <br /> He will be joining Department of Physics, University of
                Wisconsin-Madison, USA as a Research Associate and on behalf of
                his new university he will be continuing his works at the CERN
                Laboratory, Switzerland while pursuing research on physics of
                the Higgs Boson and Dark matter searches
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scholar
