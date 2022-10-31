import Awardees from '../components/Alumni/Awardees'
import MainLayout from '../layouts/Main'
import Testimonials from '../components/Alumni/Testimonials'
import SuccessfulScholars from '../components/Alumni/SuccessfulScholars'

export default function Home() {
  return (
    <MainLayout>
      <Testimonials />
      <Awardees />
      <SuccessfulScholars />
    </MainLayout>
  )
}
