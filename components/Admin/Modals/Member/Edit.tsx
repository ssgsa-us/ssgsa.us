import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'
import { MemberType } from '../../../../types'

type Props = {
  member: MemberType
  setMember: Dispatch<SetStateAction<MemberType>>
  updateMember: () => void
  closeModal: () => void
}

export default function EditMemberModal({
  member,
  setMember,
  updateMember,
  closeModal,
}: Props) {
  const onChange = (e) =>
    setMember((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

  if (!member) return null
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50">
      <div className="flex justify-center items-center w-full h-full">
        <div className="navgroup-box w-full sm:w-3/4 lg:w-1/2 p-8">
          <div className="flex flex-col bg-gray-200 border-0 rounded-lg shadow-lg">
            {/*header*/}
            <div className="flex items-center border-b border-solid border-blue-850 rounded-t p-5">
              <h3 className="text-2xl text-blue-850 text-center w-11/12 font-bold">
                Edit Member Details
              </h3>
              <div className="w-1/12">
                <FontAwesomeIcon
                  className="text-red-850 cursor-pointer"
                  icon={faTimesCircle}
                  width={25}
                  onClick={closeModal}
                />
              </div>
            </div>
            {/*body*/}
            <div className="px-5">
              <div className="flex items-center my-5">
                <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5">
                  Name
                </p>
                <input
                  name="name"
                  type="text"
                  value={member.name}
                  onChange={onChange}
                  className="border-2 border-gray-300 w-3/5 rounded-xl p-2"
                />
              </div>
              <div className="flex items-center my-5">
                <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5">
                  Scholar
                </p>
                <input
                  name="scholar"
                  type="text"
                  value={member.scholar}
                  onChange={onChange}
                  className="border-2 border-gray-300 w-3/5 rounded-xl p-2"
                />
              </div>
              <div className="flex items-center my-5">
                <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5">
                  Position
                </p>
                <input
                  name="position"
                  type="text"
                  value={member.position}
                  onChange={onChange}
                  className="border-2 border-gray-300 w-3/5 rounded-xl p-2"
                />
              </div>
              <div className="flex items-center my-5">
                <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5">
                  University
                </p>
                <input
                  name="university"
                  type="text"
                  value={member.university}
                  onChange={onChange}
                  className="border-2 border-gray-300 w-3/5 rounded-xl p-2"
                />
              </div>
              <div className="flex items-center my-5">
                <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5">
                  Place
                </p>
                <input
                  name="place"
                  type="text"
                  value={member.place}
                  onChange={onChange}
                  className="border-2 border-gray-300 w-3/5 rounded-xl p-2"
                />
              </div>
              <div className="flex items-center my-5">
                <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5">
                  Image URL
                </p>
                <input
                  name="imageUrl"
                  type="text"
                  value={member.imageUrl}
                  onChange={onChange}
                  className="border-2 border-gray-300 w-3/5 rounded-xl p-2"
                />
              </div>
              <div className="flex justify-center my-5">
                <button
                  className="text-white text-base md:text-lg bg-red-850 mb-4 sm:ml-4 sm:mb-0 py-2 px-2 rounded-lg"
                  onClick={updateMember}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
