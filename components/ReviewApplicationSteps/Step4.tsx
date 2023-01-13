import { WorkExperiencesType } from '../../types'
import FileField from './FIleField'
import Field from './Field'

type Props = {
  workExperiences: WorkExperiencesType
}

const Step4 = ({ workExperiences }: Props) => (
  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
    <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
      Work Experience
    </h1>
    {!workExperiences || !Object.keys(workExperiences).length ? (
      <p className="font-bold mb-4">No Work Experience</p>
    ) : (
      Object.keys(workExperiences).map((key, index) => (
        <div className="mb-10" key={key}>
          <p className="text-black text-lg sm:text-xl font-extrabold">
            Experience {index + 1}
          </p>
          <Field
            name="Company/Organization Name"
            value={workExperiences[Number(key)].organization}
          />
          <Field
            name="Position Title"
            value={workExperiences[Number(key)].title}
          />
          <Field
            name="Work Experience Completed"
            value={
              !workExperiences[Number(key)].currentlyWorking ? 'No' : 'Yes'
            }
          />
          <div className="pl-4">
            <Field
              name="Start Date (mm/yyyy)"
              value={workExperiences[Number(key)].startDate}
            />
            <Field
              name={
                !workExperiences[Number(key)].currentlyWorking
                  ? 'End Date (mm/yyyy)'
                  : 'Expected End Date (mm/yyyy)'
              }
              value={workExperiences[Number(key)].endDate}
            />
          </div>
          <Field
            name="Description"
            value={workExperiences[Number(key)].description}
          />
          <FileField
            fieldName="Corresponding Document"
            fileName={`WorkExperience${key}.pdf`}
            url={workExperiences[Number(key)].document}
          />
        </div>
      ))
    )}
  </div>
)

export default Step4
