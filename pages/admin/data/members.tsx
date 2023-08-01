import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { MemberCategoryType } from '../../../types'
import { getMembers } from '../../api/constants'

function MembersUpdateForm() {
  const [membersList, setMembersList] = useState<Array<MemberCategoryType>>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getMembers()
      .then((data) =>
        setMembersList(Object.values(data).sort((a, b) => a.index - b.index)),
      )
      .catch(() => setError('Not able to get members list, Try again!'))
  }, [])

  return (
    <AdminLayout>
      <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Members
      </h1>
      {!error ? (
        membersList.map((doc, ind) => (
          <div className="mx-8 my-8" key={ind}>
            <h3 className="text-red-850 font-extrabold text-center text-xl lg:text-2xl">
              {doc.category}
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
                  {doc.members.map((member, index) => (
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
                          <FontAwesomeIcon icon={faEdit} width={20} />
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
    </AdminLayout>
  )
}

export default requireAuth(MembersUpdateForm, Roles.ADMIN)
