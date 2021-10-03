import Awardees from "../components/Alumni/Awardees"
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import Testimonials from "../components/Alumni/Testimonials"

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Testimonials />
      <Awardees />
      <Footer />
    </div>
  );
}
