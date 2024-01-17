import AdminHeader from '../../components/Admin/Headers/Admin'
import Footer from '../../components/Footer'
import styles from '../../styles/Home.module.css'

export default function AdminLayout({ children }) {
  return (
    <div className={styles.container}>
      <AdminHeader />
      <div className="md:px-12">{children}</div>
      <Footer />
    </div>
  )
}
