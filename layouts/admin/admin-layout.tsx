import Link from 'next/link'
import Image from 'next/image'
import Footer from '../../components/Footer'
import logo from '../../public/logo.png'
import styles from '../../styles/Home.module.css'

export default function ApplicationLayout({ children }) {
  return (
    <div className={styles.container}>
      <nav className="sticky top-0 z-50 bg-red-850">
        <div className="w-full flex flex-row bg-white items-center flex">
          <div className="flex-1 text-xl sm:text-2xl md:text-3xl justify-center px-4 my-6 lg:ml-24 flex items-center font-black text-red-850 ">
            <Link href="/">
              <a className="cursor-pointer">SIR SYED GLOBAL SCHOLAR AWARD</a>
            </Link>
          </div>
          <div className="mr-3 flex-2">
            <Link href="/">
              <Image
                width={110}
                height={110}
                src={logo}
                alt="SSGSA Logo"
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </nav>
      <div className="md:px-12 lg:px-24 xl:px-40">{children}</div>
      <Footer />
    </div>
  )
}
