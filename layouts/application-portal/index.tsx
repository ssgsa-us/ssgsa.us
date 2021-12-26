import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../components/Footer'
import styles from '../../styles/Home.module.css'
import logo from '../../public/logo.png'

export default function PortalLayout({ children }) {
  return (
    <div className={styles.container}>
      <nav className="sticky top-0 z-50">
        <div className="w-full flex flex-row bg-white items-center flex">
          <div className="flex-1 text-xl sm:text-2xl md:text-3xl justify-center px-4 my-6 flex items-center font-black text-red-850 ">
            SIR SYED GLOBAL SCHOLAR AWARD
          </div>
          <div className="mr-3 flex-2">
            <Link href="/">
              <Image width={110} height={110} src={logo} alt="SSGSA Logo" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="relative flex w-full bg-red-850 py-16 px-5 items-center justify-center text-white text-3xl sm:text-4xl lg:text-5xl">
        <p className="text-center leading-tight">
          Welcome to the
          <br />
          <span className="font-black">Sir Syed Global Scholar Award</span>
          <br />
          Application Portal
        </p>
      </div>
      {children}
      <Footer />
    </div>
  )
}
