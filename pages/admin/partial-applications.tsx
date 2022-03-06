import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../layouts/admin/admin-layout'
import { ApplicationData } from '../../classes/application_data'
import { auth } from '../../firebase'
import { getPartialApplications } from '../api/getApplicationsResponse'

type PartialApplications = {
  [key: string]: ApplicationData
}

export default function PartialApplications() {
  const [applications, setApplications] = useState<PartialApplications>()
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/admin/signin')
      else {
        if (auth.currentUser.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL)
          getPartialApplications()
            .then((data) => {
              setApplications(data)
              setPageReady(true)
            })
            .catch(() => alert('Try again, network error!'))
        else router.push('/404')
      }
    })
  }, [])

  return (
    <AdminLayout>
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
              {Object.keys(applications).map(
                (applId: string, index: number) => (
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
        <div className="mt-96" />
      )}
    </AdminLayout>
  )
}
