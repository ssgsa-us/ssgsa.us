import { Dispatch, SetStateAction } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import ApplicationRow from './ApplicationRow'

type Props = {
  applications: {
    [key: string]: {
      applicationData: ApplicationData
      adminPortalData: AdminPortalData
    }
  }
  changeOccured: boolean
  setChangeOccured: Dispatch<SetStateAction<boolean>>
}

export default function ApplicationsTable({
  applications,
  changeOccured,
  setChangeOccured,
}: Props) {
  return (
    <div className="mt-10 bg-gray-200 rounded-3xl pt-5 px-3 sm:pt-10 sm:px-10">
      <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
        <table className="border-separate p-2">
          <thead>
            <tr>
              <th
                className="border border-blue-850 p-2 sticky left-0 z-10 bg-gray-200"
                rowSpan={3}
              >
                S.No.
              </th>
              <th
                className="border border-blue-850 p-2 sticky left-12 z-10 bg-gray-200"
                rowSpan={3}
              >
                Name
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                Email Address
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                Phone Number
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                Faculty
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                Bachelor&apos;s Major/Branch
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                Master&apos;s Major/Branch
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                View Completed Applications
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                Remove Application
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                Finalise For Review
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                Review Set
              </th>
              <th className="border border-blue-850 p-2" colSpan={12}>
                Reviewer Marks
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                Finalise For Interview
              </th>
              <th className="border border-blue-850 p-2" rowSpan={3}>
                Interviewer Marks
              </th>
            </tr>
            <tr>
              <th className="border border-blue-850 p-2" colSpan={2}>
                Reviewer 1
              </th>
              <th className="border border-blue-850 p-2" colSpan={2}>
                Reviewer 2
              </th>
              <th className="border border-blue-850 p-2" colSpan={2}>
                Reviewer 3
              </th>
              <th className="border border-blue-850 p-2" colSpan={2}>
                Reviewer 4
              </th>
              <th className="border border-blue-850 p-2" colSpan={2}>
                Reviewer 5
              </th>
              <th className="border border-blue-850 p-2" colSpan={2}>
                Reviewer 6
              </th>
            </tr>
            <tr>
              <th className="border border-blue-850 p-2">Name</th>
              <th className="border border-blue-850 p-2">Marks</th>
              <th className="border border-blue-850 p-2">Name</th>
              <th className="border border-blue-850 p-2">Marks</th>
              <th className="border border-blue-850 p-2">Name</th>
              <th className="border border-blue-850 p-2">Marks</th>
              <th className="border border-blue-850 p-2">Name</th>
              <th className="border border-blue-850 p-2">Marks</th>
              <th className="border border-blue-850 p-2">Name</th>
              <th className="border border-blue-850 p-2">Marks</th>
              <th className="border border-blue-850 p-2">Name</th>
              <th className="border border-blue-850 p-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(applications).map((applId: string, index: number) => (
              <ApplicationRow
                application={applications[applId]}
                applicationId={applId}
                index={index}
                changeOccured={changeOccured}
                setChangeOccured={setChangeOccured}
                key={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
