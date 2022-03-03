import { useEffect, useState } from 'react'
import { ApplicationData } from '../../classes/application_data'
import ApplicationsTable from '../../components/Admin/ApplicationsTable'
import AdminLayout from '../../layouts/admin/admin-layout'
import { getApplicationsWithGivenStatus } from '../api/getCompletedApplications'

type Applications = {
  [key: string]: ApplicationData
}

export default function RemovedApplications() {
  const [applications, setApplications] = useState<Applications>()
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)

  useEffect(() => {
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
