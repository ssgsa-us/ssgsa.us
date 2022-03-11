import Footer from '../../components/Footer'
import ReviewerHeader from '../../components/ReviewerHeader'
import styles from '../../styles/Home.module.css'

export default function ReviewerLayout({ children }) {
  return (
    <div className={styles.container}>
      <ReviewerHeader />
      <div className="md:px-12">{children}</div>
      <Footer />
    </div>
  )
}
