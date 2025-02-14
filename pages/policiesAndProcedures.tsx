import MainLayout from '../layouts/Main'

export default function Home() {
  return (
    <MainLayout>
      <div>
        <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex flex-col justify-center">
          <h1 className="mb-8 bg-blue-850 text-xl lg:text-2xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
            Policies and Procedures
          </h1>
          <div className="text-justify">
            <div className="my-5">
              <h2 className="mb-2 text-lg font-bold">Brief:</h2>
              <p className="pl-2 sm:px-5 md:px-10">
                The Sir Syed Education Society of North America
                &#40;SSESA-NA&#41;, a 501&#40;c&#41; &#40;3&#41; non-profit
                organisation, annually administers the Sir Syed Global Scholar
                Award &#40;SSGSA&#41;. SSGSA, formerly known as the Sir Syed
                Excellence in Science Award &#40;SSESA&#41;, is a merit-based
                scholarship that is awarded to academically outstanding students
                from all faculties at the Aligarh Muslim University, India.
                SSGSA helps awardees in applying for MS/PhD programs at
                centers/universities of international repute.
              </p>
            </div>
            <div className="my-5">
              <h2 className="mb-2 text-lg font-bold">Award Benefits:</h2>
              <p className="pl-2 sm:px-5 md:px-10">
                SSGSA helps selected awardees with 1-to-1 personalized mentoring
                throughout the application process starting from selection of
                universities to refining personal essays and resumes and
                financial support that includes the following:
              </p>
              <ul
                className="my-2 pl-8 sm:pl-12 sm:pr-5 md:pl-24 md:pr-10"
                style={{ listStyle: 'disc' }}
              >
                <li className="my-2">
                  Preparation material for standardised exams
                </li>
                <li className="my-2">
                  One out of GRE or GMAT or any other equivalent exam
                </li>
                <li className="my-2">One out of TOEFL or IELTS</li>
                <li className="my-2">Score reports up to five universities</li>
                <li className="my-2">
                  Application fees up to five universities
                </li>
              </ul>
              <p className="pl-2 sm:px-5 md:px-10">
                Please note that no cash is available to the student at any
                point during the entire application procedure and SSGSA submits
                the fees at its own end. Also, in order to ensure serious effort
                by the scholars, we pay for the tests once they get a minimum
                score in at least two practice tests, as recommended by SSGSA.
              </p>
            </div>
            <div className="my-5">
              <h2 className="mb-2 text-lg font-bold">
                Application Requirements
              </h2>
              <p className="pl-2 sm:px-5 md:px-10">
                Applications for the award are typically invited in the month of
                February and results are declared in May. The selection is
                purely based only on merit. The entire application procedure
                entails the following requirements:
              </p>
              <ul
                className="my-2 pl-8 sm:pl-12 sm:pr-5 md:pl-24 md:pr-10"
                style={{ listStyle: 'disc' }}
              >
                <li className="my-2">
                  Personal information based on Curriculum Vitae/Resume
                </li>
                <li className="my-2">
                  Copy of mark sheets for all years of bachelors and masters
                  degree.
                </li>
                <li className="my-2">
                  Copies of co-curricular and extra-curricular certificates and
                  documents in support of listed achievements.
                </li>
                <li className="my-2">
                  Responses to essay-type questions &#40;similar to US graduate
                  school applications&#41;.
                </li>
              </ul>
            </div>
            <div className="my-5">
              <h2 className="mb-2 text-lg font-bold">Selection of Awardees:</h2>
              <p className="pl-2 sm:px-5 md:px-10">
                Scholars are selected on the basis of rigorous review of their
                application by independent academic experts and followed by
                personal interviews to assess knowledge and motivation. About
                25-30 students &#40;dependent on available financial aid&#41;
                are awarded SSGSA scholarships each year.
              </p>
            </div>
            <div className="my-5">
              <h2 className="mb-2 text-lg font-bold">Mentorship:</h2>
              <p className="pl-2 sm:px-5 md:px-10">
                In addition to financial support, awardees are paired with
                expert personal mentors who guide them throughout the entire
                application process. These mentors provide personalized advice
                on crafting compelling personal statements, refining resumes,
                and building a strong overall application package.
              </p>
              <p className="pl-2 sm:px-5 md:px-10">
                Upon successful admission, the students in turn become mentors
                to other students.
              </p>
            </div>
            <div className="my-5">
              <h2 className="mb-2 text-lg font-bold">Validity of the award:</h2>
              <p className="pl-2 sm:px-5 md:px-10">
                The award and its benefits are valid for a period of 1 year from
                the date of announcement of the award. Students must take the
                exams and apply for admission within this time. Failure to do so
                would automatically disqualify the student from the award.
                Extensions to the award—up to one year—may be granted under
                extenuating circumstances, subject to approval by the SSGSA
                Executive Team.
              </p>
            </div>
            <div className="my-5">
              <h2 className="mb-2 text-lg font-bold">
                Conditions for disqualification
              </h2>
              <p className="pl-2 sm:px-5 md:px-10">
                Students will face immediate disqualification under the
                following conditions:
              </p>
              <ul
                className="my-2 pl-8 sm:pl-12 sm:pr-5 md:pl-24 md:pr-10"
                style={{ listStyle: 'disc' }}
              >
                <li className="my-2">
                  If at any stage, it is found that wrong or fraudulent
                  information was submitted. Disqualification will also ensure
                  due to an act of plagiarism.
                </li>
                <li className="my-2">
                  The students are required to update the committee on their
                  progress at regular intervals &#40;e.g., monthly updates&#41;.
                  If they fail to do so or attempts to contact them prove futile
                  repeatedly, they will be given a notice to respond or face
                  disqualification.
                </li>
                <li className="my-2">
                  Awardees are prohibited from participating in or benefiting
                  from programs similar to SSGSA during the award period.
                </li>
              </ul>
            </div>

            <div className="my-5">
              <h2 className="mb-2 text-lg font-bold">
                New policies starting from 2025 &#40;to emphasize&#41;
              </h2>
              <ul
                style={{ listStyleType: 'disc' }}
                className="pl-2 sm:px-5 md:px-10"
              >
                <li className="my-2">
                  The validity of the award will be for only one year &#40;May
                  2025 to May 2026&#41;. We recommend that you apply for the
                  award only if you can commit at least 4 hours per week on
                  preparing your university applications this year. Extensions
                  to the award &#40;up to 1 year&#41; may be granted subject to
                  approval from the mentors and SSGSA mentorship team.
                </li>
                <li className="my-2">
                  The SSGSA Award will initially be offered on a provisional
                  basis, followed by a three to four month probationary period
                  commencing from the date of the result announcement, after
                  which a comprehensive review of your progress will determine
                  the confirmation of your status as an SSGSA Scholar, granting
                  you access to financial benefits. The comprehensive review
                  will consist of but is not limited to:
                  <ul style={{ listStyleType: 'circle' }} className="pl-5">
                    <li className="my-2">
                      Creation of a university application timeline and plan
                      with your assigned SSGSA mentors
                    </li>
                    <li className="my-2">
                      Regular and effective communication with SSGSA mentors.
                    </li>
                    <li className="my-2">
                      Participation in workshops organized by SSGSA.
                    </li>
                  </ul>
                </li>
                <li className="my-2">
                  Awardees are prohibited from participating in or benefiting
                  from programs similar to SSGSA during the award period. If any
                  financial support has been offered, repayments must be made
                  within one month since the date of award revocation.
                </li>
                <li className="my-2">
                  The exact timeline for completing the comprehensive review
                  will be communicated after the award is offered. The SSGSA
                  Executive Committee retains the sole discretion to revoke any
                  support provided by the organization at any time and under any
                  circumstances it deems necessary.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
