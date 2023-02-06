import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { Dispatch, SetStateAction, useState } from 'react'
import ProceedButtons from './ProceedButtons'
import Step8 from '../../ReviewApplicationSteps/Step8'
import Field from '../../ReviewApplicationSteps/Field'
import TextInput from '../../ApplicationSteps/TextInput'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const ReviewerStep5 = ({
  applicationData,
  adminPortalData,
  status,
  setStatus,
}: Props) => {
  const [error, setError] = useState<string>('')
  const sopAnswers = applicationData.sop_answers

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Essay-Type Questions
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 5 - Instruction 1
        </p>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 5 - Instruction 2
        </p>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 5 - Instruction 3
        </p>
      </div>

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Essay-Type Questions
        </h1>
        <div className="mb-20">
          <Field
            name={`a) ${process.env.NEXT_PUBLIC_QUESTION_1}`}
            value={sopAnswers['SOP1']}
          />
          <div className="md:w-1/2">
            <TextInput
              name="Points for Essay (a)"
              value={5}
              type="number"
              onChange={(e) => {
                const maximum = 100
                if (
                  Number(e.target.value) <= maximum &&
                  Number(e.target.value) >= 0
                )
                  true
              }}
              required={true}
              step="0.01"
              minimum={0}
              maximum={100}
            />
          </div>
        </div>
        <div className="mb-20">
          <Field
            name={`b) ${process.env.NEXT_PUBLIC_QUESTION_2}`}
            value={sopAnswers['SOP2']}
          />
          <div className="md:w-1/2">
            <TextInput
              name="Points for Essay (b)"
              value={5}
              type="number"
              onChange={(e) => {
                const maximum = 100
                if (
                  Number(e.target.value) <= maximum &&
                  Number(e.target.value) >= 0
                )
                  true
              }}
              required={true}
              step="0.01"
              minimum={0}
              maximum={100}
            />
          </div>
        </div>
        <div className="mb-20">
          <Field
            name={`c) ${process.env.NEXT_PUBLIC_QUESTION_3}`}
            value={sopAnswers['SOP3']}
          />
          <div className="md:w-1/2">
            <TextInput
              name="Points for Essay (c)"
              value={5}
              type="number"
              onChange={(e) => {
                const maximum = 100
                if (
                  Number(e.target.value) <= maximum &&
                  Number(e.target.value) >= 0
                )
                  true
              }}
              required={true}
              step="0.01"
              minimum={0}
              maximum={100}
            />
          </div>
        </div>
        <div className="mb-20">
          <Field
            name={`d) ${process.env.NEXT_PUBLIC_QUESTION_4}`}
            value={sopAnswers['SOP4']}
          />
          <div className="md:w-1/2">
            <TextInput
              name="Points for Essay (d)"
              value={5}
              type="number"
              onChange={(e) => {
                const maximum = 100
                if (
                  Number(e.target.value) <= maximum &&
                  Number(e.target.value) >= 0
                )
                  true
              }}
              required={true}
              step="0.01"
              minimum={0}
              maximum={100}
            />
          </div>
        </div>

        <div className="mb-5">
          <Field
            name={`e) ${process.env.NEXT_PUBLIC_QUESTION_5}`}
            value={sopAnswers['SOP5']}
          />
          <div className="md:w-1/2">
            <TextInput
              name="Points for Essay (e)"
              value={5}
              type="number"
              onChange={(e) => {
                const maximum = 100
                if (
                  Number(e.target.value) <= maximum &&
                  Number(e.target.value) >= 0
                )
                  true
              }}
              required={true}
              step="0.01"
              minimum={0}
              maximum={100}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Essay-Type Question Marks
        </h1>
        <Field name="Total Marks" value={1} />
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

export default ReviewerStep5
