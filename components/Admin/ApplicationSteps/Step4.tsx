import { Dispatch, SetStateAction } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import Step7 from '../../ReviewApplicationSteps/Step7'
import ProceedButtons from './ProceedButtons'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const AdminStep4 = ({
  applicationData,
  adminPortalData,
  status,
  setStatus,
}: Props) => {
  // const [extracurricularMarks, setExtracurricularMarks] = useState<number>(null)

  // useEffect(() => {
  //   if (
  //     adminPortalData.review_marks &&
  //     adminPortalData.review_marks[authUser.id] &&
  //     adminPortalData.review_marks[authUser.id].extracurricularMarks !== null
  //   )
  //     setExtracurricularMarks(
  //       adminPortalData.review_marks[authUser.id].extracurricularMarks,
  //     )
  // }, [adminPortalData])

  return (
    <div className="w-full">
      <Step7 extraCurrActivities={applicationData.extra_curriculars} />

      {/* <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Extracurricular Activities Marks
        </h1>
        <div className="md:w-1/2 text-blue-850 font-black">
          <Field
            name={`Total Marks (out of ${process.env.NEXT_PUBLIC_REVIEW_EXTRACURRICULAR_MAX_MARKS})`}
            value={extracurricularMarks}
          />
        </div>
      </div> */}

      <ProceedButtons status={status} setStatus={setStatus} error="" />
    </div>
  )
}

export default AdminStep4
