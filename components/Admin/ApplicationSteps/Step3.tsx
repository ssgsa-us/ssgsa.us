import { Dispatch, SetStateAction } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import Step3 from '../../ReviewApplicationSteps/Step3'
import Step4 from '../../ReviewApplicationSteps/Step4'
import Step5 from '../../ReviewApplicationSteps/Step5'
import Step6 from '../../ReviewApplicationSteps/Step6'
import ProceedButtons from './ProceedButtons'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const AdminStep3 = ({
  applicationData,
  adminPortalData,
  status,
  setStatus,
}: Props) => {
  // const [curricularMarks, setCurricularMarks] = useState<number>(null)

  // useEffect(() => {
  //   if (
  //     adminPortalData.review_marks &&
  //     adminPortalData.review_marks[authUser.id] &&
  //     adminPortalData.review_marks[authUser.id].curricularMarks !== null
  //   )
  //     setCurricularMarks(
  //       adminPortalData.review_marks[authUser.id].curricularMarks,
  //     )
  // }, [adminPortalData])

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Academic/Curricular Activities
        </h1>
      </div>

      <Step3 researchData={applicationData.research_experience} />
      <Step4 workExperiences={applicationData.work_experience} />
      <Step5 workshops={applicationData.poster_or_workshops} />
      <Step6 curricularActivities={applicationData.curricular_activities} />

      {/* <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Academic/Curricular Activities Marks
        </h1>
        <div className="md:w-1/2 text-blue-850 font-black">
          <Field
            name={`Total Marks (out of ${process.env.NEXT_PUBLIC_REVIEW_CURRICULAR_MAX_MARKS})`}
            value={curricularMarks}
          />
        </div>
      </div> */}

      <ProceedButtons status={status} setStatus={setStatus} error="" />
    </div>
  )
}

export default AdminStep3
