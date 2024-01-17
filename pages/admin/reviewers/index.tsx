import { useEffect, useState } from 'react'
import SetDropdown from '../../../components/Admin/SetDropdown'
import Loading from '../../../components/Loading'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/ApplicationsLayout'
import { Users } from '../../../types'
import { getUsersByRole } from '../../api/getUserDetails'
import { updateUserSets } from '../../api/updateUserSets'

type SelectedSetsType = { [key: string]: Array<string> }

function ReviewersList() {
  const [reviewers, setReviewers] = useState<Users>({})
  const [pageReady, setPageReady] = useState<boolean>(false)
  const [selectedSets, setSelectedSets] = useState<SelectedSetsType>()

  useEffect(() => {
    getUsersByRole(Roles.REVIEWER)
      .then((data) => {
        setReviewers(data)
        Object.keys(data).map((reviewerId) =>
          setSelectedSets((prev) => ({
            ...prev,
            [reviewerId]: data[reviewerId].sets,
          })),
        )
      })
      .catch(() => alert('Try again, network error!'))
      .finally(() => setPageReady(true))
  }, [])

  return (
    <AdminLayout>
      {pageReady ? (
        <div className="mt-10 bg-gray-200 rounded-3xl pt-5 px-3 sm:pt-10 sm:px-10">
          <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
            <table className="border-separate p-2">
              <thead>
                <tr>
                  <th className="border border-blue-850 p-2 sticky left-0 z-10 bg-gray-200">
                    S.No.
                  </th>
                  <th className="border border-blue-850 p-2 sticky left-0 z-10 bg-gray-200">
                    Name
                  </th>
                  <th className="border border-blue-850 p-2" rowSpan={3}>
                    Email Address
                  </th>
                  <th className="border border-blue-850 p-2" rowSpan={3}>
                    Assigned Sets
                  </th>
                  <th className="border border-blue-850 p-2" rowSpan={3}>
                    Select Sets To Update
                  </th>
                  <th className="border border-blue-850 p-2" rowSpan={3}>
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(reviewers).map((reviewerId, index) => (
                  <tr key={index}>
                    <td className="border border-blue-850 p-2 text-center sticky left-0 z-10 bg-gray-200">
                      {index + 1}
                    </td>
                    <td className="border border-blue-850 p-2 sticky left-12 z-10 bg-gray-200">
                      {reviewers[reviewerId].name}
                    </td>
                    <td className="border border-blue-850 p-2">
                      {reviewers[reviewerId].email}
                    </td>
                    <td className="border border-blue-850 p-2">
                      {reviewers[reviewerId].sets.join(', ')}
                    </td>
                    <td className="border border-blue-850 p-2">
                      <div className="flex justify-center">
                        <SetDropdown
                          multipleSets={selectedSets[reviewerId]}
                          multiple={true}
                          disabled={false}
                          onChange={(e) => {
                            if (
                              selectedSets[reviewerId].includes(e.target.value)
                            )
                              setSelectedSets((prev) => {
                                return {
                                  ...prev,
                                  [reviewerId]: prev[reviewerId].filter(
                                    (set) => set != e.target.value,
                                  ),
                                }
                              })
                            else
                              setSelectedSets((prev) => ({
                                ...prev,
                                [reviewerId]: [
                                  ...prev[reviewerId],
                                  e.target.value,
                                ],
                              }))
                          }}
                        />
                      </div>
                    </td>
                    <td className="border border-blue-850 p-2">
                      <button
                        className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-blue-850"
                        onClick={() => {
                          updateUserSets(reviewerId, selectedSets[reviewerId])
                            .then(() =>
                              setReviewers((prev) => ({
                                ...prev,
                                [reviewerId]: {
                                  ...prev[reviewerId],
                                  sets: selectedSets[reviewerId],
                                },
                              })),
                            )
                            .catch(() => alert('Try again, network error!'))
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loading message="Loading reviewers list!" />
      )}
    </AdminLayout>
  )
}

export default requireAuth(ReviewersList, Roles.ADMIN)
