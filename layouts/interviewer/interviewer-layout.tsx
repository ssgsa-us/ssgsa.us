import Footer from '../../components/Footer'
import InterviewerHeader from '../../components/Interviewer/InterviewerHeader'
import styles from '../../styles/Home.module.css'

export default function InterviewerLayout({ children }) {
  return (
    <div className={styles.container}>
      <InterviewerHeader />
      <div className="md:px-12">{children}</div>
      <Footer />
    </div>
  )
}
