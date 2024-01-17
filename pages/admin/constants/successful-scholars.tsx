import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import UpdateConstantModal from '../../../components/Admin/Modals/UpdateConstant'
import UpdateGroupModal from '../../../components/Admin/Modals/UpdateGroup'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/AdminLayout'
import {
  SuccScholarSessionType,
  SuccScholarType,
  SuccessfulScholarsType,
} from '../../../types'
import {
  deleteSuccScholarSession,
  updateSuccScholar,
  updateSuccScholarSession,
} from '../../api/admin/constants/succScholar'
import { getSuccessfulScholarsList } from '../../api/constants'

function SuccScholarsUpdateForm() {
  const [scholarsList, setScholarsList] = useState<SuccessfulScholarsType>({})
  const [selSessionId, setSelSessionId] = useState<string>(null)
  const [selScholarInd, setSelScholarInd] = useState<number>(null)
  const [scholar, setScholar] = useState<SuccScholarType>(null)
  const [sessionTitle, setSessionTitle] = useState<string>(null)
  const [changeOccured, setChangeOccured] = useState<boolean>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getSuccessfulScholarsList()
      .then((data) => setScholarsList(data))
      .catch(() => setError('Not able to get scholars list, Try again!'))
  }, [changeOccured])

  const editScholarDetails = () => {
    const sessionScholars = scholarsList[selSessionId].scholars
    sessionScholars[selScholarInd] = scholar

    updateSuccScholar(selSessionId, sessionScholars)
      .then(() => {
        alert('Updated Scholar Details')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to update scholar details, Try again!'))
      .finally(() => closeModal())
  }

  const addNewScholar = () => {
    const sessionScholars = [...scholarsList[selSessionId].scholars, scholar]

    updateSuccScholar(selSessionId, sessionScholars)
      .then(() => {
        alert('New Scholar Created')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to create new scholar, Try again!'))
      .finally(() => closeModal())
  }

  const deleteScholar = (sessionId: string, index: number) => {
    const sessionScholars = scholarsList[sessionId].scholars
    sessionScholars.splice(index, 1)

    updateSuccScholar(sessionId, sessionScholars)
      .then(() => {
        alert('Scholar Removed')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to remove scholar, Try again!'))
  }

  const editSessionDetails = () => {
    const session: SuccScholarSessionType = {
      ...scholarsList[selSessionId],
      session: sessionTitle,
    }

    updateSuccScholarSession(selSessionId, session)
      .then(() => {
        alert('Updated Session Title')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to update session title, Try again!'))
      .finally(() => closeModal())
  }

  const addNewSession = () => {
    const nextSessionInd =
      Math.max.apply(
        null,
        Object.keys(scholarsList).map((i) => Number(i)),
      ) + 1
    const session: SuccScholarSessionType = {
      session: sessionTitle,
      index: nextSessionInd,
      scholars: [],
    }

    updateSuccScholarSession(String(nextSessionInd), session)
      .then(() => {
        alert('New Session Created')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to create new session, Try again!'))
      .finally(() => closeModal())
  }

  const deleteSession = (sessionId: string) => {
    deleteSuccScholarSession(sessionId)
      .then(() => {
        alert(`${scholarsList[sessionId].session} Session Deleted`)
        setChangeOccured(!changeOccured)
      })
      .catch(() =>
        setError(`
          Not able to delete session ${scholarsList[sessionId].session}, Try again!
        `),
      )
      .finally(() => closeModal())
  }

  const closeModal = () => {
    setSelSessionId(null)
    setSelScholarInd(null)
    setScholar(null)
    setSessionTitle(null)
  }

  return (
    <AdminLayout>
      <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Successful Scholars
      </h1>
      {!error ? (
        Object.keys(scholarsList).map((key) => (
          <div className="mx-8 my-8" key={key}>
            <div className="flex justify-center">
              <h3 className="text-red-850 font-extrabold text-center text-xl lg:text-2xl">
                {scholarsList[key].session}
              </h3>
              <FontAwesomeIcon
                className="cursor-pointer ml-5"
                icon={faEdit}
                width={20}
                onClick={() => {
                  setSelSessionId(key)
                  setSessionTitle(scholarsList[key].session)
                }}
              />
              <FontAwesomeIcon
                className="cursor-pointer ml-5"
                icon={faTrash}
                width={20}
                onClick={() => {
                  if (
                    confirm(
                      `Are you sure, you want to remove this session "${scholarsList[key].session}"`,
                    ) == true
                  )
                    deleteSession(key)
                }}
              />
            </div>
            <div className="flex justify-center mt-4 flex-wrap">
              <table className="border-separate p-2">
                <thead>
                  <tr>
                    <th className="border border-blue-850 p-2">S. No.</th>
                    <th className="border border-blue-850 p-2">Name</th>
                    <th className="border border-blue-850 p-2">Field</th>
                    <th className="border border-blue-850 p-2">Edit</th>
                    <th className="border border-blue-850 p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarsList[key].scholars.map((scholar, index) => (
                    <tr key={key}>
                      <td className="border border-blue-850 p-2">
                        {index + 1}
                      </td>
                      <td className="border border-blue-850 p-2">
                        {scholar.name}
                      </td>
                      <td className="border border-blue-850 p-2">
                        {scholar.field}
                      </td>
                      <td className="border border-blue-850 p-2">
                        <div className="flex justify-center items-center">
                          <FontAwesomeIcon
                            className="cursor-pointer"
                            icon={faEdit}
                            width={20}
                            onClick={() => {
                              setSelSessionId(key)
                              setSelScholarInd(index)
                              setScholar(scholar)
                            }}
                          />
                        </div>
                      </td>
                      <td className="border border-blue-850 p-2">
                        <div className="flex justify-center items-center">
                          <FontAwesomeIcon
                            className="cursor-pointer"
                            icon={faTrash}
                            width={20}
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure, you want to remove this scholar "${scholar.name}"`,
                                ) == true
                              )
                                deleteScholar(key, index)
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center my-5 flex-wrap">
              <button
                className="text-white text-base md:text-lg bg-red-850 p-2 rounded-lg"
                onClick={() => {
                  setSelSessionId(key)
                  setScholar({
                    name: '',
                    field: '',
                  })
                }}
              >
                Add New Scholar
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h3 className="text-red-850 text-center text-lg lg:text-xl">
            <span className="font-bold">Error -</span> {error}
          </h3>
        </div>
      )}

      <div className="flex justify-center my-10 flex-wrap">
        <button
          className="text-white text-base md:text-lg bg-red-850 p-2 rounded-lg"
          onClick={() => setSessionTitle('')}
        >
          Add New Session
        </button>
      </div>

      <UpdateConstantModal
        title={
          selScholarInd === null ? 'Add New Scholar' : 'Edit Scholar Details'
        }
        fields={[
          { name: 'name', title: 'Name', required: true },
          { name: 'field', title: 'Field', required: false },
        ]}
        constant={scholar}
        setConstant={setScholar}
        updateConstant={
          selScholarInd === null ? addNewScholar : editScholarDetails
        }
        closeModal={closeModal}
      />
      <UpdateGroupModal
        title={selSessionId === null ? 'Add New Session' : 'Edit Session Title'}
        groupTitle={sessionTitle}
        setGroupTitle={setSessionTitle}
        updateGroup={selSessionId === null ? addNewSession : editSessionDetails}
        closeModal={closeModal}
      />
    </AdminLayout>
  )
}

export default requireAuth(SuccScholarsUpdateForm, Roles.ADMIN)
