import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import { updateApplicationStatus } from '../../pages/api/updateApplicationStatus'
import { updateReviewSet } from '../../pages/api/updateReviewSet'

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
              Add to set
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

            const [reviewSet, setReviewSet] = useState<string>(
              applications[applId].adminPortalData.review_set,
            )

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
                      applications[applId].adminPortalData.application_status >=
                      3
                        ? 'bg-red-860 cursor-not-allowed'
                        : 'bg-red-850'
                    }`}
                    onClick={() =>
                      applications[applId].adminPortalData.application_status >=
                      3
                        ? null
                        : applications[applId].adminPortalData
                            .application_status == 1
                        ? updateApplicationStatus(applId, 0)
                            .then(() => setChangeOccured(!changeOccured))
                            .catch(() => alert('Try again, network error!'))
                        : updateApplicationStatus(applId, 1)
                            .then(() => setChangeOccured(!changeOccured))
                            .catch(() => alert('Try again, network error!'))
                    }
                  >
                    {applications[applId].adminPortalData.application_status ==
                    1
                      ? 'Unremove'
                      : 'Remove'}
                  </button>
                </td>
                <td className="border border-blue-850 border-seperate p-2 text-center">
                  {applications[applId].adminPortalData.application_status ==
                  2 ? (
                    <p className="text-red">Already Finalised</p>
                  ) : applications[applId].adminPortalData.application_status >=
                    3 ? (
                    <p className="text-red">Reviewed</p>
                  ) : (
                    <button
                      className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
                      onClick={() =>
                        updateApplicationStatus(applId, 2)
                          .then(() => setChangeOccured(!changeOccured))
                          .catch(() => alert('Try again, network error!'))
                      }
                    >
                      Finalise
                    </button>
                  )}
                </td>
                <td className="border border-blue-850 border-seperate p-2 text-center">
                  <select
                    className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-blue-850"
                    value={reviewSet}
                    disabled={
                      applications[applId].adminPortalData.application_status !=
                      2
                    }
                    onChange={(e) => {
                      let set = e.target.value
                      updateReviewSet(applId, set)
                        .then(() => {
                          setReviewSet(set)
                        })
                        .catch(() => alert('Try again, network error!'))
                    }}
                  >
                    <option
                      label="Select"
                      value={undefined || null || ''}
                      className="bg-gray-400 hover:bg-blue-850"
                    />
                    {[
                      'A',
                      'B',
                      'C',
                      'D',
                      'E',
                      'F',
                      'G',
                      'H',
                      'I',
                      'J',
                      'K',
                      'L',
                      'M',
                      'N',
                      'O',
                      'P',
                      'Q',
                      'R',
                      'S',
                      'T',
                      'U',
                      'V',
                      'W',
                      'X',
                      'Y',
                      'Z',
                    ].map((char) => (
                      <option
                        label={char}
                        value={char}
                        className="bg-gray-400 hover:bg-blue-850"
                      />
                    ))}
                  </select>
                </td>
                <td className="border border-blue-850 border-seperate p-2 text-center">
                  {!applications[applId].adminPortalData.application_status ||
                  applications[applId].adminPortalData.application_status < 3
                    ? '-'
                    : totalReviewMarks}
                </td>
                <td className="border border-blue-850 border-seperate p-2 text-center">
                  {applications[applId].adminPortalData.application_status ==
                  4 ? (
                    <p className="text-red">Already Finalised</p>
                  ) : applications[applId].adminPortalData.application_status >=
                    5 ? (
                    <p className="text-red">Interviewed</p>
                  ) : (
                    <button
                      className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
                        applications[applId].adminPortalData
                          .application_status == 3
                          ? 'bg-red-850'
                          : 'bg-red-860 cursor-not-allowed'
                      }`}
                      onClick={() =>
                        applications[applId].adminPortalData
                          .application_status == 3
                          ? updateApplicationStatus(applId, 4)
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
                  {!applications[applId].adminPortalData.application_status ||
                  applications[applId].adminPortalData.application_status < 5
                    ? '-'
                    : totalInterviewMarks}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
