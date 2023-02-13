import { Dispatch, SetStateAction } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const AdminStep5 = ({
  applicationData,
  adminPortalData,
  status,
  setStatus,
}: Props) => {
  const sopAnswers = applicationData.sop_answers
  // const [sopMarks, setSOPMarks] = useState<ReviewMarksType[string]['sopMarks']>(
  //   {
  //     SOP1: null,
  //     SOP2: null,
  //     SOP3: null,
  //     SOP4: null,
  //     SOP5: null,
  //   },
  // )
  // const [totalMarks, setTotalMarks] = useState<number>(0)

  // useEffect(() => {
  //   if (
  //     adminPortalData.review_marks &&
  //     adminPortalData.review_marks[authUser.id]
  //   ) {
  //     if (adminPortalData.review_marks[authUser.id].sopMarks)
  //       setSOPMarks(adminPortalData.review_marks[authUser.id].sopMarks)

  //     if (adminPortalData.review_marks[authUser.id].totalSOPMarks)
  //       setTotalMarks(adminPortalData.review_marks[authUser.id].totalSOPMarks)
  //   }
  // }, [adminPortalData])

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Essay-Type Questions
        </h1>
        <div className="mb-20">
          <Field
            name={`a) ${process.env.NEXT_PUBLIC_QUESTION_1}`}
            value={sopAnswers['SOP1']}
          />
          {/* <div className="md:w-1/2 text-blue-850 font-black">
            <Field
              name={`Points for Essay (a) (out of ${process.env.NEXT_PUBLIC_REVIEW_SOP_MAX_MARKS})`}
              value={sopMarks['SOP1']}
            />
          </div> */}
        </div>
        <div className="mb-20">
          <Field
            name={`b) ${process.env.NEXT_PUBLIC_QUESTION_2}`}
            value={sopAnswers['SOP2']}
          />
          {/* <div className="md:w-1/2 text-blue-850 font-black">
            <Field
              name={`Points for Essay (b) (out of ${process.env.NEXT_PUBLIC_REVIEW_SOP_MAX_MARKS})`}
              value={sopMarks['SOP2']}
            />
          </div> */}
        </div>
        <div className="mb-20">
          <Field
            name={`c) ${process.env.NEXT_PUBLIC_QUESTION_3}`}
            value={sopAnswers['SOP3']}
          />
          {/* <div className="md:w-1/2 text-blue-850 font-black">
            <Field
              name={`Points for Essay (c) (out of ${process.env.NEXT_PUBLIC_REVIEW_SOP_MAX_MARKS})`}
              value={sopMarks['SOP13']}
            />
          </div> */}
        </div>
        <div className="mb-20">
          <Field
            name={`d) ${process.env.NEXT_PUBLIC_QUESTION_4}`}
            value={sopAnswers['SOP4']}
          />
          {/* <div className="md:w-1/2 text-blue-850 font-black">
            <Field
              name={`Points for Essay (d) (out of ${process.env.NEXT_PUBLIC_REVIEW_SOP_MAX_MARKS})`}
              value={sopMarks['SOP4']}
            />
          </div> */}
        </div>

        <div className="mb-5">
          <Field
            name={`e) ${process.env.NEXT_PUBLIC_QUESTION_5}`}
            value={sopAnswers['SOP5']}
          />
          {/* <div className="md:w-1/2 text-blue-850 font-black">
            <Field
              name={`Points for Essay (e) (out of ${process.env.NEXT_PUBLIC_REVIEW_SOP_MAX_MARKS})`}
              value={sopMarks['SOP5']}
            />
          </div> */}
        </div>
      </div>

      {/* <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Essay-Type Question Marks
        </h1>
        <Field
          name={`Total Marks (out of ${
            Number(process.env.NEXT_PUBLIC_REVIEW_SOP_MAX_MARKS) * 5
          })`}
          value={totalMarks}
        />
      </div> */}

      <ProceedButtons status={status} setStatus={setStatus} error="" />
    </div>
  )
}

export default AdminStep5
