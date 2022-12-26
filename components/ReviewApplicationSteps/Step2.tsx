import { AcademicRecordType } from '../../types'
import FileField from './FIleField'
import Field from './Field'

type Props = {
  academicRecord: AcademicRecordType
}

const Step2 = ({ academicRecord }: Props) => (
  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
    <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
      Education Qualifications
    </h1>
    {!academicRecord || !Object.keys(academicRecord).length ? (
      <p className="font-bold mb-4">No Academic Record Added</p>
    ) : (
      Object.keys(academicRecord).map((key, index) => (
        <div className="mb-10" key={key}>
          <p className="text-black text-lg sm:text-xl font-extrabold">
            Academic Record {index + 1}
          </p>
          <Field
            name="Degree Level"
            value={academicRecord[Number(key)].degreeLevel}
          />
          <Field
            name="Degree Name"
            value={academicRecord[Number(key)].degreeName}
          />
          <Field name="Faculty" value={academicRecord[Number(key)].faculty} />
          <Field
            name="Degree Name"
            value={academicRecord[Number(key)].degreeName}
          />
          <Field
            name="Institute/College"
            value={academicRecord[Number(key)].college}
          />
          <Field
            name="University"
            value={academicRecord[Number(key)].degreeName}
          />
          <Field
            name="Degree Completed"
            value={
              !academicRecord[Number(key)].currentlyEnrolled ? 'No' : 'Yes'
            }
          />
          <div className="pl-4">
            <Field
              name="From"
              value={academicRecord[Number(key)].startedYear}
            />
            <Field
              name={
                !academicRecord[Number(key)].currentlyEnrolled
                  ? 'To'
                  : 'Expected Year of Completion'
              }
              value={academicRecord[Number(key)].completionYear}
            />
          </div>
          <Field
            name="Grades"
            value={`${academicRecord[Number(key)].grades} ${
              academicRecord[Number(key)].gradeCriteria
            }`}
          />
          <FileField
            fieldName="Most Recent Marksheet/Transcript"
            fileName={`AcademicRecord${key}.pdf`}
            url={academicRecord[Number(key)].document}
          />
        </div>
      ))
    )}
  </div>
)

export default Step2
