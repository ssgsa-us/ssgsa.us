import requireAuth from '../../components/requireAuth'
import Roles from '../../constants/roles'
import InterviewerLayout from '../../layouts/interviewer/interviewer-layout'

function InterviewerPortal() {
  return (
    <InterviewerLayout>
      <div>
        <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Instructions
        </h1>
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 lg:px-32 my-10">
          <h2 className="my-5 text-2xl font-bold">Points Rubric</h2>
          <p className="my-5 text-lg text-blue-850">
            Each panelist is required to award points to the candidate being
            interviewed based on the following rubric:
          </p>
          <p className="my-5 text-lg font-bold italic">
            Motivation for higher studies (30 Points)
          </p>
          <p className="my-5 text-lg text-blue-850">
            We encourage you to probe the students in detail about their plans.
            Specifically, please try to figure out where higher education abroad
            stands in their priority list as opposed to taking up alternate
            career options upon completion of their current degree. Motivation
            also gauges their genuine love for the subject instead of a wish to
            travel abroad or getting this scholarship just for improving their
            CVs. Please do your best to assess if they will be able to persevere
            in the arduous process of the applications, and later the grad
            school.
          </p>
          <p className="my-5 text-lg font-bold italic">
            Communication Skills (30 Points)
          </p>
          <p className="my-5 text-lg text-blue-850">
            A candidate must have basic English language proficiency/fluency.
            Specifically, please try to assess if they are equipped to prepare
            their application package and appear for an interview with their
            prospective supervisor without major flaws in language. However, it
            does not mean that any special literary/oratory skills have to be
            rewarded.
          </p>
          <p className="my-5 text-lg font-bold italic">
            Academic of Research Aptitude (30 Points)
          </p>
          <p className="my-5 text-lg text-blue-850">
            We need to assess the candidate&#39;s knowledge about their field of
            study or the field of research they are interested in or have done
            in the past. Specifically, please try to assess fundamental concepts
            of their subject which would be critical for them in their higher
            studies.
          </p>
          <p className="my-5 text-lg font-bold italic">
            Motivation to Give Back (10 Points)
          </p>
          <p className="my-5 text-lg text-blue-850">
            The candidate should be motivated to give back to their community
            and alma-mater with a consistent track record of leadership roles
            and helping others.
          </p>
          <h2 className="mt-10 mb-5 text-2xl font-bold">Recording Points</h2>
          <p className="my-5 text-lg text-blue-850">
            After interviewing each candidate, each panelist is expected to
            record the points based on their own impartial and rational judgment
            of the candidate&#39;s aforementioned abilities. To this end, use
            our web-portal where you can easily enter and record the points. We
            recommend you to record the points on an excel sheet or a piece of
            paper, as a backup.
          </p>
        </div>
      </div>
    </InterviewerLayout>
  )
}

export default requireAuth(InterviewerPortal, Roles.INTERVIEWER)
