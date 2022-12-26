import Link from 'next/link'

type Props = {
  fieldName: string
  fileName: string
  url: string
}

const FileField = ({ fieldName, fileName, url }: Props) => (
  <div className="flex justify-start my-2">
    <p className="text-red-850 sm:text-lg md:text-xl font-extrabold w-2/5 mr-5">
      {fieldName}
    </p>
    <Link href={url}>
      <a
        className="text-sm sm:text-lg text-blue-500 break-all w-3/5"
        target="_blank"
      >
        {fileName}
      </a>
    </Link>
  </div>
)

export default FileField
