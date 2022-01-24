import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import ProceedButtons from './ProceedButtons'
import { useAuth } from '../../context/AuthUserContext'
import { updateFormStatus, uploadDocument } from '../../pages/api/step4'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step4 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  const [Xth, setXth] = useState<File>()
  const [XthUploaded, setXthUploaded] = useState<boolean>(false)
  const [XIIthOrDiploma, setXIIthOrDiploma] = useState<File>()
  const [XIIthOrDiplomaUploaded, setXIIthOrDiplomaUploaded] =
    useState<boolean>(false)
  const [bachelors, setBachelors] = useState<File>()
  const [bachelorsUploaded, setBachelorsUploaded] = useState<boolean>(false)
  const [masters, setMasters] = useState<File>()
  const [mastersUploaded, setMastersUploaded] = useState<boolean>(false)
  const [others, setOthers] = useState<File>()
  const [othersUploaded, setOthersUploaded] = useState<boolean>(false)
  const [resume, setResume] = useState<File>()
  const [resumeUploaded, setResumeUploaded] = useState<boolean>(false)
  const [certificates, setCertificates] = useState<File>()
  const [certificatesUploaded, setCertificatesUploaded] =
    useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (applicationData.documents) {
      if (applicationData.documents['Xth']) setXthUploaded(true)
      if (
        applicationData.documents['XIIth'] ||
        applicationData.documents['Diploma']
      )
        setXIIthOrDiplomaUploaded(true)
      if (applicationData.documents['Bachelors']) setBachelorsUploaded(true)
      if (applicationData.documents['Masters']) setMastersUploaded(true)
      if (applicationData.documents['Others']) setOthersUploaded(true)
      if (applicationData.documents['Resume']) setResumeUploaded(true)
      if (applicationData.documents['Certificates'])
        setCertificatesUploaded(true)
    }
  }, [applicationData])

  const nextStep = () => {
    setError('')
      if (XIIthOrDiplomaUploaded) {
        if (bachelorsUploaded) {
          if (resumeUploaded) {
            if (applicationData.form_status == 4) {
              updateFormStatus(authUser.id, 5)
              setStatus(5)
            } else {
              setStatus(5)
            }
          } else setError('Resume is required')
        } else setError('Bachelor Marksheets are required')
      } else
        setError(
          `${
            applicationData.academic_record['XII Class']
              ? 'XIIth Class'
              : 'Diploma'
          } Marksheet is required`,
        )
  }

  const previousStep = () => setStatus(status - 1)

  const saveInformation = () => {}

  const fileUploadComponent = (
    fileName: string,
    file: File,
    setFile: Dispatch<SetStateAction<File>>,
    isFileUploaded: boolean,
    setIsFileUploaded: Dispatch<SetStateAction<boolean>>,
  ) => (
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
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>
        <input
          type="text"
          disabled
          value={file ? file.name : isFileUploaded ? `${fileName}.pdf` : ''}
          className="sm:mr-4 w-full bg-white rounded-r-lg md:text-lg py-2 px-2"
        />
      </div>
      <button
        className="text-white text-base font-bold md:text-lg bg-red-850 mb-4 sm:mb-0 px-5 py-2 rounded-lg w-min"
        onClick={() => {
          setError('')
          if (file)
            if (file.size <= 600000)
              uploadDocument(authUser.id, fileName, file).then(() =>
                setIsFileUploaded(true),
              )
            else setError('Maximum allowed file size is 500KB.')
        }}
      >
        Upload
      </button>
    </div>
  )

  return (
    <div>
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2">
          Note: Remember to save your information at frequent intervals.
        </p>
        <br />
        <div className="p-2">
          <p className="md:text-lg">
            Please attach a <span className="font-bold">single pdf file </span>
            containing marksheet of <span className="font-bold">Xth Class</span>
            <br />
            The maximum allowed file size is{' '}
            <span className="font-bold">500 KB</span>
          </p>
          {fileUploadComponent('Xth', Xth, setXth, XthUploaded, setXthUploaded)}
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            Please attach a <span className="font-bold">single pdf file </span>
            containing marksheet of{' '}
            <span className="font-bold">
              {applicationData.academic_record &&
              applicationData.academic_record['XII Class']
                ? 'XIIth Class'
                : 'Diploma'}
            </span>
            <span className="text-red-850 font-black">*</span>
            <br />
            The maximum allowed file size is{' '}
            <span className="font-bold">500 KB</span>
          </p>
          {fileUploadComponent(
            applicationData.academic_record &&
              applicationData.academic_record['XII Class']
              ? 'XIIth'
              : 'Diploma',
            XIIthOrDiploma,
            setXIIthOrDiploma,
            XIIthOrDiplomaUploaded,
            setXIIthOrDiplomaUploaded,
          )}
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            Please attach a <span className="font-bold">single pdf file </span>
            containing all marksheets of{' '}
            <span className="font-bold">your Bachelor&apos;s Degree</span>
            <span className="text-red-850 font-black">*</span>
            <br />
            The maximum allowed file size is{' '}
            <span className="font-bold">500 KB</span>
          </p>
          {fileUploadComponent(
            'Bachelors',
            bachelors,
            setBachelors,
            bachelorsUploaded,
            setBachelorsUploaded,
          )}
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            Please attach a <span className="font-bold">single pdf file </span>
            containing all marksheets of{' '}
            <span className="font-bold">your Master&apos;s Degree</span> (if
            any)
            <br />
            The maximum allowed file size is{' '}
            <span className="font-bold">500 KB</span>
          </p>
          {fileUploadComponent(
            'Masters',
            masters,
            setMasters,
            mastersUploaded,
            setMastersUploaded,
          )}
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            Please attach a <span className="font-bold">single pdf file </span>
            containing all marksheets of{' '}
            <span className="font-bold">
              any other degrees/diploma you hold
            </span>{' '}
            (if any)
            <br />
            The maximum allowed file size is{' '}
            <span className="font-bold">500 KB</span>
          </p>
          {fileUploadComponent(
            'Others',
            others,
            setOthers,
            othersUploaded,
            setOthersUploaded,
          )}
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            Please attach a <span className="font-bold">single pdf file </span>
            containing your <span className="font-bold">Resume</span>
            <span className="text-red-850 font-black">*</span>
            <br />
            The maximum allowed file size is{' '}
            <span className="font-bold">500 KB</span>
          </p>
          {fileUploadComponent(
            'Resume',
            resume,
            setResume,
            resumeUploaded,
            setResumeUploaded,
          )}
        </div>
        <div className="p-2">
          <p className="md:text-lg">
            Please attach a <span className="font-bold">single pdf file </span>
            containing all{' '}
            <span className="font-bold">
              certificates, proofs of extra-curricular activities, or any
              documents that may support your SSGSA application
            </span>
            <br />
            The maximum allowed file size is{' '}
            <span className="font-bold">500 KB</span>
          </p>
          {fileUploadComponent(
            'Certificates',
            certificates,
            setCertificates,
            certificatesUploaded,
            setCertificatesUploaded,
          )}
        </div>
      </div>
      <ProceedButtons
        status={status}
        formStatus={applicationData.form_status}
        previousStep={previousStep}
        nextStep={nextStep}
        saveInformation={saveInformation}
        error={error}
      />
    </div>
  )
}

export default Step4
