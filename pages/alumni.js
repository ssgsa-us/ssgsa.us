import Awardees from '../components/Alumni/Awardees'
import MainLayout from '../layouts/Main'
import Testimonials from '../components/Alumni/Testimonials'
import Scholars from '../components/Alumni/Scholars'

export default function Home() {
  return (
    <MainLayout>
      <Testimonials />
      <Awardees />
      <Scholars />
    </MainLayout>
  )
}
