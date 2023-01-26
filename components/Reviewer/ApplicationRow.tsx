import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import { auth } from '../../firebase'

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
      <td className="border border-blue-850 p-2 text-center">
        <Link href={`/reviewer/view-application/${applicationId}`}>
          <a className="text-white text-base md:text-lg bg-blue-850 py-1 px-3 rounded-lg">
            View
          </a>
        </Link>
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <input
          name="Name"
          type="number"
          value={A}
          min={0}
          max={Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_A_MAX_MARKS)}
          onChange={(e) =>
            Number(e.target.value) >
            Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_A_MAX_MARKS)
              ? null
              : setA(Number(e.target.value))
          }
          className="w-full rounded-xl p-2"
        />
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <input
          name="Name"
          type="number"
          value={B}
          min={0}
          max={Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_B_MAX_MARKS)}
          onChange={(e) =>
            Number(e.target.value) >
            Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_B_MAX_MARKS)
              ? null
              : setB(Number(e.target.value))
          }
          className="w-full rounded-xl p-2"
        />
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <input
          name="Name"
          type="number"
          value={C}
          min={0}
          max={Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_C_MAX_MARKS)}
          onChange={(e) =>
            Number(e.target.value) >
            Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_C_MAX_MARKS)
              ? null
              : setC(Number(e.target.value))
          }
          className="w-full rounded-xl p-2"
        />
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <input
          name="Name"
          type="number"
          value={D}
          min={0}
          max={Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_D_MAX_MARKS)}
          onChange={(e) =>
            Number(e.target.value) >
            Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_D_MAX_MARKS)
              ? null
              : setD(Number(e.target.value))
          }
          className="w-full rounded-xl p-2"
        />
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <input
          name="Name"
          type="number"
          value={E}
          min={0}
          max={Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_E_MAX_MARKS)}
          onChange={(e) =>
            Number(e.target.value) >
            Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_E_MAX_MARKS)
              ? null
              : setE(Number(e.target.value))
          }
          className="w-full rounded-xl p-2"
        />
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {A + B + C + D + E}
      </td>
    </tr>
  )
}
