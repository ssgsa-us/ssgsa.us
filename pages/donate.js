import Donate from '../components/Donate/Donate'
import MainLayout from '../layouts/Main'

export default function Home() {
  return (
    <MainLayout>
      <div className="mx-2 mt-10 lg:flex justify-around lg:mx-20"></div>

      <Donate />
    </MainLayout>
  )
}
