import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import ApplicationsTable from '../../../components/Admin/ApplicationsTable'
import Loading from '../../../components/Loading'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { getApplicationsWithGivenStatus } from '../../api/getApplicationsResponse'

type Applications = {
  [key: string]: {
    applicationData: ApplicationData
    adminPortalData: AdminPortalData
  }
}

function FinalisedApplicationsForInterview() {
  const [applications, setApplications] = useState<Applications>()
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)

  useEffect(() => {
    getApplicationsWithGivenStatus(4)
      .then((data) => {
        setApplications(data)
      })
      .catch(() => alert('Try again, network error!'))
      .finally(() => setPageReady(true))
  }, [changeOccured])

  return (
    <AdminLayout>
      {pageReady ? (
        <ApplicationsTable
          applications={applications}
          changeOccured={changeOccured}
          setChangeOccured={setChangeOccured}
        />
      ) : (
        <Loading message="Loading finalised applications for interview!" />
      )}
    </AdminLayout>
  )
}

export default requireAuth(FinalisedApplicationsForInterview, Roles.ADMIN)
