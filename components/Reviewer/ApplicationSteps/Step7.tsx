import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { step7 } from '../../../pages/api/updateReviewMarks'
import TextInput from '../../ApplicationSteps/TextInput'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const ReviewerStep7 = ({
  applId,
  applicationData,
  adminPortalData,
  formStatus,
  status,
  setStatus,
}: Props) => {
  const { authUser } = useAuth()
  const [remark, setRemark] = useState<string>('')
  const [totalMarks, setTotalMarks] = useState<number>(0)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (
      adminPortalData.review_marks &&
      adminPortalData.review_marks[authUser.id]
    ) {
      if (adminPortalData.review_marks[authUser.id].remark)
        setRemark(adminPortalData.review_marks[authUser.id].remark)

      setTotalMarks(
        adminPortalData.review_marks[authUser.id].totalAcademicMarks +
          adminPortalData.review_marks[authUser.id].curricularMarks +
          adminPortalData.review_marks[authUser.id].extracurricularMarks +
          adminPortalData.review_marks[authUser.id].totalSOPMarks,
      )
    }
  }, [])

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Review Marks
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold mb-10">
          <p className="mb-5">
            <span className="text-base md:text-lg text-blue-850 font-black">
              Note:
            </span>{' '}
            Click on Complete to finalize reviewing this application
          </p>
        </div>

        <Field
          name={`Educational Qualification ${process.env.NEXT_PUBLIC_REVIEW_ACADEMIC_MAX_MARKS}`}
          value={adminPortalData.review_marks[authUser.id].totalAcademicMarks}
        />
        <Field
          name={`Academic / Curricular Activities ${process.env.NEXT_PUBLIC_REVIEW_CURRICULAR_MAX_MARKS}`}
          value={adminPortalData.review_marks[authUser.id].curricularMarks}
        />
        <Field
          name={`Extracurricular Activities ${process.env.NEXT_PUBLIC_REVIEW_EXTRACURRICULAR_MAX_MARKS}`}
          value={adminPortalData.review_marks[authUser.id].extracurricularMarks}
        />
        <Field
          name={`Essay-Type Questions ${
            Number(process.env.NEXT_PUBLIC_REVIEW_SOP_MAX_MARKS) * 5
          }`}
          value={adminPortalData.review_marks[authUser.id].totalSOPMarks}
        />
        <Field name="Total Marks (out of 100)" value={totalMarks} />
        <div className="md:w-1/2 text-blue-850 font-black">
          <TextInput
            name="Any additional remark for the applicant"
            value={remark}
            type="text"
            onChange={(e) => setRemark(e.target.value)}
            required={false}
          />
        </div>
      </div>

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={() => true}
        updateReviewMarks={(newStatus: number) =>
          step7(applId, authUser.id, remark, totalMarks, newStatus)
        }
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default ReviewerStep7
