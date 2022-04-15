import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import { Reviewer } from '../../classes/reviewer'
import { getReviewerDetailsById } from '../../pages/api/getReviewerDetails'
import { updateApplicationStatus } from '../../pages/api/updateApplicationStatus'
import { updateReviewSet } from '../../pages/api/updateReviewSet'
import ReviewMarksModal from '../modals/ReviewMarksModal'

type Props = {
  applicationId: string
  application: {
    applicationData: ApplicationData
    adminPortalData: AdminPortalData
  }
  index: number
  changeOccured: boolean
  setChangeOccured: Dispatch<SetStateAction<boolean>>
}

type ReviewMarks = {
  A: number
  B: number
  C: number
  D: number
  E: number
  remark: string
}

type ReviewerMarks = { [key: number]: { name: string; marks: ReviewMarks } }

export default function ApplicationRow({
  applicationId,
  application,
  index,
  changeOccured,
  setChangeOccured,
}: Props) {
  const [reviewSet, setReviewSet] = useState<string>(
    application.adminPortalData.review_set,
  )
  const [reviewerMarks, setReviewerMarks] = useState<ReviewerMarks>({
    1: { name: '-', marks: { A: 0, B: 0, C: 0, D: 0, E: 0, remark: '' } },
    2: { name: '-', marks: { A: 0, B: 0, C: 0, D: 0, E: 0, remark: '' } },
    3: { name: '-', marks: { A: 0, B: 0, C: 0, D: 0, E: 0, remark: '' } },
    4: { name: '-', marks: { A: 0, B: 0, C: 0, D: 0, E: 0, remark: '' } },
    5: { name: '-', marks: { A: 0, B: 0, C: 0, D: 0, E: 0, remark: '' } },
    6: { name: '-', marks: { A: 0, B: 0, C: 0, D: 0, E: 0, remark: '' } },
  })

  const reviewMarkComponent = (reviewMarks: {
    name: string
    marks: ReviewMarks
  }) => (
    <div>
      <p className="navgroup-text">
        {reviewMarks.marks.A +
          reviewMarks.marks.B +
          reviewMarks.marks.C +
          reviewMarks.marks.D +
          reviewMarks.marks.E}
      </p>
      {reviewMarks.name == '-' ? null : (
        <ReviewMarksModal reviewMarks={reviewMarks.marks} />
      )}
    </div>
  )

  useEffect(() => {
    if (application.adminPortalData.review_marks)
      Object.keys(application.adminPortalData.review_marks).map(
        async (reviewerId: string, index: number) => {
          await getReviewerDetailsById(reviewerId)
            .then((reviewer: Reviewer) => {
              if (reviewer)
                setReviewerMarks((prevReviewerMarks) => {
                  return {
                    ...prevReviewerMarks,
                    [index + 1]: {
                      name: reviewer.name,
                      marks:
                        application.adminPortalData.review_marks[reviewerId],
                    },
                  }
                })
            })
            .catch(() => {})
        },
      )
  }, [])

  return (
    <tr key={index}>
      <td className="border border-blue-850 p-2 text-center sticky left-0 z-10 bg-gray-200">
        {index + 1}
      </td>
      <td className="border border-blue-850 p-2 sticky left-12 z-10 bg-gray-200">
        {application.applicationData.name}
      </td>
      <td className="border border-blue-850 p-2">
        {application.applicationData.email}
      </td>
      <td className="border border-blue-850 p-2">
        {application.applicationData.contact}
      </td>
      <td className="border border-blue-850 p-2">
        {application.applicationData.faculty}
      </td>
      <td className="border border-blue-850 p-2">
        {
          application.applicationData.academic_record["Bachelor's Degree"]
            .branch
        }
      </td>
      <td className="border border-blue-850 p-2">
        {application.applicationData.academic_record["Master's Degree"]
          ? application.applicationData.academic_record["Master's Degree"]
              .branch
          : '-'}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <Link href={`/admin/view-application/${applicationId}`}>
          <a className="text-white text-base md:text-lg bg-blue-850 py-1 px-3 rounded-lg">
            View
          </a>
        </Link>
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <button
          className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
            application.adminPortalData.application_status >= 3
              ? 'bg-red-860 cursor-not-allowed'
              : 'bg-red-850'
          }`}
          onClick={() =>
            application.adminPortalData.application_status >= 3
              ? null
              : application.adminPortalData.application_status == 1
              ? updateApplicationStatus(applicationId, 0)
                  .then(() => setChangeOccured(!changeOccured))
                  .catch(() => alert('Try again, network error!'))
              : updateApplicationStatus(applicationId, 1)
                  .then(() => setChangeOccured(!changeOccured))
                  .catch(() => alert('Try again, network error!'))
          }
        >
          {application.adminPortalData.application_status == 1
            ? 'Unremove'
            : 'Remove'}
        </button>
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.application_status == 2 ? (
          <p className="text-red">Already Finalised</p>
        ) : application.adminPortalData.application_status >= 3 ? (
          <p className="text-red">Reviewed</p>
        ) : (
          <button
            className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850"
            onClick={() =>
              updateApplicationStatus(applicationId, 2)
                .then(() => setChangeOccured(!changeOccured))
                .catch(() => alert('Try again, network error!'))
            }
          >
            Finalise
          </button>
        )}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <select
          className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-blue-850"
          value={reviewSet}
          disabled={application.adminPortalData.application_status != 2}
          onChange={(e) => {
            let set = e.target.value
            updateReviewSet(applicationId, set)
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
          ].map((char: string, index: number) => (
            <option
              label={char}
              value={char}
              className="bg-gray-400 hover:bg-blue-850"
              key={index}
            />
          ))}
        </select>
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {reviewerMarks[1].name}
      </td>
      <td className="border border-blue-850 p-2 text-center navgroup relative hover:bg-blue-850 cursor-pointer">
        {reviewMarkComponent(reviewerMarks[1])}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {reviewerMarks[2].name}
      </td>
      <td className="border border-blue-850 p-2 text-center navgroup relative hover:bg-blue-850 cursor-pointer">
        {reviewMarkComponent(reviewerMarks[2])}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {reviewerMarks[3].name}
      </td>
      <td className="border border-blue-850 p-2 text-center navgroup relative hover:bg-blue-850 cursor-pointer">
        {reviewMarkComponent(reviewerMarks[3])}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {reviewerMarks[4].name}
      </td>
      <td className="border border-blue-850 p-2 text-center navgroup relative hover:bg-blue-850 cursor-pointer">
        {reviewMarkComponent(reviewerMarks[4])}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {reviewerMarks[5].name}
      </td>
      <td className="border border-blue-850 p-2 text-center navgroup relative hover:bg-blue-850 cursor-pointer">
        {reviewMarkComponent(reviewerMarks[5])}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {reviewerMarks[6].name}
      </td>
      <td className="border border-blue-850 p-2 text-center navgroup relative hover:bg-blue-850 cursor-pointer">
        {reviewMarkComponent(reviewerMarks[6])}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.application_status == 4 ? (
          <p className="text-red">Already Finalised</p>
        ) : application.adminPortalData.application_status >= 5 ? (
          <p className="text-red">Interviewed</p>
        ) : (
          <button
            className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
              application.adminPortalData.application_status == 3
                ? 'bg-red-850'
                : 'bg-red-860 cursor-not-allowed'
            }`}
            onClick={() =>
              application.adminPortalData.application_status == 3
                ? updateApplicationStatus(applicationId, 4)
                    .then(() => setChangeOccured(!changeOccured))
                    .catch(() => alert('Try again, network error!'))
                : null
            }
          >
            Finalise
          </button>
        )}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {!application.adminPortalData.application_status ||
        application.adminPortalData.application_status < 5 ||
        !application.adminPortalData.interview_marks
          ? '-'
          : application.adminPortalData.interview_marks.A +
            application.adminPortalData.interview_marks.B +
            application.adminPortalData.interview_marks.C +
            application.adminPortalData.interview_marks.D}
      </td>
    </tr>
  )
}
