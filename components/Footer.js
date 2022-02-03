import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <div className="mt-5">
      <div className="flex justify-center">
        <div className="relative w-full xl:w-3/4 h-24 lg:h-28 hidden sm:block">
          <Image src="/SirSyedHall.jpg" alt="Sir Syed Hall" layout="fill" />
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 text-white">
        <div className="sm:col-span-2 hidden sm:flex items-center justify-center p-2">
          <Image src="/logo.png" alt="Logo" width={110} height={110} />
        </div>
        <div className="col-span-2 md:col-span-4 lg:col-span-6 flex items-center bg-blue-850 p-3">
          <p className="text-sm font-bold">
            Sir Syed
            <br />
            Education Society
            <br />
            Of North America
          </p>
        </div>
        <div className="flex flex-col items-end sm:items-start bg-blue-850 p-3">
          <p className="text-sm font-bold mb-1">Social</p>
          <Link href="https://www.twitter.com/SirSyedGSA">
            <a className="text-xs" target="_blank">
              Twitter
            </a>
          </Link>
          <Link href="https://www.facebook.com/ssesapage">
            <a className="text-xs" target="_blank">
              Facebook
            </a>
          </Link>
          <Link href="https://www.linkedin.com/company/sir-syed-global-scholar-award-ssgsa">
            <a className="text-xs" target="_blank">
              Linkedin
            </a>
          </Link>
          <Link href="https://www.instagram.com/sirsyedgsa">
            <a className="text-xs" target="_blank">
              Instagram
            </a>
          </Link>
        </div>
        <div className="col-span-3 flex flex-col items-center sm:items-start bg-blue-850 p-3">
          <p className="text-sm font-bold mb-1">contact@ssgsa.us</p>
          <p className="text-xs mb-3">A 501(c) (3) Non-profit Organisation</p>
          <p className="text-xs">&copy; Copyright 2006-21</p>
          <p className="text-xs">All Rights Reserved by SSGSA</p>
        </div>
      </div>
    </div>
  )
}
