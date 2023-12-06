import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import UpdateConstantModal from '../../../components/Admin/Modals/UpdateConstant'
import UpdateGroupModal from '../../../components/Admin/Modals/UpdateGroup'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { AwardeeSessionType, AwardeeType, AwardeesType } from '../../../types'
import {
  deleteAwardeesSession,
  updateAwardees,
  updateAwardeesSession,
} from '../../api/admin/constants/awardees'
import { getAwardees } from '../../api/constants'

function AwardeesUpdateForm() {
  const [awardeesList, setAwardeesList] = useState<AwardeesType>({})
  const [selSessionId, setSelSessionId] = useState<string>(null)
  const [selAwardeeInd, setSelAwardeeInd] = useState<number>(null)
  const [awardee, setAwardee] = useState<AwardeeType>(null)
  const [sessionTitle, setSessionTitle] = useState<string>(null)
  const [changeOccured, setChangeOccured] = useState<boolean>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getAwardees()
      .then((data) => setAwardeesList(data))
      .catch(() => setError('Not able to get awardees list, Try again!'))
  }, [changeOccured])

  const editAwardeeDetails = () => {
    const sessionAwardees = awardeesList[selSessionId].awardees
    sessionAwardees[selAwardeeInd] = awardee

    updateAwardees(selSessionId, sessionAwardees)
      .then(() => {
        alert('Updated Awardee Details')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to update awardee details, Try again!'))
      .finally(() => closeModal())
  }

  const addNewAwardee = () => {
    const sessionAwardees = [...awardeesList[selSessionId].awardees, awardee]

    updateAwardees(selSessionId, sessionAwardees)
      .then(() => {
        alert('New Awardee Created')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to create new awardee, Try again!'))
      .finally(() => closeModal())
  }

  const deleteAwardee = (sessionId: string, index: number) => {
    const sessionAwardees = awardeesList[sessionId].awardees
    sessionAwardees.splice(index, 1)

    updateAwardees(sessionId, sessionAwardees)
      .then(() => {
        alert('Awardee Removed')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to remove awardee, Try again!'))
  }

  const editSessionDetails = () => {
    const session: AwardeeSessionType = {
      ...awardeesList[selSessionId],
      session: sessionTitle,
    }

    updateAwardeesSession(selSessionId, session)
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
        Object.keys(awardeesList).map((i) => Number(i)),
      ) + 1
    const session: AwardeeSessionType = {
      session: sessionTitle,
      index: nextSessionInd,
      awardees: [],
    }

    updateAwardeesSession(String(nextSessionInd), session)
      .then(() => {
        alert('New Session Created')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to create new session, Try again!'))
      .finally(() => closeModal())
  }

  const deleteSession = (sessionId: string) => {
    deleteAwardeesSession(sessionId)
      .then(() => {
        alert(`${awardeesList[sessionId].session} Session Deleted`)
        setChangeOccured(!changeOccured)
      })
      .catch(() =>
        setError(`
          Not able to delete session ${awardeesList[sessionId].session}, Try again!
        `),
      )
      .finally(() => closeModal())
  }

  const closeModal = () => {
    setSelSessionId(null)
    setSelAwardeeInd(null)
    setAwardee(null)
    setSessionTitle(null)
  }

  return (
    <AdminLayout>
      <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Awardees
      </h1>
      {!error ? (
        Object.keys(awardeesList).map((key) => (
          <div className="mx-8 my-8" key={key}>
            <div className="flex justify-center">
              <h3 className="text-red-850 font-extrabold text-center text-xl lg:text-2xl">
                {awardeesList[key].session}
              </h3>
              <FontAwesomeIcon
                className="cursor-pointer ml-5"
                icon={faEdit}
                width={20}
                onClick={() => {
                  setSelSessionId(key)
                  setSessionTitle(awardeesList[key].session)
                }}
              />
              <FontAwesomeIcon
                className="cursor-pointer ml-5"
                icon={faTrash}
                width={20}
                onClick={() => {
                  if (
                    confirm(
                      `Are you sure, you want to remove this session "${awardeesList[key].session}"`,
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
                  {awardeesList[key].awardees.map((awardee, index) => (
                    <tr key={key}>
                      <td className="border border-blue-850 p-2">
                        {index + 1}
                      </td>
                      <td className="border border-blue-850 p-2">
                        {awardee.name}
                      </td>
                      <td className="border border-blue-850 p-2">
                        {awardee.field}
                      </td>
                      <td className="border border-blue-850 p-2">
                        <div className="flex justify-center items-center">
                          <FontAwesomeIcon
                            className="cursor-pointer"
                            icon={faEdit}
                            width={20}
                            onClick={() => {
                              setSelSessionId(key)
                              setSelAwardeeInd(index)
                              setAwardee(awardee)
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
                                  `Are you sure, you want to remove this awardee "${awardee.name}"`,
                                ) == true
                              )
                                deleteAwardee(key, index)
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
                  setAwardee({
                    name: '',
                    field: '',
                  })
                }}
              >
                Add New Awardee
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
          selAwardeeInd === null ? 'Add New Awardee' : 'Edit Awardee Details'
        }
        fields={[
          { name: 'name', title: 'Name', required: true },
          { name: 'field', title: 'Field', required: false },
        ]}
        constant={awardee}
        setConstant={setAwardee}
        updateConstant={
          selAwardeeInd === null ? addNewAwardee : editAwardeeDetails
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

export default requireAuth(AwardeesUpdateForm, Roles.ADMIN)
