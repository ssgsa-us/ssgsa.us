import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthUserContext'
import { uploadDocument } from '../../pages/api/uploadDocument'
import '@fortawesome/fontawesome-svg-core/styles.css' // import for spin

type Props = {
  fileName: string
  fileUrl: string
  setFileUrl: (url: string) => void
}

const FileUploadComponent = ({ fileName, fileUrl, setFileUrl }: Props) => {
  const { authUser } = useAuth()
  const [file, setFile] = useState<File>()
  const [newFileSelected, setNewFileSelected] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const upload = async () => {
    setLoading(true)
    setError('')
    if (file)
      if (file.size <= 1100000) {
        try {
          const downloadURL: string = await uploadDocument(
            authUser.id,
            fileName,
            file,
          )
          setFileUrl(downloadURL)
          setNewFileSelected(false)
        } catch {
          setError('Try again, network error!')
        }
      } else setError('Maximum allowed file size is 1MB.')
    setLoading(false)
  }

  useEffect(() => {
    setNewFileSelected(!fileUrl)
  }, [fileUrl])

  return (
    <>
      <div>
        <p className="md:text-sm text-red-850">
          The maximum allowed file size is 1 MB.{' '}
          {!file ? null : (
            <span className="text-sm md:text-xs">
              (Uploading document will not require saving information)
            </span>
          )}
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
              accept="application/pdf"
              onChange={(e) => {
                if (e.target.files[0]) {
                  if (e.target.files[0].name.split('.')[1] === 'pdf') {
                    setFile(e.target.files[0])
                    setNewFileSelected(true)
                  } else {
                    setError('Invalid File Type')
                  }
                }
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
            if (newFileSelected && !loading) upload()
          }}
        >
          {!loading ? (
            'Upload'
          ) : (
            <FontAwesomeIcon
              icon={faSpinner}
              width={30}
              spin={true}
              className="mx-5"
            />
          )}
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
