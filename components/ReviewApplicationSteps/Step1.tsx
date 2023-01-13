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
    <Field name="Current Position" value={applicationData.current_position} />
    <Field
      name="Which program(s) and in what subject(s) are you interested in studying abroad?"
      value={applicationData.target_program}
    />
    <Field
      name="In which of the following faculty (most relevant) does your target program fall?"
      value={applicationData.faculty}
    />
    <Field
      name="When do you plan to apply for grad school?"
      value={applicationData.target_date}
    />
    <Field
      name="Which country(s) will you be applying in?"
      value={applicationData.target_country}
    />
  </div>
)

export default Step1
