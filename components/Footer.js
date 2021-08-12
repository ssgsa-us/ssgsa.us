import Link from "next/link"

export default function Footer() {
  return (
    <div className="grid sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 text-white mt-5">
      <div className="sm:col-span-2 flex items-center justify-center p-2">
        <img src="/logo.png" className="max-h-24" />
      </div>
      <div className="sm:col-span-2 md:col-span-4 lg:col-span-6 flex items-center bg-blue-850 p-3">
        <p className="text-sm font-bold">
          Sir Syed
          <br />
          Education Society
          <br />
          Of North America
        </p>
      </div>
      <div className="flex flex-col bg-blue-850 p-3">
        <p className="text-sm font-bold mb-1">Social</p>
        <Link href="https://twitter.com/">
          <a className="text-xs">Twitter</a>
        </Link>
        <Link href="https://www.facebook.com/">
          <a className="text-xs">Facebook</a>
        </Link>
        <Link href="https://www.linkedin.com/">
          <a className="text-xs">Linkedin</a>
        </Link>
        <Link href="https://www.instagram.com/">
          <a className="text-xs">Instagram</a>
        </Link>
      </div>
      <div className="sm:col-span-3 lg:col-span-3 flex flex-col bg-blue-850 p-3">
        <p className="text-sm font-bold mb-1">contact@ssgsa.us</p>
        <p className="text-xs mb-3">A 501(c) (3) Non-profit Organisation</p>
        <p className="text-xs">&copy; Copyright 2006-21</p>
        <p className="text-xs">All Rights Reserved by SSGSA</p>
      </div>
    </div>
  )
}
