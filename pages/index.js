import Apply from "../components/Apply";
import Counter from "../components/Counter";
import Datetable from "../components/Datetable";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UpperCarousel from "../components/UpperCarousel";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <UpperCarousel />
      <Counter />
      <div className="mx-2 mt-10 lg:flex justify-around lg:mx-20">
        <Datetable />
        <Apply />
      </div>
      <Footer />
    </div>
  );
}
