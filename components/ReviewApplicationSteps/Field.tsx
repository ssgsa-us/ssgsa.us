type Props = {
  name: string
  value: string | number
}

const Field = ({ name, value }: Props) => (
  <div className="flex justify-start my-4">
    <p className="text-red-850 sm:text-lg md:text-xl font-extrabold w-2/5 mr-5">
      {name}
    </p>
    <p className="text-sm sm:text-lg break-all w-3/5">{value}</p>
  </div>
)

export default Field
