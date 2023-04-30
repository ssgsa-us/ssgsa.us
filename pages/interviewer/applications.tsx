import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import ApplicationRow from '../../components/Interviewer/ApplicationRow'
import Loading from '../../components/Loading'
import requireAuth from '../../components/requireAuth'
import Roles from '../../constants/roles'
import { useAuth } from '../../context/AuthUserContext'
import InterviewerLayout from '../../layouts/interviewer/interviewer-layout'
import { getInterviewerSetApplications } from '../api/getInterviewerSetApplications'
import { getInterviewerInstructions } from '../api/instructions'
import { InterviewerInstructionsType } from '../../types'

type Applications = {
  [key: string]: {
    applicationData: ApplicationData
    adminPortalData: AdminPortalData
  }
}

function InterviewerApplications() {
  const { authUser } = useAuth()
  const [applications, setApplications] = useState<Applications>()
  const [selectedSet, setSelectedSet] = useState<string>(
    authUser.sets.length ? authUser.sets[0] : '',
  )
  const [pageReady, setPageReady] = useState<boolean>(false)
  const [instructions, setInstructions] = useState<InterviewerInstructionsType>(
    {},
  )
  const allSets = authUser.sets

  useEffect(() => {
    getInterviewerInstructions()
      .then((data) => setInstructions(data))
      .catch(() => alert('Not able to fetch instructions, Try reloading!'))
  }, [])

  useEffect(() => {
    if (selectedSet)
      getInterviewerSetApplications(selectedSet)
        .then((data) => {
          setApplications(data)
        })
        .catch(() => alert('Try again, network error!'))
        .finally(() => setPageReady(true))
    else setPageReady(true)
  }, [selectedSet])

  return (
    <InterviewerLayout>
      {pageReady ? (
        <div>
          <div className="flex justify-center items-center space-x-5 mt-10">
            <p className="font-bold text-lg md:text-xl">Select One Set</p>
            <select
              name="Sets"
              value={selectedSet}
              onChange={(e) => setSelectedSet(e.target.value)}
              className="border-2 border-gray-400 rounded-xl p-3"
            >
              {allSets.map((set, index) => (
                <option key={index} label={`Set ${set}`} value={set} />
              ))}
            </select>
          </div>
          <div className="mt-10 bg-gray-200 rounded-3xl pt-5 px-3 sm:pt-10 sm:px-10">
            <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
              <table className="border-separate p-2">
                <thead>
                  <tr>
                    <th
                      className="border border-blue-850 p-2 sticky left-0 z-10 bg-gray-200"
                      rowSpan={2}
                    >
                      S.No.
                    </th>
                    <th
                      className="border border-blue-850 p-2 sticky left-12 z-10 bg-gray-200"
                      rowSpan={2}
                    >
                      Name
                    </th>
                    <th className="border border-blue-850 p-2" rowSpan={2}>
                      Email Address
                    </th>
                    <th className="border border-blue-850 p-2" rowSpan={2}>
                      Phone Number
                    </th>
                    <th className="border border-blue-850 p-2" rowSpan={2}>
                      View Completed Applications
                    </th>
                    <th className="border border-blue-850 p-2" colSpan={5}>
                      Interview Marks
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-blue-850 py-2 px-10">
                      Motivation for Higher Studies
                      <br />
                      (Out of {instructions.HIGHER_STUDIES_MOTIVATION})
                    </th>
                    <th className="border border-blue-850 py-2 px-10">
                      Communication Skills
                      <br />
                      (Out of {instructions.COMMUNICATION})
                    </th>
                    <th className="border border-blue-850 py-2 px-10">
                      Academic of Research Aptitude
                      <br />
                      (Out of {instructions.RESEARCH_APTITUDE})
                    </th>
                    <th className="border border-blue-850 py-2 px-10">
                      Motivation to Give Back
                      <br />
                      (Out of {instructions.MOTIVATION_TO_GO_BACK})
                    </th>
                    <th className="border border-blue-850 p-2">
                      Total
                      <br />
                      (Out of 100)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(applications).map(
                    (applId: string, index: number) => (
                      <ApplicationRow
                        applicationId={applId}
                        application={applications[applId]}
                        index={index}
                        key={index}
                      />
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Loading message="Loading your applications!" />
      )}
    </InterviewerLayout>
  )
}

export default requireAuth(InterviewerApplications, Roles.INTERVIEWER)
