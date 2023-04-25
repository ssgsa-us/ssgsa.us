import { useEffect, useState } from 'react'
import SetDropdown from '../../../components/Admin/SetDropdown'
import Loading from '../../../components/Loading'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { Users } from '../../../types'
import { getUsersByRole } from '../../api/getUserDetails'
import { updateUserSets } from '../../api/updateUserSets'

type SelectedSetsType = { [key: string]: Array<string> }

function InterviewersList() {
  const [interviewers, setInterviewers] = useState<Users>({})
  const [pageReady, setPageReady] = useState<boolean>(false)
  const [selectedSets, setSelectedSets] = useState<SelectedSetsType>()

  useEffect(() => {
    getUsersByRole(Roles.INTERVIEWER)
      .then((data) => {
        setInterviewers(data)
        Object.keys(data).map((interviewerId) =>
          setSelectedSets((prev) => ({
            ...prev,
            [interviewerId]: data[interviewerId].sets,
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
                {Object.keys(interviewers).map((interviewerId, index) => (
                  <tr key={index}>
                    <td className="border border-blue-850 p-2 text-center sticky left-0 z-10 bg-gray-200">
                      {index + 1}
                    </td>
                    <td className="border border-blue-850 p-2 sticky left-12 z-10 bg-gray-200">
                      {interviewers[interviewerId].name}
                    </td>
                    <td className="border border-blue-850 p-2">
                      {interviewers[interviewerId].email}
                    </td>
                    <td className="border border-blue-850 p-2">
                      {interviewers[interviewerId].sets.join(', ')}
                    </td>
                    <td className="border border-blue-850 p-2">
                      <div className="flex justify-center">
                        <SetDropdown
                          multipleSets={selectedSets[interviewerId]}
                          multiple={true}
                          disabled={false}
                          onChange={(e) => {
                            if (
                              selectedSets[interviewerId].includes(
                                e.target.value,
                              )
                            )
                              setSelectedSets((prev) => {
                                return {
                                  ...prev,
                                  [interviewerId]: prev[interviewerId].filter(
                                    (set) => set != e.target.value,
                                  ),
                                }
                              })
                            else
                              setSelectedSets((prev) => ({
                                ...prev,
                                [interviewerId]: [
                                  ...prev[interviewerId],
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
                          updateUserSets(
                            interviewerId,
                            selectedSets[interviewerId],
                          )
                            .then(() =>
                              setInterviewers((prev) => ({
                                ...prev,
                                [interviewerId]: {
                                  ...prev[interviewerId],
                                  sets: selectedSets[interviewerId],
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
        <Loading message="Loading interviewers list!" />
      )}
    </AdminLayout>
  )
}

export default requireAuth(InterviewersList, Roles.ADMIN)
