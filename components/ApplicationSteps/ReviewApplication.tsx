import Link from 'next/link'
import { ApplicationData } from '../../classes/application_data'

type Props = {
  applicationData: ApplicationData
}

const ReviewApplication = ({ applicationData }: Props) => {
  return (
    <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
      <div className="mb-10">
        <div className="flex justify-start">
          <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
            Name
          </p>
          <p className="sm:text-lg w-3/5">{applicationData.name}</p>
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
            E-mail Address
          </p>
          <p className="sm:text-lg w-3/5">{applicationData.email}</p>
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
            Contact Number
          </p>
          <p className="sm:text-lg w-3/5">{applicationData.contact}</p>
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
            Gender
          </p>
          <p className="sm:text-lg w-3/5">{applicationData.gender}</p>
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
            AMU Enrollment Number
          </p>
          <p className="sm:text-lg w-3/5">{applicationData.enrollment}</p>
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
            Nationality
          </p>
          <p className="sm:text-lg w-3/5">{applicationData.nationality}</p>
        </div>
      </div>
      <div className="mb-10">
        <p className="text-black text-xl sm:text-2xl font-extrabold mb-4">
          Academic Record
        </p>
        {Object.keys(applicationData.academic_record).map((key) => (
          <div className="mb-10" key={key}>
            <p className="text-black text-lg sm:text-xl font-extrabold">
              {key}
            </p>
            <div className="flex justify-start mt-4">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
                Major/Branch
              </p>
              <p className="sm:text-lg w-3/5">
                {applicationData.academic_record[key].branch}
              </p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
                Name Of College / University
              </p>
              <p className="sm:text-lg w-3/5">
                {applicationData.academic_record[key].collegeName}
              </p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
                Course Duration
              </p>
              <p className="sm:text-lg w-3/5">
                {applicationData.academic_record[key].duration}
              </p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
                Year/Expected Year Of Completion
              </p>
              <p className="sm:text-lg w-3/5">
                {applicationData.academic_record[key].completionYear}
              </p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
                Percentage / CGPA
              </p>
              <p className="sm:text-lg w-3/5">
                {applicationData.academic_record[key].percentage}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-10">
        <p className="text-black text-xl sm:text-2xl font-extrabold mb-4">
          Written Responses
        </p>
        <div className="flex justify-start mt-4">
          <div className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5 flex justify-start">
            <p className="mr-4">a)</p>
            <p>{process.env.NEXT_PUBLIC_QUESTION_1}</p>
          </div>
          <p className="w-3/5 sm:text-lg">{applicationData.sop_answers.SOP1}</p>
        </div>

        <div className="flex justify-start mt-4">
          <div className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5 flex justify-start">
            <p className="mr-4">b)</p>
            <p>{process.env.NEXT_PUBLIC_QUESTION_2}</p>
          </div>
          <p className="w-3/5 sm:text-lg">{applicationData.sop_answers.SOP2}</p>
        </div>

        <div className="flex justify-start mt-4">
          <div className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5 flex justify-start">
            <p className="mr-4">c)</p>
            <p>{process.env.NEXT_PUBLIC_QUESTION_3}</p>
          </div>
          <p className="w-3/5 sm:text-lg">{applicationData.sop_answers.SOP3}</p>
        </div>

        <div className="flex justify-start mt-4">
          <div className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5 flex justify-start">
            <p className="mr-4">d)</p>
            <p>{process.env.NEXT_PUBLIC_QUESTION_4}</p>
          </div>
          <p className="w-3/5 sm:text-lg">{applicationData.sop_answers.SOP4}</p>
        </div>

        <div className="flex justify-start mt-4">
          <div className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5 flex justify-start">
            <p className="mr-4">e)</p>
            <p>{process.env.NEXT_PUBLIC_QUESTION_5}</p>
          </div>
          <p className="w-3/5 sm:text-lg">{applicationData.sop_answers.SOP5}</p>
        </div>
      </div>
      <div className="mb-10">
        <p className="text-black text-xl sm:text-2xl font-extrabold mb-4">
          Documents Uploaded
        </p>
        {applicationData.documents['Xth'] && (
          <div className="flex justify-start mt-4">
            <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
              Marksheet of Xth Class
            </p>
            <Link href={applicationData.documents['Xth']}>
              <a className="sm:text-lg" target="_blank">
                Xth.pdf
              </a>
            </Link>
          </div>
        )}
        {applicationData.documents['XIIth'] && (
          <div className="flex justify-start mt-4">
            <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
              Marksheet of XIIth Class
            </p>
            <Link href={applicationData.documents['XIIth']}>
              <a className="sm:text-lg" target="_blank">
                XIIth.pdf
              </a>
            </Link>
          </div>
        )}
        {applicationData.documents['Diploma'] && (
          <div className="flex justify-start mt-4">
            <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
              Marksheet of Diploma
            </p>
            <Link href={applicationData.documents['Diploma']}>
              <a className="sm:text-lg" target="_blank">
                Diploma.pdf
              </a>
            </Link>
          </div>
        )}
        {applicationData.documents['Bachelors'] && (
          <div className="flex justify-start mt-4">
            <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
              Marksheets of Bachelor&apos;s Degree
            </p>
            <Link href={applicationData.documents['Bachelors']}>
              <a className="sm:text-lg" target="_blank">
                Bachelors.pdf
              </a>
            </Link>
          </div>
        )}
        {applicationData.documents['Masters'] && (
          <div className="flex justify-start mt-4">
            <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
              Marksheets of Master&apos;s Degree
            </p>
            <Link href={applicationData.documents['Masters']}>
              <a className="sm:text-lg" target="_blank">
                Masters.pdf
              </a>
            </Link>
          </div>
        )}
        {applicationData.documents['Doctoral'] && (
          <div className="flex justify-start mt-4">
            <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
              Marksheets of Doctoral Degree
            </p>
            <Link href={applicationData.documents['Doctoral']}>
              <a className="sm:text-lg" target="_blank">
                Doctoral.pdf
              </a>
            </Link>
          </div>
        )}
        {applicationData.documents['Others'] && (
          <div className="flex justify-start mt-4">
            <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
              Marksheets of any other degrees/ diplomas you hold
            </p>
            <Link href={applicationData.documents['Others']}>
              <a className="sm:text-lg" target="_blank">
                Others.pdf
              </a>
            </Link>
          </div>
        )}
        {applicationData.documents['Resume'] && (
          <div className="flex justify-start mt-4">
            <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
              Resume
            </p>
            <Link href={applicationData.documents['Resume']}>
              <a className="sm:text-lg" target="_blank">
                Resume.pdf
              </a>
            </Link>
          </div>
        )}
        {applicationData.documents['Certificates'] && (
          <div className="flex justify-start mt-4">
            <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
              All certificates, proofs of extra-curricular activities, or any
              documents that may support your SSGSA application
            </p>
            <Link href={applicationData.documents['Certificates']}>
              <a className="sm:text-lg" target="_blank">
                Certificates.pdf
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="mt-5">
        <p className="text-black text-xl sm:text-2xl text-red-850 font-extrabold mb-4">
          Declaration
        </p>
        <p className="text-black text-lg sm:text-xl font-extrabold mb-4">
          All the information provided by me in this application are true to the
          best of my knowledge, and all the answers written by me are my
          original responses. I understand that if any part of my application is
          found to be false or plagiarized, I will be disqualified and barred
          from applying to the Sir Syed Global Scholar Award in the future.
        </p>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5 mr-5">
            Signature
          </p>
          <p className="sm:text-lg text-black font-extrabold">
            {applicationData.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewApplication
