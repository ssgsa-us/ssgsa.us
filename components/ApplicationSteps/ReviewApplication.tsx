import Link from 'next/link'
import { ApplicationData } from '../../classes/application_data'
import Step1 from '../ReviewApplicationSteps/Step1'
import Step2 from '../ReviewApplicationSteps/Step2'
import Step3 from '../ReviewApplicationSteps/Step3'
import Step4 from '../ReviewApplicationSteps/Step4'
import Step5 from '../ReviewApplicationSteps/Step5'
import Step6 from '../ReviewApplicationSteps/Step6'
import Step7 from '../ReviewApplicationSteps/Step7'
import Step8 from '../ReviewApplicationSteps/Step8'

type Props = {
  applicationData: ApplicationData
}

const ReviewApplication = ({ applicationData }: Props) => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl text-red-850 text-center font-bold pb-5">
        Review Application
      </h1>
      <Step1 applicationData={applicationData} />
      <Step2 academicRecord={applicationData.academic_record} />
      <Step3 researchData={applicationData.research_experience} />
      <Step4 workExperiences={applicationData.work_experience} />
      <Step5 workshops={applicationData.poster_or_workshops} />
      <Step6 curricularActivities={applicationData.curricular_activities} />
      <Step7 extraCurrActivities={applicationData.extra_curriculars} />
      <Step8 sopAnswers={applicationData.sop_answers} />
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        {applicationData.form_status == 6 ? (
          <div className="mt-5">
            <p className="text-black text-xl sm:text-2xl text-red-850 font-extrabold mb-4">
              Declaration
            </p>
            <p className="text-black text-lg sm:text-xl font-extrabold mb-4">
              All the information provided by me in this application are true to
              the best of my knowledge, and all the answers written by me are my
              original responses. I understand that if any part of my
              application is found to be false or plagiarized, I will be
              disqualified and barred from applying to the Sir Syed Global
              Scholar Award in the future.
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
        ) : null}
      </div>
    </div>
  )
}

export default ReviewApplication
