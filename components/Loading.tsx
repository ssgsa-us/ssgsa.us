export default function Loading({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center my-48">
      <p className="text-3xl text-red-850">{message}</p>
    </div>
  )
}
