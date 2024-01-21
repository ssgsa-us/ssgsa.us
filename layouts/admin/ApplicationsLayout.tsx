import ApplicationsHeader from '../../components/Admin/Headers/Applications'
import Footer from '../../components/Footer'
import styles from '../../styles/Home.module.css'

export default function ApplicationsLayout({ children }) {
  return (
    <div className={styles.container}>
      <ApplicationsHeader />
      <div className="md:px-12">{children}</div>
      <Footer />
    </div>
  )
}
