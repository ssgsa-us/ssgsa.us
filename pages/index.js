import Apply from "../components/Apply";
import Counter from "../components/Counter";
import DateTable from "../components/DateTable";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Counter />
      <div className="mx-2 mt-10 lg:flex justify-around lg:mx-20">
        <DateTable />
        <Apply />
      </div>

      <Footer />
    </div>
  );
}
