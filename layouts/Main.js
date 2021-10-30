import Footer from "../components/Footer"
import Header from "../components/Header"
import styles from "../styles/Home.module.css"

export default function MainLayout({children}) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}