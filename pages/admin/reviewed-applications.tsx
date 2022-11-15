import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import ApplicationsTable from '../../components/Admin/ApplicationsTable'
import { useAuth } from '../../context/AuthUserContext'
import AdminLayout from '../../layouts/admin/admin-layout'
import { getApplicationsWithGivenStatus } from '../api/getApplicationsResponse'

type Applications = {
  [key: string]: {
    applicationData: ApplicationData
    adminPortalData: AdminPortalData
  }
}

export default function ReviewedApplications() {
  const { authUser, loading } = useAuth()
  const [applications, setApplications] = useState<Applications>()
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    if (loading) return

    if (!authUser || !authUser.email) router.push('/signin')
    else {
      if (authUser.role === 'admin')
        getApplicationsWithGivenStatus(3)
          .then((data) => {
            setApplications(data)
            setPageReady(true)
          })
          .catch(() => alert('Try again, network error!'))
      else router.push('/404')
    }
  }, [loading, authUser])

  useEffect(() => {
    if (!loading && authUser && authUser.email && authUser.role === 'admin')
      getApplicationsWithGivenStatus(3)
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
