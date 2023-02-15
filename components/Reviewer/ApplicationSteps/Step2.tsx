import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { step2 } from '../../../pages/api/updateReviewMarks'
import {
  AcademicRecordType,
  ReviewMarksType,
  ReviewerInstructionsType,
} from '../../../types'
import CheckBoxInput from '../../ApplicationSteps/Checkboxes'
import TextInput from '../../ApplicationSteps/TextInput'
import AcademicRecord from '../../ReviewApplicationSteps/AcademicRecord'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  instructions: ReviewerInstructionsType
}

const ReviewerStep2 = ({
  applId,
  applicationData,
  adminPortalData,
  formStatus,
  status,
  setStatus,
  instructions,
}: Props) => {
  const { authUser } = useAuth()
  const [academicGrades, setAcademicGrades] = useState<
    ReviewMarksType[string]['academicGrades']
  >({})
  const [totalGrades, setTotalGrades] = useState<number>(0)
  const [error, setError] = useState<string>('')
  const academicRecord: AcademicRecordType = applicationData.academic_record

  useEffect(() => {
    if (
      adminPortalData.review_marks &&
      adminPortalData.review_marks[authUser.id]
    ) {
      if (adminPortalData.review_marks[authUser.id].academicGrades)
        setAcademicGrades(
          adminPortalData.review_marks[authUser.id].academicGrades,
        )

      if (adminPortalData.review_marks[authUser.id].totalAcademicMarks)
        setTotalGrades(
          adminPortalData.review_marks[authUser.id].totalAcademicMarks,
        )
      else updateTotalGrades()
    }
  }, [adminPortalData])

  const updateTotalGrades = () => {
    let bachelorGrades = 0
    let masterGrades = 0

    Object.keys(academicRecord).map((key) => {
      // Convert CGPA to percentage
      let percentage =
        academicRecord[Number(key)].gradeCriteria === 'CGPA'
          ? academicRecord[Number(key)].grades * 10
          : academicRecord[Number(key)].grades
      if (
        academicGrades[Number(key)] &&
        academicGrades[Number(key)].isGradeCorrect === false
      )
        percentage =
          academicRecord[Number(key)].gradeCriteria === 'CGPA'
            ? academicGrades[Number(key)].correctGrades * 10
            : academicGrades[Number(key)].correctGrades

      if (academicRecord[Number(key)].degreeLevel === 'Bachelor')
        bachelorGrades = Math.max(bachelorGrades, percentage)
      else if (
        academicRecord[Number(key)].degreeLevel === 'Master' &&
        academicRecord[Number(key)].grades !== 1
      )
        masterGrades = Math.max(masterGrades, percentage)
    })

    let total
    if (masterGrades)
      total =
        Math.round(
          masterGrades * (instructions.ACADEMIC_MAX_MARKS / 2) +
            bachelorGrades * (instructions.ACADEMIC_MAX_MARKS / 2),
        ) / 100
    else
      total = Math.round(bachelorGrades * instructions.ACADEMIC_MAX_MARKS) / 100

    setTotalGrades(total)
    return total
  }

  const validation = () => {
    let validate: boolean = true

    Object.keys(academicRecord).map((key, index) => {
      if (
        !academicGrades[Number(key)] ||
        academicGrades[Number(key)].isGradeCorrect === null
      ) {
        validate = false
        setError(
          'Please check if grade is correct or not in Academic Record ' +
            String(index),
        )
      } else if (
        !academicGrades[Number(key)].isGradeCorrect &&
        !academicGrades[Number(key)].correctGrades
      ) {
        validate = false
        setError(
          'Please provide correct grades in Academic Record ' + String(index),
        )
      }
    })

    return validate
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Educational Qualifications
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold m-2">
          <p className="mb-5">{instructions.STEP2_INSTRUCTION}</p>
          <ul style={{ listStyle: 'disc' }} className="ml-2 p-2 pl-4">
            <li className="my-2">{instructions.STEP2_INSTRUCTION1}</li>
            <li className="my-2">{instructions.STEP2_INSTRUCTION2}</li>
          </ul>
          <p className="my-5">
            <span className="text-base md:text-lg text-blue-850 font-black">
              Note:
            </span>{' '}
            For updating total marks, Go to last step and click on complete
            button
          </p>
        </div>
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
                <div className="mb-10 text-blue-850 font-black">
                  <CheckBoxInput
                    name="Does the applicant’s reported CGPA/percentage match with their marksheet (rounded off to two decimal places)?"
                    value={
                      academicGrades[Number(key)]
                        ? academicGrades[Number(key)].isGradeCorrect
                        : null
                    }
                    onChange={(e, optionValue: boolean) => {
                      setAcademicGrades((prev) => ({
                        ...prev,
                        [Number(key)]: {
                          isGradeCorrect: !e.target.checked
                            ? null
                            : optionValue,
                          correctGrades:
                            e.target.checked && !optionValue
                              ? academicRecord[Number(key)].grades
                              : 0,
                        },
                      }))
                    }}
                    required={true}
                    options={[
                      { label: 'Yes', value: true },
                      { label: 'No', value: false },
                    ]}
                  />
                  {academicGrades[Number(key)] &&
                  academicGrades[Number(key)].isGradeCorrect === false ? (
                    <div className="md:w-1/2">
                      <TextInput
                        name={
                          academicRecord[Number(key)].gradeCriteria === 'CGPA'
                            ? 'Enter Correct CGPA'
                            : 'Enter Correct Cumulative Percentage'
                        }
                        value={
                          academicGrades[Number(key)]
                            ? academicGrades[Number(key)].correctGrades
                            : null
                        }
                        type="number"
                        onChange={(e) => {
                          const maximum =
                            academicRecord[key].gradeCriteria === 'CGPA'
                              ? 10
                              : 100
                          if (
                            Number(e.target.value) <= maximum &&
                            Number(e.target.value) >= 0
                          ) {
                            setAcademicGrades((prev) => ({
                              ...prev,
                              [Number(key)]: {
                                isGradeCorrect: false,
                                correctGrades: Number(e.target.value),
                              },
                            }))
                          }
                        }}
                        required={true}
                        step="0.01"
                        minimum={0}
                        maximum={
                          academicRecord[key].gradeCriteria === 'CGPA'
                            ? 10
                            : 100
                        }
                      />
                    </div>
                  ) : null}
                </div>
              </>
            ))
        )}
      </div>

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Education Qualifications Marks
        </h1>
        <Field
          name={`Total Marks (out of ${instructions.ACADEMIC_MAX_MARKS})`}
          value={totalGrades}
        />
        <div className="flex justify-center mt-10">
          <button
            onClick={updateTotalGrades}
            className="text-white text-base md:text-lg bg-blue-850 py-2 px-5 rounded-lg cursor-pointer"
          >
            Calculate Total Grades
          </button>
        </div>
      </div>

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={validation}
        updateReviewMarks={(newStatus: number) => {
          let total = updateTotalGrades()
          return step2(applId, authUser.id, academicGrades, total, newStatus)
        }}
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default ReviewerStep2
