import AdminApplHeader from '../../components/Admin/AdminApplHeader'
import Footer from '../../components/Footer'
import styles from '../../styles/Home.module.css'

export default function ApplicationLayout({
  children,
  status,
  formStatus,
  setStatus,
}) {
  return (
    <div className={styles.container}>
      <AdminApplHeader
        status={status}
        formStatus={formStatus}
        setStatus={setStatus}
      />
      <div className="md:px-12">{children}</div>
      <Footer />
    </div>
  )
}
