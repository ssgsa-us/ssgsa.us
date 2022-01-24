import MainLayout from '../layouts/Main'

export default function Custom404() {
  return (
    <MainLayout>
      <div className="flex justify-center items-center text-xl text-red-850 my-52">
        <p>404 | Sorry, this is not available.</p>
      </div>
    </MainLayout>
  )
}
