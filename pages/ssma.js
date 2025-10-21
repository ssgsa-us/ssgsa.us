import Apply from '../components/Apply'
import Ssma from '../components/Ssma'
import MainLayout from '../layouts/Main'

export default function Home() {
  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 lg:flex justify-around">
        <Ssma />
        <Apply />
      </div>
    </MainLayout>
  )
}
