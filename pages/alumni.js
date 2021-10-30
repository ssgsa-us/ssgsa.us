import Awardees from "../components/Alumni/Awardees"
import MainLayout from "../layouts/Main"
import Testimonials from "../components/Alumni/Testimonials"

export default function Home() {
  return (
    <MainLayout>
      <Testimonials />
      <Awardees />
    </MainLayout>
  );
}
