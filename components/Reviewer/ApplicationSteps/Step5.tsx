import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { step5 } from '../../../pages/api/updateReviewMarks'
import { ReviewMarksType } from '../../../types'
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

const ReviewerStep5 = ({
  applId,
  applicationData,
  adminPortalData,
  formStatus,
  status,
  setStatus,
}: Props) => {
  const { authUser } = useAuth()
  const [sopMarks, setSOPMarks] = useState<ReviewMarksType[string]['sopMarks']>(
    {
      SOP1: null,
      SOP2: null,
      SOP3: null,
      SOP4: null,
      SOP5: null,
    },
  )
  const [totalMarks, setTotalMarks] = useState<number>(0)
  const [error, setError] = useState<string>('')
  const sopAnswers = applicationData.sop_answers

  useEffect(() => {
    if (
      adminPortalData.review_marks &&
      adminPortalData.review_marks[authUser.id]
    ) {
      if (adminPortalData.review_marks[authUser.id].sopMarks)
        setSOPMarks(adminPortalData.review_marks[authUser.id].sopMarks)

      if (adminPortalData.review_marks[authUser.id].totalSOPMarks)
        setTotalMarks(adminPortalData.review_marks[authUser.id].totalSOPMarks)
      else {
        let marks = adminPortalData.review_marks[authUser.id].sopMarks
        let total = 0
        if (marks) {
          if (marks['SOP1']) total += marks['SOP1']
          if (marks['SOP2']) total += marks['SOP2']
          if (marks['SOP3']) total += marks['SOP3']
          if (marks['SOP4']) total += marks['SOP4']
          if (marks['SOP5']) total += marks['SOP5']
        }

        setTotalMarks(total)
      }
    }
  }, [adminPortalData])

  const updateSOPMarks = (key, value) => {
    if (value <= 100 && value >= 0) {
      if (!sopMarks[key]) setTotalMarks((prev) => prev + value)
      else setTotalMarks((prev) => prev - sopMarks[key] + value)
      setSOPMarks((prev) => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  const validation = () => {
    if (sopMarks['SOP1'] === null) {
      setError('Please provide marks in Question (a)')
      return false
    }
    if (sopMarks['SOP2'] === null) {
      setError('Please provide marks in Question (b)')
      return false
    }
    if (sopMarks['SOP3'] === null) {
      setError('Please provide marks in Question (c)')
      return false
    }
    if (sopMarks['SOP4'] === null) {
      setError('Please provide marks in Question (d)')
      return false
    }
    if (sopMarks['SOP5'] === null) {
      setError('Please provide marks in Question (e)')
      return false
    }

    return true
  }

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
              value={sopMarks['SOP1']}
              type="number"
              onChange={(e) => updateSOPMarks('SOP1', Number(e.target.value))}
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
              value={sopMarks['SOP2']}
              type="number"
              onChange={(e) => updateSOPMarks('SOP2', Number(e.target.value))}
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
              value={sopMarks['SOP3']}
              type="number"
              onChange={(e) => updateSOPMarks('SOP3', Number(e.target.value))}
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
              value={sopMarks['SOP4']}
              type="number"
              onChange={(e) => updateSOPMarks('SOP4', Number(e.target.value))}
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
              value={sopMarks['SOP5']}
              type="number"
              onChange={(e) => updateSOPMarks('SOP5', Number(e.target.value))}
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
        <Field name="Total Marks" value={totalMarks} />
      </div>

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={validation}
        updateReviewMarks={(newStatus: number) =>
          step5(applId, authUser.id, sopMarks, totalMarks, newStatus)
        }
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default ReviewerStep5
