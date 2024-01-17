import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ApplicationData } from '../../../classes/application_data'
import Loading from '../../../components/Loading'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import ApplicationsLayout from '../../../layouts/admin/ApplicationsLayout'
import { getPartialApplications } from '../../api/getApplicationsResponse'

type PartialApplications = {
  [key: string]: ApplicationData
}

function PartialApplications() {
  const [applications, setApplications] = useState<PartialApplications>()
  const [pageReady, setPageReady] = useState<boolean>(false)

  useEffect(() => {
    getPartialApplications()
      .then((data) => {
        setApplications(data)
      })
      .catch(() => alert('Try again, network error!'))
      .finally(() => setPageReady(true))
  }, [])

  return (
    <ApplicationsLayout>
      {pageReady ? (
        <div className="mt-10 bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 overflow-x-auto whitespace-nowrap">
          <table className="border border-blue-850 border-seperate p-2">
            <thead>
              <tr>
                <th className="border border-blue-850 border-seperate p-2">
                  S.No.
                </th>
                <th className="border border-blue-850 border-seperate p-2">
                  Name
                </th>
                <th className="border border-blue-850 border-seperate p-2">
                  Email Address
                </th>
                <th className="border border-blue-850 border-seperate p-2">
                  Phone Number
                </th>
                <th className="border border-blue-850 border-seperate p-2">
                  View Applications
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(applications).map((applId: string, index: number) =>
                !applications[applId].email ? null : (
                  <tr key={index}>
                    <td className="border border-blue-850 border-seperate p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-blue-850 border-seperate p-2">
                      {applications[applId].name}
                    </td>
                    <td className="border border-blue-850 border-seperate p-2">
                      {applications[applId].email}
                    </td>
                    <td className="border border-blue-850 border-seperate p-2">
                      {applications[applId].contact}
                    </td>
                    <td className="border border-blue-850 border-seperate p-2 text-center">
                      <Link href={`/admin/view-application/${applId}`}>
                        <a className="text-white text-base md:text-lg bg-blue-850 py-1 px-3 rounded-lg">
                          View
                        </a>
                      </Link>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading message="Loading partial applications!" />
      )}
    </ApplicationsLayout>
  )
}

export default requireAuth(PartialApplications, Roles.ADMIN)
