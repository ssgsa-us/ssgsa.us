import Link from 'next/link'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import { useAuth } from '../../context/AuthUserContext'

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
  const { authUser } = useAuth()

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
        {application.adminPortalData.review_marks &&
        application.adminPortalData.review_marks[authUser.id] &&
        application.adminPortalData.review_marks[authUser.id]
          .totalAcademicMarks != null
          ? application.adminPortalData.review_marks[authUser.id]
              .totalAcademicMarks
          : '-'}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.review_marks &&
        application.adminPortalData.review_marks[authUser.id] &&
        application.adminPortalData.review_marks[authUser.id].curricularMarks !=
          null
          ? application.adminPortalData.review_marks[authUser.id]
              .curricularMarks
          : '-'}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.review_marks &&
        application.adminPortalData.review_marks[authUser.id] &&
        application.adminPortalData.review_marks[authUser.id]
          .extracurricularMarks != null
          ? application.adminPortalData.review_marks[authUser.id]
              .extracurricularMarks
          : '-'}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.review_marks &&
        application.adminPortalData.review_marks[authUser.id] &&
        application.adminPortalData.review_marks[authUser.id].totalSOPMarks !=
          null
          ? application.adminPortalData.review_marks[authUser.id].totalSOPMarks
          : '-'}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.review_marks &&
        application.adminPortalData.review_marks[authUser.id] &&
        application.adminPortalData.review_marks[authUser.id].totalMarks != null
          ? application.adminPortalData.review_marks[authUser.id].totalMarks
          : '-'}
      </td>
    </tr>
  )
}
