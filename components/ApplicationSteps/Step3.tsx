import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ProceedButtons from './ProceedButtons'
import { useAuth } from '../../context/AuthUserContext'
import { AnswerType, TestTakenType } from '../../types'
import { updateApplicationData } from '../../pages/api/step3'
import { ApplicationData } from '../../classes/application_data'

type QuestionType = {
  [key: number]: string
}

type Props = {
  applicationData: ApplicationData
  status: Number
  setStatus: Dispatch<SetStateAction<Number>>
  questions?: QuestionType
}

const Step3 = ({
  applicationData,
  status,
  setStatus,
  questions = {},
}: Props) => {
  const { authUser } = useAuth()
  const [answers, setAnswers] = useState<AnswerType>({})
  const [testTakens, setTestTakens] = useState<TestTakenType>({
    gre: false,
    toefl: false,
    ielts: false,
    gmat: false,
  })
  const [isTestTaken, setIsTestTaken] = useState<boolean>(false)
  const [questionsComponents, setQuestionsComponents] = useState<
    Array<JSX.Element>
  >([])
  const [error, setError] = useState<string>('')

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

  useEffect(() => {
    setQuestionsComponents([])
    for (let i = 1; i <= Number(process.env.NEXT_PUBLIC_TOTAL_QUESTIONS); i++) {
      setQuestionsComponents((prevQuestions) => [
        ...prevQuestions,
        <div className="p-2" key={i}>
          <p className="font-bold md:text-lg">
            {String.fromCharCode(i + 97)}) {questions[i]}
            <span className="text-red-850 font-black">*</span>
          </p>
          <textarea
            name={`SOP${i}`}
            rows={4}
            cols={10}
            value={answers[`SOP${i}`]}
            onChange={(e) =>
              setAnswers((prevAnswers: AnswerType) => {
                return {
                  ...prevAnswers,
                  [`SOP${i}`]: e.target.value,
                }
              })
            }
            className="w-full rounded-xl p-2 mt-1"
          />
        </div>,
      ])
    }
  }, [answers])

  const nextStep = () => {
    if (
      isTestTaken ||
      testTakens.gre ||
      testTakens.toefl ||
      testTakens.ielts ||
      testTakens.gmat
    ) {
      let flag: boolean = true
      for (
        let i = 1;
        i <= Number(process.env.NEXT_PUBLIC_TOTAL_QUESTIONS);
        i++
      ) {
        if (!answers[`SOP${i}`] || answers[`SOP${i}`].split(' ').length < 200) {
          flag = false
          setError(
            `Min Length required in Question ${String.fromCharCode(
              i + 97,
            )} is 200.`,
          )
          break
        }
      }

      if (flag) {
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
      }
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
              suggest that you apply for a passport if you haven't already.
            </p>
          </div>
        </div>
        {questionsComponents.map((question) => question)}
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

export async function getServerSideProps() {
  const questions: QuestionType = {}

  for (let i = 1; i <= Number(process.env.NEXT_PUBLIC_TOTAL_QUESTIONS); i++) {
    questions[1] = process.env[`NEXT_PUBLIC_QUESTION_${i}`]
  }

  return {
    props: {
      questions,
    },
  }
}
