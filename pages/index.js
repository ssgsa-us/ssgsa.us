import Head from "next/head"
import Image from "next/image"
import Datetable from "../components/Datetable"
import Footer from "../components/Footer"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <Datetable />
      </div>
      <Footer />
    </div>
  )
}
