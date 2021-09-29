import Apply from "../components/Apply";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Isra from "../components/Isra";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 lg:flex justify-around">
        <Isra />
        <Apply />
      </div>

      <Footer />
    </div>
  );
}
