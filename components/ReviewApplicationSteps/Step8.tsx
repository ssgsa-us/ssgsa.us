import { AnswerType } from '../../types'
import Field from './Field'

type Props = {
  sopAnswers: AnswerType
}

const Step8 = ({ sopAnswers }: Props) => (
  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
    <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
      Essay-Type Questions
    </h1>
    <Field
      name={`a) ${process.env.NEXT_PUBLIC_QUESTION_1}`}
      value={sopAnswers['SOP1']}
    />
    <Field
      name={`b) ${process.env.NEXT_PUBLIC_QUESTION_2}`}
      value={sopAnswers['SOP2']}
    />
    <Field
      name={`c) ${process.env.NEXT_PUBLIC_QUESTION_3}`}
      value={sopAnswers['SOP3']}
    />
    <Field
      name={`d) ${process.env.NEXT_PUBLIC_QUESTION_4}`}
      value={sopAnswers['SOP4']}
    />
    <Field
      name={`e) ${process.env.NEXT_PUBLIC_QUESTION_5}`}
      value={sopAnswers['SOP5']}
    />
  </div>
)

export default Step8
