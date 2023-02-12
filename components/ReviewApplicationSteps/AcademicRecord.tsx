import Field from './Field'
import { AcademicRecordType } from '../../types'
import FileField from './FIleField'

type Props = {
  academicRecord: AcademicRecordType
  index: number // Academic Record Loop Index to show to user
  id: number // Academic Record Database Id
}

export default function AcademicRecord({ academicRecord, index, id }: Props) {
  return (
    <div className="mb-10">
      <p className="text-black text-lg sm:text-xl font-extrabold">
        Academic Record {index + 1}
      </p>
      <Field name="Degree Level" value={academicRecord[id].degreeLevel} />
      <Field name="Degree Name" value={academicRecord[id].degreeName} />
      <Field
        name="Faculty"
        value={
          academicRecord[id].faculty == 'Other'
            ? academicRecord[id].otherFaculty
            : academicRecord[id].faculty
        }
      />
      <Field name="Degree Name" value={academicRecord[id].degreeName} />
      <Field name="Department" value={academicRecord[id].department} />
      <Field name="University" value={academicRecord[id].degreeName} />
      <Field
        name="Degree Completed"
        value={!academicRecord[id].currentlyEnrolled ? 'No' : 'Yes'}
      />
      <div className="pl-4">
        <Field name="From" value={academicRecord[id].startedYear} />
        <Field
          name={
            !academicRecord[id].currentlyEnrolled
              ? 'To'
              : 'Expected Year of Completion'
          }
          value={academicRecord[id].completionYear}
        />
      </div>
      <Field
        name="Grades"
        value={`${academicRecord[id].grades} ${academicRecord[id].gradeCriteria}`}
      />
      <FileField
        fieldName="Most Recent Marksheet/Transcript"
        fileName={`AcademicRecord${id}.pdf`}
        url={academicRecord[id].document}
      />
    </div>
  )
}
