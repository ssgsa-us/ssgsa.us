import { ApplicationData } from '../../classes/application_data'

type Props = {
  applicationData: ApplicationData
}

const ReviewApplication = ({ applicationData }: Props) => {
  return (
    <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
      <div className="mb-10">
        <div className="flex justify-start">
          <p className="text-red-850 text-xl font-extrabold w-52 mr-5">Name</p>
          <p className="text-lg">{applicationData.name}</p>
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
            E-mail Address
          </p>
          <p className="text-lg">{applicationData.email}</p>
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
            Contact Number
          </p>
          <p className="text-lg">{applicationData.contact}</p>
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
            Gender
          </p>
          <p className="text-lg">{applicationData.gender}</p>
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
            AMU Enrollment Number
          </p>
          <p className="text-lg">{applicationData.enrollment}</p>
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
            Nationality
          </p>
          <p className="text-lg">{applicationData.nationality}</p>
        </div>
      </div>
      <div className="mb-10">
        {Object.keys(applicationData.academic_record).map((key) => (
          <div className="mb-10" key={key}>
            <p className="text-black text-2xl font-extrabold w-52 mr-5 mb-4">
              Academic Record
            </p>
            <p className="text-black text-xl font-extrabold w-52 mr-5">{key}</p>
            <div className="flex justify-start mt-4">
              <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
                Major/Branch
              </p>
              <p className="text-lg">
                {applicationData.academic_record[key].branch}
              </p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
                Name Of College/University
              </p>
              <p className="text-lg">
                {applicationData.academic_record[key].collegeName}
              </p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
                Course Duration
              </p>
              <p className="text-lg">
                {applicationData.academic_record[key].duration}
              </p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
                Year/Expected Year Of Completion
              </p>
              <p className="text-lg">
                {applicationData.academic_record[key].completionYear}
              </p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
                Percentage/CGPA
              </p>
              <p className="text-lg">
                {applicationData.academic_record[key].percentage}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <p className="text-black text-2xl text-red-850 font-extrabold mb-4">
          Declaration
        </p>
        <p className="text-black text-xl font-extrabold mb-4">
          All the information provided by me in this application are true to the
          best of my knowledge, and all the answers written by me are my
          original responses. I understand that if any part of my application is
          found to be false or plagiarized, I will be disqualified and barred
          from applying to the Sir Syed Global Scholar Award in the future.
        </p>
        <div className="flex justify-start mt-4">
          <p className="text-red-850 text-xl font-extrabold w-52 mr-5">
            Signature
          </p>
          <p className="text-lg text-black font-extrabold">
            {applicationData.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewApplication
