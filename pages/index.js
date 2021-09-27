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
      <div className="bg-gray-200 text-blue-900 w-full mt-8 lg:mr-2 lg:p-2 p-1"  >
  <marquee>
    <p> SSGSA results (2021-2022) announced </p>
  </marquee>
   </div>
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
