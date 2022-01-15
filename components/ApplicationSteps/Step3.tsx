import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ProceedButtons from './ProceedButtons'
import { useAuth } from '../../context/AuthUserContext'
import { AnswerType, TestTakenType } from '../../types'
import { updateApplicationData } from '../../pages/api/step3'
import { ApplicationData } from '../../classes/application_data'

type Props = {
  applicationData: ApplicationData
  status: Number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step3 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  const [answers, setAnswers] = useState<AnswerType>({})
  const [testTakens, setTestTakens] = useState<TestTakenType>({
    gre: false,
    toefl: false,
    ielts: false,
    gmat: false,
  })
  const [isTestTaken, setIsTestTaken] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const questionComponent = (index, question) => (
    <div className="p-2">
      <p className="font-bold md:text-lg">
        {String.fromCharCode(index + 97)}) {question}
        <span className="text-red-850 font-black">*</span>
      </p>
      <textarea
        name={`SOP${index}`}
        rows={4}
        cols={10}
        value={answers[`SOP${index}`]}
        onChange={(e) =>
          setAnswers((prevAnswers: AnswerType) => {
            return {
              ...prevAnswers,
              [`SOP${index}`]: e.target.value,
            }
          })
        }
        className="w-full rounded-xl p-2 mt-1"
      />
    </div>
  )

  useEffect(() => {
    setAnswers(applicationData.sop_answers || {})
    if (applicationData.test_takens) {
      setTestTakens(applicationData.test_takens)
      if (
        !applicationData.test_takens.gre &&
        !applicationData.test_takens.toefl &&
        !applicationData.test_takens.ielts &&
        !applicationData.test_takens.gmat
      ) {
        setIsTestTaken(true)
      }
    }
  }, [applicationData])

  const nextStep = () => {
    if (
      isTestTaken ||
      testTakens.gre ||
      testTakens.toefl ||
      testTakens.ielts ||
      testTakens.gmat
    ) {
      if (!answers['SOP1'] || answers['SOP1'].split(' ').length >= 200) {
        if (!answers['SOP2'] || answers['SOP2'].split(' ').length >= 200) {
          if (!answers['SOP3'] || answers['SOP3'].split(' ').length >= 200) {
            if (!answers['SOP4'] || answers['SOP4'].split(' ').length >= 200) {
              if (
                !answers['SOP5'] ||
                answers['SOP5'].split(' ').length >= 200
              ) {
                if (applicationData.form_status == 3) {
                  updateApplicationData(authUser.id, testTakens, answers, 4)
                  setStatus(4)
                } else {
                  setStatus(4)
                  updateApplicationData(
                    authUser.id,
                    testTakens,
                    answers,
                    applicationData.form_status,
                  )
                }
              } else setError(`Min Length required in Question f is 200.`)
            } else setError(`Min Length required in Question e is 200.`)
          } else setError(`Min Length required in Question d is 200.`)
        } else setError(`Min Length required in Question c is 200.`)
      } else setError(`Min Length required in Question b is 200.`)
    } else setError('Question a is mandatory.')
  }

  const previousStep = () => setStatus(1)

  const saveInformation = () =>
    updateApplicationData(
      authUser.id,
      testTakens,
      answers,
      applicationData.form_status,
    )

  return (
    <div>
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2">
          Note: Remember to save your information at frequent intervals.
        </p>
        <br />
        <div className="p-2">
          <p className="font-bold md:text-lg">
            a) Have you taken any International Language/Aptitude Testing Exam
            so far?
            <br />
            Select all that apply
            <span className="text-red-850 font-black">*</span>
          </p>
          <div className="pl-5">
            <div>
              <input
                type="checkbox"
                checked={testTakens.gre}
                onClick={() => {
                  setTestTakens((prev) => {
                    return { ...prev, gre: !testTakens.gre }
                  })
                  setIsTestTaken(false)
                }}
              />
              <label className="text-lg mx-2">GRE</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={testTakens.toefl}
                onClick={() => {
                  setTestTakens((prev) => {
                    return { ...prev, toefl: !testTakens.toefl }
                  })
                  setIsTestTaken(false)
                }}
              />
              <label className="text-lg mx-2">TOEFL</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={testTakens.ielts}
                onClick={() => {
                  setTestTakens((prev) => {
                    return { ...prev, ielts: !testTakens.ielts }
                  })
                  setIsTestTaken(false)
                }}
              />
              <label className="text-lg mx-2">IELTS</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={testTakens.gmat}
                onClick={() => {
                  setTestTakens((prev) => {
                    return { ...prev, gmat: !testTakens.gmat }
                  })
                  setIsTestTaken(false)
                }}
              />
              <label className="text-lg mx-2">GMAT</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={isTestTaken}
                onClick={() => {
                  setTestTakens({
                    gre: false,
                    toefl: false,
                    ielts: false,
                    gmat: false,
                  })
                  setIsTestTaken(!isTestTaken)
                }}
              />
              <label className="text-lg mx-2">I plan to take it soon</label>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-sm">
              Note: You need to have a passport to appear for GRE and TOEFL. We
              suggest that you apply for a passport if you have not already.
            </p>
          </div>
        </div>
        {questionComponent(1, process.env.NEXT_PUBLIC_QUESTION_1)}
        {questionComponent(2, process.env.NEXT_PUBLIC_QUESTION_2)}
        {questionComponent(3, process.env.NEXT_PUBLIC_QUESTION_3)}
        {questionComponent(4, process.env.NEXT_PUBLIC_QUESTION_4)}
        {questionComponent(5, process.env.NEXT_PUBLIC_QUESTION_5)}
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

export default Step3
