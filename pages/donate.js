import Donate from '../components/Donate/donate'
import Apply from '../components/Apply'
import Foundation from '../components/About/Foundation'
import MainLayout from '../layouts/Main'

export default function Home() {
  return (
    <MainLayout>
      <div className="mx-2 mt-10 lg:flex justify-around lg:mx-20"></div>

      <Donate />
    </MainLayout>
  )
}
