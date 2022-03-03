import AdminHeader from '../../components/AdminHeader'
import Footer from '../../components/Footer'
import styles from '../../styles/Home.module.css'

export default function ApplicationLayout({ children }) {
  return (
    <div className={styles.container}>
      <AdminHeader />
      <div className="md:px-12">{children}</div>
      <Footer />
    </div>
  )
}
