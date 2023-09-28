import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  title: string
  groupTitle: string
  setGroupTitle: Dispatch<SetStateAction<string>>
  updateGroup: () => void
  closeModal: () => void
}

export default function UpdateGroupModal({
  title,
  groupTitle,
  setGroupTitle,
  updateGroup,
  closeModal,
}: Props) {
  if (groupTitle === null) return null
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50">
      <div className="flex justify-center items-center w-full h-full">
        <div className="navgroup-box w-full sm:w-3/4 lg:w-1/2 p-8">
          <div className="flex flex-col bg-gray-200 border-0 rounded-lg shadow-lg">
            {/*header*/}
            <div className="flex items-center border-b border-solid border-blue-850 rounded-t p-5">
              <h3 className="text-2xl text-blue-850 text-center w-11/12 font-bold">
                {title}
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
                  Title Name
                  <span className="text-red-850 font-black">*</span>
                </p>
                <input
                  name="name"
                  type="text"
                  value={groupTitle}
                  onChange={(e) => setGroupTitle(e.target.value)}
                  className="border-2 border-gray-300 w-3/5 rounded-xl p-2"
                />
              </div>
              <div className="flex justify-center my-5">
                <p className="text-blue-850 text-sm sm:text-base font-extrabold">
                  Constants can be added/updated separately under this group
                </p>
              </div>
              <div className="flex justify-center my-5">
                <button
                  className="text-white text-base md:text-lg bg-red-850 mb-4 sm:ml-4 sm:mb-0 py-2 px-2 rounded-lg"
                  onClick={() =>
                    !groupTitle ? alert('Title is required') : updateGroup()
                  }
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
