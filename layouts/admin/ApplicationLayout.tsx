import ApplicationHeader from '../../components/Admin/Headers/Application'
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
      <ApplicationHeader
        status={status}
        formStatus={formStatus}
        setStatus={setStatus}
      />
      <div className="md:px-12">{children}</div>
      <Footer />
    </div>
  )
}
