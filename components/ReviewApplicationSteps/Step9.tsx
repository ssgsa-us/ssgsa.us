type Props = {
  otherInfo: string
}

const Step9 = ({ otherInfo }: Props) => (
  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
    <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
      Other Information
    </h1>
    <p className="text-sm sm:text-lg break-all">
      {!otherInfo ? 'Not Provided' : otherInfo}
    </p>
  </div>
)

export default Step9
