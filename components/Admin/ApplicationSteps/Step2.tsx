import { Dispatch, SetStateAction } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { AcademicRecordType } from '../../../types'
import AcademicRecord from '../../ReviewApplicationSteps/AcademicRecord'
import ProceedButtons from './ProceedButtons'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const AdminStep2 = ({
  applicationData,
  adminPortalData,
  status,
  setStatus,
}: Props) => {
  const academicRecord: AcademicRecordType = applicationData.academic_record
  // const academicGrades: ReviewMarksType[string]['academicGrades'] = adminPortalData.review_marks[reviewerId].academicGrades
  // const totalGrades: number = adminPortalData.review_marks[reviewerId].totalAcademicMarks

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Education Qualifications
        </h1>
        {!academicRecord || !Object.keys(academicRecord).length ? (
          <p className="font-bold mb-4">No Academic Record Added</p>
        ) : (
          Object.keys(academicRecord)
            .sort()
            .map((key, index) => (
              <>
                <AcademicRecord
                  academicRecord={academicRecord}
                  index={index}
                  id={Number(key)}
                  key={key}
                />
                {/* Show Marks given by each reviewer if reviewed for this degree */}
              </>
            ))
        )}
      </div>

      {/* <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Education Qualifications Marks
        </h1>
        <Field
          name={`Total Marks (out of ${process.env.NEXT_PUBLIC_REVIEW_ACADEMIC_MAX_MARKS})`}
          value={totalGrades}
        />
      </div> */}

      <ProceedButtons status={status} setStatus={setStatus} error="" />
    </div>
  )
}

export default AdminStep2
