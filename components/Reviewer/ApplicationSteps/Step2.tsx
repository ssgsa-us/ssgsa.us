import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { Dispatch, SetStateAction, useState } from 'react'
import ProceedButtons from './ProceedButtons'
import AcademicRecord from '../../ReviewApplicationSteps/AcademicRecord'
import CheckBoxInput from '../../ApplicationSteps/Checkboxes'
import TextInput from '../../ApplicationSteps/TextInput'
import Field from '../../ReviewApplicationSteps/Field'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const ReviewerStep2 = ({
  applicationData,
  adminPortalData,
  status,
  setStatus,
}: Props) => {
  const [error, setError] = useState<string>('')
  const academicRecord = applicationData.academic_record

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Educational Qualifications
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 2 - Instruction 1
        </p>
      </div>

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
                <div className="mb-10">
                  <CheckBoxInput
                    name="Does the applicant’s reported CGPA/percentage match with their marksheet (rounded off to two decimal places)?"
                    value={true}
                    onChange={(e, optionValue) => {}}
                    required={true}
                    options={[
                      { label: 'Yes', value: true },
                      { label: 'No', value: false },
                    ]}
                  />
                  <div className="md:w-1/2">
                    <TextInput
                      name={
                        academicRecord[Number(key)].gradeCriteria === 'CGPA'
                          ? 'Enter Correct CGPA'
                          : 'Enter Correct Cumulative Percentage'
                      }
                      value={5}
                      type="number"
                      onChange={(e) => {
                        const maximum =
                          academicRecord[key].gradeCriteria === 'CGPA'
                            ? 10
                            : 100
                        if (
                          Number(e.target.value) <= maximum &&
                          Number(e.target.value) >= 0
                        )
                          true
                      }}
                      required={true}
                      step="0.01"
                      minimum={0}
                      maximum={
                        academicRecord[key].gradeCriteria === 'CGPA' ? 10 : 100
                      }
                    />
                  </div>
                </div>
              </>
            ))
        )}
      </div>

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Education Qualifications Marks
        </h1>
        <Field name="Total Marks (out of academicRecordPoints)" value={1} />
      </div>

      <ProceedButtons
        formStatus={applicationData.form_status}
        status={status}
        setStatus={setStatus}
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default ReviewerStep2
