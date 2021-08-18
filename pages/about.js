import Apply from "../components/Apply";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TextBox from "../components/TextBox";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className="mx-2 mt-10 lg:flex justify-around lg:mx-20">
        <TextBox />
        <Apply />
      </div>
      

      <Footer />
    </div>
  );
}
