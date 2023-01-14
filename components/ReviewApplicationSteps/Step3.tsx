import { ResearchExperiencesType } from '../../types'
import Field from './Field'

type Props = {
  researchData: ResearchExperiencesType
}

const Step3 = ({ researchData }: Props) => (
  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
    <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
      Research Experience
    </h1>
    {!researchData || !Object.keys(researchData).length ? (
      <p className="font-bold mb-4">No Research Experience</p>
    ) : (
      Object.keys(researchData).map((key, index) => (
        <div className="mb-10" key={key}>
          <p className="text-black text-lg sm:text-xl font-extrabold">
            Experience {index + 1}
          </p>
          <Field
            name="University/College/Institute Name"
            value={researchData[Number(key)].university}
          />
          <Field
            name="Position Title"
            value={researchData[Number(key)].title}
          />
          <Field
            name="Advisor/Supervisor/Mentor"
            value={researchData[Number(key)].mentor}
          />
          <Field
            name="Research Completed"
            value={!researchData[Number(key)].currentlyWorking ? 'No' : 'Yes'}
          />
          <div className="pl-4">
            <Field
              name="Start Date (mm/yyyy)"
              value={researchData[Number(key)].startDate}
            />
            <Field
              name={
                !researchData[Number(key)].currentlyWorking
                  ? 'End Date (mm/yyyy)'
                  : 'Expected End Date (mm/yyyy)'
              }
              value={researchData[Number(key)].endDate}
            />
          </div>
          <Field
            name="Description"
            value={researchData[Number(key)].description}
          />
          <h2 className="sm:text-lg font-bold pb-5">Publications</h2>
          <div className="ml-4">
            {!researchData[Number(key)].publications ||
            !Object.keys(researchData[Number(key)].publications).length ? (
              <p className="mb-4">No Publications</p>
            ) : (
              Object.keys(researchData).map((pubKey, ind) => (
                <div className="mb-5" key={pubKey}>
                  <p className="text-black sm:text-lg font-bold">
                    Publication {ind + 1}
                  </p>
                  <Field
                    name="Title and Date of the Publication"
                    value={
                      researchData[Number(key)].publications[Number(pubKey)]
                        .titleAndDate
                    }
                  />
                  <Field
                    name="Journal/Conference Name"
                    value={
                      researchData[Number(key)].publications[Number(pubKey)]
                        .conferenceName
                    }
                  />
                  <Field
                    name="Link"
                    value={
                      researchData[Number(key)].publications[Number(pubKey)]
                        .link
                    }
                  />
                </div>
              ))
            )}
          </div>
        </div>
      ))
    )}
  </div>
)

export default Step3
