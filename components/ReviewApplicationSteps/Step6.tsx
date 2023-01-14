import { CurricularActivitiesType } from '../../types'
import FileField from './FIleField'
import Field from './Field'

type Props = {
  curricularActivities: CurricularActivitiesType
}

const Step6 = ({ curricularActivities }: Props) => (
  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
    <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
      Curricular Activites
    </h1>
    <div className="mb-10">
      <p className="text-black text-lg sm:text-xl font-extrabold">
        Academic Achievements/Awards/Recognition/Article or Book Published
      </p>
      <Field name="Description" value={curricularActivities.description} />
      <FileField
        fieldName="Corresponding Documents"
        fileName="CurricularActivities.pdf"
        url={curricularActivities.document}
      />
    </div>
    <div className="mb-10">
      <p className="text-black text-lg sm:text-xl font-extrabold">Others</p>
      <Field name="Description" value={curricularActivities.others} />
      <FileField
        fieldName="Corresponding Documents"
        fileName="OtherCurricularActivities.pdf"
        url={curricularActivities.others_document}
      />
    </div>
  </div>
)

export default Step6
