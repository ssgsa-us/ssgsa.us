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
    {!extraCurrActivities || !Object.keys(extraCurrActivities).length ? (
      <p className="font-bold mb-4">No Extra Curricular Activities Added</p>
    ) : (
      Object.keys(extraCurrActivities).map((key, index) => (
        <div className="mb-10" key={key}>
          <p className="text-black text-lg sm:text-xl font-extrabold">
            Activity {index + 1}
          </p>
          <Field
            name="Description"
            value={extraCurrActivities[Number(key)].description}
          />
          <FileField
            fieldName="Corresponding Documents"
            fileName="ExtraCurricularActivities.pdf"
            url={extraCurrActivities[Number(key)].document}
          />
        </div>
      ))
    )}
  </div>
)

export default Step7
