import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import ApplicationsTable from '../../components/Admin/ApplicationsTable'
import requireAuth from '../../components/requireAuth'
import AdminLayout from '../../layouts/admin/admin-layout'
import { getApplicationsWithGivenStatus } from '../api/getApplicationsResponse'

type Applications = {
  [key: string]: {
    applicationData: ApplicationData
    adminPortalData: AdminPortalData
  }
}

function FinalisedApplicationsForReview() {
  const [applications, setApplications] = useState<Applications>()
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)

  useEffect(() => {
    getApplicationsWithGivenStatus(2)
      .then((data) => {
        setApplications(data)
        setPageReady(true)
      })
      .catch(() => alert('Try again, network error!'))
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
        <div className="mt-96" />
      )}
    </AdminLayout>
  )
}

export default requireAuth(FinalisedApplicationsForReview, 'admin')
