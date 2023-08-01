import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import EditMemberModal from '../../../components/Admin/Modals/Member/Edit'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { MemberCategoryType, MemberType } from '../../../types'
import { editMember } from '../../api/admin/constants/members'
import { getMembers } from '../../api/constants'

type MembersType = { [id: string]: MemberCategoryType }

function MembersUpdateForm() {
  const [membersList, setMembersList] = useState<MembersType>({})
  const [selCategoryId, setSelCategoryId] = useState<string>(null)
  const [selMemberInd, setSelMemberInd] = useState<number>(null)
  const [selMember, setSelMember] = useState<MemberType>(null)
  const [changeOccured, setChangeOccured] = useState<boolean>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getMembers()
      .then((data) => setMembersList(data))
      .catch(() => setError('Not able to get members list, Try again!'))
  }, [changeOccured])

  const updateMember = () => {
    const catMembers = membersList[selCategoryId].members
    catMembers[selMemberInd] = selMember

    editMember(selCategoryId, catMembers)
      .then(() => {
        alert('Updated Member Details')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to update member details, Try again!'))
      .finally(() => closeEditModal())
  }

  const closeEditModal = () => {
    setSelCategoryId(null)
    setSelMemberInd(null)
    setSelMember(null)
  }

  return (
    <AdminLayout>
      <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Members
      </h1>
      {!error ? (
        Object.keys(membersList).map((key) => (
          <div className="mx-8 my-8" key={key}>
            <h3 className="text-red-850 font-extrabold text-center text-xl lg:text-2xl">
              {membersList[key].category}
            </h3>
            <div className="flex justify-center mt-4 flex-wrap">
              <table className="border-separate p-2">
                <thead>
                  <tr>
                    <th className="border border-blue-850 p-2">S. No.</th>
                    <th className="border border-blue-850 p-2">Name</th>
                    <th className="border border-blue-850 p-2">Scholar</th>
                    <th className="border border-blue-850 p-2">Position</th>
                    <th className="border border-blue-850 p-2">University</th>
                    <th className="border border-blue-850 p-2">Place</th>
                    <th className="border border-blue-850 p-2">Image</th>
                    <th className="border border-blue-850 p-2">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {membersList[key].members.map((member, index) => (
                    <tr>
                      <td className="border border-blue-850 p-2">
                        {index + 1}
                      </td>
                      <td className="border border-blue-850 p-2">
                        {member.name}
                      </td>
                      <td className="border border-blue-850 p-2">
                        {member.scholar}
                      </td>
                      <td className="border border-blue-850 p-2">
                        {member.position}
                      </td>
                      <td className="border border-blue-850 p-2">
                        {member.university}
                      </td>
                      <td className="border border-blue-850 p-2">
                        {member.place}
                      </td>
                      <td className="border border-blue-850 p-2">
                        <div className="flex justify-center items-center">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                        </div>
                      </td>
                      <td className="border border-blue-850 p-2">
                        <div className="flex justify-center items-center">
                          <FontAwesomeIcon
                            className="cursor-pointer"
                            icon={faEdit}
                            width={20}
                            onClick={() => {
                              setSelCategoryId(key)
                              setSelMemberInd(index)
                              setSelMember(member)
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      <EditMemberModal
        member={selMember}
        setMember={setSelMember}
        updateMember={updateMember}
        closeModal={closeEditModal}
      />
    </AdminLayout>
  )
}

export default requireAuth(MembersUpdateForm, Roles.ADMIN)
