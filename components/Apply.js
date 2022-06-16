import Image from 'next/image'
import Link from 'next/dist/client/link'

const Apply = () => {
  return (
    <div className="mt-8 lg:mt-0 lg:ml-4 lg:w-1/3 flex justify-center">
      <div className="w-4/5 sm:w-3/4 md:w-3/5 lg:w-full bg-gray-100">
        <div className="mx-8 pt-3">
          <Link href="/application-portal">
            <button className="px-10 py-1 block mx-auto bg-red-850 font-black text-lg text-white text-center">
              APPLY
            </button>
          </Link>
          <p className="mx-auto font-black text-sm text-red-850 text-center mt-8">
            Sponsor a student
          </p>
          <div className="mt-3 text-center">
            <a
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MYCSXB9B4ENP6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/donate1.png" alt="Donate" width={280} height={30} />
            </a>
          </div>
          <a href="#"></a>
          <p className="mx-auto font-black text-sm text-red-850 text-center mt-8">
            Become a regular Patron
          </p>
          <div className="mt-3 text-center">
            <a
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MYCSXB9B4ENP6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/donate2.png" alt="Donate" width={280} height={30} />
            </a>
          </div>
          <a
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MYCSXB9B4ENP6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-10 py-1 block mx-auto bg-red-850 font-black text-lg text-white text-center">
              Donate Now
            </button>
          </a>
          <p className="text-sm mt-8">
            By supporting students, you are becoming an active participant in
            building their careers. All donations and contributions directly
            sponsor the attempts of talented students to secure admission in an
            MS/PhD program at a university of international repute. You can
            easily cancel or upgrade your contribution at any time.
          </p>
        </div>
        <Link href="/about_sirsyed">
          <button className="px-2 py-2 mt-8 w-full bg-red-850 text-sm text-white text-center">
            About Sir Syed
          </button>
        </Link>

        <a href="https://amu.ac.in/" target="_blank" rel="noopener noreferrer">
          <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
            The Aligarh Muslim University
          </button>
        </a>
        <a
          href="/assets/PressRelease-SSGSA-2021-22.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
            SSGSA results (2021-2022) announced
          </button>
        </a>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfdZypeiKqTu5AR573bFuVxmw_rZHgWWDAt--8fkWIosNH_-w/viewform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
            Pledge your support to SSGSA
          </button>
        </a>
        <a
          href="http://www.aligs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
            Federation of Aligarh Alumni Associations(FAAA)
          </button>
        </a>
        <a
          href="https://www.facebook.com/groups/ssesa/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
            Join our Facebook Group
          </button>
        </a>
        <a
          href="/assets/PressRelease_SSGSA_2022_23.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-2 py-2 mt-3 w-full bg-red-850 text-sm text-white text-center">
            Press Release of SSGSA 2022-2023
          </button>
        </a>

        <div className="mx-4">
          <button className="px-2 py-2 mt-8 mb-8 w-full bg-blue-850 text-sm text-white text-center rounded-tl-md rounded-br-md">
            Ask a Question
          </button>
        </div>
      </div>
    </div>
  )
}

export default Apply
