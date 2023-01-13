import { PosterOrWorkshopsType } from '../../types'
import FileField from './FIleField'
import Field from './Field'

type Props = {
  workshops: PosterOrWorkshopsType
}

const Step5 = ({ workshops }: Props) => (
  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
    <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
      Poster Presentation/ Workshops/ Summer School
    </h1>
    {!workshops || !Object.keys(workshops).length ? (
      <p className="font-bold mb-4">No Poster/Workshop/Summer School</p>
    ) : (
      Object.keys(workshops).map((key, index) => (
        <div className="mb-10" key={key}>
          <p className="text-black text-lg sm:text-xl font-extrabold">
            Poster/Workshop/Summer School {index + 1}
          </p>
          <Field name="Category" value={workshops[Number(key)].category} />
          <Field name="Title" value={workshops[Number(key)].title} />
          <Field
            name="Year(s) Attended and Duration"
            value={workshops[Number(key)].duration}
          />
          <Field
            name="Description"
            value={workshops[Number(key)].description}
          />
          <FileField
            fieldName="Corresponding Document"
            fileName={`PosterOrWorkshop${key}.pdf`}
            url={workshops[Number(key)].document}
          />
        </div>
      ))
    )}
  </div>
)

export default Step5
