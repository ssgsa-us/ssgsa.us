import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthUserContext'
import { uploadDocument } from '../../pages/api/uploadDocument'

type Props = {
  fileName: string
  isFileUploaded: boolean
  setIsFileUploaded: Dispatch<SetStateAction<boolean>>
  docUrlField: string
}

const FileUploadComponent = ({
  fileName,
  isFileUploaded,
  setIsFileUploaded,
  docUrlField,
}: Props) => {
  const { authUser } = useAuth()
  const [file, setFile] = useState<File>()
  const [newFileSelected, setNewFileSelected] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const upload = () => {
    setError('')
    if (file)
      if (file.size <= 1100000)
        uploadDocument(authUser.id, fileName, file, docUrlField)
          .then(() => {
            setIsFileUploaded(true)
            setNewFileSelected(false)
            alert('Your file is uploaded.')
          })
          .catch(() => alert('Try again, network error!'))
      else setError('Maximum allowed file size is 1MB.')
  }

  useEffect(() => {
    setNewFileSelected(!isFileUploaded)
  }, [isFileUploaded])
  console.log(isFileUploaded, newFileSelected)

  return (
    <>
      <div>
        <p className="md:text-sm text-red-850">
          The maximum allowed file size is 1 MB
        </p>
      </div>
      <div
        className="flex flex-col items-center sm:flex-row sm:justify-between mt-1"
        id={fileName}
      >
        <div className="w-full flex justify-between mb-4 sm:mb-0">
          <label>
            <p className="text-white text-base font-bold md:text-lg bg-blue-850 px-2 sm:px-5 py-2 rounded-lg cursor-pointer w-max">
              Choose File
            </p>
            <input
              name={fileName}
              type="file"
              accept=".pdf"
              onChange={(e) => {
                setFile(e.target.files[0])
                setNewFileSelected(true)
              }}
              className="hidden"
            />
          </label>
          <input
            type="text"
            disabled
            value={file ? file.name : !newFileSelected ? `${fileName}.pdf` : ''}
            className="sm:mr-4 w-full bg-white rounded-r-lg md:text-lg py-2 px-2"
          />
        </div>
        <button
          className={`text-white text-base font-bold md:text-lg mb-4 sm:mb-0 px-5 py-2 rounded-lg w-min ${
            !newFileSelected
              ? 'bg-green-850'
              : file
              ? 'bg-red-850'
              : 'bg-red-860 cursor-not-allowed'
          }`}
          onClick={() => {
            if (newFileSelected) upload()
          }}
        >
          Upload
        </button>
      </div>
      {error ? (
        <p className="text-red-850 text-center pt-1">
          <span className="font-bold">Error:</span> {error}
        </p>
      ) : null}
    </>
  )
}

export default FileUploadComponent
