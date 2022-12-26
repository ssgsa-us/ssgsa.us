import { ApplicationData } from '../../classes/application_data'
import FileField from './FIleField'
import Field from './Field'

type Props = {
  applicationData: ApplicationData
}

const Step1 = ({ applicationData }: Props) => (
  <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
    <h1 className="text-xl sm:text-2xl text-center font-black pb-5">
      Personal Information
    </h1>
    <Field name="Name" value={applicationData.name} />
    <Field name="AMU Enrollment Number" value={applicationData.enrollment} />
    <FileField
      fieldName="AMU Enrollment Proof Document"
      fileName="EnrollmentProofDoc.pdf"
      url={applicationData.enrollment_proof_doc}
    />
    <Field name="E-mail Address" value={applicationData.email} />
    <Field name="Contact Number" value={applicationData.contact} />
    <Field name="Current Position" value={applicationData.current_position} />
    <Field name="Target Program" value={applicationData.target_program} />
    <Field name="Target date" value={applicationData.target_date} />
    <Field name="Target Country" value={applicationData.target_country} />
  </div>
)

export default Step1
