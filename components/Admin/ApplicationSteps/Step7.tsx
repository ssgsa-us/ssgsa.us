import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const AdminStep7 = ({
  applId,
  applicationData,
  adminPortalData,
  status,
  setStatus,
}: Props) => {
  const [error, setError] = useState<string>('')
  const reviewerId = ''

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5 mb-10">
          Review Marks
        </h1>
        {/* <Field
          name={`Educational Qualification ${process.env.NEXT_PUBLIC_REVIEW_ACADEMIC_MAX_MARKS}`}
          value={adminPortalData.review_marks[reviewerId].totalAcademicMarks}
        />
        <Field
          name={`Academic / Curricular Activities ${process.env.NEXT_PUBLIC_REVIEW_CURRICULAR_MAX_MARKS}`}
          value={adminPortalData.review_marks[reviewerId].curricularMarks}
        />
        <Field
          name={`Extracurricular Activities ${process.env.NEXT_PUBLIC_REVIEW_EXTRACURRICULAR_MAX_MARKS}`}
          value={adminPortalData.review_marks[reviewerId].extracurricularMarks}
        />
        <Field
          name={`Essay-Type Questions ${process.env.NEXT_PUBLIC_REVIEW_SOP_MAX_MARKS}`}
          value={adminPortalData.review_marks[reviewerId].totalSOPMarks}
        />
        <Field
          name="Total Marks (out of 100)"
          value={adminPortalData.review_marks[reviewerId].totalMarks}
        />
        <Field
          name="Remark"
          value={adminPortalData.review_marks[reviewerId].remark}
        /> */}
      </div>

      <ProceedButtons status={status} setStatus={setStatus} error={error} />
    </div>
  )
}

export default AdminStep7
