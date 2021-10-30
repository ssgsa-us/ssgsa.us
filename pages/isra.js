import Apply from "../components/Apply";
import Isra from "../components/Isra";
import MainLayout from "../layouts/Main";

export default function Home() {
  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 lg:flex justify-around">
        <Isra />
        <Apply />
      </div>
    </MainLayout>
  );
}
