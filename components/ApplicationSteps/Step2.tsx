import { useState } from 'react'
import ProceedButtons from './ProceedButtons'

type RecordType = {
  [key: number]: {
    category: number
    branch: string
    collegeName: string
    duration: number
    completionYear: number
    percentage: string
  }
}

const defaultRecord = {
  category: 0,
  branch: '',
  collegeName: '',
  duration: 1,
  completionYear: 2022,
  percentage: '',
}

const Step2 = ({ status, formStatus, setStatus, setFormStatus }) => {
  const [totalDegree, setTotalDegree] = useState<number>(1)
  const [academicRecords, setAcademicRecords] = useState<RecordType>({
    0: defaultRecord,
  })
  const [error, setError] = useState<string>('')

  // return True if category is bachelor's, diploma, XII or X
  const requiredCondition = (key) =>
    academicRecords[key].category == 1 ||
    academicRecords[key].category == 2 ||
    academicRecords[key].category == 3 ||
    academicRecords[key].category == 4

  const checkAllFields = (key) =>
    academicRecords[key].branch &&
    academicRecords[key].collegeName &&
    academicRecords[key].completionYear &&
    academicRecords[key].duration &&
    academicRecords[key].percentage

  const nextStep = () => {
    setError('')
    if (totalDegree >= 3) {
      // flag checks degrees X, XII/Diploma and Bachelor's are filled or not
      // flag ranges from 0 to 7 acc to it's boolean format as shown:
      // <X digit    XII/Diploma digit    Bachelor's digit>
      // <   1             1                   1          > indicates flag = 7 and all 3 degree's are filled
      let flag = 0
      let totalCourseDuration = 0
      for (let key = 0; key < totalDegree; key++) {
        if (academicRecords[key].category == 1) {
          if (checkAllFields(key)) flag += 4
          else {
            setError('All fields in X are required')
            flag = -1
            break
          }
        } else if (
          academicRecords[key].category == 2 ||
          academicRecords[key].category == 3
        ) {
          if (checkAllFields(key)) flag += 2
          else {
            setError('All fields in XII/Diploma are required')
            flag = -1
            break
          }
        } else if (academicRecords[key].category == 4) {
          if (checkAllFields(key)) {
            totalCourseDuration += academicRecords[key].duration
            flag += 1
          } else {
            setError("All fields in Bachelor's are required")
            flag = -1
            break
          }
        } else if (academicRecords[key].category == 5) {
          if (checkAllFields(key))
            totalCourseDuration += academicRecords[key].duration
        }
      }

      if (flag == -1) return
      if (flag == 7) {
        if (totalCourseDuration >= 4) {
          if (formStatus == 2) {
            setStatus(3)
            setFormStatus(3)
          } else {
            setStatus(3)
          }
        } else
          setError('Please check eligibility criteria or provide correct data')
      } else setError("X, XII/Diploma and bachelor's degrees are required")
    } else setError("X, XII/Diploma and bachelor's degrees are required")
  }

  const previousStep = () => {
    setStatus(1)
  }

  const saveInformation = () => {}

  return (
    <div>
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2">
          Note: Remember to save your information at frequent intervals.
        </p>
        <div>
          {Object.keys(academicRecords).map((key) => (
            <div className="my-10" key={key}>
              <div className="p-2">
                <p className="font-bold text-lg md:text-xl">Academic Record</p>
                <select
                  name="Category"
                  value={academicRecords[key].category}
                  onChange={(e) =>
                    setAcademicRecords((prevDegree: RecordType) => ({
                      ...prevDegree,
                      [key]: {
                        ...prevDegree[key],
                        category: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full rounded-xl p-3"
                >
                  <option label="Select Category" value={0} />
                  <option label="Doctoral Degree" value={6} />
                  <option label="Master's Degree" value={5} />
                  <option label="Bachelor's Degree" value={4} />
                  <option label="Diploma" value={3} />
                  <option label="XII Class" value={2} />
                  <option label="X Class" value={1} />
                </select>
              </div>
              <div className="p-2">
                <p className="md:text-lg">
                  Major/Branch
                  {requiredCondition(key) ? (
                    <span className="text-red-850 font-black">*</span>
                  ) : null}
                </p>
                <input
                  name="Branch"
                  type="text"
                  value={academicRecords[key].branch}
                  onChange={(e) =>
                    setAcademicRecords((prevDegree: RecordType) => ({
                      ...prevDegree,
                      [key]: {
                        ...prevDegree[key],
                        branch: e.target.value,
                      },
                    }))
                  }
                  className="w-full rounded-xl p-2 mt-1"
                />
              </div>
              <div className="p-2">
                <p className="md:text-lg leading-none">
                  Name Of College/University
                  {requiredCondition(key) ? (
                    <span className="text-red-850 font-black">*</span>
                  ) : null}
                </p>
                <input
                  name="College Name"
                  type="email"
                  value={academicRecords[key].collegeName}
                  onChange={(e) =>
                    setAcademicRecords((prevDegree: RecordType) => ({
                      ...prevDegree,
                      [key]: {
                        ...prevDegree[key],
                        collegeName: e.target.value,
                      },
                    }))
                  }
                  className="w-full rounded-xl p-2 mt-1"
                />
              </div>
              <div className="p-2">
                <p className="md:text-lg leading-none">
                  Course Duration
                  {requiredCondition(key) ? (
                    <span className="text-red-850 font-black">*</span>
                  ) : null}{' '}
                  <span className="text-xs md:text-sm">(number of years)</span>
                </p>
                <input
                  name="Duration"
                  type="number"
                  value={academicRecords[key].duration}
                  onChange={(e) =>
                    setAcademicRecords((prevDegree: RecordType) => ({
                      ...prevDegree,
                      [key]: {
                        ...prevDegree[key],
                        duration: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full rounded-xl p-2 mt-1"
                />
              </div>
              <div className="p-2">
                <p className="md:text-lg">
                  Year/Expected Year of Completion
                  {requiredCondition(key) ? (
                    <span className="text-red-850 font-black">*</span>
                  ) : null}
                </p>
                <input
                  name="Comletion Year"
                  type="number"
                  value={academicRecords[key].completionYear}
                  onChange={(e) =>
                    setAcademicRecords((prevDegree: RecordType) => ({
                      ...prevDegree,
                      [key]: {
                        ...prevDegree[key],
                        completionYear: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full rounded-xl p-2 mt-1"
                />
              </div>
              <div className="p-2">
                <p className="md:text-lg">
                  Percentage/CGPA
                  {requiredCondition(key) ? (
                    <span className="text-red-850 font-black">*</span>
                  ) : null}{' '}
                  <span className="text-xs md:text-sm">
                    (Please write your score as numerator and maximum score as
                    denominator)
                  </span>
                </p>
                <input
                  name="Percentage"
                  type="text"
                  value={academicRecords[key].percentage}
                  onChange={(e) =>
                    setAcademicRecords((prevDegree: RecordType) => ({
                      ...prevDegree,
                      [key]: {
                        ...prevDegree[key],
                        percentage: e.target.value,
                      },
                    }))
                  }
                  className="w-full rounded-xl p-2 mt-1"
                />
              </div>
            </div>
          ))}
        </div>
        <p
          className={`text-xs sm:text-sm md:text-base font-extrabold w-max pr-2 pl-2 ${
            totalDegree < 6
              ? 'text-blue-850 cursor-pointer'
              : 'text-blue-860 cursor-not-allowed'
          }`}
          onClick={() => {
            if (totalDegree < 6) {
              setAcademicRecords((prevRecord: RecordType) => ({
                ...prevRecord,
                [totalDegree]: defaultRecord,
              }))
              setTotalDegree((prevTotal: number) => prevTotal + 1)
            }
          }}
        >
          Add a Degree +
        </p>
      </div>
      <ProceedButtons
        status={status}
        previousStep={previousStep}
        nextStep={nextStep}
        saveInformation={saveInformation}
        error={error}
      />
    </div>
  )
}

export default Step2
