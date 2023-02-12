import { AcademicRecordType } from '../../types'
import AcademicRecord from './AcademicRecord'

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
      Object.keys(academicRecord)
        .sort()
        .map((key, index) => (
          <AcademicRecord
            academicRecord={academicRecord}
            index={index}
            id={Number(key)}
            key={key}
          />
        ))
    )}
  </div>
)

export default Step2
