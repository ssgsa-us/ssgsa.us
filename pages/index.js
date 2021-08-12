import Datetable from "../components/Datetable"
import Footer from "../components/Footer"
import Header from "../components/Header"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Datetable />
      <Footer />
    </div>
  )
}
