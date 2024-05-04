import { useEffect, useState } from 'react'
import EvaluatorsTableHeader from '../../../components/Admin/Evaluators/TableHeader'
import EvaluatorTableRow from '../../../components/Admin/Evaluators/TableRow'
import Loading from '../../../components/Loading'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/AdminLayout'
import { InterviewerInviteType, Users } from '../../../types'
import { getUsersByRole } from '../../api/getUserDetails'
import { updateInterviewSets } from '../../api/updateUserSets'
import {
  getAcceptedIntWithoutAccount,
  sendInterviewerCredMail,
  updateAcceptedInterviewSets,
} from '../../api/interviewerInvite'

type UserCred = { name: string; email: string; password: string }

function InterviewersList() {
  const [accInterviewers, setAccInterviewers] = useState<
    Array<InterviewerInviteType>
  >([])
  const [interviewers, setInterviewers] = useState<Users>({})
  const [pageReady, setPageReady] = useState<boolean>(false)
  const [newIntCred, setNewIntCred] = useState<UserCred[]>([])

  useEffect(() => {
    getAcceptedIntWithoutAccount()
      .then((data) => setAccInterviewers(data))
      .catch(() => alert('Try again, network error!'))
      .finally(() => setPageReady(true))

    getUsersByRole(Roles.INTERVIEWER)
      .then((data) => setInterviewers(data))
      .catch(() => alert('Try again, network error!'))
      .finally(() => setPageReady(true))
  }, [])

  const createInterviewer = async (
    name: string,
    email: string,
    password: string,
    sets: Array<string>,
  ) => {
    try {
      const result = await fetch('/api/admin/interviewer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, sets }),
      })

      const response = await result.json()
      if (response != null && response.success === true) {
        if (!response.isReviewer) {
          setNewIntCred((prev) => [...prev, { name, email, password }])
        } else {
          setNewIntCred((prev) => [
            ...prev,
            { name, email, password: 'REVIEWER Password' },
          ])
        }
      }
      // For now, no need to send invitation mail
      // try {
      //   if (response)
      //     await sendInterviewerCredMail(name, email, password, sets.join(' '))
      // } catch (e) {
      //   console.log('Error while sending credential mail to', email)
      // }
    } catch (e) {
      console.log('Error while creating user ', email)
    }
  }

  const generateRandomPassword = () => {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let password = ''
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }
    return password
  }

  const createAccounts = () => {
    accInterviewers.map(async (interviewer) => {
      const password = generateRandomPassword()
      await createInterviewer(
        interviewer.name,
        interviewer.email,
        password,
        interviewer.sets,
      )
    })
  }

  return (
    <AdminLayout>
      {pageReady ? (
        <>
          <div className="mt-10 bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
            {/* For now, no credential mail is sent from portal, so showing passwords to admin as requested */}
            {!newIntCred || !newIntCred.length ? null : (
              <div>
                <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
                  New Interviewers Account Details
                </h1>
                <p className="text-xs sm:text-sm">
                  Save the passwords somewhere, these will not be shown again
                </p>
                <div className="flex flex-col items-center">
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
                          <th
                            className="border border-blue-850 p-2"
                            rowSpan={3}
                          >
                            Email Address
                          </th>
                          <th
                            className="border border-blue-850 p-2"
                            rowSpan={3}
                          >
                            Password
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {newIntCred.map((account, index) => (
                          <tr key={account.email}>
                            <td className="border border-blue-850 p-2 text-center sticky left-0 z-10 bg-gray-200">
                              {index}
                            </td>
                            <td className="border border-blue-850 p-2 sticky left-12 z-10 bg-gray-200">
                              {account.name}
                            </td>
                            <td className="border border-blue-850 p-2">
                              {account.email}
                            </td>
                            <td className="border border-blue-850 p-2">
                              {account.password}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
              Accepted Interviewers
            </h1>
            <div className="flex flex-col items-center">
              <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
                <table className="border-separate p-2">
                  <EvaluatorsTableHeader />
                  <tbody>
                    {accInterviewers.map((interviewer, index) => (
                      <EvaluatorTableRow
                        key={interviewer.email}
                        index={index + 1}
                        name={interviewer.name}
                        email={interviewer.email}
                        sets={interviewer.sets}
                        updateSets={(selectedSets: Array<string>) => {
                          updateAcceptedInterviewSets(
                            interviewer.email,
                            selectedSets,
                          )
                            .then(() =>
                              setAccInterviewers((prev) => {
                                const newVal = [...prev]
                                newVal[index] = {
                                  ...newVal[index],
                                  sets: selectedSets,
                                }
                                return newVal
                              }),
                            )
                            .catch(() => alert('Try again, network error!'))
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                className="text-white text-medium md:text-lg py-1 px-3 rounded-lg bg-blue-850"
                onClick={createAccounts}
              >
                Create Accounts
              </button>
            </div>
          </div>

          <div className="mt-10 bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
            <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
              All Interviewers
            </h1>
            <div className="flex flex-col items-center">
              <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
                <table className="border-separate p-2">
                  <EvaluatorsTableHeader />
                  <tbody>
                    {Object.keys(interviewers).map((interviewerId, index) => (
                      <EvaluatorTableRow
                        key={interviewerId}
                        index={index + 1}
                        name={interviewers[interviewerId].name}
                        email={interviewers[interviewerId].email}
                        sets={interviewers[interviewerId].review_sets}
                        updateSets={(selectedSets: Array<string>) => {
                          updateInterviewSets(interviewerId, selectedSets)
                            .then(() =>
                              setInterviewers((prev) => ({
                                ...prev,
                                [interviewerId]: {
                                  ...prev[interviewerId],
                                  review_sets: selectedSets[interviewerId],
                                },
                              })),
                            )
                            .catch(() => alert('Try again, network error!'))
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading message="Loading interviewers list!" />
      )}
    </AdminLayout>
  )
}

export default requireAuth(InterviewersList, Roles.ADMIN)
