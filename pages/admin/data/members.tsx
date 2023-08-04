import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import UpdateMemberModal from '../../../components/Admin/Modals/Members/Update'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { MemberCategoryType, MemberType } from '../../../types'
import {
  deleteMembersCategory,
  updateMembers,
  updateMembersCategory,
} from '../../api/admin/constants/members'
import { getMembers } from '../../api/constants'
import UpdateCategoryModal from '../../../components/Admin/Modals/Members/UpdateCategory'

type MembersType = { [id: string]: MemberCategoryType }

function MembersUpdateForm() {
  const [membersList, setMembersList] = useState<MembersType>({})
  const [selCategoryId, setSelCategoryId] = useState<string>(null)
  const [selMemberInd, setSelMemberInd] = useState<number>(null)
  const [member, setMember] = useState<MemberType>(null)
  const [categoryTitle, setCategoryTitle] = useState<string>(null)
  const [changeOccured, setChangeOccured] = useState<boolean>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getMembers()
      .then((data) => setMembersList(data))
      .catch(() => setError('Not able to get members list, Try again!'))
  }, [changeOccured])

  const editMemberDetails = () => {
    const catMembers = membersList[selCategoryId].members
    catMembers[selMemberInd] = member

    updateMembers(selCategoryId, catMembers)
      .then(() => {
        alert('Updated Member Details')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to update member details, Try again!'))
      .finally(() => closeModal())
  }

  const addNewMember = () => {
    const catMembers = [...membersList[selCategoryId].members, member]

    updateMembers(selCategoryId, catMembers)
      .then(() => {
        alert('New Member Created')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to create new member, Try again!'))
      .finally(() => closeModal())
  }

  const deleteMember = (catId: string, index: number) => {
    const catMembers = membersList[catId].members
    catMembers.splice(index, 1)

    updateMembers(catId, catMembers)
      .then(() => {
        alert('Member Removed')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to remove member, Try again!'))
  }

  const editCategoryDetails = () => {
    const category: MemberCategoryType = {
      category: categoryTitle,
      ...membersList[selCategoryId],
    }

    updateMembersCategory(selCategoryId, category)
      .then(() => {
        alert('Updated Category Title')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to update category title, Try again!'))
      .finally(() => closeModal())
  }

  const addNewCategory = () => {
    const nextCatInd = Object.keys(membersList).length + 1
    const category: MemberCategoryType = {
      category: categoryTitle,
      index: nextCatInd,
      members: [],
    }

    updateMembersCategory(String(nextCatInd), category)
      .then(() => {
        alert('New Category Created')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to create new category, Try again!'))
      .finally(() => closeModal())
  }

  const deleteCategory = (catId: string) => {
    deleteMembersCategory(catId)
      .then(() => {
        alert(`${membersList[catId].category} Category Deleted`)
        setChangeOccured(!changeOccured)
      })
      .catch(() =>
        setError(`
        Not able to delete category ${membersList[catId].category}, Try again!
      `),
      )
      .finally(() => closeModal())
  }

  const closeModal = () => {
    setSelCategoryId(null)
    setSelMemberInd(null)
    setMember(null)
    setCategoryTitle(null)
  }

  return (
    <AdminLayout>
      <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Members
      </h1>
      {!error ? (
        Object.keys(membersList).map((key) => (
          <div className="mx-8 my-8" key={key}>
            <div className="flex justify-center">
              <h3 className="text-red-850 font-extrabold text-center text-xl lg:text-2xl">
                {membersList[key].category}
              </h3>
              <FontAwesomeIcon
                className="cursor-pointer ml-5"
                icon={faEdit}
                width={20}
                onClick={() => {
                  setSelCategoryId(key)
                  setCategoryTitle(membersList[key].category)
                }}
              />
              <FontAwesomeIcon
                className="cursor-pointer ml-5"
                icon={faTrash}
                width={20}
                onClick={() => {
                  if (
                    confirm(
                      `Are you sure, you want to remove this category "${membersList[key].category}"`,
                    ) == true
                  )
                    deleteCategory(key)
                }}
              />
            </div>
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
                    <th className="border border-blue-850 p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {membersList[key].members.map((member, index) => (
                    <tr key={key}>
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
                          {!member.imageUrl ? (
                            '-'
                          ) : (
                            <Image
                              src={member.imageUrl}
                              alt={member.name}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                          )}
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
                              setMember(member)
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
                                  `Are you sure, you want to remove this member "${member.name}"`,
                                ) == true
                              )
                                deleteMember(key, index)
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
                  setSelCategoryId(key)
                  setMember({
                    name: '',
                    scholar: '',
                    position: '',
                    university: '',
                    place: '',
                    imageUrl: '',
                  })
                }}
              >
                Add New Member
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
          onClick={() => setCategoryTitle('')}
        >
          Add New Category
        </button>
      </div>

      <UpdateMemberModal
        title={selMemberInd === null ? 'Add New Member' : 'Edit Member Details'}
        member={member}
        setMember={setMember}
        updateMember={selMemberInd === null ? addNewMember : editMemberDetails}
        closeModal={closeModal}
      />
      <UpdateCategoryModal
        title={
          selCategoryId === null ? 'Add New Category' : 'Edit Category Title'
        }
        categoryTitle={categoryTitle}
        setCategoryTitle={setCategoryTitle}
        updateCategory={
          selCategoryId === null ? addNewCategory : editCategoryDetails
        }
        closeModal={closeModal}
      />
    </AdminLayout>
  )
}

export default requireAuth(MembersUpdateForm, Roles.ADMIN)
