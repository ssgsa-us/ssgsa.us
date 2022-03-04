import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../layouts/admin/admin-layout'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import ApplicationsTable from '../../components/Admin/ApplicationsTable'
import { auth } from '../../firebase'
import { getApplicationsWithGivenStatus } from '../api/getCompletedApplications'

type Applications = {
  [key: string]: {
    applicationData: ApplicationData
    adminPortalData: AdminPortalData
  }
}

export default function RemovedApplications() {
  const [applications, setApplications] = useState<Applications>()
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/admin/signin')
      else {
        if (auth.currentUser.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL)
          getApplicationsWithGivenStatus('removed')
            .then((data) => {
              setApplications(data)
              setPageReady(true)
            })
            .catch(() => alert('Try again, network error!'))
        else router.push('/404')
      }
    })
  }, [])

  useEffect(() => {
    if (
      auth.currentUser &&
      auth.currentUser.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL
    )
      getApplicationsWithGivenStatus('removed')
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
