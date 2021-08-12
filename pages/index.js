import Head from "next/head";
import Image from "next/image";
import Datetable from "../components/Datetable";
import Apply from "../components/Apply";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <div className="mx-2 lg:flex justify-around lg:mx-20">
          <Datetable />
          <Apply />
        </div>
      </div>
      <Footer />
    </div>
  );
}
