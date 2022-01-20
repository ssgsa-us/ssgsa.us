import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ProceedButtons from './ProceedButtons'
import { useAuth } from '../../context/AuthUserContext'
import { AnswerType } from '../../types'
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
  const [error, setError] = useState<string>('')

  const questionComponent = (index, question) => (
    <div className="p-2">
      <p className="font-bold md:text-lg">
        {String.fromCharCode(index + 96)}) {question}
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
  }, [applicationData])

  const nextStep = () => {
    if (
      answers['SOP1'] &&
      answers['SOP1'].split(' ').length >= 20 &&
      answers['SOP1'].split(' ').length <= 200
    ) {
      if (
        answers['SOP2'] &&
        answers['SOP2'].split(' ').length >= 20 &&
        answers['SOP2'].split(' ').length <= 200
      ) {
        if (
          answers['SOP3'] &&
          answers['SOP3'].split(' ').length >= 20 &&
          answers['SOP3'].split(' ').length <= 200
        ) {
          if (
            answers['SOP4'] &&
            answers['SOP4'].split(' ').length >= 20 &&
            answers['SOP4'].split(' ').length <= 200
          ) {
            if (
              answers['SOP5'] &&
              answers['SOP5'].split(' ').length >= 20 &&
              answers['SOP5'].split(' ').length <= 200
            ) {
              if (applicationData.form_status == 3) {
                updateApplicationData(authUser.id, answers, 4)
                setStatus(4)
              } else {
                setStatus(4)
                updateApplicationData(
                  authUser.id,
                  answers,
                  applicationData.form_status,
                )
              }
            } else
              setError(
                `Minimum and maximum Length required in Question e are 20 and 200, respectively.`,
              )
          } else
            setError(
              `Minimum and maximum Length required in Question d are 20 and 200, respectively.`,
            )
        } else
          setError(
            `Minimum and maximum Length required in Question c are 20 and 200, respectively.`,
          )
      } else
        setError(
          `Minimum and maximum Length required in Question b are 20 and 200, respectively.`,
        )
    } else
      setError(
        `Minimum and maximum Length required in Question a are 20 and 200, respectively.`,
      )
  }

  const previousStep = () => setStatus(status-1)

  const saveInformation = () =>
    updateApplicationData(authUser.id, answers, applicationData.form_status)

  return (
    <div>
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2">
          Note: Remember to save your information at frequent intervals.
        </p>
        <br />
        {questionComponent(1, process.env.NEXT_PUBLIC_QUESTION_1)}
        {questionComponent(2, process.env.NEXT_PUBLIC_QUESTION_2)}
        {questionComponent(3, process.env.NEXT_PUBLIC_QUESTION_3)}
        {questionComponent(4, process.env.NEXT_PUBLIC_QUESTION_4)}
        {questionComponent(5, process.env.NEXT_PUBLIC_QUESTION_5)}
      </div>
      <ProceedButtons
        status={status}
        formStatus={applicationData.form_status}
        previousStep={previousStep}
        nextStep={nextStep}
        saveInformation={saveInformation}
        error={error}
      />
    </div>
  )
}

export default Step3
