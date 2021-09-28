import Apply from "../components/Apply";
import Counter from "../components/Counter";
import Datetable from "../components/Datetable";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UpperCarousel from "../components/UpperCarousel";
import Scholar from "../components/Scholar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className="bg-gray-200 text-blue-900 w-full mt-8 lg:mr-2 lg:p-2 p-1">
        <marquee>
          <p> SSGSA results (2021-2022) announced </p>
        </marquee>
      </div>
      <UpperCarousel />
      <Counter />
      <div className="mx-2 mt-10 lg:flex justify-around lg:mx-20">
        <div className="w-full lg:mr-4">
          <h1 className="text-blue-850 lg:text-3xl mx-2 mb-4 font-extrabold">
            Dates of Full Term 2021-2022
          </h1>
          <Datetable bgcolor="bg-blue-850" textcolor="text-white" textbold="font-normal" />

          <Scholar />
        </div>
        <Apply />
      </div>
      <Footer />
    </div>
  );
}
