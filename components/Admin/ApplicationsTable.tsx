import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import { updateApplicationStatus } from '../../pages/api/updateApplicationStatus'

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
              Bachelor&apos;s Major/Branch
            </th>
            <th className="border border-blue-850 border-seperate p-2">
              Master&apos;s Major/Branch
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
          {Object.keys(applications).map((applId: string, index: number) => {
            let review_marks = applications[applId].adminPortalData.review_marks
            let totalReviewMarks = 0
            if (review_marks) {
              if (review_marks.A) totalReviewMarks += review_marks.A
              if (review_marks.B) totalReviewMarks += review_marks.B
              if (review_marks.C) totalReviewMarks += review_marks.C
              if (review_marks.D) totalReviewMarks += review_marks.D
            }

            let interview_marks =
              applications[applId].adminPortalData.interview_marks
            let totalInterviewMarks = 0
            if (interview_marks) {
              if (interview_marks.A) totalInterviewMarks += interview_marks.A
              if (interview_marks.B) totalInterviewMarks += interview_marks.B
              if (interview_marks.C) totalInterviewMarks += interview_marks.C
              if (interview_marks.D) totalInterviewMarks += interview_marks.D
            }

            return (
              <tr key={index}>
                <td className="border border-blue-850 border-seperate p-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-blue-850 border-seperate p-2">
                  {applications[applId].applicationData.name}
                </td>
                <td className="border border-blue-850 border-seperate p-2">
                  {applications[applId].applicationData.email}
                </td>
                <td className="border border-blue-850 border-seperate p-2">
                  {applications[applId].applicationData.contact}
                </td>
                <td className="border border-blue-850 border-seperate p-2">
                  {
                    applications[applId].applicationData.academic_record[
                      "Bachelor's Degree"
                    ].branch
                  }
                </td>
                <td className="border border-blue-850 border-seperate p-2">
                  {applications[applId].applicationData.academic_record[
                    "Master's Degree"
                  ]
                    ? applications[applId].applicationData.academic_record[
                        "Master's Degree"
                      ].branch
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
                      applications[applId].adminPortalData.application_status ==
                      'finalised for interview'
                        ? 'bg-red-860 cursor-not-allowed'
                        : 'bg-red-850'
                    }`}
                    onClick={() =>
                      applications[applId].adminPortalData.application_status ==
                      'finalised for interview'
                        ? null
                        : applications[applId].adminPortalData
                            .application_status == 'removed'
                        ? updateApplicationStatus(applId, '')
                            .then(() => setChangeOccured(!changeOccured))
                            .catch(() => alert('Try again, network error!'))
                        : updateApplicationStatus(applId, 'removed')
                            .then(() => setChangeOccured(!changeOccured))
                            .catch(() => alert('Try again, network error!'))
                    }
                  >
                    {applications[applId].adminPortalData.application_status ==
                    'removed'
                      ? 'Unremove'
                      : 'Remove'}
                  </button>
                </td>
                <td className="border border-blue-850 border-seperate p-2 text-center">
                  {applications[applId].adminPortalData.application_status ==
                  'finalised for review' ? (
                    <p className="text-red">Already Finalised</p>
                  ) : (
                    <button
                      className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
                        applications[applId].adminPortalData
                          .application_status == 'finalised for interview'
                          ? 'bg-red-860 cursor-not-allowed'
                          : 'bg-red-850'
                      }`}
                      onClick={() =>
                        applications[applId].adminPortalData
                          .application_status == 'finalised for interview'
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
                  {totalReviewMarks}
                </td>
                <td className="border border-blue-850 border-seperate p-2 text-center">
                  {applications[applId].adminPortalData.application_status ==
                  'finalised for interview' ? (
                    <p className="text-red">Already Finalised</p>
                  ) : (
                    <button
                      className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
                        applications[applId].adminPortalData
                          .application_status == 'finalised for review' &&
                        applications[applId].adminPortalData.review_marks
                          ? 'bg-red-850'
                          : 'bg-red-860 cursor-not-allowed'
                      }`}
                      onClick={() =>
                        applications[applId].adminPortalData
                          .application_status == 'finalised for review' &&
                        applications[applId].adminPortalData.review_marks
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
                  {totalInterviewMarks}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
