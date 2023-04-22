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
        <Link href={`/interviewer/view-application/${applicationId}`}>
          <a className="text-white text-base md:text-lg bg-blue-850 py-1 px-3 rounded-lg">
            View
          </a>
        </Link>
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.interview_marks &&
        application.adminPortalData.interview_marks[authUser.id] &&
        application.adminPortalData.interview_marks[authUser.id]
          .higherStudiesMotivation != null
          ? application.adminPortalData.interview_marks[authUser.id]
              .higherStudiesMotivation
          : '-'}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.interview_marks &&
        application.adminPortalData.interview_marks[authUser.id] &&
        application.adminPortalData.interview_marks[authUser.id]
          .communication != null
          ? application.adminPortalData.interview_marks[authUser.id]
              .communication
          : '-'}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.interview_marks &&
        application.adminPortalData.interview_marks[authUser.id] &&
        application.adminPortalData.interview_marks[authUser.id]
          .researchAptitude != null
          ? application.adminPortalData.interview_marks[authUser.id]
              .researchAptitude
          : '-'}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.interview_marks &&
        application.adminPortalData.interview_marks[authUser.id] &&
        application.adminPortalData.interview_marks[authUser.id]
          .motivationToGoBack != null
          ? application.adminPortalData.interview_marks[authUser.id]
              .motivationToGoBack
          : '-'}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {application.adminPortalData.interview_marks &&
        application.adminPortalData.interview_marks[authUser.id] &&
        application.adminPortalData.interview_marks[authUser.id].totalMarks !=
          null
          ? application.adminPortalData.interview_marks[authUser.id].totalMarks
          : '-'}
      </td>
    </tr>
  )
}
