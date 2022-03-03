import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { ApplicationData } from '../../classes/application_data'
import { updateApplicationStatus } from '../../pages/api/updateApplicationStatus'

type Props = {
  applications: {
    [key: string]: ApplicationData
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
    <div className="mt-10 bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 overflow-x-auto whitespace-nowrap">
      <table className="border border-blue-850 border-seperate p-2">
        <thead>
          <tr>
            <th className="border border-blue-850 border-seperate p-2">
              S.No.
            </th>
            <th className="border border-blue-850 border-seperate p-2">Name</th>
            <th className="border border-blue-850 border-seperate p-2">
              Email Address
            </th>
            <th className="border border-blue-850 border-seperate p-2">
              Phone Number
            </th>
            <th className="border border-blue-850 border-seperate p-2">
              Bachelor's Major/Branch
            </th>
            <th className="border border-blue-850 border-seperate p-2">
              Master's Major/Branch
            </th>
            <th className="border border-blue-850 border-seperate p-2">
              View Completed Applications
            </th>
            <th className="border border-blue-850 border-seperate p-2">
              Remove Application
            </th>
            <th className="border border-blue-850 border-seperate p-2">
              Finalise For Review
            </th>
            <th className="border border-blue-850 border-seperate p-2">
              Reviewer Marks
            </th>
            <th className="border border-blue-850 border-seperate p-2">
              Finalise For Interview
            </th>
            <th className="border border-blue-850 border-seperate p-2">
              Interviewer Marks
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(applications).map((applId: string, index: number) => (
            <tr key={index}>
              <td className="border border-blue-850 border-seperate p-2 text-center">
                {index + 1}
              </td>
              <td className="border border-blue-850 border-seperate p-2">
                {applications[applId].name}
              </td>
              <td className="border border-blue-850 border-seperate p-2">
                {applications[applId].email}
              </td>
              <td className="border border-blue-850 border-seperate p-2">
                {applications[applId].contact}
              </td>
              <td className="border border-blue-850 border-seperate p-2">
                {
                  applications[applId].academic_record["Bachelor's Degree"]
                    .branch
                }
              </td>
              <td className="border border-blue-850 border-seperate p-2">
                {applications[applId].academic_record["Master's Degree"]
                  ? applications[applId].academic_record["Master's Degree"]
                      .branch
                  : '-'}
              </td>
              <td className="border border-blue-850 border-seperate p-2 text-center">
                <Link href={`/admin/view-application/${applId}`}>
                  <a className="text-white text-base md:text-lg bg-blue-850 py-1 px-3 rounded-lg">
                    View
                  </a>
                </Link>
              </td>
              <td className="border border-blue-850 border-seperate p-2 text-center">
                <button
                  className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
                    applications[applId].application_status ==
                    'finalised for interview'
                      ? 'bg-red-860 cursor-not-allowed'
                      : 'bg-red-850'
                  }`}
                  onClick={() =>
                    applications[applId].application_status ==
                    'finalised for interview'
                      ? null
                      : applications[applId].application_status == 'removed'
                      ? updateApplicationStatus(applId, '')
                          .then(() => setChangeOccured(!changeOccured))
                          .catch(() => alert('Try again, network error!'))
                      : updateApplicationStatus(applId, 'removed')
                          .then(() => setChangeOccured(!changeOccured))
                          .catch(() => alert('Try again, network error!'))
                  }
                >
                  {applications[applId].application_status == 'removed'
                    ? 'Unremove'
                    : 'Remove'}
                </button>
              </td>
              <td className="border border-blue-850 border-seperate p-2 text-center">
                {applications[applId].application_status ==
                'finalised for review' ? (
                  <p className="text-red">Already Finalised</p>
                ) : (
                  <button
                    className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
                      applications[applId].application_status ==
                      'finalised for interview'
                        ? 'bg-red-860 cursor-not-allowed'
                        : 'bg-red-850'
                    }`}
                    onClick={() =>
                      applications[applId].application_status ==
                      'finalised for interview'
                        ? null
                        : updateApplicationStatus(
                            applId,
                            'finalised for review',
                          )
                            .then(() => setChangeOccured(!changeOccured))
                            .catch(() => alert('Try again, network error!'))
                    }
                  >
                    Finalise
                  </button>
                )}
              </td>
              <td className="border border-blue-850 border-seperate p-2 text-center">
                {applications[applId].review_marks}
              </td>
              <td className="border border-blue-850 border-seperate p-2 text-center">
                {applications[applId].application_status ==
                'finalised for interview' ? (
                  <p className="text-red">Already Finalised</p>
                ) : (
                  <button
                    className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
                      applications[applId].application_status ==
                        'finalised for review' &&
                      applications[applId].review_marks
                        ? 'bg-red-850'
                        : 'bg-red-860 cursor-not-allowed'
                    }`}
                    onClick={() =>
                      applications[applId].application_status ==
                        'finalised for review' &&
                      applications[applId].review_marks
                        ? updateApplicationStatus(
                            applId,
                            'finalised for interview',
                          )
                            .then(() => setChangeOccured(!changeOccured))
                            .catch(() => alert('Try again, network error!'))
                        : null
                    }
                  >
                    Finalise
                  </button>
                )}
              </td>
              <td className="border border-blue-850 border-seperate p-2 text-center">
                {applications[applId].interview_marks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
