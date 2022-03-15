import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import { auth } from '../../firebase'
import { updateReviewMarks } from '../../pages/api/updateReviewMarks'

type Application = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
}

type Props = {
  applicationId: string
  application: Application
  index: number
}

export default function ApplicationRow({
  applicationId,
  application,
  index,
}: Props) {
  const [A, setA] = useState<number>(0)
  const [B, setB] = useState<number>(0)
  const [C, setC] = useState<number>(0)
  const [D, setD] = useState<number>(0)
  const [E, setE] = useState<number>(0)
  const [updateCondition, setUpdateCondition] = useState<boolean>(false)

  useEffect(() => {
    let review_marks = application.adminPortalData.review_marks
    if (review_marks && review_marks[auth.currentUser.uid]) {
      setA(review_marks[auth.currentUser.uid].A)
      setB(review_marks[auth.currentUser.uid].B)
      setC(review_marks[auth.currentUser.uid].C)
      setD(review_marks[auth.currentUser.uid].D)
      setE(review_marks[auth.currentUser.uid].E)
    }
  }, [])

  return (
    <tr key={index}>
      <td className="border border-blue-850 border-seperate p-2 text-center">
        {index + 1}
      </td>
      <td className="border border-blue-850 border-seperate p-2">
        {application.applicationData.name}
      </td>
      <td className="border border-blue-850 border-seperate p-2">
        {application.applicationData.email}
      </td>
      <td className="border border-blue-850 border-seperate p-2">
        {application.applicationData.contact}
      </td>
      <td className="border border-blue-850 border-seperate p-2">
        {
          application.applicationData.academic_record["Bachelor's Degree"]
            .branch
        }
      </td>
      <td className="border border-blue-850 border-seperate p-2">
        {application.applicationData.academic_record["Master's Degree"]
          ? application.applicationData.academic_record["Master's Degree"]
              .branch
          : '-'}
      </td>
      <td className="border border-blue-850 border-seperate p-2 text-center">
        <Link href={`/reviewer/view-application/${applicationId}`}>
          <a className="text-white text-base md:text-lg bg-blue-850 py-1 px-3 rounded-lg">
            View
          </a>
        </Link>
      </td>
      <td className="border border-blue-850 border-seperate p-2 text-center">
        <input
          name="Name"
          type="number"
          value={A}
          onChange={(e) => setA(Number(e.target.value))}
          className="w-full rounded-xl p-2"
        />
      </td>
      <td className="border border-blue-850 border-seperate p-2 text-center">
        <input
          name="Name"
          type="number"
          value={B}
          onChange={(e) => setB(Number(e.target.value))}
          className="w-full rounded-xl p-2"
        />
      </td>
      <td className="border border-blue-850 border-seperate p-2 text-center">
        <input
          name="Name"
          type="number"
          value={C}
          onChange={(e) => setC(Number(e.target.value))}
          className="w-full rounded-xl p-2"
        />
      </td>
      <td className="border border-blue-850 border-seperate p-2 text-center">
        <input
          name="Name"
          type="number"
          value={D}
          onChange={(e) => setD(Number(e.target.value))}
          className="w-full rounded-xl p-2"
        />
      </td>
      <td className="border border-blue-850 border-seperate p-2 text-center">
        <input
          name="Name"
          type="number"
          value={E}
          onChange={(e) => setE(Number(e.target.value))}
          className="w-full rounded-xl p-2"
        />
      </td>
      <td className="border border-blue-850 border-seperate p-2 text-center">
        {A + B + C + D + E}
      </td>
      <td className="border border-blue-850 border-seperate p-2 text-center">
        <button
          className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
            application.adminPortalData.application_status >= 5 ||
            (!A && !B && !C && !D && !E)
              ? 'bg-red-860 cursor-not-allowed'
              : 'bg-red-850'
          }`}
          onClick={() =>
            application.adminPortalData.application_status >= 5 ||
            (!A && !B && !C && !D && !E)
              ? null
              : updateReviewMarks(
                  applicationId,
                  auth.currentUser.uid,
                  A,
                  B,
                  C,
                  D,
                  E,
                  3,
                )
                  .then(() => alert('Succesfully Updated'))
                  .catch(() => alert('Try again, network error!'))
          }
        >
          Update
        </button>
      </td>
    </tr>
  )
}