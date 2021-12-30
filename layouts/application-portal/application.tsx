import Footer from '../../components/Footer'
import ApplicationHeader from '../../components/ApplicationHeader'
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
      {children}
      <Footer />
    </div>
  )
}
