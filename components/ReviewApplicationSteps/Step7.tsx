import { ExtraCurricularsType } from '../../types'
import FileField from './FIleField'
import Field from './Field'

type Props = {
  extraCurrActivities: ExtraCurricularsType
}

const Step7 = ({ extraCurrActivities }: Props) => (
  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
    <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
      Extracurricular Activites
    </h1>
    <Field name="Description" value={extraCurrActivities.description} />
    <FileField
      fieldName="Corresponding Documents"
      fileName="ExtraCurricularActivities.pdf"
      url={extraCurrActivities.document}
    />
  </div>
)

export default Step7
